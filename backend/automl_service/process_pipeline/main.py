from db_access import DBAccess
from model_module import get_my_models
from preprocessor_module import get_my_preprocessors
from data_module import get_data
from controller_module import get_automl
from paje.automl.composer.composer import Composer
from paje.ml.metric.supervised.classification.mclassif import Metrics

import time

def main():
    dbaccess = DBAccess()

    '''infinite loop to always try to compute a new automlrequest inserted in the db'''
    while(True):
        time.sleep(3)
        #consulting the db if have a a automlrequest to compute
        automlrequest = dbaccess.find_first_waiting_automlrequest()

        if automlrequest is None:
            print("Dont Have any Auto ML to computate")
            continue

        compute_automl(automlrequest,dbaccess)

#this is the main function of this program, its do the computation of a automlrequest and save the result with the pipeline that achieve the result
def compute_automl(automlrequest,dbaccess):
    #deleting a existent pipeline if already exists
    dbaccess.delete_current_pipeline_result(automlrequest.automlrequest_id)

    #updating the automl status to running, to dont compute again
    dbaccess.update_status_automlrequest(automlrequest,"running")
    
    #getting the db_file and the controller from database
    dbfile,controller = dbaccess.find_dbfile_and_controller_of_request(automlrequest.automlrequest_id)

    models = dbaccess.find_components_of_request(automlrequest.automlrequest_id,"model")
    preprocessors = dbaccess.find_components_of_request(automlrequest.automlrequest_id,"preprocessor")
    metric = dbaccess.find_components_of_request(automlrequest.automlrequest_id,"metric")[0]

    my_models = get_my_models(models)
    my_preprocessors = get_my_preprocessors(preprocessors)
    
    data = get_data(dbfile)
    trainset, testset = data.split(random_state=0)

    #calling the paje api to compute the best pipeline
    automl = get_automl(controller, my_preprocessors, my_models)
    automl.apply(trainset)
    testout = automl.use(testset)
    
    #the metric result of the pipeline choosed in the automl
    metric_result = Metrics.__dict__[metric.name].__get__("useless")(testout)


    if automlrequest.metric_result < metric_result:
        #saving in the db
        dbaccess.update_metric_result_automlrequest(automlrequest,metric_result)

        save_pipeline_result(automlrequest.automlrequest_id,automl, dbaccess,metric)    

    #updating the automl status to running, to dont compute again
    dbaccess.update_status_automlrequest(automlrequest,"done")

    print(automlrequest.metric_result)

#this function save the result and the pipeline found of a automl in the db
def save_pipeline_result(automlrequest_id, automl, dbaccess,metric):
    #this is the list of components in the seq of the model
    components = automl.model.components

    count = save_pipeline_result_rec(automlrequest_id,components,dbaccess,0)
    dbaccess.insert_automl_pipeline_result(automlrequest_id,metric.component_id, count)

'''this function is a auxiliar funciton to save_pipeline_result
this a recursive function who save the pipeline in the db,
at each step os the recursion, we take the components array, if a component is atomic, we save it in the db,
if not we call recursion in this component.
'''
def save_pipeline_result_rec(automlrequest_id,components,dbaccess,count):

    for c in components:

        if isinstance(c, Composer):
            count = save_pipeline_result_rec(automlrequest_id,c.components,dbaccess,count)
        else:
            component = dbaccess.find_component_by_name(c.name)
            dbaccess.insert_automl_pipeline_result(automlrequest_id,component.component_id, count)
            count = count+1
    
    return count

if __name__ == "__main__":
    main()