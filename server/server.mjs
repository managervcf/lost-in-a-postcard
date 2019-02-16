// Import statements
import express from 'express';

// Variable declarations
const port = process.env.PORT || 4000;

// Create express app
const app = express();

// Routes
app.get('/', (req, res) => res.send('Hello World'));

// Setup app to listen on variable 'port'
app.listen(port, () => console.log('Server is running...'));
