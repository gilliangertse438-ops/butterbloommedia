import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Users, DollarSign } from 'lucide-react';

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'E-commerce Growth System — Western Cape Retailer',
      category: 'System Implementation',
      description: 'Structured organic acquisition channel replaced fragmented paid tactics. Predictable lead flow established through automated capture, qualification, and conversion optimization. Founder dependency reduced by 80%.',
      stats: [
        { icon: TrendingUp, label: 'Organic Traffic', value: '+340%' },
        { icon: Users, label: 'Consistency', value: '18 months' },
        { icon: DollarSign, label: 'Revenue Growth', value: '+210%' },
      ],
      gradient: 'from-red-500/20 to-red-600/20',
    },
    {
      title: 'Professional Services Scale-Up — Johannesburg Firm',
      category: 'System Implementation',
      description: 'Conversion-focused infrastructure replaced outdated website. Automated lead qualification system implemented. Monthly performance reporting tied directly to pipeline activity and closed deals.',
      stats: [
        { icon: TrendingUp, label: 'Lead Generation', value: '+285%' },
        { icon: Users, label: 'Qualified Leads', value: '+198%' },
        { icon: DollarSign, label: 'System Uptime', value: '99.8%' },
      ],
      gradient: 'from-blue-500/20 to-blue-600/20',
    },
    {
      title: 'B2B Growth System — National Technology Company',
      category: 'System Implementation',
      description: 'Single acquisition channel focused on LinkedIn. Automated outreach and nurture sequences. Predictable monthly lead volume established within 90 days. Scalable without adding headcount.',
      stats: [
        { icon: Users, label: 'Monthly Leads', value: '45-60' },
        { icon: TrendingUp, label: 'Conversion Rate', value: '12%' },
        { icon: DollarSign, label: 'Cost Per Lead', value: '-45%' },
      ],
      gradient: 'from-red-500/20 to-blue-500/20',
    },
    {
      title: 'Retention System — Durban Online Business',
      category: 'System Implementation',
      description: 'Marketing automation replaced manual processes. CRM integration ensured no lead fell through gaps. Customer lifetime value increased through systematic re-engagement and upsell sequences.',
      stats: [
        { icon: TrendingUp, label: 'Customer LTV', value: '+180%' },
        { icon: Users, label: 'Retention Rate', value: '89%' },
        { icon: DollarSign, label: 'Time Saved', value: '40hrs/wk' },
      ],
      gradient: 'from-blue-500/20 to-red-500/20',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-red-950/5 to-[#0a0a0f]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              System Implementation, Predictable Outcomes
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real results from structured growth systems. Each engagement focused on removing chaos, building scalability, and delivering consistent performance over time.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mt-6"></div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {projects.map((project, index) => (
                  <div key={index} className="min-w-full px-4">
                    <div className={`bg-gradient-to-br ${project.gradient} backdrop-blur-lg border border-white/10 rounded-3xl p-12`}>
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
                            {project.category}
                          </span>
                          <h3 className="text-4xl font-bold mt-4 mb-4">{project.title}</h3>
                          <p className="text-gray-300 text-lg max-w-2xl">{project.description}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-8 mt-12">
                        {project.stats.map((stat, statIndex) => (
                          <div
                            key={statIndex}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                          >
                            <stat.icon className="w-10 h-10 text-red-500 mb-4" />
                            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                              {stat.value}
                            </div>
                            <div className="text-gray-400">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            <div className="flex justify-center gap-3 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-gradient-to-r from-red-500 to-blue-500 w-12'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
