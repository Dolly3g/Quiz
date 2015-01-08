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
	});

});