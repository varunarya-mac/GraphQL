import { useEffect, useState } from "react";
import JobList from "../components/JobList";

import { getJobList } from "../lib/graphQL/query";

function HomePage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const jobList = await getJobList();
      setJobs(jobList);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
