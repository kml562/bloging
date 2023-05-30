import express from "express";
import authorRouter from './src/routes/author.js'
import postRouter from './src/routes/post.js'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//routing middleware -- mounting-

app.use("/", authorRouter)

app.use("/", postRouter)

export default app;