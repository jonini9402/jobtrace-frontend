import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    alert("ProtectedRoute 실행됨");
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;