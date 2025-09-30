const { model,Schema } = require("mongoose");

const RegisterSchema = new Schema({

  fullName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String, 
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
})

module.exports = model("users", RegisterSchema, "users")