var express = require('express');
var router = express.Router();
var quiz_lib = require('../own_modules/quiz_lib.js').init('./data/quiz.db');

router.get('/login', function(req, res){
	res.render('login');
});

router.get('/dashboard', function(req, res){
	res.render('dashboard');
});


router.post('/login', function(req, res){
	quiz_lib.login_user(req.body,function(err){
		err && console.log(err);
	})
	res.redirect("/dashboard");
});




module.exports = router;
