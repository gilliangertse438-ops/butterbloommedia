import { useEffect, useRef, useState } from 'react';
import {
  MessageSquare,
  Globe,
  Smartphone,
  Share2,
  Search,
  FileText,
  TrendingUp,
  ShoppingCart,
  Lightbulb,
  Zap,
} from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Globe,
      title: 'Conversion-Focused Digital Infrastructure',
      description: 'High-performance websites and landing systems designed to convert traffic into qualified leads. Built for speed, clarity, and continuous optimization.',
      color: 'from-blue-500 to-blue-600',
      glow: 'shadow-blue-500/50',
      link: '/website-design-south-africa',
    },
    {
      icon: Search,
      title: 'Single, Clearly Defined Acquisition Channel',
      description: 'Whether paid or organic, we focus on one primary channel that aligns with your business model and scales predictably over time.',
      color: 'from-red-500 to-red-600',
      glow: 'shadow-red-500/50',
      link: '/seo-services-south-africa',
    },
    {
      icon: Zap,
      title: 'Automated Lead Capture & Qualification',
      description: 'Intelligent systems that capture, score, and route leads automatically — removing manual bottlenecks and ensuring consistent follow-up.',
      color: 'from-red-500 to-blue-500',
      glow: 'shadow-red-500/30',
      link: '#contact',
    },
    {
      icon: TrendingUp,
      title: 'Ongoing Optimization & Performance Reporting',
      description: 'Monthly reporting tied to revenue activity, not vanity metrics. Continuous refinement based on what actually drives business outcomes.',
      color: 'from-blue-500 to-red-500',
      glow: 'shadow-blue-500/30',
      link: '#contact',
    },
  ];

  return (
    <section id="services" ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-blue-950/5 to-[#0a0a0f]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              The Butterbloom Growth System™
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We design and manage end-to-end growth systems that replace fragmented tactics with integrated, revenue-focused infrastructure. Every component works together to generate predictable results.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:${service.glow} cursor-pointer`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg ${service.glow}`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 leading-tight">
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-red-950/30 to-blue-950/30 backdrop-blur-lg border border-white/10 rounded-3xl p-12">
              <h3 className="text-3xl font-bold mb-4">Ready for Structured Growth?</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                If your business is ready to move from fragmented marketing to a predictable growth system, request a strategic conversation.
              </p>
              <a
                href="#contact"
                className="inline-block px-8 py-4 bg-gradient-to-r from-red-500 to-blue-500 rounded-full font-semibold hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
              >
                Request a Strategic Conversation
              </a>
              <p className="text-gray-500 text-sm mt-4">
                Minimum engagement and standard retainer terms apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
