module.exports = function(app, mongoose, UserDetails){

  var path = require('path');
  var util = require('util');

  app.get('/change_pass', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'change_pass.html'));
  });
   
  app.post('/change_pass', function(req, res, next) {
    var userName = req.body.user_name;
    var oldPass = req.body.old_pass;
    var newPass = req.body.new_pass;

    var query = {'username': userName};
    var update = {'password': newPass};
  
    UserDetails.find( {'username': userName, 'password': oldPass}, function (err, results) {
      if (err) { res.send("There was an error while accessing the database."); }
      console.log(results.length);
      if (results.length > 0) {
        UserDetails.where('username', userName).update({$set: {password: newPass}}, function (err, count) { 
          if (count > 0) { 
            res.send("Successfully changed password.");
          } else { res.send("There was an error while changing the password."); }
        });     
      } else { res.send("Incorrect old password."); }
    });
  });
}