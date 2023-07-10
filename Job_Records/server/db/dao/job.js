import jobSchema from "../models/jobSchema.js";

//Model.update,findByIdAndUpdate,findOneAndUpdate,findOneAndRemove,findByIdAndRemove
// are all commands executed directly in the database. Its better to avoid these methods

export const fetchJobs = async () => {
  try {
    const jobs = await jobSchema.find();
    return jobs;
  } catch (error) {
    return error;
  }
};

export const getJob = async (id) => {
  try {
    return await jobSchema.findById(id);
  } catch (error) {
    return error;
  }
};

export const getJobByCompanyId = async (companyId) => {
  try {
    return await jobSchema.find({ companyId });
  } catch (error) {
    return error;
  }
};

export const createJob = async (companyId, title, description) => {
  try {
    const jobModel = new jobSchema();
    jobModel.title = title;
    jobModel.description = description;
    jobModel.companyId = companyId;

    return await jobModel.save();
  } catch (error) {
    return error;
  }
};

export const deleteJob = async (id) => {
  try {
    return await jobSchema.findOneAndDelete(id);
  } catch (error) {
    return error;
  }
};

export const updateJob = async ({id, title, description }) => {
  try {
    const document = await jobSchema.findById(id);
    if (title) document.title = title;
    if (description) document.description = description;
    return await document.save();
  } catch (error) {
    return error;
  }
};
