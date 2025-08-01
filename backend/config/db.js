const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


// Connect to MongoDB
const connectDB = async()=>{
  try{
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  }catch(err){
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit the process with failure
}
};


module.exports = connectDB;