import { Schema, model } from "mongoose";

const companySchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  description: String,
});

export default model("Companies", companySchema);
