import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
          Thank You for Reaching Out
        </h1>

        <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-8"></div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-8">
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Your message has been received successfully.
          </p>

          <p className="text-lg text-gray-400 leading-relaxed mb-4">
            If there's a mutual fit, you'll be contacted to schedule a short strategic conversation.
          </p>

          <p className="text-lg text-gray-400 leading-relaxed">
            If not, we'll let you know respectfully.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-blue-500 rounded-xl font-semibold hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Return to Home
          </Link>

          <div className="pt-6">
            <p className="text-gray-500 text-sm">
              Need immediate assistance?
            </p>
            <a
              href="mailto:info@mrbutterbloom.co.za"
              className="text-red-500 hover:text-red-400 font-medium transition-colors"
            >
              info@mrbutterbloom.co.za
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
