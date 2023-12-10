const mongoose = require('mongoose')     //importing mongoose

mongoose.connect('mongodb://127.0.0.1:27017/fitzonex',{useNewUrlParser:true})  //connection string

//model-model name must be singular of collection name and first letter must be uppercase

const User = mongoose.model('User',
    {
        username: String,
        name: String,
        password: String,
        age: Number,
        gender: String,
        height: Number,
        weight: Number,
        fitnesstracking: []


    }

)

//export 
module.exports={
    User
}