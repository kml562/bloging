import BlogModel from "../models/blogModel.js";
import { isValidObjectId } from "mongoose";
import { isValid, isValidarr } from "../utils/validation/validatior.js";
import moment from "moment";


// publishedAt: {when the blog is published}//----------------------------------------->>>>>>>>>>
//==create Blog ----------------------------------------------------------------------->>>>>>>>>>
export const createBlog = async function (req, res) {
  try {
    let blogData = req.body;
    let authorId = blogData.authorId.toString();

    if (!isValid(authorId)) {
      return res
        .status(400)
        .json({ status: false, messsage: "Please provide authorId" });
    }
    if (!isValidObjectId(authorId)) {
      return res
        .status(400)
        .json({ status: false, messsage: "please provide valid authorId" });
    }

    if (blogData.isPublished) {
      blogData.publishedAt = moment().format();
    }
    if (!blogData.isPublished) {
      delete blogData.publishedAt; // if published data is not published then we didn't publish at
    }
    if (blogData.isDeleted) {
      blogData.isDeleted = false; // while creating the data it's not deleted
    }
    if (blogData.isDeleted) {
      delete blogData.isDeleted;   // while creating the data it's not deleted
    }

    const getData = await BlogModel.create(blogData);
    res.status(201).json({ status: true, messsage: getData });
  } catch (error) {
    res.status(500).json({ status: false, messsage: error.message });
  }
};

//---------------------------------------------------------------------------------------------->>>>>
export const getblogdata = async (req, res) => {
  try {
    let filterData = req.query;
    let getData = {
      isDeleted: false,
      isPublished: true,
    };
    const { authorId, category, subcategory, tags } = filterData;
    // if authoriD exist is in query prams----------------------------------------------------------->>>>>
    if (authorId) {
      getData.authorId = authorId;
    }
    // if any category exist is in query prams--------------------------------------------------------->>>>
    if (category) {
      getData.category = category;
    }
    // List of blogs that have a specific tag exist is in query prams----------------------------------->>>>
    if (tags) {
      getData.tags = { $in: tags };
    } //using $in to check inside the array--
    // List of blogs that have a specific subcategory exist is in query prams------------------------>>>>>>>
    if (subcategory) {
      getData.subcategory = { $in: subcategory };
    } //using $in to check inside the array-
    console.log(getData);
    let findData = await BlogModel.find(getData).populate("authorId");
    if (findData.length === 0) {
      return res.status(404).json({ status: false, message: "No blog found" });
    }
    res.status(200).json({
      status: true,
      message: "Blog updated successfully",
      data: findData,
    });
  } catch (error) {
    // return console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// update Blog---------------------------------------------------------------------------->>>>>>>>>>>>>



export const updateBlog = async (req, res) => {
  try {
    let blogId = req.params.blogId;
    let data = req.body;
    let date = moment().format();
    let filter = { isDeleted: false, authorId:req.authorId };
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
        if (isValidarr(subcategory)) {
          filter.subcategory = getData.subcategory.concat(data.subcategory);
        }

        filter.isPublished = true;
        filter.publishedAt = moment().format("YYYY-MM-DD");
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

//delete blog by id---------------------------------------------------------------------->>>>>>>
export const deleteBlogbyID = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    
    // const authorId= req.authorId
    // const condition = {
    //   blogId, authorId
    // }
    if (!blogId)
      return res
        .status(404)
        .send({ statu: false, message: "Please provide condition" });
    console.log(blogId)
    const data = await BlogModel.findByIdAndUpdate(
      blogId,
      {
        isDeleted: true,
        deletedAt: moment().format(),
      }, //when we are deleting something in our database then this key will created
      { new: true, upsert: true }
    );
    if (!data)
      return res.status(404).json({ status: false, message: "Data not found" });
    res.status(200).json({ status: true, message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// delete blog----------------------------------------------------------------------------->>>>>>>
export const deleteBlog = async function (req, res) {
  try {
    const condition = req.query;
    const { authorId, category, tags, subcategory } = condition;
    let getData = { isDeleted:false}
    if (!condition)
      return res
        .status(404)
        .send({ statu: false, message: "Please provide condition" });
    if (authorId) {
      if (!isValidObjectId(condition.authorId)) {
        return res
          .status(400)
          .json({ status: false, messsage: "please provide valid authorId" });
      }
      if (condition.authorId !== req.authorId) {
        return res
          .status(400)
          .json({ status: false, messsage: "You are not authorized" });
      }
    };
    if (authorId) {
      getData.authorId = authorId;
    }
    if (!authorId) {
      getData.authorId = req.decodedToken.id;
   }
    if (category) {
      getData.category = category;
    }
    // List of blogs that have a specific tag exist is in query prams----------------------------->>>>>>>
    if (tags) {
  getData.tags = { $in: tags };
      //getData.tags = tags;
    } //using $in to check inside the array--
    // List of blogs that have a specific subcategory exist is in query prams--------------------->>>>>>>>
    if (subcategory) {
      getData.subcategory = { $in: subcategory };
    } //using $in to check inside the array-
    

    console.log(getData)



    const data = await BlogModel.updateMany(
      getData,
      {
        isDeleted: true,
        deletedAt: moment().format(),
      } //when we are deleting something in our database then this key will created
    );
    console.log(data);
    if (data.modifiedCount===0)
      return res.status(404).json({ status: false, message: "Data not found" });
    res.status(200).json({ status: true, message: `${data.modifiedCount} Blog deleted` });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

