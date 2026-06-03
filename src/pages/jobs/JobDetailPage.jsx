import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobDetail, updateStatus, updateMemo } from "../../api/jobApi";

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [memo, setMemo] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getJobDetail(id).then((response) => {
      setJob(response.data);
      setMemo(response.data.memo || "");
      setStatus(response.data.status || "");
    });
  }, [id]);


  if (!job)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">로딩 중...</p>
      </div>
    );

  const statusColor = {
    관심공고: "#888",
    지원중: "#378add",
    서류합격: "#1d9e75",
    코딩테스트: "#ba7517",
    인적성: "#ba7517",
    AI면접: "#534ab7",
    "1차면접": "#534ab7",
    "2차면접": "#534ab7",
    최종합격: "#1d9e75",
    탈락: "#e24b4a",
  };
  const statusBg = {
    관심공고: "#f1f1ef",
    지원중: "#e6f1fb",
    서류합격: "#eaf3de",
    코딩테스트: "#faeeda",
    인적성: "#faeeda",
    AI면접: "#eeedfe",
    "1차면접": "#eeedfe",
    "2차면접": "#eeedfe",
    최종합격: "#eaf3de",
    탈락: "#fcebeb",
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(job.deadline);
  const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  const dday =
    diff === 0 ? "D-Day" : diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
  const ddayUrgent = diff >= 0 && diff <= 3;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-lg mx-auto">
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

        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          {/* 헤더 */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-medium mb-1">{job.companyName}</h2>
              <p className="text-sm text-gray-400">{job.role}</p>
            </div>
            <span
              style={{
                background: statusBg[job.status],
                color: statusColor[job.status],
              }}
              className="text-xs px-3 py-1 rounded-full font-medium flex-shrink-0"
            >
              {job.status}
            </span>
          </div>

          {/* 정보 */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
              <span className="text-xs text-gray-400">플랫폼</span>
              <span className="text-sm text-gray-700">
                {job.platform || "-"}
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
              <span className="text-xs text-gray-400">공고 링크</span>
              <a
                href={job.jobUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-500 underline truncate max-w-xs"
              >
                {job.jobUrl || "-"}
              </a>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
              <span className="text-xs text-gray-400">마감일</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">{job.deadline}</span>
                <span
                  className="text-xs font-medium"
                  style={{ color: ddayUrgent ? "#c0392b" : "#aaa" }}
                >
                  {dday}
                </span>
              </div>
            </div>
            {/* 메모 */}
            <div className="flex flex-col gap-1.5 py-2.5 border-b border-gray-50">
              <span className="text-xs text-gray-400">메모</span>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="메모를 입력하세요"
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 resize-none"
              />
              <button
                onClick={async () => {
                  await updateMemo(id, memo);
                  alert("저장됐어요.");
                }}
                className="self-end text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-md hover:bg-gray-100"
              >
                저장
              </button>
            </div>

            {/* 지원 상태 변경 */}
            <div className="flex flex-col gap-1.5 py-2.5">
              <span className="text-xs text-gray-400">지원 상태</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
              >
                {[
                  "관심공고",
                  "지원중",
                  "서류합격",
                  "코딩테스트",
                  "인적성",
                  "AI면접",
                  "1차면접",
                  "2차면접",
                  "최종합격",
                  "탈락",
                ].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                onClick={async () => {
                  await updateStatus(id, status);
                  alert("상태가 변경됐어요.");
                }}
                className="self-end text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-md hover:bg-gray-100"
              >
                변경
              </button>
            </div>
          </div>

          {/* 버튼 */}
          <button
            onClick={() => navigate(`/jobs/${id}/edit`)}
            className="w-full py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700"
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}
