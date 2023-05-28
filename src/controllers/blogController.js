import BlogModel from "../models/blogModel.js";
import { isValidObjectId } from "mongoose";
import { isValid, isValidarr } from "../utils/validation/validatior.js";
import moment from "moment";

//==create Blog ----------------------------------------------------------------------->>>>>>>>>>
export const createBlog = async function (req, res) {
  try {
    let blogData = req.body;
    let authorId = blogData.authorId.toString();

    if (isValid(authorId)) {
      return res
        .status(400)
        .json({ status: false, messsage: "Please provide authorId" });
    }
    if (!isValidObjectId(authorId)) {
      return res
        .status(404)
        .json({ status: false, messsage: "please provide valid authorId" });
    }
    const getData = await BlogModel.create(blogData);
    res.status(201).json({ status: true, messsage: getData });
  } catch (error) {
    res.status(500).json({ status: false, messsage: error.message });
  }
};
//get blog data ----------------------------------------------------------------------->>>>>>>>>>>
export const getBlogs = async function (req, res) {
  try {
    const getData = req.query;
    const { authorId, category, tags, subcategory } = getData;
    if (!authorId && !isValidObjectId(authorId)) {
      res.status(400).send({ status: false, msg: "Invalid authorId" });
    }
    getData["isDeleted"] = false;
    getData["isPublished"] = true;

    let blog = await BlogModel.find({
      $and: [data, { isDeleted: false }, { isPublished: true }],
    }).populate("authorId");
    if (blog.length === 0) {
      res.status(404).json({ status: false, messsage: "data not found" });
    }
    res.status(200).json({ status: true, data: blog });
  } catch (err) {
    res.status(500).json({ status: false, messsage: err.message });
  }
};
export const getblogdata = async () => {
  try {
    let filterData = req.query;
    let getData = {
      isDeleted: false,
      isPublished: true,
    };
    const { authorId, category, subcategory } = filterData;
    // if authoriD exist is in query prams-----------------------------------------------------------
    if (authorId) {
      getData.authorId = authorId;
    }
    // if any category exist is in query prams---------------------------------------------------------
    if (category) {
      getData.category = category;
    }
    // List of blogs that have a specific tag exist is in query prams-----------------------------------
    if (tags) {
      getData.tags = { $in: tags };
    } //using $in to check inside the array--
    // List of blogs that have a specific subcategory exist is in query prams--------------------------
    if (subcategory) {
      getData.subcategory = { $in: subcategory };
    } //using $in to check inside the array-

    let findData = await BlogModel.find(getData);
    if (findData.length === 0) {
      return res.status(404).json({ status: false, message: "No blog found" });
    }
    res
      .status(200)
      .json({
        status: true,
        message: "Blog updated successfully",
        data: findData,
      });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// update Blog---------------------------------------------------------------------------------

export const updateBlog = async (req, res) => {
  try {
    let blogId = req.params.blogId;
    let data = req.body;
    let date = moment().format();
    let filter = { isDeleted: false };
    const { isDeleted, isPublished, title, body, tags, subcategory } = data;
    let getData = await BlogModel.findById({ _id: blogId });

    if (!getData) {
      return res
        .status(400)
        .json({ status: false, messsage: "Invalid BlogId" });
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

      return res.status(200).json({
        status: true,
        message: "updated successfully",
        data: updatedData,
      });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// delete blog----------------------------------------------------------------------------->>>>>>>
export const deleteBlog = async function (req, res) {
  try {
    const condition = req.query;
    if (!condition)
      return res
        .status(404)
        .send({ statu: false, message: "Please provide condition" });
    const data = await BlogModel.findOneAndUpdate(
      condition,
      {
        isDeleted: true,
        deletedAt: new Date.now(),
      }, //when we are deleting something in our database then this key will created
      { new: true, upsert: true }
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

    //====performing deletion operation========================================================
    const DeleteBlog = await BlogModel.updateMany(
      { ...ReqData, isPublished: false, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: new Date.now() } },
      { new: true, upsert: true }
    );

    if (DeleteBlog.matchedCount == 0) {
      //matchedCount is nothing but one of the return key of updateMany query====================
      return res
        .status(404)
        .send({ status: false, msg: "Data  Already Deleted or Not Found !!" });
    }
    res.status(200).send({ status: true, msg: "Data Deleted Sucessfully !!" });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};
