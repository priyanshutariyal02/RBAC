import mongoose, { model, Schema } from "mongoose";

const authSchema = new Schema({
  username: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: { type: String, require: true },
});


const Auth = mongoose.models.auth || model("auth", authSchema);
export default Auth;

