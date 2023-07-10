import { GraphQLClient } from "graphql-request";
import {
  gql,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import { getAccessToken } from "../auth";


//******* this is way to use graphql-request library  */ 
// const graphQLClient = new GraphQLClient("http://localhost:9000/graphql", {
//   headers: () => {
//     const token = getAccessToken();
//     if (token) {
//       return { Authorization: `bearer ${token}` };
//     }
//     return {};
//   },
// });


//******* this is way to use Apollo-client library with links */ 
const link = new HttpLink({
  uri: "http://localhost:9000/graphql",
});

 const authLink = new ApolloLink((operation, forward) => {
  const token = getAccessToken();
  if (token) {
    operation.setContext({ headers: { Authorization: `bearer ${token}` } });
  }
  return forward(operation);
});


export const apolloClient = new ApolloClient({
  link: concat(authLink, link),
  cache: new InMemoryCache(),
});

const JobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    title
    date
    description
    company {
      id
      name
    }
  }`;


export const jobByIdQuery = gql`
  query jobById($jobId: ID!) {
    job(id: $jobId) {
      ...JobDetail
    }
  }
  ${JobDetailFragment}
`;

// export async function jobById(jobId) {
//   const { data } = await apolloClient.query({
//     query: jobByIdQuery,
//     variables: { jobId },
//   });
//   return data.job;
// }

export const getJobListQuery = gql`
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

// export async function getJobList() {
//   const query = gql`
//     query {
//       jobs {
//         id
//         title
//         date
//         companyId
//         company {
//           name
//         }
//       }
//     }
//   `;

//   try {
//     const { data } = await apolloClient.query({
//       query,
//       fetchPolicy: "network-only",
//     });
//     return data.jobs;
//   } catch (error) {
//     throw error;
//   }
// }


export const getCompanyDetails = gql`
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

// export async function getCompanyDetails(companyId) {
//   const { data } = await apolloClient.query({
//     getCompanyDetails,
//     variables: { companyId },
//   });
//   return data.company;
// }


export const createJobMutation = gql`
    mutation CreateJob($input: CreateJobParameters) {
      job: createJob(input: $input) {
        ...JobDetail
      }
    }
    ${JobDetailFragment}
  `;

// export async function createJob(newJob) {
//   const mutation = gql`
//     mutation CreateJob($input: CreateJobParameters) {
//       job: createJob(input: $input) {
//         ...JobDetail
//       }
//     }
//     ${JobDetailFragment}
//   `;
//   const { data } = await apolloClient.mutate({
//     mutation,
//     variables: { input: newJob },
//     update: (cache, { data }) => {
//       cache.writeQuery({
//         query: jobByIdQuery,
//         variables: { id: data.createJob.id },
//         data: data.createJob,
//       });
//     },
//   });
//   return data.job;
// }
