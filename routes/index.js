var express = require('express');
var router = express.Router();
var quiz_lib = require('../own_modules/quiz_lib.js').init('./data/quiz.db');

router.get('/', function(req, res){
});


router.get('/waitingPage', function(req , res){
    res.render("waitingPage")
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



module.exports = router;
