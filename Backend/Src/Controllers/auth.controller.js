import bcrypt from "bcryptjs"; 
import { generateToken } from "../Config/generatetoken.js";
import User from "../Models/user.model.js";

export const signupHandler = async (req, res) => {
  
  const { fullName, email, password } = req.body; 

  try {
    
    //basic validation  
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Plz fill all the fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    //checking if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hashing password

    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt); 

    //creating new user

    const newUser = new User({
      fullName, 
      email,
      password:hashedPassword,  
    })

    if (newUser) {
      
      //generate JWT token

      generateToken(newUser._id, res); 

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }


  } catch (error) {    console.log("Error in signup controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });

  }
}

export const loginHandler = async (req, res) => {
  const { email, password } = req.body; 

  try {

    const user = await User.findOne({ email });

    //if user not in db 
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });

    }

    //if user present validate password

    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    //generate token after password has been validated

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });

    
  } catch (error) {
    console.log("Error in login controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const logoutHandler = async (req, res) => {
  try {
    res.cookie('jwt', '', {
      maxAge: 0
    });

    res.status(200).json({ message: "Logged out Successfuly" });

  } catch (error) {
    console.log("Error in logout controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}