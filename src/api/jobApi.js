import api from './axiosInstance';

//채용공고 목록 조회 함수
export const getJobs = () => { 
    const token = (localStorage.getItem("token"));
    return api.get("/api/jobs", {
        headers: { Authorization: token}
    });
};

//채용공고 등록 함수
export const createJobs = (jobData) => {
    const token = (localStorage.getItem("token"));
    return api.post("/api/jobs", jobData, {
        headers: { Authorization: token}
    });
        
    };