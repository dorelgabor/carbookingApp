module.exports = function(app, mongoose, UserDetails){

  var LocalStrategy = require('passport-local').Strategy;
  var passport = require('passport');
  var path = require('path');

  app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
  });

  app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
  );
 
  app.get('/loginFailure', function(req, res, next) {
    res.send('Failed to authenticate');
  });
   
  app.get('/loginSuccess', function(req, res, next) {
    res.send('Successfully authenticated');
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
   
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new LocalStrategy(function(username, password, done) {
    process.nextTick(function() {
      // Auth Check Logic
    });
  }));

  passport.use(new LocalStrategy(function(username, password, done) {
    process.nextTick(function() {
      UserDetails.findOne({
        'username': username, 
      }, function(err, user) {
        if (err) {
          return done(err);
        }
   
        if (!user) {
          return done(null, false);
        }
   
        if (user.password != password) {
          return done(null, false);
        }
   
        return done(null, user);
      });
    });
  }));
}