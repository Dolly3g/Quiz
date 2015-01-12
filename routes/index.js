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

var validateData = function(data){
    var error;
    data.indexOf("'") >= 0 && (error = 'Single quote is not supported')
    data.length <5 && (error = 'Username should have at least 5 characters')
    return error;    
};

router.post('/login', function(req, res){
    var user = {};
    user.email_id = req.body.email_id;
    var error = validateData(user.email_id)
    if(error){
        res.render('login',{error:error})
        return;
    }
	quiz_lib.login_user(user,function(err){
		err && console.log(err);
		req.session.user = user.email_id;
		res.redirect("/dashboard");
	})
});

router.get('/waitingPage/:id', function(req , res){
    var id = req.params.id;
    quiz_lib.quiz_details(id,function(err,data){
        res.render('waitingPage',{data:data});
    });
})

router.get('/start_quiz/:id', function(req , res){
    var id = req.params.id;
    quiz_lib.get_quiz_details(id,function(err,quiz_details){
        res.render('start_quiz',quiz_details)
    })
})


router.get('/create_quiz' , function(req,res){
    res.render("create_quiz");
})

router.post('/create_quiz' ,requireLogin, function(req,res){
    var quiz_info = req.body;
    quiz_info.status = "Open";
    quiz_info.email_id = req.session.user;
    var filename = req.body.filename;
    var content = req.body.data;    
    if(content==""){
        console.log("there is no content in file");
        res.end("Error in reading file");
        return;
    }
    if(content!=""){
        try{
            var total_questions= eval(JSON.parse(content)).length;
            quiz_info.total_questions =total_questions;
        }
        catch(err){
            console.log("Error in reading file:",err);
            res.end("Error in reading file");
            return;
        }
    }

    fs.writeFile("./data/questionFiles/"+filename,content,function(err){
        err &&  console.log('error in writing into file! '+err)
        !err && console.log("Written");
    })
    
    quiz_lib.add_new_quiz(quiz_info,function(error){
    	error && res.render("create_quiz", {error:error});
    	!error && res.redirect("start_quiz/1");
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
