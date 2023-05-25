import authorModel from "../models/authorModel.js";

export const createAuthor = async (req, res) => {
  try {
    const data = req.body;
    const saveData = await authorModel.create(data);
    res.status(200).json({ status: true, Data: saveData });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
