import express from "express";
import {
    deleteController,
    getController,
    getControllerById,
    createPostController,
    updatePostController
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
        createPostController
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
        updatePostController
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
