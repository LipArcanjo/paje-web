'''
This file have the function to deal with to create the list of models for automl paje 
selected from a list of models names
'''

from paje.automl.composer.any import Any

from paje.ml.element.modelling.supervised.classifier.dt import DT
from paje.ml.element.modelling.supervised.classifier.nb import NB
from paje.ml.element.modelling.supervised.classifier.nbp import NBP

#this is a dict to map the name of a model to the model, to add a new model, just need to add the model in this dict and import the model above
#, remember to add in the database too
models_dict = {
    "DT": DT.cs(),
    "NB": NB.cs(),
    "NBP":NBP.cs()
}

def get_my_models(models):
    
    my_models_aux = []
    
    for model in models:
        my_models_aux.append(models_dict[model.name])

    my_models = [Any.cs(config_spaces=my_models_aux)]

    return my_models