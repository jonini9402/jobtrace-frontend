import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStats } from "../../api/jobApi";

export default function StatsPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then(res => setStats(res.data));
  }, []);

  if (!stats) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-sm text-gray-400">로딩 중...</p>
    </div>
  );

  const statusData = Object.entries(stats.statusCount || {}).map(([name, value]) => ({ name, value }));
  const monthlyData = Object.entries(stats.monthlyCount || {}).map(([name, value]) => ({ name, value }));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* 헤더 */}
        <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => navigate("/jobs")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <span className="text-sm text-gray-400">목록으로</span>
        </div>

        <h2 className="text-2xl font-medium mb-1">내 통계</h2>
        <p className="text-xs text-gray-400 mb-8">지원 현황을 한눈에 확인하세요</p>

        {/* 핵심 수치 카드 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <p className="text-xs text-gray-400 mb-2">서류 합격률</p>
            <p className="text-3xl font-medium text-gray-900">
              {stats.documentPassRate ? `${(stats.documentPassRate).toFixed(1)}%` : '-'}
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <p className="text-xs text-gray-400 mb-2">최종 합격률</p>
            <p className="text-3xl font-medium text-gray-900">
              {stats.finalPassRate ? `${(stats.finalPassRate).toFixed(1)}%` : '-'}
            </p>
          </div>
        </div>

        {/* insight */}
        {stats.insight && (
          <div className="bg-gray-900 text-white rounded-2xl px-6 py-4 mb-8">
            <p className="text-xs text-gray-400 mb-1">현황 요약</p>
            <p className="text-sm">{stats.insight}</p>
          </div>
        )}
        {/* 상태별 차트 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6">
            <p className="text-sm font-medium mb-6">지원 상태별 현황</p>
            <div className="flex flex-col gap-3">
                {statusData.map(({ name, value }) => {
                    const max = Math.max(...statusData.map(d => d.value));
                    const width = max > 0 ? (value / max) * 100 : 0;
                    return (
                        <div key={name} className="flex items-center gap-3">
                            <span className="text-xs text-gray-400 w-20 flex-shrink-0 text-right">{name}</span>
                            <div className="flex-1 bg-gray-50 rounded-full h-2">
                                <div className="h-2 rounded-full bg-gray-900" style={{ width: `${width}%` }}></div>
                            </div>
                            <span className="text-xs text-gray-400 w-4 text-right">{value}</span>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* 월별 차트 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <p className="text-sm font-medium mb-6">월별 지원 현황</p>
            <div className="flex items-end gap-3 h-32">
                {monthlyData.map(({ name, value }) => {
                    const max = Math.max(...monthlyData.map(d => d.value));
                    const height = max > 0 ? (value / max) * 100 : 0;
                    return (
                        <div key={name} className="flex flex-col items-center gap-1 flex-1">
                            <span className="text-xs text-gray-400">{value}</span>
                            <div className="w-full bg-gray-900 rounded-t" style={{ height: `${height}%`, minHeight: value > 0 ? '4px' : '0' }}></div>
                            <span className="text-xs text-gray-400">{name.slice(5)}월</span>
                        </div>
                    );
                })}
            </div>
        </div>
        

      </div>
    </div>
  );
}