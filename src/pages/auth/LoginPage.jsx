import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("버튼 클릭됨");
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("name", response.data.name);
      console.log("로그인 성공"); 
    } catch (error) {
      console.log (error);
    }
  };
  const navigate = useNavigate();

  //로그인 성공 후
  navigate('/jobs');

  return (
    <div className="page">
      <div className="titleWrap">
        이메일과 비밀번호를
        <br /> 입력하세요
      </div>

      {/* contentWrap - 이메일 입력 */}
      <div className="contentWrap">
        <div className="inputTitle">이메일 주소</div>
        <div className="inputWrap">
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      {/* errror 메세지 띄우기  */}
      <div className="errorMessageWrap">
        <div>올바른 이메일 주소를 입력해주세요</div>
      </div>

      <div className="contentWrap">
        <div className="inputTitle">비밀번호</div>
        <div className="inputWrap">
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {/* errror 메세지 띄우기  */}
      <div className="errorMessageWrap">
        <div> 영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
      </div>

      <div>
        <button onClick={handleLogin}>로그인</button>
      </div>
    </div>
  );
}
