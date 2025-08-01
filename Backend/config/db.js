import mongoose from "mongoose";
import Grid from "gridfs-stream";

let gfs, gridfsBucket;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connected: ${conn.connection.host}`);

    // initializing gridfs bucket
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.connection.db, {
      bucketName: process.env.BUCKET_NAME
    })

    gfs = Grid(conn.connection.db, mongoose.mongo);
    gfs.collection(process.env.BUCKET_NAME)

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// getter 4 gfs and bucket for safety
export const getgfs = () => gfs;
export const getbucket = () => gridfsBucket;


/*
 useNewUrlParser, useUnifiedTopology should be set by default
*/