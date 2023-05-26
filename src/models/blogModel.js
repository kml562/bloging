import mongoose from "mongoose";
const objectId = mongoose.Schema.Types.ObjectId;
const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    body: {
      type: String,
      require: true,
    },
    authorId: {
      type: objectId,
      ref: "authorModel",
      require: true,
      isValid: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      require: true,
    },
    subcategory: mongoose.Schema.Types.Mixed,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: mongoose.Schema.Types.Mixed,
      default: " ",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: mongoose.Schema.Types.Mixed,
      default: " ",
    },
  },
  { timestamps: true }
);

const blogModel = model("blogModel", blogSchema);
export default blogModel;
