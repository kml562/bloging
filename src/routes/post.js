import express from "express";
const router = express.Router();

//test router
router.get('/test', function (req, res) { 
    res.send({ message:"test api"})
})



export default router;