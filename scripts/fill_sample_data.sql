PRAGMA foreign_keys = "ON";

insert into users("username") values("dolly");
insert into quizzes(name, email_id, total_time, total_seats, total_questions, filename, status)
	values("Science","d@email.com","00:30:00",10,6,"1.json","open"),
		("Maths","t@email.com","00:30:00",12,10,"2.json","close"),
		("Biology","g@email.com","00:45:00",20,10,"3.json","open"),
		("Astrology","s@email.com","00:40:00",6,12,"4.json","close"),
		("Chemistry","t@email.com","00:30:00",10,10,"5.json","running");
