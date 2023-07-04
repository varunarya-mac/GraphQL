import { useParams } from "react-router";
// import { companies } from '../lib/fake-data';
import { getCompanyDetails } from "../lib/graphQL/query";
import { useEffect, useState } from "react";
import JobList from "../components/JobList";
function CompanyPage() {
  const { companyId } = useParams();

  const [company, updateCompanyInfo] = useState();

  useEffect(() => {
    const fetchComapnyDetails = async () => {
      const data = await getCompanyDetails(companyId);
      updateCompanyInfo(data);
    };
    fetchComapnyDetails();
  }, [companyId]);

  if (!company) return <div>Loading...</div>;

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
