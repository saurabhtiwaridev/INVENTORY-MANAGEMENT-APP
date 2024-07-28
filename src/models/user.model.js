export default class UserModel {
  constructor(_id, _email, _username, _password) {
    this.id = _id;
    this.email = _email;
    this.password = _password;
    this.username = _username;
  }
  static setUser(email, username, password) {
    const user = new UserModel(users.length + 1, email, username, password);
    users.push(user);
  }
  static checkUserMatch(email, password) {
    const userData = users?.find((user) => {
      return user?.email == email && user?.password == password;
    });
    return userData;
  }
  static getUser() {
    return users;
  }
}

const users = [];
