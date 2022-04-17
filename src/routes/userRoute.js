import express from "express";
import Users from "../controllers/usersController";

const router = express.Router();

// get all tasks
router.get("/users", Users.allUsers);

// get one user
router.get("/users/:id", Users.findOneUser);
// create task
router.post("/users", Users.create);

// update task by id
router.put("/users/:id", Users.update);
// delete task by id
router.delete("/users/:id", Users.delete);

export default router;
