// Express.js
const express = require('express');
const app = express();

// Routes
const userRouter = require("./routes/userRouter"); 
const financeRouter = require("./routes/financeRouter"); 
const indexRouter = require("./routes/indexRouter");

app.use("/user", userRouter); 
app.use("/finance", financeRouter); 
app.use("/", indexRouter); 

// Port Listener
const PORT = 8080;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`server listening on port ${PORT}`);
})