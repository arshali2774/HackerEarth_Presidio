import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDB } from './src/config/db.config.js';
import UserModel from './src/models/user/user.schema.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable all cors requests
app.use(cors());

// Define port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectToDB();
});
