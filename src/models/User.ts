import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail";
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "require email!"],
      unique: [true, "email already used."],
      validate: [
        (val: any) => {
          isEmail(val);
        },
        "invalid email address"
      ]
    },
    password: {
      type: String,
      required: [true, "require password"],
      min: [8, "minimum length is 8 characters"]
    },
    avatar: {
      type: String,
      default: ""
    },
    profile: {
      fullname: {
        type: String
      },
      address: {
        type: String
      },
      city: {
        type: String
      },
      country: {
        type: String
      }
    },
    role: {
      type: String,
      default: "user"
    }
  },
  { timestamps: true }
);

export default model("user", userSchema);
