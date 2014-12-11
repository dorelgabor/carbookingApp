module.exports = function(app, mongoose, ReservationDetails){

  var path = require('path');

  // Create reservation
  app.get('/create_reservation', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'create_reservation.html'));
  });
   
  app.post('/create_reservation', function(req, res, next) {
    var email = req.body.email;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var car = req.body.car;
    var distance = req.body.distance;
    var purpose = req.body.purpose;

    var resData = new ReservationDetails ({email:email, startDate:startDate, endDate:endDate, car:car, distance:distance, purpose:purpose});
    
    resData.save(function (err) {
      if (err) {
        res.send("There was an error while accessing the database.");
      } else {
        res.send("Successfully created reservation.");
      }
    });
  });

  // Delete reservation
  app.get('/delete_reservation', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'delete_reservation.html'));
  });
   
  app.post('/delete_reservation', function(req, res, next) {
    var email = req.body.email;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var car = req.body.car;
    var distance = req.body.distance;
    var purpose = req.body.purpose;

    var resData = {email:email, startDate:startDate, endDate:endDate, car:car, distance:distance, purpose:purpose};

    ReservationDetails.remove(resData, function (err) {
      if (err) return res.send("There was an error while accessing the database.");;
      res.send("Successfully removed reservation.");
    });
  });
}