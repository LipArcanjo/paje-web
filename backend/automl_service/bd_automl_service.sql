CREATE TABLE components(
	component_id SERIAL PRIMARY KEY,
	initials VARCHAR(5),
	name VARCHAR(50),
	type VARCHAR(15) 
);

CREATE TABLE dbfiles(
	dbfile_id SERIAL PRIMARY KEY,
	file_name VARCHAR(50)
);

CREATE TABLE controllers(
	controller_id SERIAL PRIMARY KEY,
	name VARCHAR(50),
	description VARCHAR(500)
);

CREATE TABLE automlrequests(
	automlrequest_id SERIAL PRIMARY KEY,
	creation_date timestamp without time zone,
	status VARCHAR(10),
	metric_result real,
	dbfile_id integer REFERENCES dbfiles,
	controller_id integer REFERENCES controllers	
);

CREATE TABLE component_request(
	id SERIAL PRIMARY KEY,
	request_id integer REFERENCES automlrequests,
	component_id integer REFERENCES components
);

CREATE TABLE automl_pipeline_result(
	id SERIAL PRIMARY KEY,
	request_id integer REFERENCES automlrequests,
	component_id integer REFERENCES components,
	order_in_pipeline integer
);



