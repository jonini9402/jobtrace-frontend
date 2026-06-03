import React, {useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../api/authApi';

export default function SignupPage(){
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async () => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    
    if (!email || !name || !password) {
        alert("모든 항목을 입력해주세요.");
        return;
    }
    if (!passwordRegex.test(password)) {
        alert("비밀번호는 영문, 숫자, 특수문자 포함 8자 이상이어야 합니다.");
        return;
    }
        try {
            await signup(email, password, name);
            alert("가입이 완료됐어요. 로그인해주세요.");
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

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

            {/* 회원가입 폼 */}
            <div className="mb-5">
                <h2 className="text-xl font-medium mb-1">회원가입</h2>
                <p className="text-xs text-gray-400">정보를 입력해 계정을 만드세요</p>
            </div>
            <div className="flex flex-col gap-3">
                <div>
                    <label className="text-xs text-gray-500 block mb-1">이메일</label>
                    <input type="email" placeholder="example@email.com"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-300" />
                </div>
                <div>
                    <label className="text-xs text-gray-500 block mb-1">이름</label>
                    <input type="text" placeholder="홍길동"
                        value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-300" />
                </div>
                <div>
                    <label className="text-xs text-gray-500 block mb-1">비밀번호</label>
                    <input type="password" placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-300" />
                </div>
                <button onClick={handleSignup}
                    className="w-full py-2.5 mt-1 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700">
                    가입하기
                </button>
                <p className="text-xs text-gray-400 text-center">
                    이미 계정이 있으신가요?{" "}
                    <span onClick={() => navigate("/login")} className="text-gray-900 font-medium cursor-pointer">
                        로그인
                    </span>
                </p>
            </div>
        </div>
    </div>
);
   
}
