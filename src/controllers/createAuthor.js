import AuthorModel from "../models/authorModel.js";
import { loopmethod, toLowercase } from "../utils/validation/functionval.js";
import {
  isValid,
  isValidEmail,
  isValidName,
  isValidPassword,
} from "../utils/validation/validatior.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const createAuthor = async (req, res) => {
  try {
    let Data = req.body;
    const { fname, lname, title, email, password } = Data;
 //first name------------------------------------------------------------------------------------------>>>
    if (!fname.trim())
      return res.status(404).json({ error: "please enter the first name" });
    if (!isValidName(fname) && !isValid(fname))
      return res
        .status(404)
        .json({ error: "please enter the valid first name" });

    //last name----------------------------------------------------------------------------------->>>>>
    if (!lname.trim())
      return res.status(404).json({ error: "please enter the last name" });
    if (!isValidName(lname) && !isValid(lname))
      return res
        .status(404)
        .json({ error: "please enter the valid last name" });
    //title----------------------------------------------------------------------------------------->>>>>
    if (!title.trim())
      return res.status(404).json({ error: "please enter the title" });
    if (!isValidName(title) && !isValid(title))
      return res.status(404).json({ error: "please enter the valid title" });

    //email------------------------------------------------------------------------------------------>>>
    if (!email.trim())
      return res.status(404).json({ error: "please enter the email" });
    if (!isValidEmail(email) && !isValid(email))
      return res.status(404).json({ error: "please enter the valid email" });
    //email = tolowercase(email);
    let val = toLowercase(email);
    Data.email = val;
    //password--------------------------------------------------------------------------------------->>>>>
    if (!password.trim())
      return res.status(404).json({ error: "please enter the password" });
    if (!isValidPassword(password) && !isValid(password))
      return res.status(404).json({ error: "please enter the valid password" });

    Data = loopmethod(Data); //triming all the strings;----------------------------------------->>>>>>>>>>
    // find the email is exits in userbase or not;---------------------------------------------->>>>>>>>>>
    let findData = await AuthorModel.findOne({ email: Data.email });
    if (findData) {
      return res
        .status(401)
        .json({ status: false, message: "email already exists in database" });
    }
    //hashing  the password------------------------------------------------------------------->>>>>>>>>>>>
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    Data.password = hashedPassword; // returning the hashed password;
    const saveData = await AuthorModel.create(Data);
    res.status(201).json({ status: true, Data: saveData });
  } catch (error) {
   // console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getuser = async (req, res) => {
  try {
    let Data = await AuthorModel.find();
    res.status(200).json({ status: true, message: Data });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

//loging the user in------------------------------------------------------------>>>>>>>>>>>>>>>>>>>

export const getAuthor = async function (req, res) {
  try {
    const authors = await AuthorModel.find();
    res.status(200).send({ status: true, authors: authors });
  } catch (error) {
    //console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
//-log in---------------------------------------------------------------------------
//----------------------------------------------------------------------------------
export const login = async (req, res) => {
  try {
    req.body.email = req.body.email.trim();
    req.body.password = req.body.password.trim();
    const { email, password } = req.body;
    const { JWT_SECRET, JWT_EXPIRY } = process.env;

    // Email validation-------------------------------------------------------------------
    if (!email.trim())
      return res.status(404).json({ error: "please enter the email" });
    if (!isValidEmail(email) && !isValid(email))
      return res.status(404).json({ error: "please enter the valid email" });
    //email = tolowercase(email);
    let val = toLowercase(email);
    req.body.email = val;
    // Password validation--------------------------------------------------------------
    if (!password.trim())
      return res.status(404).json({ error: "Please enter the password" });
    if (!isValidPassword(password))
      return res.status(404).json({ error: "Please enter a valid password" });
    //console.log(email);
    const author = await AuthorModel.findOne({ email }).select("+password");

    if (!author)
      return res
        .status(500)
        .json({ status: false, message: "You are not registered" });

    const isValidAuthor = bcrypt.compare(password, author.password);

    if (isValidAuthor) {
      const token = jwt.sign({ id: author._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY,
      });

      res.status(200).json({ status: true, data: { token } });
    } else {
      res.status(401).json({ status: false, message: "Invalid password" });
    }
  } catch (error) {
    //console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
