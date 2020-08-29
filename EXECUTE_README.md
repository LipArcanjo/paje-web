# How to Execute PAJE WEB (back-end and front-end)

In this README have the instruction to how to execute the PAJE-WEB project, to know how to install, see INSTALL_README.

## How to Execute BACK-END

The BACK-END of the PAJE WEB is made through multiples services, is necessary to execute each one to access all features in the project.

### List of Services

* AutoML Service

### How to Execute AutoML Service

The AutoML Service is compound of two parts, the fisrt one is the API REST, the second one is the Proccess Pipeline. For each one open a diferent terminal and follow the steps below.

#### How to Execute API REST

```
$ cd backend/automl_service
$ source venv/bin/activate
$ cd API_REST
$ python app.py
```

#### How to Execute Process Pipeline
```
$ cd backend/automl_service
$ source venv/bin/activate
$ cd process_pipeline
$ python main.py
```

## How to Execute FRONT-END

```
$ cd frontend
ng serve
```

## Open the Web Page

Access the site http://localhost:4200/ in your browser.

