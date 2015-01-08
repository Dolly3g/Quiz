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
		it("gives the list of all open quizzes",function(done){
			var expected = [{id:1,name:"Science"},{id:3,name:"Biology"}];
			quiz_lib.show_open_quizzes(function(err,open_quiz_list){
				assert.notOk(err);
				assert.deepEqual(open_quiz_list,expected);
				done();
			});
		});
	});

});


// /////////
// describe('#getMyTopics',function(){
// 		it('getMyTopics get all created and joined topics of particular user',function(done){
// 			var expected = [ { id: 2, name: 'step of success' },
//   							{ id: 1, name: 'step' },
//   							{ id: 3, name: 'soda' } ];
// 			adda_records.getMyTopics(2,function(err,topics){
// 				assert.notOk(err);
// 				assert.deepEqual(topics,expected);
// 				done();
// 			});
// 		});
// 	});