module.exports = function(){
    var express = require('express');
    var router = express.Router();



    // function getEmployees(res, mysql, context, complete){
    //     mysql.pool.query("SELECT * FROM Employees", function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.employees = results;
    //         complete();
    //     });
    // }

    function getEmployees(req, res){
        console.log("Get Employees from db table")
        var query = 'SELECT * FROM Employees';
        var mysql = req.app.get('mysql');
        var context = {};
   
        function handleRenderingOfPlanets(error, results, fields){
            console.log(error)
            console.log(results)
            console.log(fields)
            //take the results of that query and store ti inside context
            context.employees = results;
            //pass it to handlebars to put inside a file
            res.render('employees', context)
          }
          //execute the sql query
          mysql.pool.query(query, handleRenderingOfPlanets)
  
          //res.send('Here you go!');
      }
        router.get('/', getEmployees);

    // router.get('/', function(req, res){
    //     let callbackCount = 0;
    //     let context = {};
    //     let mysql = req.app.get('mysql');
    //     getEmployees(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 1){
    //             res.render('employees', context);
    //         }

    //     }
    // });
   
    return router;
}();