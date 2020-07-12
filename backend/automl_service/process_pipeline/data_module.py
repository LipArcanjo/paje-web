'''
This file have the function to loading the dataset based on a dbfile object (defined in orm.py)
'''

#this file lead with the Data
from paje.base.data import Data
import shared.utils as utils

data_folder = "../dbs/"

#this function prepare the data for the automl
def get_data(db_file):

    file_type = utils.get_file_type(db_file.file_name)

    file_name_in_folder = str(db_file.dbfile_id)
    if file_type is not None:
        file_name_in_folder = file_name_in_folder + "." + file_type

    if file_type=="csv":
        return Data.read_csv( data_folder + file_name_in_folder,"class")
    elif file_type=="arff":
        return Data.read_arff(data_folder+file_name_in_folder,"class")
    
    return None
        
