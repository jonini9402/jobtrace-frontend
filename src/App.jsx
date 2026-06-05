import { BrowserRouter, Routes, Route,Navigate  } from "react-router-dom";
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import JobListPage from './pages/jobs/JobListPage';
import JobCreatePage from './pages/jobs/JobCreatePage';
import JobEditPage from './pages/jobs/JobEditPage';
import JobDetailPage from './pages/jobs/JobDetailPage';
import StatsPage from './pages/stats/StatsPage';

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/jobs" element={
        <ProtectedRoute> 
        <JobListPage />
      </ProtectedRoute>
      } />
      <Route path="/jobs/create" element={
        <ProtectedRoute>
          <JobCreatePage/>
        </ProtectedRoute>
      } />
      <Route path="/jobs/:id/edit" element={
      <ProtectedRoute>
        <JobEditPage />
      </ProtectedRoute>
      } />
      <Route path="/jobs/:id" element={
      <ProtectedRoute>
        <JobDetailPage />
      </ProtectedRoute>
      } />
      <Route path="/stats" element={
      <ProtectedRoute>
        <StatsPage />
      </ProtectedRoute>
      } />
      </Routes>
    </BrowserRouter>

  )
}

export default App;