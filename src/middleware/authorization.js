import { checkFormat } from "../utils/validation/validatior.js";


export const authorization = async (req, res, next) => {
  try {
    const userTokenId = req.decodedToken.userKey;
    const userKey = checkFormat(req.params.userKey);
    if (!userKey) {
      return res.status(400).send({ status: false, message: 'Not authorized' });
    }

    if (userTokenId !== userKey) {
      return res.status(403).send({ status: false, message: 'You are not authorized' });
    }

    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

