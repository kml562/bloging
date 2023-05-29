// export const login = async (req, res) => {
//   try {
//     req.body.email = req.body.email.trim();
//     req.body.password = req.body.password.trim();
//     const { email, password } = req.body;
//     const { JWT_SECRET, JWT_EXPIRY } = process.env;

//     // Email validation-------------------------------------------------------------------
//     if (!email.trim())
//       return res
//         .status(404)
//         .json({ status: false, message: "please enter the email" });
//     if (!isValidEmail(email) && !isValid(email))
//       return res
//         .status(404)
//         .json({ status: false, message: "please enter the valid email" });
//     //email = tolowercase(email);
//     let val = toLowercase(email);
//     req.body.email = val;
//     // Password validation--------------------------------------------------------------
//     if (!password.trim())
//       return res
//         .status(404)
//         .json({ status: false, message: "Please enter the password" });
//     if (!isValidPassword(password))
//       return res
//         .status(404)
//         .json({ status: false, message: "Please enter a valid password" });
//     //console.log(email);
//     const author = await AuthorModel.findOne({ email });

//     if (!author)
//       return res
//         .status(401)
//         .json({ status: false, message: "You are not registered" });

//     console.log(author.password);
//     bcrypt.compare(password, author.password, function (err, res) {
//       if (err) {
//        return  res.status(401).json({ status: false, message: "bad request" });
//       }
//       if (res) {
//         const token = jwt.sign({ id: author._id }, JWT_SECRET, {
//           expiresIn: JWT_EXPIRY,
//         });

//         res.status(200).json({ status: true, data: { token } });
//       } else {
//         // response is OutgoingMessage object that server response http request
//         return res.status(401).json({ success: false, message: "passwords do not match" });
      
//       }
//     });
//   } catch (error) {
//     //console.log(error);
//     res.status(500).json({ status: false, message: "An error occurred" });
//   }
// };
