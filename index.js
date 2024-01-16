const mongoose = require('mongoose')
const express = require('express');
const body = require('body-parser');
const routes = require('./src/api/Routers/api');
const db = require('./src/config/db');
require('dotenv').config();
const app = express();
const cors = require('cors');


app.use(body.urlencoded({ extended: true }));
app.use(body.json());
app.use(routes);


const appUrl = process.env.APP_URL
const PORT = process.env.PORT;

// Use CORS middleware to allow requests from any origin
app.use(cors({
    origin: 'https://1af9-103-73-181-94.ngrok-free.app', // Replace with the allowed origin
    credentials: true, // Enable cookies and HTTP authentication
  }));
  

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Express server error:', err);
});
