
import { Router } from "express"; //destructuring named export
import UserController from "../controllers/UserController.js";

const router = Router();
const userController = new UserController(); //class instantiation

//MVC - Routes layer: maps HTTP verbs + paths to controller methods
router.get("/",        userController.getAll);   
router.get("/:id",     userController.getOne);  
router.post("/",       userController.create);   
router.put("/:id",     userController.update);  
router.delete("/:id",  userController.remove);  

export default router;