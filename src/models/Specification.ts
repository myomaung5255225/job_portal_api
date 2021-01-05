import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const specSchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "already used."],
      required: [true, "require specification name."]
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user"
    }
  },
  { timestamps: true }
);

export default model("specification", specSchema);
