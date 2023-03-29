import express  from "express";
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/userCoontroller.js";
const router= express.Router()

import { verifyAdmin, verifyUser } from "../utilis/verifyToken.js";
// update tour
router.put('/:id',verifyUser,updateUser)

// Delete tour
router.delete('/:id',verifyUser,deleteUser)

// get single tour
router.get('/:id',verifyUser, getSingleUser)

// get all tour
router.get('/',verifyAdmin,getAllUsers)

export default router