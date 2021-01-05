import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "require title"]
    },
    description: {
      type: String,
      required: [true, "require description"]
    },
    requirement: {
      type: String,
      required: [true, "require description"]
    },
    level: {
      type: String,
      enum: ["entry", "experienced", "manager", "director", "above director"],
      required: [
        true,
        "Please select e.g entry,experienced,director,above director"
      ]
    },
    job_type: {
      type: String,
      enum: ["full-time", "part-time", "contract"],
      required: [true, "Please select e.g full-time,part-time,contract"]
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "user"
    },
    applicants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "applicant"
      }
    ]
  },
  { timestamps: true }
);

export default model("job", jobSchema);
