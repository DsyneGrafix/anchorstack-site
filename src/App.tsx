import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MyArticles from './pages/MyArticles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/myarticles" element={<MyArticles />} />
      </Routes>
    </Router>
  );
}

export default App;


