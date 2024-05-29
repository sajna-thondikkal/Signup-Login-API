const dotenv = require('dotenv');
const express = require('express');
dotenv.config({path:'./config/config.env'});

const app = express();
const PORT = process.env.PORT || 9000;
const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/errorHandler')
app.use(express.json());
app.use(logger);

// define route for users
const users = require('./routes/users.js');
app.use('/api/v1/users',users);


// define a rout for root URL
app.get('/',(req,res)=>{
    res.send('Hello World...!!');
})

app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} env and on http://localhost:5002 at port ${PORT}`);
});