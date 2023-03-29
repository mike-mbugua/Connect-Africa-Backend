import express  from "express";
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/userCoontroller.js";
const router= express.Router()

// update tour
router.put('/:id',updateUser)

// Delete tour
router.delete('/:id',deleteUser)

// get single tour
router.get('/:id',getSingleUser)

// get all tour
router.get('/',getAllUsers)

export default router