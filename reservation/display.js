module.exports = function(app, mongoose, ReservationDetails){

  var path = require('path');

  // Display my reservations
  app.get('/my_reservations', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'my_reservations.html'));
  });
   
  app.post('/my_reservations', function(req, res, next) {
    var email = req.body.email;

    ReservationDetails.find({email: email},function(err,docs){
        if (err)
          res.send("There was an error while accessing the database.");
        res.send(docs);
    }); 
  });

  // Display reservations for date
  app.get('/reservations_for_date', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'reservations_for_date.html'));
  });
   
  app.post('/reservations_for_date', function(req, res, next) {
    var date = req.body.date;

    ReservationDetails.find({startDate: date},function(err,docs){
        if (err)
          res.send("There was an error while accessing the database.");
        res.send(docs);
    }); 
  });
}