import express from "express";
import Users from "../controllers/usersController";

const router = express.Router();

// get all tasks

// create task
router.post("/users", Users.create);

// update task by id

// delete task by id

export default router;
