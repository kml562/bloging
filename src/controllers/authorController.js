import { response } from "express";
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


//create auther-----------------------------------------------------------------------------------
export const createAuthor = async (req, res) => {
  try {
    let Data = req.body;
    Data = loopmethod(Data); //triming all the strings;----------------------------------------->>>>>>>>>>
    const { fname, lname, title, email, password } = Data;
    //first name------------------------------------------------------------------------------------------>>>
    if (!fname.trim())
      return res
        .status(404)
        .json({ status: false, message: "please enter the first name" });
    if (!isValidName(fname))
      return res
        .status(404)
        .json({ status: false, message: "please enter the valid first name" });

    //last name----------------------------------------------------------------------------------->>>>>
    if (!lname.trim())
      return res
        .status(404)
        .json({ status: false, message: "please enter the last name" });
    if (!isValidName(lname))
      return res
        .status(404)
        .json({ status: false, message: "please enter the valid last name" });
    //title----------------------------------------------------------------------------------------->>>>>
    if (!title.trim())
      return res
        .status(404)
        .json({ status: false, message: "please enter the title" });
    if (!isValidName(title))
      return res
        .status(404)
        .json({ status: false, message: "please enter the valid title" });

    //email------------------------------------------------------------------------------------------>>>
    if (!email.trim())
      return res
        .status(404)
        .json({ status: false, message: "please enter the email" });
    if (!isValidEmail(email))
      return res
        .status(404)
        .json({ status: false, message: "please enter the valid email" });
    //email = tolowercase(email);
    let val = toLowercase(email);
    Data.email = val;
    //password--------------------------------------------------------------------------------------->>>>>
    if (!password.trim())
      return res
        .status(404)
        .json({ status: false, message: "please enter the password" });
    if (!isValidPassword(password))
      return res
        .status(404)
        .json({ status: false, message: "please enter the valid password" });

    
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
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};
//-log in---------------------------------------------------------------------------
//----------------------------------------------------------------------------------

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const { JWT_SECRET, JWT_EXPIRY } = process.env;

    // Trim email and password
    email = email.trim();
    password = password.trim();

    // Email validation
    if (!email) {
      return res.status(404).json({ status: false, message: 'Please enter the email' });
    }
    if (!isValidEmail(email)) {
      return res.status(404).json({ status: false, message: 'Please enter a valid email' });
    }
    
    // Convert email to lowercase
    email = email.toLowerCase();

    // Password validation
    if (!password) {
      return res.status(404).json({ status: false, message: 'Please enter the password' });
    }
    if (!isValidPassword(password)) {
      return res.status(404).json({ status: false, message: 'Please enter a valid password' });
    }

    const author = await AuthorModel.findOne({ email });

    if (!author) {
      return res.status(401).json({ status: false, message: 'You are not registered' });
    }

    bcrypt.compare(password, author.password, function (err, passwordMatch) {
      if (err || !passwordMatch) {
        return res.status(401).json({ status: false, message: 'Passwords do not match' });
      }

      const token = jwt.sign({ id: author._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY,
      });

      res.status(200).json({ status: true, data: { token } });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'An error occurred' });
  }
};
