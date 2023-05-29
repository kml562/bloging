import app from "./app.js";
import * as dotenv from "dotenv";
dotenv.config();
import { startserver } from "./src/db/mongoose.js";
const { PORT, URL } = process.env;   

startserver(app,PORT,URL)