var express = require('express');
var router = express.Router();
var quiz_lib = require('../own_modules/quiz_lib.js').init('./data/quiz.db');

var requireLogin = function(req,res,next){
	req.session.user? next(): res.redirect('/login');
};

router.get('/login', function(req, res){
	res.render('login');
});

router.post('/login', function(req, res){
	var user = {};
	user.username = req.body.username;
	quiz_lib.login_user(user,function(err){
		err && console.log(err);
		req.session.user = user.username;
		res.redirect("/dashboard");
	})
});

router.get('/dashboard',requireLogin,function(req,res){
	quiz_lib.show_open_quizzes(function(err,open_quizzes){
		err && req.render('view_open_quizzes',{error:err})
		!err && res.render('view_open_quizzes',{open_quizzes:open_quizzes});
	});
});

router.get('/logout',requireLogin, function(req, res){
	req.session.destroy();
	res.redirect('/login');
});

module.exports = router;
