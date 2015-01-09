var express = require('express');
var router = express.Router();
var fs = require('fs');
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

router.get('/waitingPage', function(req , res){
    res.render("waitingPage")
})
router.get('/create_quiz' , function(req,res){
    res.render("create_quiz");
})

router.post('/create_quiz' , function(req,res){
    var quiz_info = req.body;
    quiz_info.status = "open";
    var content = req.body.data;
    var filename = req.body.filename;

    if(req.body.email_id==undefined){
        quiz_info.email_id = "a@gmail.com";
    }
    if(req.body.total_questions==undefined){
        quiz_info.total_questions = "10";
    }
    fs.writeFile("./data/questionFiles/"+filename,content,function(err){
        err &&  console.log('error in writing into file! '+err)
        !err && console.log("Written");
    })

    quiz_lib.add_new_quiz(quiz_info,function(error){
    	error && res.render("create_quiz", {error:error});
    	!error && res.redirect("waitingPage");
    });
})

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
