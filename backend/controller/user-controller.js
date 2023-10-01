import User from "../models/user-schema.js";
import bcrypt from "bcrypt";
import generateToken from '../utility/jwtToken.js'
export const userSignup = async(req,res) =>{
  try{

    const exist = await User.findOne({username: req.body.username});
    if(exist){
      return res.status(401).json({message: "username already exist"});
    }

    // Hash the user's password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const user = req.body;
    const newUser = new User(user);
    await newUser.save();
    let token = await generateToken(user.username,user.email)
    const options = {expires: new Date(Date.now()+process.env.COOKIE_EXP*24*60*60*1000),httpOnly: true};
    res.status(200).json({message: user,authtoken:token});
  }catch(error){
    // console.log(error)
     res.status(500).json({message: error.message});
  }
}

export const userLogin = async(req,res) => {
   try{
     const username = req.body.username;
     const password = req.body.password;
     let user = await User.findOne({username:username});
     if(user){
       const storedHashedPassword = user.password;
       const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
       if(passwordMatch)
       {
        let token = await generateToken(user.username,user.email)
        // console.log(token);
        const options = {expires: new Date(Date.now()+process.env.COOKIE_EXP*24*60*60*1000),httpOnly: true};
        res.status(200).json({user,authtoken:token});
       }
       else
       return res.status(401).json('Invalid Login: password not matched');
     }
     else{
      return res.status(401).json('Invalid Login: user not found');
     }
   }catch(error){
       res.status(500).json(error.message);
   }
}

export const userVerify = async(req,res) => {
  const username = req.user.username;
  let user = await User.findOne({username:username});
  res.status(200).json({ message: 'Protected route accessed', user });
}