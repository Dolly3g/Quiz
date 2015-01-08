var sqlite3 = require("sqlite3").verbose(); 

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
		show_open_quizzes:operate(_show_open_quizzes)
	};
	return records;
};

exports.init =init;