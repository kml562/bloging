import express from "express";
import { createAuthor } from "../controllers/createAuthor.js";
const router = express.Router();

//CreateAuthor router
router.post('/createAuthor', createAuthor)



export default router;