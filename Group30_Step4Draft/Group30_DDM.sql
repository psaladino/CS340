

-- get user id from employee table
SELECT userID, name FROM employees

-- get all employee info
SELECT firstName, lastName, email FROM employees 

-- get cert ID from employee cert table
SELECT certID FROM Employee_Certifications WHERE  certTitle = :certTitle_input

-- get employee data as certificate id from employees 
SELECT userID AS pid, firstName, lastName FROM employees 

-- add new employee from user inputs
INSERT INTO employees (firstName, lastName, email) VALUES (:firstNameInput, :lastNameInput, :emailInput)

-- add cert for employee from user inputs
INSERT INTO userID_Certs (userID, certID) VALUES (:userIDinput, :certIDinput)

-- update employee from user inputs 
UPDATE employees SET firstName = :firstNameInput, lastName = :lastNameInput, email = :emailInput WHERE id = :userID_from_dropdown_menu

-- delete employee
DELETE FROM  emloyees WHERE userID = :userID_from_dropdown_menu

-- delete cert of employee
DELETE FROM Employee_Certifications WHERE userID = :userID_from_dropdown_menu AND certID = :certID_from_dropdown_menu
