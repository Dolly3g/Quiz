var sqlite3 = require("sqlite3").verbose(); 

var add_user = function(user,db,onComplete){
	db.run("insert into users(username) values('"+user.username+"')",function(err){
		err && console.log(err)
		onComplete(err);
	})
};

var _login_user = function(user,db,onComplete){
	_is_user(user,db,function(result,err){
		if(result){
			onComplete('Already exists');
		}
		else
			add_user(user,db,onComplete)
	})
};

var _is_user = function(user,db,onComplete){
	var user_query = "select username from users where username='"+user.username+"'";
	db.get(user_query,function(err,username){
		var result;
		username && (result=true)
		onComplete(result,null)
	})
};

var init = function(location){
	var operate = function(operation){
		return function(){
			var onComplete = (arguments.length == 2)?arguments[1]:arguments[0];
			var arg = (arguments.length == 2) && arguments[0];

			var onDBOpen = function(err){
				if(err){onComplete(err);return;}
				db.run("PRAGMA foreign_keys = 'ON';");
				arg && operation(arg,db,onComplete);
				arg || operation(db,onComplete);
				db.close();
			};
			var db = new sqlite3.Database(location,onDBOpen);
		};	
	};
	var records  = {
		login_user : operate(_login_user),
		is_user : operate(_is_user)
	};
	return records;
};

exports.init =init;