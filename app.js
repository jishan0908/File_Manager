//requiring all the necessary packages for developing the application
require('dotenv/config');//all the environment variables should be defined at .env file at the root directory
const chalk=require('chalk');
const fs=require('fs');
const path=require('path')

const mongoose=require('mongoose');
const express=require('express');
const fileRoutes=require('./routes/fileRoutes')
//------------------------------------------------------------------



const app=express();

    try{
    /*
      Initially all the important env variables are chekced.
      dbURI=URL of my cloud based mongoDB along with username amd password
      DOWNLOAD_FOLDER is an env variable which should defined in .env file before the command npm start,
      it will be used as repository for writing the image streams from mongoDB database,
      Similarly FOLDER,another env variable,should be predefined in .env file,when
      any user uploads a file,the file itself stored here before copying the binary to mongoDB
      IF ANY OF THE ENV VARIABLES are missing the process execution will be stoped with an exit code
      IF ALL ENV VARIABLES ARE DEFINED "FOLDER" is created mongodb will be connected and given PORT
      and server will start listening
    */  
    if(process.env.dbURI==undefined || process.env.DOWNLOAD_FOLDER==undefined ||process.env.FOLDER==undefined){   
     console.log(chalk.blue.inverse('Please define dbURI,DOWNLOAD_FOLDER and FOLDER in .env first'));   
     process.exit();
     
    }
    else{
      
    let connectDB=async()=>{ 
      
      await mongoose.connect(process.env.dbURI);     
      app.listen(process.env.PORT); 
      if(!fs.existsSync(process.env.FOLDER)){
        fs.mkdirSync(path.join(__dirname,process.env.FOLDER), { recursive: true });
      }
      console.log(chalk.green.inverse(`Atlas Mongodb connected at port ${process.env.PORT}`))
    }
    connectDB(); 
    }
    
    }catch(err){
     console.log(chalk.red.inverse('Error occured at initial setup'),err);   
      return err;
    }    

/*
register view engine 
we will be using embedded javascript EJS in the front end*/

app.set('view engine','ejs')//application settings
//****************** */

app.use(fileRoutes);//all the routes regarding files are stored here

//NOt found 404 case
app.use((req,res)=>{// This middlewire will be executed when a request URL is undefined
    
        //res.status(403).sendFile('./views/404.html',{root:__dirname});
        res.status(403).render('404');
})
    
 
  


