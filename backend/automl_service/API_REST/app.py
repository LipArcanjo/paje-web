#!/usr/bin/env python3
import datetime
import logging
import base64

import connexion
from connexion import NoContent
from flask_cors import CORS
from shared.orm import *
import shared.utils as utils

from binascii import a2b_base64
import urllib

db_session = None

'''
all the function below is a functionality from a request made, the mapping from url to the function is defined in swagger.yaml
'''

#this request return a list of all possibles models, to this making a query in the db
def get_models():
    q = db_session.query(Component).filter(Component.type == "model").all()
    return [p.dump() for p in q]

#this request return a list of all possibles preprocessors, to this making a query in the db
def get_preprocessors():
    q = db_session.query(Component).filter(Component.type == "preprocessor").all()
    return [p.dump() for p in q]

#this request return a list of all possibles metrics, to this making a query in the db
def get_metrics():
    q = db_session.query(Component).filter(Component.type == "metric").all()
    return [p.dump() for p in q]

#this request return a list of all possibles automls in the paje, to this making a query in the db
def get_controllers():
    q = db_session.query(Controller).all()
    return [p.dump() for p in q]


#this request return all the automlrequest maded in the server, to this making a query in the db
def get_all_automlrequests():
    automls = db_session.query(AutoMLRequest).join(AutoMLRequest.dbfile).join(AutoMLRequest.controller).all()

    automls_dumped = [p.dump() for p in automls]

    for i,automl in enumerate(automls_dumped):        
        automl['dbfile'] = automls[i].dbfile.dump()
        automl['controller'] = automls[i].controller.dump()

    return automls_dumped

#this request return the result of a automlrequest with the best pipeline found
def get_automl_result(automlrequest_id):
    automl = db_session.query(AutoMLRequest).filter(AutoMLRequest.automlrequest_id == automlrequest_id).join(AutoMLRequest.dbfile).join(AutoMLRequest.controller).first()
    pipeline_query = db_session.query(AutoMLPipelineResult).filter(AutoMLPipelineResult.request_id == automlrequest_id).join(AutoMLPipelineResult.component).order_by(AutoMLPipelineResult.order_in_pipeline).all()
    pipeline_dumped = [ c.component.dump() for c in pipeline_query]
    automl_dict = automl.dump()
    automl_dict['dbfile'] = automl.dbfile.dump()
    automl_dict['controller'] = automl.controller.dump()
    automl_dict['pipeline'] = pipeline_dumped

    return automl_dict

#this rpost request insert a new automlrequest to the server
def post_addAutomlRequest(body):
    models = body['models']
    preprocessors = body['preprocessors']
    metrics = body['metrics']
    db_file = body['db_file']
    db_file_name = body['db_file_name']
    controller = body['controller']


    #dealing with the db_file
    dbfile_instance = DBFile(db_file_name)
    db_session.add(dbfile_instance)
    db_session.commit()

    #the name our db_file gonna have in dbs's folder
    fileNameInFolder = str(dbfile_instance.dbfile_id) 
    #adding the file type if exists
    if  utils.get_file_type(db_file_name) is not None:
        fileNameInFolder = fileNameInFolder + "." + utils.get_file_type(db_file_name)

    #saving the file in the ./dbs/ folder
    response = urllib.request.urlopen(db_file)
    with open("../dbs/"+fileNameInFolder, "wb") as fh:
        fh.write(response.file.read())

    #adding the instance automlrequest in the database
    request = AutoMLRequest(dbfile_instance.dbfile_id, controller['id'])
    db_session.add(request)
    db_session.commit()

    #adding the n per n relashionship
    for m in models:
        model = ComponentXRequest(request.automlrequest_id, m['id'])
        db_session.add(model)
    
    for p in preprocessors:
        preprocessor = ComponentXRequest(request.automlrequest_id,p['id'])
        db_session.add(preprocessor)
    
    for m in metrics:
        metric = ComponentXRequest(request.automlrequest_id,m['id'])
        db_session.add(metric)
    
    db_session.commit()

    return "Added"
    


logging.basicConfig(level=logging.INFO)
db_session = init_db(db_url)
app = connexion.FlaskApp(__name__)
app.add_api('swagger.yaml')

application = app.app
CORS(app.app)


@application.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


if __name__ == '__main__':
    app.run(
        port=8080,
        threaded=False  # in-memory database isn't shared across threads
    )
