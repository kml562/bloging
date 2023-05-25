import express from "express";
import { createAuthor, deleteBlog } from "../controllers/createAuthor.js";
const router = express.Router();

//CreateAuthor router
router.post('/authors', createAuthor)

// delete Blog 
router.delete('/blogs/:blogId', deleteBlog);


export default router;