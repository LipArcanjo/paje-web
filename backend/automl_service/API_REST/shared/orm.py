#this file is where is defined the objects and classes needed to connect and manipulate the database through the sqlalchemy
from sqlalchemy import Column, DateTime, String, create_engine, Integer, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker, relationship

import datetime

Base = declarative_base()

'''db_url, change this to your respective database
format: postgresql://user:password@host:port/database_name
'''
db_url = 'postgresql://postgres:@localhost:5432/paje'

#all classes below is tables in the database.

class Component(Base):
    __tablename__= 'components'
    component_id = Column(Integer, primary_key=True)
    initials = Column(String(5))
    name = Column(String(50))
    type = Column(String(15))

    componentxrequest = relationship("ComponentXRequest", back_populates="component")
    pipeline_result = relationship("AutoMLPipelineResult",back_populates="component")

    def dump(self):
        
        dumped = []

        for k,v in vars(self).items():
            if k.startswith('_'):
                continue
            elif k == 'component_id':
                dumped.append(('id',v))
            else:
                dumped.append((k,v))

        return dict(dumped)

class Controller(Base):
    __tablename__= 'controllers'
    controller_id = Column(Integer, primary_key=True)
    name = Column(String(50))
    description = Column(String(500))

    automlrequests = relationship("AutoMLRequest",back_populates="controller")

    def dump(self):
        
        dumped = []

        for k,v in vars(self).items():
            if k.startswith('_'):
                continue
            elif  k == 'controller_id':
                dumped.append(('id',v))
            else:
                dumped.append((k,v))

        return dict(dumped)

class DBFile(Base):
    __tablename__ = 'dbfiles'
    dbfile_id = Column(Integer, primary_key=True)
    file_name = Column(String(50))

    automlrequests = relationship("AutoMLRequest",back_populates="dbfile")

    def __init__(self,file_name):
        self.file_name = file_name

    def dump(self):
        
        dumped = []

        for k,v in vars(self).items():
            if k.startswith('_'):
                continue
            elif k == 'dbfile_id':
                dumped.append(('id',v))
            else:
                dumped.append((k,v))

        return dict(dumped)

class AutoMLRequest(Base):
    __tablename__ = 'automlrequests'
    automlrequest_id = Column(Integer, primary_key=True)
    creation_date = Column(DateTime())
    status = Column(String(10))
    metric_result = Column(Float)
    dbfile_id = Column(Integer,ForeignKey('dbfiles.dbfile_id'))
    controller_id = Column(Integer, ForeignKey('controllers.controller_id'))

    dbfile = relationship("DBFile",back_populates="automlrequests")
    controller = relationship("Controller", back_populates="automlrequests")
    componentxrequest = relationship("ComponentXRequest",back_populates="automlrequest")
    pipeline_result = relationship("AutoMLPipelineResult",back_populates="automlrequest")

    def __init__(self, dbfile_id, controller_id):
        self.dbfile_id = dbfile_id
        self.controller_id = controller_id
        self.status = "waiting"
        self.metric_result = 0
        self.creation_date = datetime.datetime.utcnow()

    def dump(self):
        
        dumped = []

        for k,v in vars(self).items():
            if k.startswith('_') or k == 'dbfile_id' or k == 'controller_id' or k == 'componentxrequest' or k == 'pipeline_result':
                continue
            elif k == 'automlrequest_id':
                dumped.append(('id',v))
            else:
                dumped.append((k,v))

        return dict(dumped)


#this class represent the auxiliar table for resolve n to n relationship
class ComponentXRequest(Base):
    __tablename__ = 'component_request'
    id = Column(Integer,primary_key=True)
    request_id = Column(Integer, ForeignKey('automlrequests.automlrequest_id'))
    component_id = Column(Integer,ForeignKey('components.component_id'))

    component = relationship("Component",back_populates="componentxrequest")
    automlrequest = relationship("AutoMLRequest",back_populates="componentxrequest")

    def __init__(self,request_id,component_id):
        self.request_id = request_id
        self.component_id = component_id

class AutoMLPipelineResult(Base):
    __tablename__ = 'automl_pipeline_result'
    id = Column(Integer,primary_key=True)
    request_id = Column(Integer, ForeignKey('automlrequests.automlrequest_id'))
    component_id = Column(Integer,ForeignKey('components.component_id'))
    order_in_pipeline = Column(Integer)

    component = relationship("Component",back_populates="pipeline_result")
    automlrequest = relationship("AutoMLRequest",back_populates="pipeline_result")

    def __init__(self,request_id,component_id,order_in_pipeline):
        self.request_id = request_id
        self.component_id = component_id
        self.order_in_pipeline = order_in_pipeline
    

#this function create a session with the database
def init_db(uri):
    engine = create_engine(uri, convert_unicode=True)
    db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))
    Base.query = db_session.query_property()
    Base.metadata.create_all(bind=engine)
    return db_session
