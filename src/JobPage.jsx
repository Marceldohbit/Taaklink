// pages/JobsPage.jsx
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import JobList from "./components/JobList";
import { mockJobs } from "./Data";
import "./JobPage";

const JobsPage = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const results = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(results);
  }, [searchTerm, jobs]);

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1>Find Your Dream Job</h1>
        <p>Browse through thousands of full-time and part-time jobs near you</p>
      </div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <JobList jobs={filteredJobs} />
    </div>
  );
};

export default JobsPage;
