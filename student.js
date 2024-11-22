const fs =require('fs')
const csv=require('csv-parser')
const { MongoClient }= require('mongodb')

const url="mongodb://localhost:27017"
const dbName="411630279"
const collectionName="studentslist"

const csvFilePath = 'studentslist.csv'; // 請將此改為你的 CSV 路徑

async function insertCsvDataToMongo() {
  const client = new MongoClient(url);

  try {
    // 連接 MongoDB
    await client.connect();
    console.log('已連接 MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // 讀取 CSV 並插入 MongoDB
    const dataToInsert = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        dataToInsert.push(row); // 收集資料
      })
      .on('end', async () => {
        if (dataToInsert.length > 0) {
          const result = await collection.insertMany(dataToInsert);
          console.log(`${result.insertedCount} 筆資料已成功插入`);
        } else {
          console.log('沒有資料需要插入');
        }
        await client.close(); // 關閉連線
      });
  } catch (error) {
    console.error('出現錯誤：', error);
    await client.close(); // 確保即使發生錯誤也關閉連線
  }
}

insertCsvDataToMongo();