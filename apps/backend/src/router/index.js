import { Router } from "express";
import AuthRouter from './auth.routes.js';
import ArtistsRouter from './artists.routes.js'
import SongsRouter from './songs.routes.js'

export function useApiRouter(app){
    const router = Router()
    app.use('/api', router)
    router.use('/artists', ArtistsRouter)
    router.use('/songs', SongsRouter)
    // router.use('/users')
    router.use('/auth', AuthRouter)
}