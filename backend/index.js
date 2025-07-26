// backend/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const router = require('./router/generateRouter');
console.log('generateRouter:', router, typeof router);
const authRouter = require('./router/authRouter');
console.log('authRouter:', authRouter, typeof authRouter);
const sessionRouter = require('./router/sessionRouter');
console.log('sessionRouter:', sessionRouter, typeof sessionRouter);
const llmRouter = require('./router/llmRouter');
console.log('llmRouter:', llmRouter, typeof llmRouter);

connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors()); // Allows our React app to make requests to this server
app.use(express.json()); // Allows server to accept JSON in request bodies

// Register API routes
app.use('/api', router);
app.use('/api/auth', authRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/llm', llmRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});