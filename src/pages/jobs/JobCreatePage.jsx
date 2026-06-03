import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createJobs } from "../../api/jobApi";

export default function JobCreatePage() {
  const [companyName, setCompanyName] = useState(""); // state 초기화
  const [role, setRole] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [platform, setPlatform] = useState("");
  const [deadline, setDeadline] = useState("");

  const navigate = useNavigate();

  //handle~ 는 버튼을 클릭할 때, useEffect는 페이지 열리자마자 자동으로
  const handleSubmit = async () => {
    if (!companyName || !role || !deadline) {
      alert("회사명, 직무, 마감일은 필수입니다.");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    const jobData = {
      companyName,
      role,
      jobUrl,
      platform,
      deadline,
      startDate: today, // 자동으로 오늘 날짜
      status: "관심공고", //자동으로 기본값 설정
      memo: "", //기본값
    };
    try {
      await createJobs(jobData);
      navigate("/jobs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8">
        <div
          className="flex items-center gap-2 mb-6 cursor-pointer"
          onClick={() => navigate("/jobs")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#888"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span className="text-sm text-gray-400">목록으로</span>
        </div>

        <h2 className="text-xl font-medium mb-1">관심 공고 등록</h2>
        <p className="text-xs text-gray-400 mb-6">
          지원할 공고 정보를 입력하세요
        </p>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">회사명</label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="예) 삼성전자"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">직무</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="예) 백엔드 개발자"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">플랫폼</label>
            <select
              onChange={(e) => {
                if (e.target.value !== "기타") setPlatform(e.target.value);
                else setPlatform("__기타__");
              }}
              value={
                [
                  "사람인",
                  "잡코리아",
                  "원티드",
                  "링크드인",
                  "프로그래머스",
                  "회사 홈페이지",
                ].includes(platform)
                  ? platform
                  : platform
                    ? "기타"
                    : ""
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 mb-2"
            >
              <option value="">플랫폼 선택</option>
              <option value="사람인">사람인</option>
              <option value="잡코리아">잡코리아</option>
              <option value="원티드">원티드</option>
              <option value="링크드인">링크드인</option>
              <option value="프로그래머스">프로그래머스</option>
              <option value="회사 홈페이지">회사 홈페이지</option>
              <option value="기타">기타 (직접 입력)</option>
            </select>
            {platform === "__기타__" ||
            ![
              "사람인",
              "잡코리아",
              "원티드",
              "링크드인",
              "프로그래머스",
              "회사 홈페이지",
              "",
            ].includes(platform) ? (
              <input
                value={platform === "__기타__" ? "" : platform}
                onChange={(e) => setPlatform(e.target.value)}
                placeholder="플랫폼 직접 입력"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
              />
            ) : null}
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">
              공고 링크
            </label>
            <input
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">마감일</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-2.5 mt-1 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
