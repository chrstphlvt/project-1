INSERT INTO reimbursement_type(type_name) VALUES 
	('Lodging'),
	('Traveling'),
	('Food'),
	('Other');
INSERT INTO reimbursement_status(status_name) VALUES
	('Pending'),
	('Approved'),
	('Denied');
INSERT INTO user_role(role_type) VALUES 
	('admin'),
	('finance-manager'),
	('employee');	
INSERT INTO ers_user(username, pass, first_name, last_name, email, role_id) VALUES
	('chrstphlvt', '0809', 'Chris', 'Levette', 'cl@gmail.com', 1),
	('angle91', '0620', 'Noel', 'Levette', 'nl@gmail.com', 2),
	('angel99', '0216', 'Angel', 'Levette', 'al@gmail.com', 3);
INSERT INTO reimbursement(author, amount, date_submitted, date_resolved, description, resolver, status_id, type_id) VALUES	
	(2, 1500.00, 1563584376049, 1563584376157, 'over paided taxes', 1, 2, 1),
	(3, 750.00, 1563584346049, 1563584366107, 'under paided taxes', 1, 3, 1),
	(3, 1500.00, 1563584356049, 1563584366157, 'unauthorized expenditures', 2, 3, 3);