npm install

rm -rf data/quiz.db
rm -rf data
mkdir data
node scripts/initializeDB.js data/quiz.db
rm -rf tests/data/quiz.db
rm -rf tests/data/quiz.db.backup
rm -rf tests/data
mkdir tests/data
cp data/quiz.db tests/data/quiz.db
sqlite3 tests/data/quiz.db <scripts/fill_sample_data.sql 
cp tests/data/quiz.db tests/data/quiz.db.backup
npm run test