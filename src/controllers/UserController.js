import BaseController from "./BaseController.js";
import User from "../models/User.js";

class UserController extends BaseController {
  constructor() {
    super();
    this.userModel = new User(); // instantiate model
  }

  getAll = async (req, res) => {
    try {
      const users = await this.userModel.findAll();
      // destructuring - get format fields info via static method
      const { all } = BaseModel_unused ?? {};
      const sanitized = User.sanitizeAll(users); 
      this.sendSuccess(res, sanitized, "Users fetched successfully");
    } catch (error) {
      this.sendError(res, error.message);
    }
  };

  // GET /users/:id
  getOne = async (req, res) => {
    try {
      const { id } = req.params; // 5. destructuring params
      const user = await this.userModel.findById(id);
      if (!user) return this.sendNotFound(res, "User");
      this.sendSuccess(res, User.sanitize(user)); // 3. static method call
    } catch (error) {
      this.sendError(res, error.message);
    }
  };

  // POST /users
  //create method in controller
  create = async (req, res) => {
    try {
      const { name, email, age } = req.body;

      //static method - validate before hitting DB
      const { isValid, errors } = User.validate({ name, email, age }); //destructuring result
      if (!isValid) return this.sendValidationError(res, errors);

      // create method - delegates to model's create
      const newUser = await this.userModel.create({ name, email, age }); //shorthand object
      this.sendSuccess(res, User.sanitize(newUser), "User created", 201);
    } catch (error) {
      this.sendError(res, error.message);
    }
  };

  // PUT /users/:id
  update = async (req, res) => {
    try {
      const { id } = req.params;            //destructuring params
      const { name, email, age } = req.body; //destructuring body

      const { isValid, errors } = User.validate({ name, email, age }); //static + destructuring
      if (!isValid) return this.sendValidationError(res, errors);

      const updated = await this.userModel.update(id, { name, email, age });
      if (!updated) return this.sendNotFound(res, "User");
      this.sendSuccess(res, User.sanitize(updated), "User updated");
    } catch (error) {
      this.sendError(res, error.message);
    }
  };

  // DELETE /users/:id
  remove = async (req, res) => {
    try {
      const { id } = req.params; //destructuring
      const deleted = await this.userModel.delete(id);
      if (!deleted) return this.sendNotFound(res, "User");
      this.sendSuccess(res, User.sanitize(deleted), "User deleted");
    } catch (error) {
      this.sendError(res, error.message);
    }
  };
}

export default UserController;