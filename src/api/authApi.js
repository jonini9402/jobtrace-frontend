import api from './axiosInstance';

//로그인 api 호출 함수
export const login = (email, password) => {
    return api.post("/api/auth/login", { email, password });
};

//회원가입 api 호출 함수
export const signup= (email, password, name) => {
    return api.post("/api/auth/signup", { email, password, name });
};

//로그아웃 api 호출 함수
export const logout = () => {
    return api.post("/api/auth/logout");
}