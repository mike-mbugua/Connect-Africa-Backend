import express from "express";
import  {createTour, deleteTour, getAllTours, getSingleTour, updateTour} from "../controllers/tourController.js";
const router =express.Router();

// ROUTES FOR

// to create new tour
router.post('/',createTour)

// update tour
router.put('/:id',updateTour)

// Delete tour
router.delete('/:id',deleteTour)

// get single tour
router.get('/:id',getSingleTour)

// get all tour
router.get('/',getAllTours)

export default router;