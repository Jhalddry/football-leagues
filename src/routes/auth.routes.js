import { Router } from 'express'
import { login, logout, profile, refresh, register } from '../controllers/auth.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { loginSchema, registerSchema } from '../schema/auth.schema.js'

const router = Router()

router.post('/register', validateSchema(registerSchema), register)

router.post('/login', validateSchema(loginSchema), login)

router.post('/logout', logout)

router.get('/refresh', refresh)

router.get('/me', profile)

export default router