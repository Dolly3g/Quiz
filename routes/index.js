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

router.get('/waitingPage/:id', function(req , res){
    var id = req.params.id;
    quiz_lib.quiz_details(id,function(err,data){
        res.render('waitingPage',{data:data});
    });
})
router.get('/create_quiz' , function(req,res){
    res.render("create_quiz");
})

router.post('/create_quiz' , function(req,res){
    var quiz_info = req.body;
    if(req.body.email_id==undefined){
    	quiz_info.email_id = "a@gmail.com";
    }
    if(req.body.status==undefined){
    	quiz_info.status = "open";
    }
    if(req.body.total_questions==undefined){
    	quiz_info.total_questions = "10";
    }
    console.log(quiz_info);
    quiz_lib.add_new_quiz(quiz_info,function(error){
    	error && console.log(error);
    	!error && res.redirect("waitingPage");
    });
})

router.get('/dashboard',requireLogin,function(req,res){
	quiz_lib.show_open_quizzes(function(err,open_quizzes){
		err && req.render('dashboard',{error:err})
		!err && res.render('dashboard',{open_quizzes:open_quizzes});
	});
});

router.get('/logout',requireLogin, function(req, res){
	req.session.destroy();
	res.redirect('/login');
});

module.exports = router;
