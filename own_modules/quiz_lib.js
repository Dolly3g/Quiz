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
	db.run(create_quiz_query,quiz_query_params,onComplete);
};

var _get_quiz_info = function(db , onComplete){
	var select_query = 'select * from quizzes where id=1;'
	db.get(select_query , function(err , quiz_info){
		onComplete(err , quiz_info);
	})
}
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
		get_quiz_info: operate(_get_quiz_info)
	};
	return records;
};

exports.init =init;