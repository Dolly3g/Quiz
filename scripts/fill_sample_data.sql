PRAGMA foreign_keys = "ON";
insert into users(email_id) values("d@email.com"),("t@email.com"),("g@email.com"),("s@email.com");
insert into quizzes(name, email_id, total_time, total_seats, total_questions, filename, status)
	values("Science","d@email.com","00:30:00",10,6,"1.json","Open"),
		("Maths","t@email.com","00:30:00",12,10,"2.json","Close"),
		("Biology","g@email.com","00:45:00",20,10,"3.json","Open"),
		("Astrology","s@email.com","00:40:00",6,12,"4.json","Close"),
		("Chemistry","t@email.com","00:30:00",10,10,"5.json","Running");
insert into results(email_id, quiz_id, time_taken, rank, commits, corrects)
	values("d@email.com",1,"00:21:00",1,6,5 );

insert into results(email_id, quiz_id)
	values("g@email.com",1),("s@email.com",3);