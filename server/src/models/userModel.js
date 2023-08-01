import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method
UserSchema.statics.signup = async (email, password) => {
  //Validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await User.findOne({ email }); //find object with email

  if (exists) {
    throw Error("Email is already taken");
  }
  //Hashing password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({ email, password: hash });

  return user;
};

//static login method
UserSchema.statics.login = async (email, password) => {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await User.findOne({ email }); //find object with email

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

export const User = mongoose.model("User", UserSchema);
