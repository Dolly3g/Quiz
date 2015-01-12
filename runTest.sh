rm -rf tests/data/quiz.db
node scripts/initializeDB.js tests/data/quiz.db 
sqlite3 tests/data/quiz.db < scripts/queries.sql

rm -rf tests/data/quiz.db.backup
node scripts/initializeDB.js tests/data/quiz.db.backup 
sqlite3 tests/data/quiz.db.backup < scripts/queries.sql

mocha tests