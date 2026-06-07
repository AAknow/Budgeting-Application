// Express.js
const express = require('express');
const app = express();

// Listening on port 8080
app.listen(8080, () => {
      console.log('server listening on port 8080')
})

// Routes
app.get('/', (req, res) => {
      res.send('Hello from our server!')
})