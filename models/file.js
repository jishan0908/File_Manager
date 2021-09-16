const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const fileSchema=new Schema({
    uploader_ip:{
        type:String,
        ref:'users',
        required:true
    },
    public_key:{
        type:Number,
        required:true
    },
    file_name:{

        type:String,
        required:true
    },
    file_data:{
        type:Buffer,
        required:true
        
    },
    file_path:{
        type:String,
        required:true
    }
},{timestamps:true});

const File=mongoose.model('File',fileSchema);

module.exports=File;