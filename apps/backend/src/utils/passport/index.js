
import passport from 'passport'
import JWTStrategy from './strategies/jwt.js'
import LocalStrategy from './strategies/local.js'

passport.use(JWTStrategy)
passport.use(LocalStrategy)