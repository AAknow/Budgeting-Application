// Express.js
const express = require('express');
const app = express();

// Port setup
const PORT = 8080;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`server listening on port ${PORT}`);
})

// Routes
app.get('/', (req, res) => {
      res.send('Hello from the Budgeting Application server!')
})