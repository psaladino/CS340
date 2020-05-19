#the employee table
CREATE TABLE `employees` (

userID int(11) NOT NULL AUTO_INCREMENT,
firstName varchar(255) NOT NULL,
lastName varchar(255) NOT NULL,
email varchar(255) NOT NULL,
PRIMARY KEY (userID),
);

INSERT INTO `employee` (`userID`, `firstName`, `lastName`,`email` ) VALUES
(1, 'Arman', 'Askari Zadeh','Arman@example.com'),
(2, 'Pierre', 'Saladino','Pierre@example.com');


#employee_type that specifies that they are manager or employee
CREATE TABLE `employee_types` (
userID int PRIMARY KEY not null,
type varchar(255) NOT NULL,
foreign key (userID) references employee(id),
);


CREATE TABLE `tools` (
toolID int(11) NOT NULL AUTO_INCREMENT,
certID int(11) NOT NULL,
toolGroup varchar(255) NOT NULL,
UNIQUE (toolID),
PRIMARY KEY (toolID),
);

INSERT INTO `tools` (`toolID`, `toolGroup`) VALUES
(1, 'Group 1'),
(2, 'Group 2');

CREATE TABLE `Employee_Certifications` (
certID int(11) NOT NULL,
certTitle varchar(255) NOT NULL,
PRIMARY KEY (certID),
);

create table 'userID_Certs'(
userID int(11) not null,
certID int(11) not null,
primary key(userID,certID),
foreign key (userID) references employee(id),
foreign key (certID) references project(id)
);