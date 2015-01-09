var sqlite3 = require("sqlite3").verbose();

var _add_new_quiz = function(quiz,db,onComplete){
	var total_time = ""+quiz.hours+":"+quiz.Minutes+":"+quiz.Seconds;
	quiz.total_time = total_time; 
	var create_quiz_query = "insert into quizzes(name, email_id, total_time, total_seats, total_questions, filename, status)"+
							"values($name ,$email_id, $total_time, $total_seats, $total_questions , $filename , $status)";
	var quiz_query_params = {
		"$name":quiz.name , 
		"$email_id": quiz.email_id, 
		"$total_time": quiz.total_time, 
		"$total_seats": quiz.total_seats, 
		"$total_questions": quiz.total_questions, 
		"$filename": quiz.filename,
		"$status":quiz.status
	}
	if(quiz_query_params["$filename"].indexOf(".json")>=0)
		db.run(create_quiz_query,quiz_query_params,onComplete());
	else 
		onComplete('File extention is not right. It should be a json file')
};

var _get_quiz_info = function(db , onComplete){
	var select_query = 'select * from quizzes where id=1;'
	db.get(select_query , function(err , quiz_info){
		onComplete(err , quiz_info);
	})
};

var add_user = function(user,db,onComplete){
	db.run("insert into users(username) values('"+user.username+"')",function(err){
		onComplete(err);
	})
};

var _login_user = function(user,db,onComplete){
	_is_user(user,db,function(result,err){
		result && onComplete('Already exists')
		result || add_user(user,db,onComplete)
	})
};

var _is_user = function(user,db,onComplete){
	var user_query = "select username from users where username='"+user.username+"'";
	db.get(user_query,function(err,username){
		var result;
		username && (result=true)
		onComplete(result,null)
	})
};

var _show_open_quizzes = function(db,onComplete){
	var find_open_quiz_quary = "select id,name,total_seats,total_time,status from quizzes where status='open'";
	db.all(find_open_quiz_quary,onComplete);	
};

var init = function(location){
	var operate = function(operation){
		return function(){
			var onComplete = (arguments.length == 2)?arguments[1]:arguments[0];
			var arg = (arguments.length == 2) && arguments[0];

			var onDBOpen = function(err){
				if(err){onComplete(err);return;}
				db.run("PRAGMA foreign_keys = 'ON';");
				arg && operation(arg,db,onComplete);
				arg || operation(db,onComplete);
				db.close();
			};
			var db = new sqlite3.Database(location,onDBOpen);
		};	
	};
	var records  = {
		add_new_quiz : operate(_add_new_quiz),
		get_quiz_info: operate(_get_quiz_info),
		login_user : operate(_login_user),
		is_user : operate(_is_user),
		show_open_quizzes:operate(_show_open_quizzes)
	};
	return records;
};

exports.init =init;