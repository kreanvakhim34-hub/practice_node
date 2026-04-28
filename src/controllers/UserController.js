import User from "../models/User.js";

class UserController {
  static async create(req, res) {
    try {
      const { name, email, roles = [] } = req.body;

      if (!name || !email) {
        return res.status(400).json({
          message: "Name and email are required."
        });
      }

      const user = await User.create({ name, email, roles });
      const [firstRole = "No role"] = user.roles;

      return res.status(201).json({
        message: "User created successfully.",
        user,
        firstRole
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to create user.",
        error: error.message
      });
    }
  }

  static async getAll(req, res) {
    try {
      const users = await User.findAll();

      return res.status(200).json({
        total: users.length,
        users
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch users.",
        error: error.message
      });
    }
  }
}

export default UserController;
