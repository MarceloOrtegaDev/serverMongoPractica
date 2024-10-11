import { Router } from "express";
export const usersRouter = Router()
import { getUserById, Logout, loginUser, registerUser, getSession } from "../controllers/auth.controllers.js"; 
import { validarJwt } from "../middleware/validarJwt.js";


usersRouter.post('/register', registerUser );
usersRouter.post('/login', loginUser );
usersRouter.post('/logout',Logout );
usersRouter.get("/session", validarJwt, getSession);
usersRouter.get('/:id', getUserById );

