const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema=new Schema({
    title: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    },
    
    timestamp:{
        type:String,
        default:Date.now()
    }

})
    const lists=mongoose.model("lists",listSchema);
    module.exports = lists;



