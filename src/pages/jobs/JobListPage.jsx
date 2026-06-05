import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs, deleteJob } from "../../api/jobApi";

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

function getDday(deadline) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(deadline);
  const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24));
  if (diff === 0) return { label: "D-Day", urgent: true };
  if (diff < 0) return { label: `D+${Math.abs(diff)}`, urgent: false };
  return { label: `D-${diff}`, urgent: diff <= 3 };
}

export default function JobListPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [tab, setTab] = useState("timeline");
  const [filter, setFilter] = useState("전체");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getJobs().then((res) => setJobs(res.data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  const inProgress = [
    "관심공고",
    "지원중",
    "서류합격",
    "코딩테스트",
    "인적성",
    "AI면접",
    "1차면접",
    "2차면접",
  ];
  const getWeekRange = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + offset * 7);
    const day = d.getDay();
    const start = new Date(d);
    start.setDate(d.getDate() - day);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
  };

 const filteredJobs = jobs
    .filter((j) => {
        if (filter === "전체") return true;
        if (filter === "진행중") return inProgress.includes(j.status);
        if (filter === "합격") return j.status === "최종합격";
        if (filter === "탈락") return j.status === "탈락";
    })
    .filter((j) => {
        if (tab !== "timeline") return true;
        if (!j.deadline) return false; // 타임라인에서 상시채용 제외
        const { start, end } = getWeekRange();
        const deadline = new Date(j.deadline);
        deadline.setHours(0, 0, 0, 0);
        return deadline >= start && deadline <= end;
    })
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const calBase = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + offset,
    1,
  );
  const calYear = calBase.getFullYear();
  const calMonth = calBase.getMonth();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const lastDate = new Date(calYear, calMonth + 1, 0).getDate();
  const eventsMap = {};
  jobs.forEach((job) => {
    const d = new Date(job.deadline);
    if (d.getFullYear() === calYear && d.getMonth() === calMonth) {
      const key = d.getDate();
      if (!eventsMap[key]) eventsMap[key] = [];
      eventsMap[key].push(job);
    }
  });

  const periodLabel =
    tab === "calendar"
      ? `${calYear}년 ${calMonth + 1}월`
      : (() => {
          const d = new Date();
          d.setDate(d.getDate() + offset * 7);
          return `${d.getMonth() + 1}월 ${Math.ceil(d.getDate() / 7)}주`;
        })();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
  <div className="flex items-center gap-2.5">
    <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    </div>
    <span className="text-lg font-medium">JobTrace</span>
    <span className="text-sm text-gray-400">잡트</span>
  </div>
  <div className="flex items-center gap-2">
    <button onClick={() => navigate("/stats")}
      className="text-sm text-gray-500 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">
      내 통계
    </button>
    <button onClick={() => navigate("/jobs/create")}
      className="flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700">
      + 관심 공고 등록
    </button>
  </div>
