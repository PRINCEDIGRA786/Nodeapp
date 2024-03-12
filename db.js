const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/nodeintern"

const connectToMongo = () => {
    mongoose.set('strictQuery', true)
    mongoose.connect(mongoURI).then(() => {
        console.log("Connected to the mongoose")
    })
}

module.exports = connectToMongo;