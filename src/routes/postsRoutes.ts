import express from "express";
import {
    deleteController,
    getController,
    getControllerById,
    postController,
    putController
} from "../controllers/postsController";
import {
    titlePostValidator,
    contentPostValidator,
    shortDescriptionPostValidator,
    blogIdValidator,
    idPostValidator
} from "../middlewares/postsValidators";
import {errorMiddleware} from "../middlewares/errorMiddleware";
import {authMiddleware} from "../middlewares/authMiddleware";


const router = express.Router();

router.route('/')
    .get(getController)
    .post(
        authMiddleware,
        titlePostValidator,
        contentPostValidator,
        blogIdValidator,
        shortDescriptionPostValidator,
        errorMiddleware,
        postController
    );
router.route('/:id')
    .put(
        authMiddleware,
        idPostValidator,
        titlePostValidator,
        contentPostValidator,
        blogIdValidator,
        shortDescriptionPostValidator,
        errorMiddleware,
        putController
    )
    .delete(
        authMiddleware,
        idPostValidator,
        errorMiddleware,
        deleteController
    )
    .get(
        idPostValidator,
        errorMiddleware,
        getControllerById
    );

export default router
