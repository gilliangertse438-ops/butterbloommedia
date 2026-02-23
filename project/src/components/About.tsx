import { useEffect, useRef, useState } from 'react';
import { Award, Target, TrendingUp, Users } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const timeline = [
    { year: '2022', event: 'Butterbloom Media Founded' },
    { year: '2023', event: 'Expanded to Mobile Development' },
    { year: '2024', event: 'AI & Automation Integration' },
    { year: '2025', event: 'Continued Excellence & Growth' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-red-950/5 to-[#0a0a0f]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              Marketing isn't the real problem.<br />Lack of structure and repeatable systems is.
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Most businesses don't fail because of poor marketing. They stall because their growth depends on founders, fragmented tactics, and disconnected tools. Butterbloom Media fixes that by building structured, scalable growth systems designed for long-term performance — not short-term activity.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mt-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
              <img
                src="/Gillian.png"
                alt="Gillian Gertse - Founder & Managing Director of Butterbloom Media, Digital Marketing Agency South Africa"
                className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl border border-white/10"
              />
              <div className="text-center mt-6">
                <h3 className="text-2xl font-bold">Gillian Gertse</h3>
                <p className="text-gray-400 text-lg">Founder & Managing Director</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <Target className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Who We Work With</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We partner with established businesses that:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    Already generate revenue
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    Have teams or operational complexity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    Value structure, accountability, and long-term thinking
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    Are ready to invest in predictable growth systems
                  </li>
                </ul>
                <p className="text-gray-400 mt-4 text-sm italic">
                  This is not entry-level marketing.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-950/20 to-blue-950/20 backdrop-blur-lg border border-red-500/30 rounded-2xl p-8">
                <Award className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Who We Don't Work With</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We do not take on:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 flex-shrink-0">×</span>
                    One-off projects
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 flex-shrink-0">×</span>
                    Low-budget or hourly engagements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 flex-shrink-0">×</span>
                    Businesses without revenue or operational maturity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 flex-shrink-0">×</span>
                    Clients seeking daily hand-holding or reactive work
                  </li>
                </ul>
                <p className="text-gray-400 mt-4 text-sm">
                  This allows us to deliver focused, high-performance outcomes for serious partners.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-950/30 to-blue-950/30 backdrop-blur-lg border border-white/10 rounded-3xl p-12">
            <h3 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-3">
              <TrendingUp className="w-8 h-8 text-red-500" />
              Our Journey
            </h3>
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className="text-center transform hover:scale-110 transition-all duration-300"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-blue-500 flex items-center justify-center font-bold text-lg shadow-lg shadow-red-500/50">
                      {item.year}
                    </div>
                    <p className="text-gray-300 font-medium">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {[
              { icon: Users, label: 'Happy Clients', value: 'Across Borders' },
              { icon: Award, label: 'Projects Delivered', value: '300+' },
              { icon: TrendingUp, label: 'Success Rate', value: '98%' },
              { icon: Target, label: 'Years Experience', value: '3+' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                <stat.icon className="w-10 h-10 mx-auto mb-4 text-red-500" />
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
