import { useEffect, useState } from 'react';
import { Target, Zap, Layout, Database, CheckCircle, X, ArrowRight } from 'lucide-react';
import Contact from '../components/Contact';

const WebsiteDesign = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
    document.title = 'Website Infrastructure for Scalable Growth | Butterbloom Media';
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const whatWeBuild = [
    {
      icon: Target,
      title: 'Conversion-Focused Website Infrastructure',
      description: 'Digital foundations designed to capture, qualify, and route prospects — not just display information.',
    },
    {
      icon: Layout,
      title: 'Clear Positioning and User Journeys',
      description: 'Strategic page structures that guide visitors toward defined actions aligned with your growth goals.',
    },
    {
      icon: Zap,
      title: 'SEO-Ready Technical Foundations',
      description: 'Professional website design built with search visibility, performance, and technical SEO best practices from the ground up.',
    },
    {
      icon: Database,
      title: 'Integration with Lead Capture and Automation Systems',
      description: 'Seamless connection to CRM, automation, and follow-up workflows — reducing manual intervention.',
    },
  ];

  const forList = [
    'Established businesses',
    'Companies with existing revenue',
    'Firms preparing to scale acquisition',
  ];

  const notForList = [
    'One-page websites',
    'Budget website packages',
    'DIY or template builds',
    'Businesses without growth systems in place',
  ];

  return (
    <div className="relative min-h-screen">
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-[#0a0a0f] to-blue-950/20"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-red-200 to-blue-200 bg-clip-text text-transparent leading-tight">
                Website Infrastructure for Scalable Growth
              </h1>

              <div className="max-w-4xl mx-auto space-y-6 text-gray-300 text-lg leading-relaxed">
                <p className="text-xl md:text-2xl">
                  Most websites fail because they're built as digital brochures — not as part of a growth system.
                </p>
                <p className="text-xl md:text-2xl">
                  At Butterbloom Media, website design is never a standalone service.
                </p>
                <p className="text-xl md:text-2xl font-medium text-white mt-8">
                  It is one component of a structured growth system designed to support predictable client acquisition and revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              What This Page Is
            </h2>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
              This page exists to explain how website infrastructure fits into the Butterbloom Growth System™.
            </p>
            <p className="text-2xl font-bold text-white text-center mt-8">
              We do not offer once-off website builds.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              What We Actually Build
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              When required, we design and build:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {whatWeBuild.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-red-950/30 to-blue-950/30 backdrop-blur-lg border border-white/10 rounded-3xl p-10 text-center">
            <p className="text-xl text-gray-300 italic">
              Every website is built to support a defined growth outcome — not aesthetics alone.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-950/30 to-blue-950/30 backdrop-blur-lg border border-green-500/20 rounded-3xl p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Who This Is For</h2>
              </div>

              <p className="text-gray-300 mb-6 text-lg">
                This approach is designed for:
              </p>

              <ul className="space-y-4">
                {forList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-300 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-950/30 to-gray-950/30 backdrop-blur-lg border border-red-500/20 rounded-3xl p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                  <X className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Who This Is Not For</h2>
              </div>

              <p className="text-gray-300 mb-6 text-lg">
                This is not suitable for:
              </p>

              <ul className="space-y-4">
                {notForList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-300 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
            Ready for Structured Growth?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            If your business needs website infrastructure as part of a scalable growth system, request a strategic conversation.
          </p>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-blue-500 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
          >
            Request a Strategic Conversation
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-gray-500 text-sm mt-6 italic">
            Minimum engagement and retainer terms apply.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 relative bg-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">How Website Infrastructure Supports Growth</h2>

          <div className="space-y-8 text-gray-300">
            <div>
              <h3 className="text-xl font-bold mb-3 text-white">Professional Website Design South Africa</h3>
              <p className="leading-relaxed">
                Our approach to website design in South Africa goes beyond aesthetics. We build conversion-focused websites that serve as the digital foundation for your entire growth system. Whether you're looking for professional website development or a complete website redesign, we ensure every element supports your business objectives.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">Conversion-Focused Websites</h3>
              <p className="leading-relaxed">
                Unlike traditional website design services that focus on appearance, we build websites that generate results. Our conversion-focused approach means every page, form, and call-to-action is strategically designed to move prospects through your sales process. This is website design as growth infrastructure, not decoration.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">Strategic Website Development</h3>
              <p className="leading-relaxed">
                Our website development process is integrated with the Butterbloom Growth System™. We don't just build websites — we create digital infrastructure that captures leads, integrates with your CRM, supports your SEO strategy, and reduces manual intervention. This systematic approach to website design ensures your online presence actively contributes to predictable revenue growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default WebsiteDesign;
