import express from "express";
import { createAuthor } from "../controllers/createAuthor.js";

const router = express.Router();
//test router----
router.get('/test', function (req, res) {
    res.send('hello world')
})


//CreateAuthor router  ---------------------------------------------------
router.post('/createAuther',createAuthor)




export default router;