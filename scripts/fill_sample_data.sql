PRAGMA foreign_keys = "ON";

insert into users("username") values("dolly");
insert into quizzes(name, email_id, total_time, total_seats, total_questions, filename, status)
	values("Science","d@email.com","00:30:00",10,6,"1.json","open"),
		("Maths","t@email.com","00:30:00",12,10,"2.json","close"),
		("Biology","g@email.com","00:45:00",20,10,"3.json","open"),
		("Astrology","s@email.com","00:40:00",6,12,"4.json","close"),
		("Chemistry","t@email.com","00:30:00",10,10,"5.json","running");
insert into results(email_id, quiz_id, time_taken, rank, commits, corrects)
	values("d@email.com",1,"00:21:00",1,6,5 );
