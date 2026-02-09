const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true, // Имя пользователя должно быть уникальным
      trim: true    // Удаляет лишние пробелы по краям
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Всегда сохраняет email в нижнем регистре
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] // Проверка формата email
    },
    password: {
      type: String,
      required: true
    },
    // Добавляем дату создания аккаунта
    createdAt: {
      type: Date,
      default: Date.now
    },
    // Можно добавить поле для хранения аватара или уровня доступа
    bio: {
      type: String,
      maxlength: 200
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;