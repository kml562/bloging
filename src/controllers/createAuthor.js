import AuthorModel from "../models/authorModel.js";

export const createAuthor = async (req, res) => {
  try {
    const Data = req.body;
    const saveData = await AuthorModel.create(Data);
    if (!saveData) {
     return  res.status(401).json({status:false, message:"user already exists"})
    }
    res.status(201).json({ status: true, Data: saveData });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
