import { useParams } from "react-router";
import JobList from "../components/JobList";
import {useQuery} from '@apollo/client'
import {getCompanyDetails} from '../lib/graphQL/query'

function CompanyPage() {
  const { companyId } = useParams();
  const {data, loading, error} = useQuery(getCompanyDetails, {
    variables: {companyId}
  })

  // useEffect(() => {
  //   const fetchComapnyDetails = async () => {
  //     const data = await getCompanyDetails(companyId);
  //     updateCompanyInfo(data);
  //   };
  //   fetchComapnyDetails();
  // }, [companyId]);

  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Data unavailable...</div>;
  const { company } = data;
  

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>

      <h2 className="title">Job list related to company</h2>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyPage;
