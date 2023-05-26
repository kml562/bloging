import AuthorModel from "../models/authorModel.js";
import { loopmethod, toLowercase } from "../utils/validation/functionval.js";
import { isValid, isValidEmail, isValidName, isValidPassword } from "../utils/validation/validatior.js";

export const createAuthor = async (req, res) => {
  try {
    let Data = req.body;
    const { fname, lname, title, email, password } = Data;

    //first name----------------------------------------------------------------------
    if (!fname) return res.status(404).json({ status: false, message: 'please enter the first name' });
    if (!isValidName(fname) && !isValid(fname)) return res.status(404).json({ status: false, message: 'please enter the valid first name' });

    //last name--------------------------------------------------------------------
    if (!lname) return res.status(404).json({ status: false, message: 'please enter the last name' })
    if (!isValidName(lname) && !isValid(lname)) return res.status(404).json({ status: false, message: 'please enter the valid last name' });
    //title---------------------------------------------------------------------------
    if (!title) return res.status(404).json({ status: false, message: 'please enter the title' });
    if (!isValidName(title) && !isValid(title)) return res.status(404).json({ status: false, message: 'please enter the valid title' });


    //email----------------------------------------------------------------------
    if (!email) return res.status(404).json({ status: false, message: 'please enter the email' });
    if (!isValidEmail(email) && !isValid(email)) return res.status(404).json({ status: false, message: 'please enter the valid email' });
    let val = toLowercase(email.trim());
    Data.email = val;
    //password----------------------------------------------------------------------------
    if (!password) return res.status(404).json({ status: false, message: 'please enter the password' });
    if (!isValidPassword(password) && !isValid(password)) return res.status(404).json({ status: false, message: 'please enter the valid password' });

    Data = loopmethod(Data)  //triming all the strings;-----------------------------------
    // find the email is exits in userbase or not;---------------------------------
    let findData = await AuthorModel.findOne({ email: Data.email })
    if (findData) {
      return res.status(401).json({ status: false, message: "email already exists in database" });
    }
    const saveData = await AuthorModel.create(Data);
    res.status(201).json({ status: true, Data: saveData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: error.message });
  }
};

export const getuser = async (req, res) => {
  try {
    let Data = await AuthorModel.find();
    res.status(200).json({ status: true, message: Data });


  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}