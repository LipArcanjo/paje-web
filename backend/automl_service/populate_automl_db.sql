INSERT INTO components(initials,name,type) VALUES
('DT','DT','model'),
('NB','NB','model'),
('ROS','RanOverSampler','preprocessor'),
('RUS','RanUnderSampler','preprocessor'),
('Equ','Equalization','preprocessor'),
('ACC','accurracy','metric');

INSERT INTO controllers(name,description) VALUES
('RandomAutoML','This controller selection for samples is based on random choices');
