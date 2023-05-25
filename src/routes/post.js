import express from "express";
import getBlogs, { createBlog } from "../controllers/blogController.js";
const router = express.Router();


//test router
router.get('/test', function (req, res) { 
    res.send({ message:"test api"})
})


router.post('/createBlog', createBlog)
router.get('/getBlogs',getBlogs)



export default router;