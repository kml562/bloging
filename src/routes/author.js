import express from "express";
import { createAuthor, getAuthor, login } from "../controllers/createAuthor.js";

const router = express.Router();
//test router----
router.get('/test', function (req, res) {
    res.send('hello world')
})


//CreateAuthor router  ---------------------------------------------------
router.post('/createAuther', createAuthor);
router.get('/getUser', getAuthor);


//login user----
router.post('/login', login)





export default router;