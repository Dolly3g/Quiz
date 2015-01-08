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
				filename:'filename.txt',
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
				total_questions:"6",
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

});




// describe('#addTopic',function(){
// 	it('insert new topic into topics table along with userId and time',function(done){
// 		var topic = {
// 			name: 'hocky',
// 			description: 'hocky is our national game',
// 			userId: 1,
// 			start_time:"GMT 15:30",
// 		};

// 		var callback = function(error,topicInfo){
// 			assert.notOk(error);
// 			topic.id = 4;
// 			topic.end_time = null;
// 			assert.deepEqual(topicInfo[3],topic);
// 			done();
// 		};

// 		adda_records.addTopic(topic, function(err){
// 			assert.notOk(err);
// 			adda_records.getTopicInfo(callback);
// 		});
// 	});
// });