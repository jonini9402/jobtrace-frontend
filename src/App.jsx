import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import JobListPage from './pages/jobs/JobListPage';
import JobCreatePage from './pages/jobs/JobCreatePage';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
    <Routes>
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
      </Routes>
    </BrowserRouter>

  )
}

export default App;