mkdir data
node scripts/initializeDB.js data/quiz.db 
mkdir test/data
node scripts/initializeDB.js test/data/quiz.db
sqlite3 test/data/quiz.db < scripts/insertData.sql
cp test/data/quiz.db test/data/quiz.db.backup