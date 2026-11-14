import mongoose from 'mongoose'
import config from './config.js'


const connectDB = async () => {
    try{

        await mongoose.connect(config.MONGODB_URL)

        console.log("database connected")

    }catch(err){
        console.log(`error from database : ${err}`)
    }
}

export default connectDB;