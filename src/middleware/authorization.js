import { checkFormat } from "../utils/validation/validatior.js";
import BlogModel from "../models/blogModel.js";
import { response } from "express";
import { compareSync } from "bcrypt";

export const authorization = async (req, res, next) => {
  console.log("authorization")
  
  try {
    const userTokenId = req.decodedToken.id;
    
    const userKey = checkFormat(req.params.blogId);
    let data = {
      _id:userKey, isDeleted:false
    }
    let Data = await BlogModel.findOne(data);
    console.log(Data);
    if (!Data) {
     return  res.status(404).json({status:false, message:"blog not exsist"});
    }
    if (!userKey) {
      return res.status(400).send({ status: false, message: 'Not authorized' });
    }
    console.log(userTokenId, Data.authorId.toString());
    if (Data.authorId.toString() !== userTokenId) {
      return res.status(403).send({ status: false, message: 'You are not authorized' });
    }
    console.log("author22")
    req.authorId = userTokenId;
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

