import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, //this will hide the password from the user, so that it is not visible in the response. This is called as a security measure.
  },
  avatar: {
  type: String,
  required: false,
  default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
 },
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); //this will compare the password with the hashed password. This is called as a security measure.
};

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v; 
    return ret;
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
