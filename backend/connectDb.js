
const mongoose = require('mongoose');
const { ENV_VARS } = require('./config/envVar.js');

const connectToMongo = async () => {
    try {
        const mongoURI = ENV_VARS.MONGODB_URI;
        
        if (!mongoURI) {
            console.error('MONGODB_URI is not defined in environment variables');
            console.error('Please check your .env file contains MONGODB_URI');
            process.exit(1);
        }

        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB Successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
}

module.exports = connectToMongo;
