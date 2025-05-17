import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

export const createUser = async (req, res) => {
   try {
      const { name, email, password } = req.body

      if (!name || !email || !password) {
         return res.status(400).send("All field required")
      }

      const userExists = await User.findOne({ email })

      if (userExists) {
         return res.status(409).send("Email Already Exists, Please Login")
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({
         name,
         email,
         password: hashedPassword,
      })

      const user = await newUser.save()
      const token = generateToken(user.id)

      res.cookie("token", token, {
         httpOnly: true,
         secure: true,
         maxAge: 24 * 60 * 60 * 1000
      })

      res.status(201).json({ token, user: { id: user.id, name, email } })
   } catch (error) {
      console.error("Failed create user", error)
      res.status(500).send("Failed create User")
   }
}

export const login = async (req, res) => {
   try {
      const { email, password } = req.body

      if (!(email && password)) {
         return res.status(400).json({ message: "All field required" })
      }

      const user = await User.findOne({ email })

      if (!user) {
         return res.status(404).json({ message: "Email does not Exists" })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
         return res.status(404).json({ message: "Invalid Password" })
      }

      const token = generateToken(user.id)

      res.cookie("token", token, {
         httpOnly: true,
         secure: true,
         maxAge: 24 * 60 * 60 * 1000
      })

      res.status(200).json({ token })

   } catch (error) {
      console.error("Login failed", error)
      res.status(401).json({ message: "Invalid Credentials" })
   }
}

export const logout = async (req, res) => {
   return res
      .clearCookie("token")
      .status(200)
      .json({ message: "Successfully logged out" })
}

export const getSession = async (req, res) => {
   const token = req.cookies.token

   if (!token) return res.json({ user: null })

   try {
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findOne({ _id: payload.id }).select('-password')
      if (!user) return res.status(404).json({ message: "User not found", user: null })
      res.status(200).json({ user })
   } catch (error) {
      res.status(401).json({ message: "Unauthorized", user: null })
   }
}