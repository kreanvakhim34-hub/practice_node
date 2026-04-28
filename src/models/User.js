class User {
  static users = [];
  static currentId = 1;

  constructor(name, email, roles = []) {
    this.id = User.currentId++;
    this.name = name;
    this.email = email;
    this.roles = roles;
  }

  static async create(userData) {
    const { name, email, roles = [] } = userData;
    const user = new User(name, email, [...roles]);

    User.users.push(user);
    return user;
  }

  static async findAll() {
    return [...User.users];
  }
}

export default User;
