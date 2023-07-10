import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";
import { jobByIdQuery } from "../lib/graphQL/query";
import { useQuery } from "@apollo/client";

function JobPage() {
  const { jobId } = useParams();
  const { data, loading, error } = useQuery(jobByIdQuery, {
    variables: { jobId },
  });

  // const [job, setJobDetails] = useState();
  // useEffect(() => {
  //   const fetchJob = async () => {
  //     const response = await jobById(jobId);
  //     setJobDetails(response);
  //   };

  //   fetchJob();
  // }, [jobId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Data Unavailable</div>;
  
  const { job } = data;
  return (
    <div>
      <h1 className="title is-2">{job.title}</h1>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">
          Posted: {formatDate(job.date, "long")}
        </div>
        <p className="block">{job.description}</p>
      </div>
    </div>
  );
}

export default JobPage;
