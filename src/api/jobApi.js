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

//채용공고 수정 함수
export const updateJob = (id, jobData) => {
    const token = (localStorage.getItem("token"));
    return api.put(`/api/jobs/${id}`, jobData, {
        headers: {Authorization: token }
    });
    };

//채용공고 삭제 함수
export const deleteJob = (id) => {
    const token = localStorage.getItem("token");
    return api.delete(`/api/jobs/${id}`, {
        headers: { Authorization: token }
    });
};

//채용공고 단건 조회 함수 
export const getJobDetail = (id) => {
    const token = localStorage.getItem("token");
    return api.get(`/api/jobs/${id}`, {
        headers: { Authorization : token }
    });
};