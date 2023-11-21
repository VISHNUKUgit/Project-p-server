const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then((res)=>{
    console.log(`Mongo-DB atla is connected with Server-PP:${res}`);
}).catch((err)=>{
    console.log(`Connection error:${err}`);
})
