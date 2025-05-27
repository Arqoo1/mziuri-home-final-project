import express from "express";
import { loginUser, contact, logoutUser, getToken, getUser, registerUser, forgotPasswordUser, resetPasswordUser} from "../controllers/users.js";

const UsersRouter = express.Router()

UsersRouter.post('/login', loginUser)
// UsersRouter.post('/logout', logoutUser)
// UsersRouter.post('/get-token', getToken)
// UsersRouter.get('/get-user', getUser)
UsersRouter.post('/register', registerUser)
// UsersRouter.put('/updateUser', auth, updateUser)
UsersRouter.put('/forgot-password', forgotPasswordUser)
UsersRouter.put('/reset-password', resetPasswordUser)
UsersRouter.post('/contact', contact)



export default UsersRouter