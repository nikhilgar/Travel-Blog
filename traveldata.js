const mongoose = require('mongoose');


const travelSchema = new mongoose.Schema({
    "place":{
        type:String,
        trim:true,
    },
    "price":{
      type:Number,
      min:1000
    },
    "description":{
        type:String,
        trim:true
    },
    "image":{
        type:String,
        trim:true
    },
    "city":{
        type:String,
        trim:true,
    }
})


const TravelData = mongoose.model('TravelData',travelSchema);

module.exports=TravelData;
