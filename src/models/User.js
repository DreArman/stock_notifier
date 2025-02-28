class User {
  constructor({ id, email, name, role }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
  }

  static fromJson(json) {
    return new User({
      id: json.id,
      email: json.email,
      name: json.name,
      role: json.role,
    });
  }
}

export default User;
