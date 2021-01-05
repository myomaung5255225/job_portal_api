import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const locationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "require location"],
      unique: [true, "already created"]
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user"
    }
  },
  { timestamps: true }
);

export default model("location", locationSchema);
