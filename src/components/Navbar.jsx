import { logout } from "../api/authApi";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    if(location.pathname === '/login' || location.pathname === '/signup'){
        return null;
    }

    const handleLogout = async () => {
        await logout();
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
    <nav style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        height: '56px',
    }}>
        {/* 콘텐츠 영역 - JobListPage와 동일한 너비 */}
        <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 32px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            {/* 로고 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                    width: '32px', height: '32px',
                    background: '#111827',
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                    </svg>
                </div>
                <span style={{ fontSize: '15px', fontWeight: '500' }}>JobTrace</span>
                <span style={{ fontSize: '13px', color: '#9ca3af' }}>잡트</span>
            </div>

            {/* 오른쪽 버튼들 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => navigate("/stats")} style={{
                    fontSize: '13px', color: '#6b7280',
                    background: 'white', border: '1px solid #e5e7eb',
                    padding: '6px 16px', borderRadius: '8px', cursor: 'pointer'
                }}>
                    내 통계
                </button>
                <button onClick={() => navigate("/jobs/create")} style={{
                    fontSize: '13px', color: 'white',
                    background: '#111827', border: 'none',
                    padding: '6px 16px', borderRadius: '8px', cursor: 'pointer',
                    fontWeight: '500'
                }}>
                    + 관심 공고 등록
                </button>
                <button onClick={handleLogout} style={{
                    fontSize: '13px', color: '#6b7280',
                    background: 'white', border: '1px solid #e5e7eb',
                    padding: '6px 16px', borderRadius: '8px', cursor: 'pointer'
                }}>
                    로그아웃
                </button>
            </div>
        </div>
    </nav>
);
};

export default Navbar;