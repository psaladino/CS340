module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getTools(req, res){
        console.log("Get Tools from db table")
        var query = 'SELECT * FROM tools';
        var mysql = req.app.get('mysql');
        var context = {};
   
        function handleGettingTools(error, results, fields){
            console.log(error)
            console.log(results)
            console.log(fields)
            //take the results of that query and store ti inside context
            context.tools = results;
            //pass it to handlebars to put inside a file
            res.render('tools', context)
          }
          //execute the sql query
          mysql.pool.query(query, handleGettingTools)
  
          //res.send('Here you go!');
      }

      
        router.get('/', getTools);

     
    
    return router;
}();