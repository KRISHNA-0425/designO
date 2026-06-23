import express from 'express'
import { register } from '../controllers/user.controller.js'

const authRouter = express.Router()

authRouter.post("/register", register);

export default authRouter