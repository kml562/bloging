import express from "express";
import { createAuthor } from "../controllers/createAuthor.js";
import { checkcrad } from "../middleware/checkmidlleware.js";
const router = express.Router();
//test router----
router.get('/test', function (req, res) {
    res.send('hello world')
})


//CreateAuthor router
router.post('/createAuther',checkcrad ,createAuthor)



export default router;