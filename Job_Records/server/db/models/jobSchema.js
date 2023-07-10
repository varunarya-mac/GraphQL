import { Schema, model } from "mongoose";

const jobSchema = new Schema({
  companyId: String,
  title: {
    type: String,
    required: true,
    default: () => "Full stack developer",
  },
  description: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date().toISOString(),
  },
});

export default model("jobs", jobSchema);
