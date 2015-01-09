var lib = require("../own_modules/quiz_lib.js");
var assert = require('chai').assert;
var fs = require('fs');
var dbFileData = fs.readFileSync('tests/data/quiz.db.backup');
var sqlite3 = require("sqlite3").verbose();
var TEST_DB_PATH='tests/data/quiz.db';

var quiz_lib;
describe('quiz_records',function(){
	beforeEach(function(){
		fs.writeFileSync(TEST_DB_PATH,dbFileData);
		quiz_lib = lib.init(TEST_DB_PATH);

	});
	describe("#create_quiz",function(){
		it("add a new quiz G.K.",function(done){
			var quiz = {
				name : 'G.K.',
				email_id:"any@g.com",
				hours:"0",
				Minutes:"10",
				Seconds:"0",
				total_seats:25,
				total_questions:1,
				filename:'filename.json',
				status:'open'
			};
			quiz_lib.add_new_quiz(quiz,function(err){
				assert.notOk(err);
				done();
			})
		})
		it("check insert quiz is in database or not",function(done){
			var quiz1 = {
				id:1,
				name : 'Science',
				email_id:"d@email.com",
				total_time:"00:30:00",
				total_seats:10,
				total_questions:6,
				filename:'1.json',
				status:'open'
			};
			var callback = function(error,QuizInfo){
				assert.notOk(error);
				assert.deepEqual(quiz1,QuizInfo);
				done();
			};
			quiz_lib.get_quiz_info(callback);
		})
	})

	describe("#is_user",function(){		
		it("#is_user gives true for 'dolly' since dolly is already logged in",function(done){
			var user = {username:'dolly'};
			quiz_lib.is_user(user,function(result,err){
				assert.ok(result)
				assert.notOk(err)
				done();
			})
		})

		it("#is_user gives falsy value for 'chintu' since chintu is not logged in",function(done){
			var user = {username:'chintu'};
			quiz_lib.is_user(user,function(result,err){
				assert.notOk(result)
				assert.notOk(err)
				done();
			})
		})
	})

	describe("#login_user",function(){
		it("#login_user registers 'chintu' since 'chintu' is logging in first time",function(done){
			var user = {username:'chintu'}
			quiz_lib.login_user(user,function(err){
				assert.notOk(err);
				quiz_lib.is_user(user,function(result,err){
					assert.ok(result)
					assert.notOk(err)
					done();
				})
			})
		})

		it("#login_user gives err 'Already exists' since 'chintu' is already logged in",function(done){
			var user = {username:'chintu'}
			quiz_lib.login_user(user,function(err){
				quiz_lib.login_user(user,function(err){
					assert.equal(err,'Already exists')
					done();
				})
			})
		})
	})
	describe("#show_open_quizzes",function(){
		var expected = [{id:1,name:"Science",total_seats:10,total_time:"00:30:00",status:"open"},
		{id:3,name:"Biology",total_seats:20,total_time:"00:45:00",status:"open"}];
		it("gives the list of all open quizzes",function(done){
			quiz_lib.show_open_quizzes(function(err,open_quiz_list){
				assert.notOk(err);
				assert.deepEqual(open_quiz_list,expected);
				done();
			});
		});
		it("does not gives the list of close quizzes",function(done){
			quiz_lib.show_open_quizzes(function(err,open_quiz_list){
				assert.notOk(err);
				assert.notEqual(open_quiz_list,expected);
				done();
			});
		});
		it("does not gives the list of running quizzes",function(done){
			quiz_lib.show_open_quizzes(function(err,open_quiz_list){
				assert.notOk(err);
				assert.notEqual(open_quiz_list,expected);
				done();
			});
		});
	});
	describe("quiz_details",function(){
		it("returns the details of a quiz by quiz_id",function(done){
			var expected = [{id:1,name:"Science",total_seats:10}];
			quiz_lib.quiz_details(1,function(err,quiz_summary){
				assert.notOk(err);
				assert.deepEqual(quiz_summary,expected);
				done();
			});
		});
	});

	describe("#get_quiz_details",function(){
		it("gives the all the details of quiz_id 1",function(done){
			var expected = {name:'Science',total_time:'00:30:00',total_seats:10,email_id:'d@email.com',
				players : ['d@email.com'],total_players : 1}
			quiz_lib.get_quiz_details(1,function(err,quiz_details){
				assert.notOk(err);
				assert.deepEqual(expected,quiz_details);
				done();
			})
		})
	})

});
