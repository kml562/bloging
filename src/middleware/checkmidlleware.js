import { isValidEmail, isValidName, isValidPassword } from "../validation/validatior.js";

export const checkcrad = (req, res, next) => {
    try {
        let data = req.body;
        const { fname, lname, title, email, password } = data;
        if (!fname || !lname || !title || !email || !password) {
            return res.status(404).json({ status: false, message: "please enter all the required fields" })
        }
        if (!isValidName(fname)||!isValidName(lname) || !isValidEmail(email) || !isValidPassword(password)) {
            return res.status(404).json({ status: false, message: "fill right information" })
        }
        next();
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
};

