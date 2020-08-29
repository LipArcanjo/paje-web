# AUTOML Service For PAJE WEB

## Description
This service has the purpose to deal with the REQUESTS of the PAJE WEB front-web that involve automl requests to PAJE WEB, and to compute those requests.
A automl request to curumin is to curumin calculate the best pipeline given a set of components that are candidates for entering the pipeline.

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

#### How to Create de PostgreSQL database Quicky

If the steps below is followed to create the database, isn't necessary to change the informations of the database in the files mentioned above.

This is a quicky creation of the database required to run the service.

Before we start to create  the database, you need to have the postgresql installed in your environment, normally postgresql come pre-installed in a linux environment, but if in your distribution dont come or you want to update the versio, execute:

```
$ sudo apt update
$ sudo apt install postgresql postgresql-contrib
```

Now execute the commands to create the database:

```
$ psql -U postgres -c "CREATE DATABASE automlservice"
```

Execute the script to create the database's tables:

```
$ psql -U postgres -d teste -f bd_automl_service.sql
```

Execute the scrpit to populate the database:

```
$ psql -U postgres -d teste -f populate_automl_db.sql 
```

#### Installing the service and the required libraries

Download the Curumin AutoML project from https://github.com/end-to-end-data-science/curumim-automl-sandbox

Place the paje directory inside the directory backend/automl_service/process_pipeline.

Execute in the terminal:

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

## How to Update The Curumin Version

Add the new components and automls in the database script "populate_automl_db.sql"
TO each type of new component and automl need to alter some different stuffs in code, to see how to add each one of the types, see the files model_module, controller_module, preprocessor_module.

## Other Stuffs

The API REST program utilize the port 8080, ensure its free when execute the program.

Can open  http://0.0.0.0:8080/ui to see the REST REQUESTS and test them.

The file teste.arff is a dataset file to test the service.
