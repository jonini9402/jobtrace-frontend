import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createJobs } from "../../api/jobApi";

export default function JobCreatePage(){
    const [companyName, setCompanyName] = useState("");// state 초기화
    const [role, setRole] = useState("");
    const [jobUrl, setJobUrl] = useState("");
    const [platform, setPlatform] = useState("");
    const [deadline, setDeadline] = useState("");
    const [startDate, setStartDate] = useState("");
    
    const navigate = useNavigate();

    //handle~ 는 버튼을 클릭할 때, useEffect는 페이지 열리자마자 자동으로
    const handleSubmit = async () => {
        const jobData = {
            companyName, 
            role, 
            jobUrl, 
            platform, 
            deadline, 
            startDate, 
            status: "관심공고", //자동으로 기본값 설정
            memo: "" //기본값
        };
        try {
            await createJobs(jobData);
            navigate("/jobs");
        }catch (error){
            console.log(error);
        }
    };

    return <div>
        <div>
        <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="회사명" />
        <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="직무" />
        <input value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} placeholder="공고 링크" />
        <input value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="플랫폼" />
        <input type ="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="마감 기한" />
        <input type ="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="지원 시작일" />

        <button onClick={handleSubmit}>등록</button>
    </div>
    </div>
}