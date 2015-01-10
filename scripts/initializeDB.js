var location = process.argv[2];
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database(location);
var runAllQueries = function(){	
	var runQuery = function(q){
		console.log(q);
		db.run(q,function(err){
			if(err){
				console.log(err);
				process.exit(1);
			}
		});
	};

	[ "create table users(email_id text primary key not null, username text, password text);",	
		"create table quizzes(id integer primary key autoincrement, name text not null, email_id text not null, total_time text not null, total_seats integer not null, total_questions integer not null, filename text not null, status text not null, foreign key(email_id) references users(email_id));",
		"create table results(id integer primary key autoincrement, email_id text, quiz_id integer, time_taken text, rank integer, commits integer, corrects integer, foreign key(quiz_id) references quizzes(id), foreign key(email_id) references users(email_id));"
	].forEach(runQuery);
};
db.serialize(runAllQueries);