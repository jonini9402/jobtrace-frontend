import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getJobs } from "../../api/jobApi";

export default function JobListPage(){
    const [jobs, setJobs] = useState([]); // 목록 저장, 초기값 빈 배열

    useEffect(() => {
        getJobs().then(response => {
            setJobs(response.data); 
        });
    }, []);


    return <div>공고 목록 페이지
     <div>
        {jobs.map(job => (
            <div key={job.id}>
                <p>{job.userId}</p>
                <p>{job.companyName}</p>
                <p>{job.role}</p>
                <p>{job.jobUrl}</p>
                <p>{job.platform}</p>
                <p>{job.deadline}</p>
                <p>{job.startDate}</p>
                <p>{job.status}</p>
                <p>{job.memo}</p>
            </div>
        ))}
    </div>
    </div>
}