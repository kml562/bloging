import express from "express";
import {
  createBlog,
  deleteBlog,
  deleteBlogByFilter,
  deleteBlogbyID,
  getblogdata,
  updateBlog,
} from "../controllers/blogController.js";
import { authentication } from "../middleware/authentication.js";
import { authorization } from "../middleware/authorization.js";
const router = express.Router();

//test router
router.get("/test", function (req, res) {
  res.send({ message: "test api" });
});

router.post("/createBlog", createBlog);
// router.get('/getallBlog',  getblogdata)
router.get("/getBlogs", getblogdata);
//with authentication and authorization---------;
//update blog--------------------------------------------------------------------
router.put("/blogs/:blogId", authentication,authorization ,updateBlog);
// Delete Blog using query params
router.delete("/blogs/:blogId",authentication,authorization ,deleteBlogbyID);
//delete query params--------------------------------------------------------------------
router.delete('/blogs',authentication,authorization,deleteBlog)

//router.delete("/deleteBlogs", deleteBlog);
router.delete("/deleteBlogByFilter/authorId",authentication, authorization,deleteBlogByFilter);

export default router;
