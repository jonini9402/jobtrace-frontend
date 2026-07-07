import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("버튼 클릭됨");
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("name", response.data.name);
      console.log("로그인 성공"); 

      navigate('/jobs');
    } catch (error) {
        alert("아이디 또는 비밀번호가 틀렸습니다");
    }
  };
  

  //로그인 성공 후

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm bg-white border border-gray-100 rounded-2xl p-10 shadow-sm">
            {/* 로고 */}
            <div className="mb-8">
                <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                        </svg>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-medium tracking-tight">JobTrace</span>
                        <span className="text-sm text-gray-400">잡트</span>
                    </div>
                </div>
                <p className="text-xs text-gray-400 ml-11">모든 관심 채용 공고를 한눈에</p>
            </div>

            {/* 로그인 폼 */}
            <div className="mb-6">
                <h2 className="text-2xl font-medium mb-1">로그인</h2>
                <p className="text-sm text-gray-500">이메일과 비밀번호를 입력하세요</p>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <label className="text-xs text-gray-500 block mb-1.5">이메일 주소</label>
                    <input
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>
                <div>
                    <label className="text-xs text-gray-500 block mb-1.5">비밀번호</label>
                    <input
                        type="password"
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full py-2.5 mt-1 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700"
                >
                    로그인
                </button>
                <p className="text-xs text-gray-400 text-center">
                    계정이 없으신가요?{" "}
                    <span onClick={() => navigate("/signup")} className="text-gray-900 font-medium cursor-pointer">
                        회원가입
                    </span>
                </p>
            </div>
        </div>
    </div>
);

}
