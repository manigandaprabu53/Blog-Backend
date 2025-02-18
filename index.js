import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import appRoutes from "./src/Routes/index.js"


const app = express();

app.use(cors());
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb'}))
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}))

app.use(appRoutes);

app.listen(process.env.PORT, ()=>console.log(`App is running on port ${process.env.PORT}`));
