import userSchema from "../models/userSchema.js";

export const getUserByEmail = async (email) => {
  try {
    return await userSchema.find({ email });
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    return await userSchema.findById(id);
  } catch (error) {
    throw error;
  }
};
