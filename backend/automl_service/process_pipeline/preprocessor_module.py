'''
This file have the function to deal with to create the list of preprocessors for automl paje 
selected from a list of preprocessors names
'''

from paje.ml.element.preprocessing.supervised.instance.sampler.over.ran_over_sampler import \
    RanOverSampler
from paje.ml.element.preprocessing.supervised.instance.sampler.under.ran_under_sampler import \
    RanUnderSampler
from paje.ml.element.preprocessing.unsupervised.feature.scaler.equalization import \
    Equalization
from paje.ml.element.preprocessing.unsupervised.feature.scaler.standard import \
    Standard

#this is a dict to map the name of a preprocessor to the preprocessor, to add a new preprocessor, 
#just need to add the preprocessor in this dict and import the preprocessor above, remember to add in the database too
preprocessors_dict={
    "RanOverSampler":RanOverSampler.cs(),
    "RanUnderSampler":RanUnderSampler.cs(),
    "Equalization":Equalization.cs(),
    "Standard":Standard.cs()
}

def get_my_preprocessors(preprocessors):
    my_preprocessors = []

    for p in preprocessors:
        my_preprocessors.append( preprocessors_dict[p.name] )
        
    return my_preprocessors