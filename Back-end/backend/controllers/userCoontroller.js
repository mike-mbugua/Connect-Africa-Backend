import { response } from 'express'
import User from '../models/User.js'

// creating a new User
export const createUser= async(req,res)=>{

    const newUser = new User(req.body)

    try {
        const savedUser= await newUser.save()
        res.status(200).json({success:true, message:"Created Successfully",data:savedUser})
        
    } catch (err) {
        res.status(500).json({success:false,message:"Failed to create try again!"})
    }
}

//  update User
export const updateUser= async(req,res)=>{

    const id= req.params.id

    try {
        
        const updatedUser= await User.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        res.status(200).json({success:true, message:"updated Successfully",data:updatedUser})

    } catch (err) {
        res.status(500).json({success:false,message:"Failed to update try again!"})
    }
}


//  delete User
export const deleteUser= async(req,res)=>{

    const id= req.params.id

    try {
        
        const deletedUser= await User.findByIdAndDelete(id)

        res.status(200).json({success:true, message:"User deleted"})
    } catch (err) {
        res.status(500).json({success:false, message:"Failed to delete"})
    }

}

export const getSingleUser= async(req,res)=>{

    const id=req.params.id;

    try {
        
        const user=await User.findById(id)
        res.status(200).json({success:true, message:"User found",data:user})

    } catch (err) {
        res.status(404).json({success:false, message:"User not Found"})
    }
}

// get all Users
export const getAllUsers= async(req,res)=>{


    try {
        const users=await User.find({})
        res.status(200).json({success:true, count:Users.length,message:"Users Found",data:users})
    } catch (err) {
        res.status(404).json({success:false,message:"Not Found"})
    }
}
// get User by search


// get User counts

export const getUserCount= async(req,res)=>{

    try {
        
        const UserCount= await User.estimatedDocumentCount();
        res.status(200).json({success:true,message:`All added Users are ${UserCount}`,data:UserCount})

    } catch (err) {
        res.status(500).json({success:false,message:" failed to fetch"})
    }
}