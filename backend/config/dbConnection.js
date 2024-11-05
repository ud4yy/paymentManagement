const mongoose = require("mongoose");

let isConnected = false; 
//Singleton 
const connectDb = async () => {
    if (isConnected) {
        console.log("Database already connected");
        return;
    }
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        isConnected = true; 
        console.log("Database is connected", connect.connection.host, connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;
