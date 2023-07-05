import express from 'express';
import dotenv from 'dotenv';
import { connection } from './database/db.js';
import defaultData from './default.js';
import Routes from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/',Routes);

dotenv.config();
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

connection(USERNAME,PASSWORD);

defaultData();

app.listen(5000,()=>{
    console.log("server is running at port 5000");
})