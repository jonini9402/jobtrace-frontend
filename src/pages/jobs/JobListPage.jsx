import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getJobs, deleteJob } from "../../api/jobApi";

export default function JobListPage(){
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]); // 목록 저장, 초기값 빈 배열

    useEffect(() => {
        getJobs().then(response => {
            setJobs(response.data); 
        });
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteJob(id);
            setJobs(jobs.filter(job => job.id !== id)); // 삭제 후 목록에서 제거
        } catch (error) {
            console.log(error);
        }
    };


    return <div>공고 목록 페이지
     <div>
        {jobs.map(job => (
            <div key={job.id}>
                <p>{job.userId}</p>
                <p onClick={() => navigate(`/jobs/${job.id}`)} style={{cursor: "pointer"}}>
                 {job.companyName}</p>
                <p>{job.role}</p>
                <p>{job.jobUrl}</p>
                <p>{job.platform}</p>
                <p>{job.deadline}</p>
                <p>{job.startDate}</p>
                <p>{job.status}</p>
                <p>{job.memo}</p>
                <button onClick={() => navigate(`/jobs/${job.id}/edit`)}>수정</button>
                <button onClick={() => handleDelete(job.id)}>삭제</button>
            </div>
        ))}
    </div>
    </div>
}