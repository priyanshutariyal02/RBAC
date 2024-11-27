import mongoose, { model, Schema } from "mongoose";

const adminSchema = new Schema({
  username: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

const Admin = mongoose.models.admin || model("admin", adminSchema);
export default Admin;
