import api from "./axiosInstance";

//채용공고 목록 조회 함수
export const getJobs = () => {
  return api.get("/api/jobs");
};

//채용공고 등록 함수
export const createJobs = (jobData) => {
  return api.post("/api/jobs", jobData);
};

//채용공고 수정 함수
export const updateJob = (id, jobData) => {
  
  return api.put(`/api/jobs/${id}`, jobData);
};

//채용공고 삭제 함수
export const deleteJob = (id) => {
  return api.delete(`/api/jobs/${id}`);
};

//채용공고 단건 조회 함수
export const getJobDetail = (id) => {
  return api.get(`/api/jobs/${id}`);
};

// 지원 상태 변경
export const updateStatus = (id, status) => {
  return api.post(
    `/api/jobs/${id}/status`,
    { status });
};

// 메모 수정
export const updateMemo = (id, memo) => {
  return api.post(
    `/api/jobs/${id}/memo`,
    { memo });
};
//통계 api 함수
export const getStats = () => {
  return api.get("/api/stats");
};
