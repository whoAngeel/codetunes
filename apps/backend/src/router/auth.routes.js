import { Router } from "express";
import { register } from "../services/auth.services.js";

const router = Router()

router.post('/register/local',async (req,res,next)=>{
    try {
        const data = req.body
        const rta = await register(data)
        res.status(201).json(rta)
    } catch (error) {
        next(error)
    }
})

// router.post()

export default router