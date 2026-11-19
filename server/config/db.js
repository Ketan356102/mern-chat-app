const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect( process.env.MONGODB_URI);
        console.log(`\n MongoDB connected ! DB HOST ${connectionInstance.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.bold);
        process.exit(1);
    }
}

module.exports = connectDB;