import jwt  from "jsonwebtoken";


export const authToken = (req,res,next) =>{
    const token = req.headers.authorization;
    // console.log(req);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify the token using the secret key
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    // Store the decoded token in the request object for use in route handlers
    req.user = decodedToken;
    next();
  });
}