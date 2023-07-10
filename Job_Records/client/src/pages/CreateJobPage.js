import { useState } from "react";
import { createJobMutation, jobByIdQuery } from '../lib/graphQL/query'
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
function CreateJobPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [mutate, {loading, error}] = useMutation(createJobMutation);
  
const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const job = await createJob({title, description});
      const result = await mutate(
      {
        variables: { input: {title, description} },
        update: (cache, { data }) => {
          cache.writeQuery({
            query: jobByIdQuery,
            variables: { id: data.createJob.id },
            data: data.createJob,
          });
        },
      });

      const {job} = result.data;
      navigate(`/jobs/${job.id}`);
      
    } catch (error) {
      console.log('failed to create new job');
      navigate('/');
    }
   
    
  };

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                rows={10}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link"  disabled={loading} onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
