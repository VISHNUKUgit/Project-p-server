//Loads .env file contenst into process.env by default.
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/routes')
require('./DataBase/connection')
// create an express application

const ppServer = express()

ppServer.use(cors()) 
// purpose
ppServer.use(express.json())// application specific middilware
ppServer.use(router)
ppServer.use('/Folder',express.static('./Folder'))
const PORT = (4000 || process.env.PORT)
//Run server app(waiting for to recive api call)
ppServer.listen(PORT,()=>{
    console.log(`ppServer is Started running at Port number ${PORT}`);
})
//http get request resolving to http://localhost:4000/
ppServer.get('/',(request,response)=>{
    response.send(`<h1>ppServer is  Started running at Port number ${PORT}</h1>`)
})
