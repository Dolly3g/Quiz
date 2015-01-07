var lib = require("../own_modules/quiz_lib.js");
var assert = require('chai').assert;
var fs = require('fs');
// var dbFileData = fs.readFileSync('tests/data/quiz.db.backup');
var sqlite3 = require("sqlite3").verbose();
// var TEST_DB_PATH='tests/data/quiz.db';

var quiz_lib;
describe('quiz_records',function(){
	beforeEach(function(){
		// fs.writeFileSync(TEST_DB_PATH,dbFileData);
		// quiz_lib = lib.init(TEST_DB_PATH);
	});
	console.log(quiz_lib);
	it("dummy test",function(){
		assert.equal(1,2);
	})

});