</div>
        

        {/* 탭 + 기간 이동 */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => {
                setTab("timeline");
                setOffset(0);
              }}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium ${tab === "timeline" ? "bg-white text-gray-900" : "text-gray-400"}`}
            >
              타임라인
            </button>
            <button
              onClick={() => {
                setTab("calendar");
                setOffset(0);
              }}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium ${tab === "calendar" ? "bg-white text-gray-900" : "text-gray-400"}`}
            >
              캘린더
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOffset((o) => o - 1)}
              className="w-7 h-7 border border-gray-200 rounded-md bg-white flex items-center justify-center text-sm"
            >
              ‹
            </button>
            <span className="text-sm font-medium min-w-[110px] text-center">
              {periodLabel}
            </span>
            <button
              onClick={() => setOffset((o) => o + 1)}
              className="w-7 h-7 border border-gray-200 rounded-md bg-white flex items-center justify-center text-sm"
            >
              ›
            </button>
          </div>
        </div>

        {/* 타임라인 */}
        {tab === "timeline" && (
          <div>
            <div className="flex gap-2 mb-4 flex-wrap">
              {["전체", "진행중", "합격", "탈락"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3.5 py-1 rounded-full text-xs border ${filter === f ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-400 border-gray-200"}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {filteredJobs.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-sm mb-1">
                    이번 주에 마감되는 공고가 없어요
                  </p>
                  <p className="text-gray-300 text-xs">
                    다른 주를 확인하거나 공고를 등록해보세요
                  </p>
                </div>
              )}
              {filteredJobs.map((job) => {
                const dd = getDday(job.deadline);
                return (
                  <div
                    key={job.id}
                    className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between"
                  >
                    <div
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">
                          {job.companyName}
                        </span>
                        <span
                          style={{
                            background: statusBg[job.status],
                            color: statusColor[job.status],
                          }}
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                        >
                          {job.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 m-0">{job.role}</p>
                      <p className="text-xs text-gray-300 mt-0.5">
                        {job.deadline ? `${job.deadline} 마감` : '상시채용'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        style={{ color: dd.urgent ? "#c0392b" : "#aaa" }}
                        className="text-sm font-medium"
                      >
                        {job.deadline ? dd.label : '상시'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(job.id);
                        }}
                        className="text-xs text-red-400 bg-red-50 px-2.5 py-1 rounded-md"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 캘린더 */}
        {tab === "calendar" && (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-7 border-b border-gray-100">
              {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => (
                <div
                  key={d}
                  className="text-center text-xs py-2.5 font-medium"
                  style={{
                    color: i === 0 ? "#e24b4a" : i === 6 ? "#378add" : "#888",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {Array(firstDay)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="min-h-28 border-r border-b border-gray-50 p-2"
                  ></div>
                ))}
              {Array.from({ length: lastDate }, (_, i) => i + 1).map((d) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isToday =
                  d === today.getDate() &&
                  calMonth === today.getMonth() &&
                  calYear === today.getFullYear();
                const col = (firstDay + d - 1) % 7;
                const events = eventsMap[d] || [];
                return (
                  <div
                    key={d}
                    className="h-20 border-r border-b border-gray-50 p-2 overflow-hidden"
                    style={{ background: isToday ? "#fafaf8" : "white" }}
                  >
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-full mb-1 ${isToday ? "bg-gray-900" : ""}`}
                    >
                      <span
                        className="text-xs"
                        style={{
                          color: isToday
                            ? "white"
                            : col === 0
                              ? "#e24b4a"
                              : col === 6
                                ? "#378add"
                                : "#555",
                        }}
                      >
                        {d}
                      </span>
                    </div>
                    {events.map((job) => {
                      const dd = getDday(job.deadline);
                      return (
                        <div
                          key={job.id}
                          onClick={() => navigate(`/jobs/${job.id}`)}
                          className="mt-0.5 cursor-pointer px-1.5 py-1 rounded"
                          style={{ background: statusBg[job.status] }}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className="text-xs font-medium truncate"
                              style={{ color: "#333" }}
                            >
                              {job.companyName}
                            </span>
                            <span
                              className="text-xs font-medium flex-shrink-0 ml-1"
                              style={{ color: dd.urgent ? "#c0392b" : "#aaa" }}
                            >
                              {dd.label}
                            </span>
                          </div>
                          <p
                            className="text-xs truncate mt-0.5"
                            style={{ color: statusColor[job.status] }}
                          >
                            {job.role}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* 상시채용 공고 */}
{jobs.filter(j => !j.deadline).length > 0 && (
    <div className="mt-4">
        <p className="text-xs text-gray-400 mb-2 font-medium">상시채용 공고</p>
        <div className="flex flex-col gap-2">
            {jobs.filter(j => !j.deadline).map(job => (
                <div key={job.id} onClick={() => navigate(`/jobs/${job.id}`)}
                    className="bg-white border border-gray-200 rounded-xl px-5 py-3 flex items-center justify-between cursor-pointer">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{job.companyName}</span>
                            <span style={{background:statusBg[job.status],color:statusColor[job.status]}}
                                className="text-xs px-2 py-0.5 rounded-full font-medium">{job.status}</span>
                        </div>
                        <p className="text-xs text-gray-400 m-0">{job.role}</p>
                    </div>
                    <span className="text-xs text-gray-300">상시채용</span>
                </div>
            ))}
        </div>
    </div>
)}
        
      </div>
    </div>
  );
}
