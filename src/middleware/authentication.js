import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const Secretkey = process.env.JWT_JWT_SECRET;

export const authentication = async (req, res, next) => {
  try {
    if (!req.headers.x-api-key) {
      return res.status(400).send({ status: false, message: "Token is required" });
    }
    const token = req.headers.x-api-key.split(" ")[1];

    jwt.verify(token, Secretkey, (err, decodedToken) => {
      if (err) {
        return res.status(400).send({ status: false, message: "You have no permission" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};




