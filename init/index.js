const mongoose = require("mongoose");
const initData = require("./data.js");
const Planting = require("../models/plant.js");


require("dotenv").config({ path: "../.env" });


// const MONGO_URL = "mongodb://127.0.0.1:27017/plant";
const MONGO_URL= process.env.MONGODB_ATLAS;


main().then(() =>{
    console.log("connected to DB");
})
.catch((e)=>{
    console.log(e);
})
async function main() {
    await mongoose.connect(MONGO_URL);
}


const initDB = async()=>{
   await Planting.deleteMany({});
   await Planting.insertMany(initData.data);
   console.log("data was initialized");
}

initDB();