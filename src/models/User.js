import BaseModel from "./BaseModel.js";

//class - User extends BaseModel (inheritance)
class User extends BaseModel {
  constructor() {
    super("users"); //call parent constructor with table name
  }

  //create method - inserts a new user
  //async/await + try/catch
  async create({ name, email, age }) {
    try {
      const rows = await this.query(
        `INSERT INTO users (name, email, age) VALUES (?, ?, ?)`,
        [name, email, age]
      );
      //MySQL returns insertId, not the row — fetch it back
      return await this.findById(rows.insertId);
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async update(id, updates) {
    const { name, email, age } = updates;
    try {
      await this.query(
        `UPDATE users SET name=?, email=?, age=? WHERE id=?`,
        [name, email, age, id]
      );
      return await this.findById(id);
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  //static method - validate user data without needing an instance
  static validate({ name, email, age }) { // 5. destructuring parameter
    const errors = [];
    if (!name || name.trim() === "") errors.push("Name is required");
    if (!email || !email.includes("@")) errors.push("Valid email is required");
    if (!age || age < 0 || age > 150) errors.push("Age must be between 0-150");
    return { isValid: errors.length === 0, errors }; //shorthand object
  }

  //static method - sanitize/format user output
  static sanitize(user) {
    if (!user) return null;
    const { id, name, email, age, created_at } = user; //destructuring
    return { id, name, email, age, createdAt: created_at };
  }

  //static method - sanitize an array of users
  static sanitizeAll(users) {
    //array destructuring via map
    return users.map((user) => User.sanitize(user));
  }
}

export default User;