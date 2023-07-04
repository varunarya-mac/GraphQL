import { GraphQLClient, gql } from "graphql-request";

const graphQLClient = new GraphQLClient("http://localhost:9000/graphql");

export async function jobById(jobId) {
  const query = gql`
    query jobById($jobId: ID!) {
      job(id: $jobId) {
        id
        title
        date
        description
        company {
          id
          name
        }
      }
    }
  `;
  const { job } = await graphQLClient.request(query, { jobId });
  return job;
}

export async function getJobList() {
  const query = gql`
    query {
      jobs {
        id
        title
        date
        companyId
        company {
          name
        }
      }
    }
  `;

  try {
    const { jobs } = await graphQLClient.request(query);
    return jobs;
  } catch (error) {
    throw error;
  }
}

export async function getCompanyDetails(companyId) {
  const query = gql`
    query companyByID($companyId: String!) {
      company(id: $companyId) {
        id
        name
        description
        jobs {
          id
          title
          date
        }
      }
    }
  `;

  const { company } = await graphQLClient.request(query, { companyId });
  return company;
}
