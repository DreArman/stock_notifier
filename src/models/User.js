export class User {
  constructor({ email = 'email', name = 'name', telegramId = 'telegramId' } = {}) {
    this.email = email;
    this.name = name;
    this.telegramId = telegramId;
  }

  static fromJson(json) {
    return new User({
      email: json.user_email,
      name: json.username,
      telegramId: json.user_telegram_id,
    });
  }
}
