import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout.jsx';
import LandingPage    from './pages/LandingPage.jsx';
import AssessmentPage from './pages/AssessmentPage.jsx';
import ReportPage     from './pages/ReportPage.jsx';
import DashboardPage  from './pages/DashboardPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public student-facing routes */}
        <Route path="/"           element={<LandingPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/report"     element={<ReportPage />} />

        {/* Counsellor / institution routes — wrapped in app shell */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard"  element={<DashboardPage />} />
          <Route path="/analytics"  element={<div className="p-8 text-gray-400 text-sm">Analytics — coming in v0.2</div>} />
          <Route path="/employers"  element={<div className="p-8 text-gray-400 text-sm">Employer matching — coming in v0.2</div>} />
          <Route path="/settings"   element={<div className="p-8 text-gray-400 text-sm">Settings — coming in v0.2</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
