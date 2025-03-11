export class User {
  constructor({ email = '', username = '', telegramId = '' } = {}) {
    this.email = email;
    this.username = username;
    this.telegramId = telegramId;
  }

  static fromJson(json) {
    return new User({
      email: json.user_email,
      username: json.username,
      telegramId: json.user_telegram_id,
    });
  }
}
