import { Router } from "express";
import { login, register } from "../services/auth.services.js";

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

router.post('/login/local', async (req,res,next)=>{
    try {
        const {email, password} = req.body
        const rta = await login(email, password)
        res.status(200).json(rta)
    } catch (error) {
        next(error)
    }
})

export default router