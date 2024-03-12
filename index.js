const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000


app.use(cors())

//If we want to use req.body then we have to use a middleware:
app.use(express.json())

//Available Routes:
//The API's will at the given route:
app.use('/api/auth', require('./routes/auth'))


app.listen(port, () => {
    console.log(`Node app backend listening at port :  http://localhost:${port}`)
})