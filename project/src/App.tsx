import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import SEOServices from './pages/SEOServices';
import WebsiteDesign from './pages/WebsiteDesign';
import GrowthSystem from './pages/GrowthSystem';
import ThankYou from './pages/ThankYou';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/5 via-[#0a0a0f] to-blue-950/5"></div>

          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(239, 68, 68, 0.1)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="animate-grid" />
          </svg>

          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '0s' }}></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '5s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-red-500/5 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '10s' }}></div>
        </div>

        <div className="relative z-10">
          <Navigation />
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/seo-services-south-africa" element={<SEOServices />} />
              <Route path="/website-design-south-africa" element={<WebsiteDesign />} />
              <Route path="/growth-system" element={<GrowthSystem />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
