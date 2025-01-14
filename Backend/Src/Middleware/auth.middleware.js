import jwt from 'jsonwebtoken'
import User from '../Models/user.model.js';
export const protectRoute = async (req, res, next) => { 
  try {
    const token = req.cookies.jwt;    //jwt because we saved the token usingv jwt as name

    //iif token not found 
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    //if token found we will extract the data from the token by verifying 

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - invalid token" });

    }

    //If valid token found
    const user = await User.findOne({ _id: decoded.userId }).select("-password");


    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
    


  } catch (error) {
    console.log("Error in protected middleware", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}