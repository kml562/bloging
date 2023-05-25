import blogModel from '../models/blogModel.js'
import { isValidObjectId } from 'mongoose';

export const createBlog = async function(req, res){
    try {
        let blogData = req.body
        let authorId = blogData.authorId
        
            if(!authorId || authorId == ""){
                return res.status(400).send({ status:false, msg: " Please provide authorId"})
            }
            if(!isValidObjectId(authorId)){
                return res.status(404).send({ status:false, msg:"please provide valid authorId"})
            }
            const saveData = await blogModel.create(blogData)
            res.status(201).send({ status:true, msg:saveData})
        
    } catch (error) {
        res.status(500).send({ status:false, msg: error.message})
    }
}


export const getBlogs = async function(req, res){
    try{
        const getData = req.query
        const { authorId, category, tags, subcategory} = getData
        if(authorId && isValidObjectId(authorId)){
            res.status(400).send({ status:false, msg:"Invalid authorId"})
        }
        let blog = await blogModel.find({ ...getData}).populate("authorId")
        if(blog.length == 0){
            res.status(400).send({ status:false, msg: "data not found"})
        }
        res.status(201).send({ status:true, data: blog})
    }
    catch(err){
        res.send({msg: err.message})
    }
    
}




export const deleteBlog = async function (req, res) {
  try {
    const condition = req.query;
    if (!condition)
      return res
        .status(404)
        .json({ statu: false, message: "Please provide condition" });
    const data = await blogModels.findOneAndUpdate(
      condition,
      { isDeleted: true },
      { new: true }
    );
    if (!data)
      return res.status(404).json({ status: false, message: "Data not found" });
    res.status(200).json({ statu: true, message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ statu: false, message: error.message });
  }
};
