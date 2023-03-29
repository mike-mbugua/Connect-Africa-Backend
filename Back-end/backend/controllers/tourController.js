import { response } from 'express'
import Tour from '../models/Tour.js'

// creating a new tour
export const createTour= async(req,res)=>{

    const newTour = new Tour(req.body)

    try {
        const savedTour= await newTour.save()
        res.status(200).json({success:true, message:"Created Successfully",data:savedTour})
        
    } catch (err) {
        res.status(500).json({success:false,message:"Failed to create try again!"})
    }
}

//  update tour
export const updateTour= async(req,res)=>{

    const id= req.params.id

    try {
        
        const updatedTour= await Tour.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        res.status(200).json({success:true, message:"updated Successfully",data:updatedTour})

    } catch (err) {
        res.status(500).json({success:false,message:"Failed to update try again!"})
    }
}


//  delete Tour
export const deleteTour= async(req,res)=>{

    const id= req.params.id

    try {
        
        const deletedTour= await Tour.findByIdAndDelete(id)

        res.status(200).json({success:true, message:"Tour deleted"})
    } catch (err) {
        res.status(500).json({success:false, message:"Failed to delete"})
    }

}

export const getSingleTour= async(req,res)=>{

    const id=req.params.id;

    try {
        
        const tour=await Tour.findById(id)
        res.status(200).json({success:true, message:"Tour found"})

    } catch (err) {
        res.status(404).json({success:false, message:"Tour not Found"})
    }
}

// get all tours
export const getAllTours= async(req,res)=>{

    // for pagination
    const page =parseInt(req.query.page)


    try {
        const tours=await Tour.find({})
        .skip(page * 8).limit(8)
        res.status(200).json({success:true, count:tours.length,message:"Tours Found",data:tours})
    } catch (err) {
        res.status(404).json({success:false,message:"Not Found"})
    }
}