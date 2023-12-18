import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import mongoose from "mongoose";

import commentController from "./controllers/commentController";
import articleController from "./controllers/articleController";


dotenv.config();

const DBaddress = process.env.address;

mongoose.connect(DBaddress || '');
const database = mongoose.connection;

database.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app: Express = express();

app.use(cors({
    origin: ['http://localhost:3006']
}));
app.use(bodyParser.json());

app.use('/', commentController);
app.use('/', articleController);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(3000, () => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});
