module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getEmployees(req, res){
        console.log("Get Employees from db table")
        var query = 'SELECT * FROM employees';
        var mysql = req.app.get('mysql');
        var context = {};
   
        function handleGettingEmployees(error, results, fields){
            console.log(error)
            console.log(results)
            console.log(fields)
            //take the results of that query and store ti inside context
            context.employees = results;
            //pass it to handlebars to put inside a file
            res.render('employees', context)
          }
          //execute the sql query
          mysql.pool.query(query, handleGettingEmployees)
  
          //res.send('Here you go!');
      }
        router.get('/', getEmployees);

    
    return router;
}();