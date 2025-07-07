
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from the .env file in the backend directory
dotenv.config({ path: path.join(__dirname, '../.env') });

// Also try loading from the root directory as a fallback
if (!process.env.MONGODB_URI) {
    dotenv.config({ path: path.join(__dirname, '../../.env') });
}

const ENV_VARS = {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME
};

// Debug logging to help identify missing variables
console.log('Environment variables loaded:');
console.log('MONGODB_URI:', ENV_VARS.MONGODB_URI ? 'Found' : 'Missing');
console.log('JWT_SECRET:', ENV_VARS.JWT_SECRET ? 'Found' : 'Missing');
console.log('GEMINI_API_KEY:', ENV_VARS.GEMINI_API_KEY ? 'Found' : 'Missing');

module.exports = { ENV_VARS };
