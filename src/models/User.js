export class User {
  constructor({ email = '', username = '', telegramID = null } = {}) {
    this.email = email;
    this.username = username;
    this.telegramID = telegramID;
  }

  static fromJson(json) {
    return new User({
      email: json.user_email,
      username: json.username,
      telegramID: json.user_telegram_id,
    });
  }
}
