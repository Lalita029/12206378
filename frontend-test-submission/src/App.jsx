import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ShortenerPage from './pages/ShortenerPage.jsx';
import StatsPage from './pages/StatsPage.jsx';
import RedirectHandler from './pages/RedirectHandler.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow mb-8">
          <nav className="container mx-auto flex items-center justify-between py-4 px-4">
            <div className="text-xl font-bold text-blue-700">URL Shortener</div>
            <div className="space-x-4">
              <Link to="/" className="text-blue-600 hover:underline">Shorten</Link>
              <Link to="/stats" className="text-blue-600 hover:underline">Stats</Link>
            </div>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ShortenerPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/:shortcode" element={<RedirectHandler />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
