// In your App.js or wherever your routes are defined
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProjectPage from './pages/ProjectPage';
import DataReleasePage from './pages/DataReleasePage';
import PublicationsPage from './pages/PublicationsPage';
import TeamPage from './pages/TeamPage';
import RestrictedArea from './pages/RestrictedArea';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/data-release" element={<DataReleasePage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/restricted-area" element={<RestrictedArea />} />
        <Route path="/team" element={<TeamPage />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;