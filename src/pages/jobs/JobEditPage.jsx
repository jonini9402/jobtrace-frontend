import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobs, updateJob } from "../../api/jobApi";

export default function JobEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [companyName, setCompanyName] = useState("");
    const [role, setRole] = useState("");
    const [jobUrl, setJobUrl] = useState("");
    const [platform, setPlatform] = useState("");
    const [deadline, setDeadline] = useState("");
    const [startDate, setStartDate] = useState("");

    useEffect(() => {
        getJobs().then(response => {
            const job = response.data.find(j => j.id === Number(id));
            if (job) {
                setCompanyName(job.companyName);
                setRole(job.role);
                setJobUrl(job.jobUrl);
                setPlatform(job.platform);
                setDeadline(job.deadline);
                setStartDate(job.startDate);
            
            }
        });
    }, [id]);

    const handleUpdate = async () => {
        const jobData = { companyName, role, jobUrl, platform, deadline, startDate };
        try {
            await updateJob(id, jobData);
            navigate("/jobs");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="회사명" />
            <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="직무" />
            <input value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} placeholder="공고 링크" />
            <input value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="플랫폼" />
            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
           <button onClick={handleUpdate}>수정</button>
        </div>
    );
}