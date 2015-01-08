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
});