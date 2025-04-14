const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI, {
           serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 10s
           socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
           family: 4, // Use IPv4, skip trying IPv6
       });
       console.log("MongoDB connection successful");
    } catch (err) {
        console.error('MongoDB connection failed', err);
        process.exit(1);
    }
}

module.exports = connectToDB;