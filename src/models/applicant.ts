import { Schema, model } from "mongoose";
import mongoose from "mongoose";
//education model
const educationSchema = new Schema({
  school: {
    type: String,
    required: [true, "enter school or university"]
  },
  location: {
    type: String,
    required: [true, "enter school location"]
  },
  degree_level: {
    type: String,
    enum: [
      "High School",
      "Certificate",
      "Diploma",
      "Bechlor Degree",
      "Master Degree",
      "PHD"
    ],
    required: [
      true,
      "Required e.g High School,Certificate,Diploma,Bechlor Degree,Master Degree,PHD"
    ]
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user"
  },
  app_id: {
    type: mongoose.Types.ObjectId,
    ref: "applicant"
  }
});
export const educationModel = model("education", educationSchema);
//experience model
const experienceSchema = new Schema({
  title: {
    type: String,
    required: [true, "require job title"]
  },
  company_name: {
    type: String,
    required: [true, "require company name"]
  },
  from: {
    type: Date,
    required: [true, "require from date"]
  },
  to: {
    type: Date,
    required: [true, "require to date."]
  },
  jobfuntion: {
    type: mongoose.Types.ObjectId,
    ref: "jobfunction"
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user"
  },
  app_id: {
    type: mongoose.Types.ObjectId,
    ref: "applicant"
  }
});
export const exprerienceModel = model("experience", experienceSchema);
//applicant model
const applicantSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Require full name"]
    },
    dateofbirth: {
      type: Date,
      required: [true, "Require date of birth"]
    },
    address: {
      type: String,
      required: [true, "Require address"]
    },
    city: {
      type: String,
      required: [true, "Require city"]
    },
    country: {
      type: String,
      required: [true, "Require country"]
    },
    experience: [{ type: mongoose.Types.ObjectId, ref: "experience" }],
    education: [{ type: mongoose.Types.ObjectId, ref: "education" }],
    user: { type: mongoose.Types.ObjectId, ref: "user" }
  },
  { timestamps: true }
);

export const ApplicantModel = model("applicant", applicantSchema);
