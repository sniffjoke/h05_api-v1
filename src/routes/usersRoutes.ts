import express from "express";
import {createUserController, deleteUserByIdController, getUsersController} from "../controllers/usersController";


const router = express.Router();

router.route('/')
    .get(getUsersController)
    .post(
        createUserController
    );
router.route('/:id')
    .delete(
        deleteUserByIdController
    )

export default router
