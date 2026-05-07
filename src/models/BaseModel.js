import pool from "../config/db.js";

//class - Base class with shared DB logic
class BaseModel {
  constructor(table) {
    this.table = table;
    this.pool = pool;
  }

  //static method - utility available on the class itself (no instance needed)
  static formatFields(fields) {
    //destructuring array
    const [first, ...rest] = fields;
    return { first, rest, all: fields };
  }

  //static method - builds a parameterized WHERE clause
  static buildWhereClause(conditions) {
    // 5. destructuring object entries
    const entries = Object.entries(conditions);
    const clause = entries.map(([key], i) => `${key} = $${i + 1}`).join(" AND ");
    const values = entries.map(([, val]) => val); // 5. skipping key with comma
    return { clause, values };
  }

  //async/await + try/catch
  async query(sql, params = []) {
    try {
      const [rows] = await this.pool.execute(sql, params); //array destructuring (mysql2 returns [rows, fields])
      return rows;
    } catch (error) {
      throw new Error(`DB Query Error: ${error.message}`);
    }
  }

  async findAll() {
    return await this.query(`SELECT * FROM ${this.table}`);
  }

  async findById(id) {
    const rows = await this.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0] ?? null;
  }

  async delete(id) {
    const existing = await this.findById(id);
    if (!existing) return null;
    await this.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    return existing;
  }
}

export default BaseModel;