import Jwt from "jsonwebtoken";

export const jwttoken=(id,userKey,email)=>{
  try{
    
    const token = Jwt.sign(
        { userId:id.toString(), emailId:email,userKey:userKey },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY  }
      );
      const refreshToken=Jwt.sign(
        { userId:id.toString(), emailId:email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
      );
      return {token,refreshToken}
  }
  catch(error)
    {
        
 return res.status(500).send({status:false,message:error.message})
    }

}
