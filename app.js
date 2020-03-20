const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth",require('./auth/auth').app);
app.use("/auth",require('./auth/auth').Router);

app.listen(3000,()=>{
    console.log('Server started...');
});