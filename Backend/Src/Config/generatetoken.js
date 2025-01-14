import jwt from 'jsonwebtoken'; 

export const generateToken = (userId, res) => {
  
  //token generation
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn:'7d'
  })

  //sending token in cookies

  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,   //prevents xss attacks 
    sameSite: "strict",
    secure: process.env.NODE_ENV !== 'development',
  }); 

  return token; 
}