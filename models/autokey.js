const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const autokeySchema=new Schema({
    
    numberSeq:{

        type:Number,
        required:true
    }
});

const Autokey=mongoose.model('Autokey',autokeySchema);

module.exports=Autokey;