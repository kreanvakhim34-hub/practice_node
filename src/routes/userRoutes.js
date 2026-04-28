import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.post("/users", UserController.create);
router.get("/users", UserController.getAll);

export default router;
