import AuthorModel from "../models/authorModel.js";
import { isValidName } from "../utils/validation/validatior.js";

export const createAuthor = async (req, res) => {
  try {
    let Data = req.body;
    const { fname, lname, title, email, password } = Data;
    if (!fname)
      return res
        .status(404)
        .json({ status: false, message: "please enter first name" });
    if (!isValidName(fname))
      return res
        .status(404)
        .json({ status: false, message: "please enter the valid first name" });
    if (!fname || !lname || !title || !email || !password) {
      return res
        .status(404)
        .json({
          status: false,
          message: "please enter all the required fields",
        });
    }
    if (
      !isValidName(fname) ||
      !isValidName(lname) ||
      !isValidEmail(email) ||
      !isValidPassword(password)
    ) {
      return res
        .status(404)
        .json({ status: false, message: "fill right information" });
    }
    const saveData = await AuthorModel.create(Data);
    if (!saveData) {
      return res
        .status(401)
        .json({ status: false, message: "user already exists" });
    }
    res.status(201).json({ status: true, Data: saveData });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
