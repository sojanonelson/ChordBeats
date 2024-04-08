const Mongoose = require("mongoose");
const { Schema } = Mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("User", UserSchema);
