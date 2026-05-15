import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobDetail } from "../../api/jobApi";

export default function JobDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);

    useEffect(() => {
        getJobDetail(id).then(response => {
            setJob(response.data);
        });
    }, [id]);

    if (!job) return <div>로딩 중...</div>;

    return (
        <div>
            <h2>{job.companyName}</h2>
            <p>직무: {job.role}</p>
            <p>플랫폼: {job.platform}</p>
            <p>공고 링크: {job.jobUrl}</p>
            <p>마감일: {job.deadline}</p>
            <p>지원 시작일: {job.startDate}</p>
            <p>지원 상태: {job.status}</p>
            <p>메모: {job.memo}</p>
            <button onClick={() => navigate(`/jobs/${id}/edit`)}>수정</button>
            <button onClick={() => navigate("/jobs")}>목록으로</button>
        </div>
    );
}