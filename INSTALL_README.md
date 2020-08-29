# How to Install PAJE WEB (back-end and front-end)

In this README have the instruction to how to install the PAJE-WEB project, to know how to execute see the EXECUTE_README.

## How to Install BACK-END

The BACK-END of the PAJE WEB is made through multiples services, is necessary to install each one to access all features in the project.

### List of Services

* AutoML Service

### How to Install AutoML Service

Enter in the folder of the service:

```
$ cd backend/automl_service
```

The first thing to do is to create the database to this service, you need to use the script "bd_automl_service.sql" to add the struct of the database and populate it with the script "populate_automl_db.sql" in a POSTGRESQL database and ensure its running when execute the service.

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

At this point the AutoML service is appropriately installed.

## How to Install FRONT-END

Go to the FRONT-END folder:

```
cd frontend
```

1. Install the `npm`
  * For arch linux
  ```sh
  yay -S npm
  ```
2. Install the Angular framework
	```sh
	npm install -g @angular/cli
	```
3. Install all required dependencies (inside paje-web/frontend/ folder)
	```sh
	npm install
	```