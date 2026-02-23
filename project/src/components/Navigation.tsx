import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0f]/95 backdrop-blur-lg border-b border-red-500/10 shadow-lg shadow-red-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
            Butterbloom Media
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('about')}
            className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
          </button>

          <button
            onClick={() => scrollToSection('services')}
            className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
          >
            Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
          </button>

          <Link
            to="/growth-system"
            className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
          >
            Growth System
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            to="/seo-services-south-africa"
            className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
          >
            SEO Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            to="/website-design-south-africa"
            className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
          >
            Website Design
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            to="/blog"
            className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
          >
            Blog
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
          >
            Portfolio
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
          </button>
        </div>

        <button
          onClick={() => scrollToSection('contact')}
          className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-red-500 to-blue-500 rounded-full font-medium hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
        >
          Get Started
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0f]/98 backdrop-blur-lg border-t border-red-500/10">
          <div className="px-6 py-4 flex flex-col gap-4">
            <button onClick={() => scrollToSection('about')} className="text-left text-gray-300 hover:text-white">
              About
            </button>
            <button onClick={() => scrollToSection('services')} className="text-left text-gray-300 hover:text-white">
              Services
            </button>
            <Link to="/growth-system" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white">
              Growth System
            </Link>
            <Link to="/seo-services-south-africa" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white">
              SEO Services
            </Link>
            <Link to="/website-design-south-africa" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white">
              Website Design
            </Link>
            <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white">
              Blog
            </Link>
            <button onClick={() => scrollToSection('portfolio')} className="text-left text-gray-300 hover:text-white">
              Portfolio
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-left text-gray-300 hover:text-white">
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
