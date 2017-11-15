var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/commentDB', {useMongoClient:true});
var commentSchema = mongoose.Schema({
  Name:String,
  Comment:String
});

var Comment = mongoose.model('Comment', commentSchema);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log("connected");
});

router.get('/comment', function(req, res, next) {
  console.log("comment get route");
  Comment.find(function(err, commentlist) {
    if(err) return console.error(err);
    else {
      res.json(commentlist);
    }
});

});


router.get('/fake', function(req, res, next) {
  console.log("Fake route");
  var fakelist = [{Name:"Jim", Comment: "hi"}];
  res.json(fakelist);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/comment', function(req, res, next) {
  console.log("post comment route");
  console.log(req.body);
  var newComment = new Comment(req.body);
  newComment.save(function(err, post) {
    if(err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
 });
});

router.delete('/comment', function(req, res, next) {
  console.log("delete comment route");
  Comment.remove(function(err) {
    if(err) return console.error(err);
    else {
      res.sendStatus(200);
    }
  });

});

module.exports = router;

