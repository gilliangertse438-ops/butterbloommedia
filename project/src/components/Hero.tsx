import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-[#0a0a0f] to-blue-950/20"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-32">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-blue-200 bg-clip-text text-transparent leading-tight">
            Predictable Growth for Businesses Ready to Scale — Without Chaos
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            We design and manage revenue-focused growth systems that generate consistent leads, remove founder dependency, and replace marketing guesswork with structure and automation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 group"
            >
              Request a Strategic Conversation
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              onClick={() => scrollToSection('services')}
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-blue-500/30 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
            >
              Explore Our Growth System
            </button>
          </div>

        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-gray-400" />
      </div>
    </section>
  );
};

export default Hero;
