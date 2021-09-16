const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    user_ip:{
        type:String,
        required:true
    },
    user_upload_limit:{
        type:Number,
        default:3
    },
    
    user_download_limit:{
        type:Number,
        default:3
    }
},{timestamps:true});

const User=mongoose.model('User',userSchema);

module.exports=User;