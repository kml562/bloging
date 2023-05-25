import authorModel from "../models/authorModel.js";
import blogModel from "../models/blogModel.js";

export const createAuthor = async (req, res) => {
  try {
    const data = req.body;
    const saveData = await authorModel.create(data);
    res.status(200).json({ status: true, Data: saveData });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const deleteBlog = async (req,res)=> {
  try {
    const id = req.params.blogId;
    const blogData = await blogModel.find({_id: id});
    if (blogData) {
      const newBlogData = await blogModel.updateOne({_id: id}, {
          $set: {
            isDeleted: true,
            deletedAt: new Date()
          }
        }
      )
      res.status(200).json({newBlogData})
    } 
    else {
      res.status(404).json({ status: false, message: "Blog not present" })
    }

  } catch(err) {
    res.status(500).json({ status: false, message: err.message });
  }
}