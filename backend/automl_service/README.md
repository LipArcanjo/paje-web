# AUTOML Service For PAJE WEB

## Description
This service has the purpose to deal with the REQUESTS of the PAJE WEB front-web that involve automl requests to PAJE WEB, and to compute those requests.
A automl request to paje is to paje calculate the best pipeline given a set of components that are candidates for entering the pipeline.

## Programs
The API_REST program have the responsible for dealing with the REQUESTS made through a API REST, this module use PYTHON FLASK to deal with it.

The Process Pipeline program is the module responsible per compute the automl request

## Folders
The folder API_REST have the API_REST program
The folder Process Pipeline have the process_pipeline program
The folder dbs is where we store the dataset given to compute the best pipeline for them


 
## How to Install and Prepare the Environment

First of all, need to create the database to this service, you need to use the script "bd_automl_service.sql" to add the struct of the database and populate it with the script "populate_automl_db.sql" in a POSTGRESQL database and ensure its running when execute the service.

Add the information of the database in the files API_REST/shared/orm.py and process_pipeline/shared/orm.py, in both in the line 11, informing the username, password, url of db and the name of the database.

```
$ sudo apt install python3.7-dev    # For Debian-like systems.
$ python3.7 -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt
deactivate
```

Need to alter the urls in the front-end that points to this service, replace the url in the file of the front-end frontend/src/app/contents/automl/new-automl/contants.ts to the url where you run this service.

## How to Use
To use this service correctly, you should execute the two programs at the same time, the API REST and the Proccess Pipeline.

## How to Execute API REST

```
$ source venv/bin/activate
$ cd API_REST
$ python app.py
```

## How to Execute Process Pipeline
```
$ source venv/bin/activate
$ cd process_pipeline
$ python main.py
```

## How to Update The Paje Version
Install the new version of the paje from https://github.com/end-to-end-data-science/curumim-automl-sandbox in replace for the version in the folder process_pipeline/paje
Add the new components and automls in the database script "populate_automl_db.sql"
TO each type of new component and automl need to alter some different stuffs in code, to see how to add each one of the types, see the files model_module, controller_module, preprocessor_module.

## Other Stuffs

The API REST program utilize the port 8080, ensure its free when execute the program.

Can open  http://0.0.0.0:8080/ui to see the REST REQUESTS and test them.

The file teste.arff is a dataset file to test the service.
