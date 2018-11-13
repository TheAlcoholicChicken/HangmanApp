var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist Page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('newuser');
  collection.find({}, {}, function(e, docs) {
    res.render('userlist', {
      "userlist" : docs
    })
  })
})

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', {title: 'Add New User' });
});

/* POST to Add User Service*/
router.post('/adduser', function(req, res) {

  //Set our interna; db variable
  var db = req.db

  // Get our form values. 
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  // Set collection
  var collection = db.get('newuser');

  //Submit to db
  collection.insert({
    "username" : userName,
    "email" : userEmail
  }, function (err, doc) {
    if(err) {
      res.send("There was a problem adding the information to the database");
    }
    else {
      res.redirect("userlist");
    }
  });
});

module.exports = router;
