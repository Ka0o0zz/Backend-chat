import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    uuid: {
      type: String,
    },
    name: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("Users", UserSchema);

export default UserModel;
