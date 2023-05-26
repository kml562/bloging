import express from "express";
import { createBlog, deleteBlog, deleteBlogByFilter, getBlogs } from "../controllers/blogController.js";
const router = express.Router();


//test router
router.get('/test', function (req, res) { 
    res.send({ message:"test api"})
})


router.post('/createBlog', createBlog)
router.get('/getBlogs',getBlogs)

// Delete Blog using query params
router.delete('/deleteBlogs',deleteBlog)
router.delete('/deleteBlogByFilter/authorId',deleteBlogByFilter)



export default router;