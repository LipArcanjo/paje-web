'''
This file have the function to deal with to  create the object automl of paje
the choice of the automl is based on the preprocessor name
 
'''

from paje.automl.optimization.blind.random import RandomAutoML
import random

'''
the object to config some parameters of a automl
'''
storage = {
    'engine': 'sqlite',
    'settings': {'db': '7.arff'},
    # 'nested': None,
    # 'dump': False
}

'''
This function return a AutoML object
@PARAMETERS
    controller - this class have the name of the automl, its is defined in orm.py
    my_preprocessors - its the vector of the preprocessors that the automl can use
    my_models - its the vector of the models that the automl can use
'''
def get_automl(controller, my_preprocessors, my_models):
    '''
    to add a new automl, import the automl and add a else if  here with the name of the automl and 
    return it with the creation of the automl with the respective parameters, like the RandomAutoML below, remember to add in the database too
    '''
    if controller.name == "RandomAutoML":
        return RandomAutoML(
            preprocessors=my_preprocessors,
            modelers=my_models,
            max_iter=3,
            pipe_length=2, repetitions=1,
            random_state=random.randint(0,1048575),
            cache_settings_for_components=storage,
            config={}
        )
