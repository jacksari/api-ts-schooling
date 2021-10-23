import mongoose from "mongoose";
import environment from "./environments/environment";

mongoose.connect(environment.DB.MONGO_DB, {
    
})

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDb connection stablished');
})

connection.on('error', (err) => {
    console.log('Error',err);
    process.exit(0);
})
