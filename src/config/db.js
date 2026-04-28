class Database {
  static async connect() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Database connected successfully.");
        resolve(true);
      }, 200);
    });
  }
}

export default Database;
