import jwt from "jsonwebtoken";





export const authentication = (req, res, next)=> {
  try {
    //console.log(JWT_SECRET)
    const { JWT_SECRET, JWT_EXPIRY } = process.env;
    if (!req.headers["x-api-key"]) {
      return res
        .status(400)
        .json({ status: false, message: "Token is required" });
    }

    const token = req.headers["x-api-key"];

    jwt.verify(token,JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ status: false, message: "You have no permission" });
      } else {
        req.decodedToken = decodedToken;
        console.log(decodedToken);
        next();
      }
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};



















