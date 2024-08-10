import express from "express";
import {loginController} from "../controllers/authController";


const router = express.Router();

router.route('/')
    .post(
        loginController
    );

export default router
