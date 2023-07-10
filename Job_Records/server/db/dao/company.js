import companySchema from "../models/companySchema.js";
import DataLoader from "dataloader";

export const getCompany = async (id) => {
  try {
    return await companySchema.findById(id);
  } catch (error) {
    throw error;
  }
};

export const companyLoader = new DataLoader(async (ids) => {
  return await companySchema.find({ _id: { $in: ids } });
});
