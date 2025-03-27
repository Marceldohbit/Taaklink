import { useState } from "react";
import AddJobModal from "./AddJobModal";
import DeleteJobModal from "./DeleteJobModal";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const addJob = (job) => {
    setJobs([...jobs, job]);
  };

  const deleteJob = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
    setShowDeleteModal(null);
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Jobs</h2>
      <button className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => setShowAddModal(true)}>
        Add Job
      </button>
      {jobs.length === 0 ? <p>No jobs added yet.</p> : (
        jobs.map((job, index) => (
          <div key={index} className="border p-2 my-2 flex justify-between">
            <span>{job.title} - ${job.budget}</span>
            <button className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => setShowDeleteModal(index)}>
              Delete
            </button>
          </div>
        ))
      )}
      {showAddModal && <AddJobModal close={() => setShowAddModal(false)} addJob={addJob} />}
      {showDeleteModal !== null && <DeleteJobModal close={() => setShowDeleteModal(null)} confirm={() => deleteJob(showDeleteModal)} />}
    </div>
  );
};

export default Jobs;

