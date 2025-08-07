import jwt from "jsonwebtoken"

const isAutheticated = async(req, res, next) =>{
  try{
    const token = req.cookies.token;
    if(!token){
      return res.status(401).json({
        message:"Unauthorized Access",
        success: false,
      })
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if(!decode){
      return res.status(401).json({
        message:"Invalid Token",
        success: false,
      })
    }
    req.id = decode.userId;
    next();
  } catch (error){
    console.log(error);
      return res.status(401).json({
        message: "Unauthorized: Invalid or expired token",
        success: false,
      });
  }
}

export default isAutheticated;