const { MongoClient } = require('mongodb');

const url="mongodb://localhost:27017"
const dbName="411630279"
const collectionName="studentslist"

async function showAllData() {
  const client = new MongoClient(url);

  try {
    // 連接 MongoDB
    await client.connect();
    console.log('已連接 MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // 查詢所有資料
    const data = await collection.find({}).toArray();
    if (data.length > 0) {
      console.log(`共找到 ${data.length} 筆資料：`);
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('集合中沒有資料');
    }
  } catch (error) {
    console.error('出現錯誤：', error);
  } finally {
    // 確保關閉連線
    await client.close();
    console.log('已關閉 MongoDB 連線');
  }
}

showAllData();
