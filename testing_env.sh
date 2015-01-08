node scripts/initializeDB.js tests/data/quiz.db 
sqlite3 tests/data/quiz.db < scripts/fill_sample_data.sql
cp tests/data/quiz.db tests/data/quiz.db.backup