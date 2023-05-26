import BlogModel from '../models/blogModel.js'
import { isValidObjectId } from 'mongoose';
import { isValid } from '../utils/validation/validatior.js';

// Controller for create blog
export const createBlog = async function (req, res) {
  try {
    let blogData = req.body
    let authorId = blogData.authorId.toString();

    if (!isValid(authorId)) {
      return res.status(400).send({ status: false, message: "Please provide authorId" });
    }
    if (!isValidObjectId(authorId)) {
      return res.status(404).send({ status: false, message: "please provide valid authorId" });
    }

    if(blogData.isPublished == true) { blogData.publishedAt = new Date(); }

    const saveData = await BlogModel.create(blogData);
    res.status(201).send({ status: true, message: saveData });

  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}


// Controller for get blog
export const getBlogs = async function (req, res) {
  try {
    const getData = req.query
    const { authorId, category, tags, subcategory } = getData;

    if (!authorId && !isValidObjectId(authorId)) {
      res.status(400).send({ status: false, message: "Invalid authorId" })
    }

    let blog = await BlogModel.find({ ...getData }).populate("authorId")

    if (blog.length === 0) {
      res.status(400).send({ status: false, message: "data not found" })
    }

    res.status(201).send({ status: true, data: blog })
    
  }
  catch (err) {
    res.send({ message: err.message })
  }

}


// Controller for delete blog from query params
export const deleteBlog = async function (req, res) {
  try {
    const condition = req.query;
    if (!condition){
      res.status(404).json({ statu: false, message: "Please provide condition" });
    }
    const data = await BlogModel.updateMany(condition, { isDeleted: true, deletedAt: new Date()},{new: true});
    if (data.length === 0) {
      res.status(404).json({ status: false, message: "Data not found" });
    }
    
    res.status(200).json({ statu: true, message: "Blog deleted successfully",Data: data});
  } catch (error) {
    res.status(500).json({ statu: false, message: error.message });
  }
};
