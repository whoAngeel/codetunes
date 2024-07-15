import { Router } from "express";
import AuthRouter from './auth.routes.js';
export function useApiRouter(app){
    const router = Router()
    app.use('/api', router)
    // router.use('/artists')
    // router.use('/songs')
    // router.use('/users')
    router.use('/auth', AuthRouter)
}