import { fetchJobs, getJob, getJobByCompanyId } from "./db/dao/job.js";
import { getCompany } from "./db/dao/company.js";

export const resolvers = {
  Query: {
    company: async (_root, args) => {
      const data = await getCompany(args.id);
      return data;
    },
    job: (_root, args) => getJob(args.id),
    jobs: () => fetchJobs(),
  },

  Job: {
    date: (job) => toISODate(job.createdAt.toISOString()),
    company: async (job) => getCompany(job.companyId),
  },

  Company: {
    id: (company) => company._id,
    jobs: (company) => getJobByCompanyId(company._id.toString()),
  },
};

function toISODate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
