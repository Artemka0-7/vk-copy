const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  avatarPath: {type: String, required: true, default: `${process.env.CLIENT_URL}/avatars/defaultAvatar.jpg`},
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String}
});

const Users = mongoose.model("User", UserSchema);

module.exports = Users;