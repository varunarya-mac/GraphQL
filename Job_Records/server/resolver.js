import {
  createJob,
  deleteJob,
  fetchJobs,
  getJob,
  getJobByCompanyId,
  updateJob,
} from "./db/dao/job.js";
import { getCompany, companyLoader } from "./db/dao/company.js";
import { GraphQLError } from "graphql";

export const resolvers = {
  Query: {
    company: async (_root, args) => {
      const data = await getCompany(args.id);
      if (!data) {
        throw graphQLError(`Company details not found for id: ${args.id}`);
      }
      return data;
    },

    job: (_root, args) => {
      const data = getJob(args.id);
  
      if (!data) {
        throw graphQLError(`Job details not found for id: ${args.id}`);
      }
    
      return data;
    },
    jobs: () => fetchJobs(),
  },

  Mutation: {
    createJob: async (_root, { input }, user) => {
      if (!user) {
        throw authorizationError;
      }
      const data = await createJob(
        user.companyId,
        input.title,
        input.description
      );
      return data;
    },
    updateJob: async (_root, { input }, { user }) => {
      if (!user) {
        throw authorizationError;
      }
      return await updateJob(input);
    },
    deleteJob: async (_root, { id }, { user }) => {
      if (!user) {
        throw authorizationError;
      }
      return await deleteJob(id);
    },
  },

  Job: {
    date: (job) => toISODate(job.createdAt.toISOString()),
    // company: async (job) => getCompany(job.companyId),
    company: (job) =>  companyLoader.load(job.companyId)
  },

  Company: {
    id: (company) => company._id,
    jobs: (company) => getJobByCompanyId(company._id.toString()),
  },
};

function graphQLError(message) {
  return new GraphQLError(message, { extensions: { code: "NOT_FOUND" } });
}

function authorizationError() {
  return new GraphQLError("Unauthorized User", {
    extensions: { code: "UNAUTHORIZATION_ERROR" },
  });
}

function toISODate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
