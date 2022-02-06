const mongoose = require('mongoose')

const connect = async (url) => {
    try{
        await mongoose.connect(url,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true
        }
        );
        console.log("Connect MongoDB successfully");
    }catch{
        console.log("DB connect failed");
    }
};

module.exports = {connect};