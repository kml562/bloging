import BlogModel from '../models/blogModel.js'
import { isValidObjectId } from 'mongoose';
import { isValid, isValidarr } from '../utils/validation/validatior.js';
import moment from "moment";

///////////////////////////////////////////////////////////////////////////////////////
export const createBlog = async function(req, res){
    try {
        let blogData = req.body
      let authorId = blogData.authorId.toString();
        
            if(isValid(authorId)){
              return res.status(400).json({ status: false, messsage: "Please provide authorId" });
            }
            if(!isValidObjectId(authorId)){
              return res.status(404).json({ status: false, messsage: "please provide valid authorId" });
      }
      const getData = await BlogModel.create(blogData);
      res.status(201).json({ status: true, messsage: getData });
        
    } catch (error) {
      res.status(500).json({ status: false, messsage: error.message });
    }
}



export const getBlogs = async function(req, res){
    try{
      const getData = req.query
      const { authorId, category, tags, subcategory } = getData;
      if(!authorId && !isValidObjectId(authorId)){
          res.status(400).send({ status:false, msg:"Invalid authorId"})
      }
      getData["isDeleted"]= false
      getData["isPublished"] = true
      let blog = await BlogModel.find({ ...getData}).populate("authorId")
      if(blog.length == 0){
        res.status(400).send({ status:false, msg: "data not found"})
      }

    }
    let blog = await BlogModel.find({
      $and: [data, { isDeleted: false }, { isPublished: true }],
    }).populate("authorId")
    if (blog.length === 0) {
      res.status(404).json({ status: false, messsage: "data not found" });
    }
    res.status(200).json({ status: true, data: blog })
  }
  catch (err) {
    res.status(500).json({ status: false, messsage: err.message });
  }
    
};
////////////////////////////////////////////////////////////////      ////////////////////////////////

export const updateBlog = async (req, res) => {
  try {
    let blogId = req.params.blogId;
    let data = req.body;
    let date = moment().format();
    let filter = { isDeleted: false };
    const {isDeleted,isPublished,title,body,tags,subcategory } = data;
    let getData = await BlogModel.findById({ _id: blogId });

    if (!getData) {
      return res.status(400).json({ status: false, messsage: "Invalid BlogId" });
    }

    if (isDeleted) {
      return res
      .status(404)
      .json({ status: false, message: "Unable to find blog" });

    } else {
        if (!isPublished || isPublished) {
          if (isValid(title)) {
            filter.title = data.title;
          }
          if (isValid(body)) {
            filter.body = data.body;
          }
          if (isValidarr(tags)) {
            filter.tags = getData.tags.concat(data.tags);
          }
          if (isValid(subcategory)) {
            filter.subcategory = getData.subcategory.concat(data.subcategory);
          }
  
          filter.isPublished = true;
          filter.publishedAt = date;
        }
  
        let updatedData = await BlogModel.findByIdAndUpdate(
          { _id: blogId },
          filter,
          { new: true }
        );
  
        return res
          .status(200)
          .json({ status: true, message: "updated successfully", data: updatedData });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};



///////////////////////////////////////////////////////////////////////////////////////
export const deleteBlog = async function (req, res) {
  try {
    const condition = req.query;
    if (!condition)
      return res
        .status(404)
        .send({ statu: false, message: "Please provide condition" });
    const data = await BlogModel.findOneAndUpdate(
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


export const deleteBlogByFilter = async function (req, res) {
  try {
      const ReqData = req.query;

      //====performing deletion operation=======
      const DeleteBlog = await BlogModel.updateMany(
          { ...ReqData, isPublished: false, isDeleted: false },
          { $set: { isDeleted: true } },
          { new: true }
      );

      if (DeleteBlog.matchedCount == 0) {//matchedCount is nothing but one of the return key of updateMany query
          return res.status(404).send({ status: false, msg: "Data  Already Deleted or Not Found !!" });
      };
      res.status(200).send({ status: true, msg: "Data Deleted Sucessfully !!" });
  } catch (err) {
      res.status(500).send({ status: false, msg: err.message });
  }
};