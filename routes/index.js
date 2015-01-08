var express = require('express');
var router = express.Router();
var quiz_lib = require('../own_modules/quiz_lib.js').init('./data/quiz.db');

router.get('/', function(req, res){
});

router.get('/dashboard',function(req,res){
	quiz_lib.show_open_quizzes(function(err,open_quizzes){
		err && req.render('view_open_quizzes',{error:err})
		!err && res.render('view_open_quizzes',{open_quizzes:open_quizzes});
	});
});

module.exports = router;