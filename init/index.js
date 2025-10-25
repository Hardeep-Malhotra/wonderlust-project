const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected to Db")
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}


const initDB = async () => {
  await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "68f5b0a2aa7973faa6a5c3b5"}));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};

main().then(() => {
  console.log("connected to Db");
  initDB(); // yahi se call karo
});
