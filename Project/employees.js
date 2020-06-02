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

        router.get('/:id', function(req, res){
            callbackCount = 0;
            var context = {};
            context.jsscripts = ["updateemployees.js"];
            var mysql = req.app.get('mysql');
            getEmployees(res, mysql, context, req.params.id, complete);
            function complete(){
                callbackCount++;
                if(callbackCount >= 2){
                    res.render('employees', context);
                }
    
            }
        });

        router.put('/:id', function(req, res){
            var mysql = req.app.get('mysql');
            console.log(req.body)
            console.log(req.params.id)
            var sql = "UPDATE employees SET firstName=?, lastName=?, email=? WHERE userID=?";
            var inserts = [req.body.fname, req.body.lname, req.body.homeworld, req.body.age, req.params.id];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(error)
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.status(200);
                    res.end();
                }
            });
        });
    
    return router;
}();