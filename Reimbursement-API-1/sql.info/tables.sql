CREATE TABLE user_role ( -- role has to be first, because user is referencing role
        role_id SERIAL PRIMARY KEY, -- to auto add to the next id without having to know the net one
        role_type TEXT UNIQUE NOT NULL
);

CREATE TABLE ers_user (
	user_id SERIAL PRIMARY KEY,
  	username TEXT UNIQUE NOT NULL, 
  	pass TEXT NOT NULL,
  	first_name TEXT NOT NULL,
 	last_name TEXT NOT NULL,
  	email TEXT NOT NULL,
  	role_id INTEGER REFERENCES user_role(role_id)
);

CREATE TABLE reimbursement_type (
        type_id SERIAL PRIMARY KEY, --dynamically adding to type 
        type_name TEXT UNIQUE NOT NULL 
    );
	
CREATE TABLE reimbursement_status (
        status_id SERIAL PRIMARY KEY,
        status_name TEXT UNIQUE NOT NULL
    );
	
CREATE TABLE reimbursement (
        reimbursement_id SERIAL PRIMARY KEY,
        author INTEGER REFERENCES ers_user(user_id), -- -> User, not null
        amount NUMERIC(8,2) NOT NULL,
        date_submitted NUMERIC(14,0) NOT NULL,
        date_resolved NUMERIC(14,0),
        description TEXT NOT NULL,
        resolver INTEGER REFERENCES ers_user(user_id), -- -> User
        status_id INTEGER REFERENCES reimbursement_status(status_id), ---> fk to ReimbursementStatus, not null
        type_id INTEGER REFERENCES reimbursement_type(type_id) -- -> fk to ReimbursementType
    );
	
