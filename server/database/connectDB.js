import mongoose from "mongoose"
import "dotenv/config";


const URL_DB = process.env.MONGODB_URL;

const connectToDB = async () => {

  try {
    await mongoose.connect(URL_DB);
    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.log(error);
  }
 

}

export default connectToDB