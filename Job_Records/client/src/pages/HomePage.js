import JobList from "../components/JobList";
import { useQuery } from "@apollo/client";
import { getJobListQuery } from "../lib/graphQL/query";

function HomePage() {

  const { data, loading, error } = useQuery(getJobListQuery, {
    fetchPolicy: 'network-only'
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Data Unavailable</div>;

  const { jobs } = data;
  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
