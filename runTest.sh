rm -rf tests/data/quiz.db
node scripts/initializeDB.js tests/data/quiz.db 
sqlite3 tests/data/quiz.db < scripts/fill_sample_data.sql

rm -rf tests/data/quiz.db.backup
node scripts/initializeDB.js tests/data/quiz.db.backup 
sqlite3 tests/data/quiz.db.backup < scripts/fill_sample_data.sql

mocha tests