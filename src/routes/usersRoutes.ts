import express from "express";
import {createUserController, deleteUserByIdController, getUsersController} from "../controllers/usersController";
import {idUserValidator} from "../middlewares/authValidators";
import {errorMiddleware} from "../middlewares/errorMiddleware";
import {authMiddleware} from "../middlewares/authMiddleware";


const router = express.Router();

router.route('/')
    .get(getUsersController)
    .post(
        authMiddleware,
        errorMiddleware,
        createUserController
    );
router.route('/:id')
    .delete(
        idUserValidator,
        errorMiddleware,
        deleteUserByIdController
    )

export default router
