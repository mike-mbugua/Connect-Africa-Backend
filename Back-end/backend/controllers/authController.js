import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


// to register a new user
export const register=async(req,res)=>{



    try {

        // hashing the passwords
        const salt = bcrypt.genSaltSync(10)
        const hash =bcrypt.hashSync(req.body.password, salt)


        
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
        })

    await newUser.save();
    res.status(200).json({success:true,message:"user created successfully",data:newUser})

    } catch (err) {
        res.status(500).json(err)
    }
};

// to login already existing user
export const login=async(req,res)=>{

    const email=req.body.email;

    try {
        const user = await User.findOne({email})
        // if user doesn't exist then
        if (!user) {
            res.status(404).json({message:"User not Found"})
        }
        // if user exists compare passwords
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)
        // if password is incorrect then
        if (!checkCorrectPassword) {
            return res.status(401).json({success:false,message:"Incorrect password or username"})
        }

        const {password,role, ...rest} = user._doc
        // creating jwt token
        const token= jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn: "15d"})

        // set token in the browser cookies and send the response to the client
        res.cookie('accessToken', token,{
            httpOnly:true,
            expires:token.expiresIn
        }).status(200).json({success:true,token,message:"login success",data:{...rest},role})

    } catch (err) {
        res.status(500).json({success:false,message:"failed to login"})
    }
};