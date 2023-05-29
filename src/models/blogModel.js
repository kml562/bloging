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
    subcategory: [
        {
          type: String,
        },
      ],

    isDeleted: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: Date,
    deletedAt: Date,
  },
  { timestamps: true }
);

const blogModel = model("blogModel", blogSchema);
export default blogModel;
