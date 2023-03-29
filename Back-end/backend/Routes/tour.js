import express from "express";
import  {createTour, deleteTour, getAllTours, getFeaturedTours, getSingleTour, getTourBySearch, getTourCount, updateTour} from "../controllers/tourController.js";
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

// get tour by search
router.get('/search/getTourBySearch',getTourBySearch)

// get all featured Tours
router.get('/search/getFeaturedTours',getFeaturedTours)

// get tour count
router.get('/search/getTourCount',getTourCount)

export default router;