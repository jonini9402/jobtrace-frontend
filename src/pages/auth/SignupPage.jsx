import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SignupPage(){
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    return (
    <div className = "page">
        <div className = "register">
            회원가입
        </div>
        {/*이메일 */}
        <div className = "contentWrap">
            <div className = "inputTitle">
                이메일
            </div>
            <div className  = "inputWrap">
                <input value={email} // state 값을 input에 표시
                onChange = {(e) => setEmail(e.target.value)} />
            </div>
        </div>
        {/*이름 */}
        <div className = "contentWrap">
                <div className="inputTitle">
                    이름
                </div>
                <div className="inputWrap">
                    <input
                value={name} onChange={(e) => setName(e.target.value)} />
                </div>
            </div>  
            {/*비밀번호 */}
            <div className = "contentWrap">
                <div className="inputTitle">
                    비밀번호
                </div>
                <div className="inputWrap">
                    <input type="password"
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
        <button>확인</button>
      </div>

      {/* 가입하기 */}
        <div>
            <button type ="submit" id="sbtn">가입하기</button>
        </div>
    </div>
    );
}
