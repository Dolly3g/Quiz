var express = require('express');
var router = express.Router();
var quiz_lib = require('../own_modules/quiz_lib.js').init('./data/quiz.db');

router.get('/login', function(req, res){
	res.render('login');
});

router.post('/login', function(req, res){
	console.log(req.body.username);
	res.end("Got.");
});




module.exports = router;
