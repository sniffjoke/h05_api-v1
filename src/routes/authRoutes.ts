import express from "express";
import {createUserController, deleteUserByIdController, getUsersController} from "../controllers/usersController";
import {loginController} from "../controllers/authController";


const router = express.Router();

router.route('/')
    .post(
        loginController
    );

export default router
