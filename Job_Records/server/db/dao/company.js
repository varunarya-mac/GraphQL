import companySchema from "../models/companySchema.js";

export const getCompany = async (id) => {
  try {
    return await companySchema.findById(id);
  } catch (error) {
    console.log(error);
  }
};
