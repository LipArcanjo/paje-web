from shared.orm import *


#this clas if responsible for doing the querys to the database
class DBAccess():
    #db_url defined in orm.py
    database_uri = db_url
    #have a atribute named db_session 
    def __init__(self):
        self.db_session = init_db(self.database_uri)

    def __del__(self):
        self.db_session.remove()

    #this function gets the components of a request in the database, and can specify the type of the component through the parameter type
    def find_components_of_request(self,automlrequest_id,type=None):
        if type is None:
            aux = self.db_session.query(ComponentXRequest).filter(ComponentXRequest.request_id == automlrequest_id).join(ComponentXRequest.component).all()
            return [a.component for a in aux]

        aux = self.db_session.query(ComponentXRequest).filter(ComponentXRequest.request_id == automlrequest_id).join(ComponentXRequest.component).filter(Component.type == type).all()
        return [a.component for a in aux]

    #return a tuple  dbfile,controller, this function return the dbfile and the controller of a automlrequests
    def find_dbfile_and_controller_of_request(self,automlrequest_id):
        aux = self.db_session.query(AutoMLRequest).filter(AutoMLRequest.automlrequest_id==automlrequest_id).join(AutoMLRequest.dbfile).join(AutoMLRequest.controller).first()
        return aux.dbfile,aux.controller

    #return the first waiting automlrequest finded, or None if dont have any
    def find_first_waiting_automlrequest(self):
        return self.db_session.query(AutoMLRequest).filter(AutoMLRequest.status=="waiting").order_by(AutoMLRequest.automlrequest_id).first()

    def update_status_automlrequest(self,automlrequest,status):
        if automlrequest is not None:
            automlrequest.status = status
            self.db_session.commit()
    
    def update_metric_result_automlrequest(self,automlrequest,metric_result):
        if automlrequest is not None:
            automlrequest.metric_result = metric_result
            self.db_session.commit()
    
    def find_component_by_name(self,component_name):
        return self.db_session.query(Component).filter(Component.name==component_name).first()

    def insert_automl_pipeline_result(self,automlrequest_id,component_id, order_in_pipeline):
        automl_pipeline_result = AutoMLPipelineResult(automlrequest_id,component_id,order_in_pipeline)
        self.db_session.add(automl_pipeline_result)
        self.db_session.commit()

    def delete_current_pipeline_result(self,automlrequest_id):
        aux = self.db_session.query(AutoMLPipelineResult).filter(AutoMLPipelineResult.request_id==automlrequest_id).all()
        for i in aux:
            self.db_session.delete(i)
        self.db_session.commit()

if __name__ == "__main__":
    acessDB = BDAccess()
    aux = acessDB.find_metrics_of_request(3)
    for a in aux:
        print(a.metric.initials)
