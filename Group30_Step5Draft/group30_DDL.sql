#the employee table
CREATE TABLE `employees` (

userID int(11) NOT NULL AUTO_INCREMENT,
firstName varchar(255) NOT NULL,
lastName varchar(255) NOT NULL,
email varchar(255) NOT NULL,
PRIMARY KEY (userID)
);

INSERT INTO `employees` (`userID`, `firstName`, `lastName`,`email` ) VALUES
(1, 'Arman', 'Askari Zadeh','Arman@example.com'),
(2, 'Pierre', 'Saladino','Pierre@example.com');


#employee_type that specifies that they are manager or employee
CREATE TABLE `employee_types` (
userID int NOT NULL,
type varchar(255) NOT NULL,
primary key(userID),
foreign key (userID) references employees(userID)
);


CREATE TABLE `tools` (
toolID int(11) NOT NULL AUTO_INCREMENT,
certID int(11) NOT NULL,
toolGroup varchar(255) NOT NULL,
UNIQUE (toolID),
PRIMARY KEY (toolID)
);

INSERT INTO `tools` (`toolID`, `toolGroup`) VALUES
(1, 'Group 1'),
(2, 'Group 2');

CREATE TABLE `Employee_Certifications` (
certID int(11) NOT NULL,
certTitle varchar(255) NOT NULL,
PRIMARY KEY (certID)
);

CREATE TABLE `thetable`(
userID int(11) NOT NULL,
certID int(11) NOT NULL,
primary key(userID,certID),
foreign key (userID) references employees(userID),
foreign key (certID) references Employee_Certifications(certID)
);
