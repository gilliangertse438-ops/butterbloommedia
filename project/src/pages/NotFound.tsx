import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-emerald-600 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-300">
          <p className="text-slate-600 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/#services" className="text-emerald-600 hover:text-emerald-700 font-medium">
              Our Services
            </Link>
            <Link to="/blog" className="text-emerald-600 hover:text-emerald-700 font-medium">
              Blog
            </Link>
            <Link to="/#contact" className="text-emerald-600 hover:text-emerald-700 font-medium">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
