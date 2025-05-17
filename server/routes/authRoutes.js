import express from 'express'
import { createUser, getSession, login, logout } from '../controllers/authController.js'

const router = express.Router()

router.post("/signup", createUser)
router.post("/login", login)
router.post("/logout", logout)
router.get("/session", getSession)

export default router