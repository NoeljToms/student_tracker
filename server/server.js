import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { studentRoutes } from './src/routes/student.js';
import 'dotenv/config';

//Create express connection
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
});

//routes
app.use('/api/students', studentRoutes);

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method) //Logs any api calls
    next()
})


//Connect to MongoDB
const mongoURL = process.env.DATABASE
mongoose.connect(mongoURL);
const database = mongoose.connection;

//Connection message
database.on('error', (error) => {
    console.log("UNABLE TO CONNECT TO DATABASE")
    console.log(error);
});

database.once('connected', () =>{
    console.log("Database connected");
});


