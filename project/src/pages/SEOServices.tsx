import { useEffect, useState } from 'react';
import { Search, Target, Database, TrendingUp, CheckCircle, X, ArrowRight, AlertTriangle } from 'lucide-react';
import Contact from '../components/Contact';

const SEOServices = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
    document.title = 'SEO Infrastructure for Predictable Growth | Butterbloom Media';
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const seoInfrastructure = [
    {
      icon: Database,
      title: 'Technical SEO Foundations Built for Scale',
      description: 'Site architecture, indexation management, and performance optimization designed to support long-term visibility and growth.',
    },
    {
      icon: Target,
      title: 'Conversion-Focused On-Page Optimisation',
      description: 'Content and page structure optimized not just for rankings, but for moving qualified prospects through buyer journeys.',
    },
    {
      icon: Search,
      title: 'Search Intent Alignment Tied to Buyer Journeys',
      description: 'Keyword targeting based on what your customers actually search for at each stage of their decision process.',
    },
    {
      icon: TrendingUp,
      title: 'Content Architecture That Supports Authority and Trust',
      description: 'Strategic content frameworks that establish expertise, answer buyer questions, and build market positioning.',
    },
  ];

  const forList = [
    'Established businesses with existing revenue',
    'Companies planning long-term digital growth',
    'Firms that value structure, consistency, and data',
  ];

  const notForList = [
    'Cheap SEO packages',
    'Ranking-only engagements',
    'Businesses without a defined offer or sales process',
    'Clients seeking immediate, short-term results',
  ];

  const systemRequirements = [
    {
      title: 'Positioning is clear',
      description: 'Your market knows what you do and who you serve',
    },
    {
      title: 'Infrastructure is conversion-ready',
      description: 'Your website captures and qualifies inbound prospects',
    },
    {
      title: 'Follow-up systems are in place',
      description: 'You have processes to engage and convert qualified leads',
    },
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
                SEO Infrastructure for Predictable Growth
              </h1>

              <div className="max-w-4xl mx-auto space-y-6 text-gray-300 text-lg leading-relaxed">
                <p className="text-xl md:text-2xl">
                  Search engine optimisation fails when it's treated as a tactic instead of infrastructure.
                </p>
                <p className="text-xl md:text-2xl">
                  At Butterbloom Media, SEO is not sold as a standalone service.
                </p>
                <p className="text-xl md:text-2xl">
                  It is implemented as part of a structured growth system designed to support predictable client acquisition and long-term visibility.
                </p>
                <p className="text-xl md:text-2xl font-medium text-white mt-8">
                  We do not chase rankings for vanity. We build SEO foundations that support revenue-generating growth systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-red-950/30 to-gray-950/30 backdrop-blur-lg border-2 border-red-500/30 rounded-3xl p-12">
            <div className="flex items-center gap-4 mb-6 justify-center">
              <AlertTriangle className="w-10 h-10 text-red-500" />
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                This Is Not a Standalone SEO Service
              </h2>
            </div>
            <div className="space-y-4 text-gray-300 text-lg text-center max-w-3xl mx-auto">
              <p>
                SEO at Butterbloom Media is delivered exclusively as part of the Butterbloom Growth System™.
              </p>
              <p className="font-medium text-white">
                We do not offer once-off SEO projects, quick fixes, or low-budget optimisation packages.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              What Our SEO Infrastructure Includes
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              When SEO is required within a growth system, it includes:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {seoInfrastructure.map((item, index) => (
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

          <div className="bg-gradient-to-br from-red-950/30 to-blue-950/30 backdrop-blur-lg border border-white/10 rounded-3xl p-10">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-bold">Integration with Lead Capture and Automation Systems</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              SEO-driven traffic is routed through qualification systems, CRM integration, and follow-up workflows — ensuring inbound visibility translates to pipeline activity.
            </p>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-gray-400 italic">
              SEO is measured by qualified inbound activity, not keyword screenshots.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              How SEO Fits Into the Growth System
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              SEO works when:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {systemRequirements.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{item.title}</h3>
                <p className="text-gray-400 text-center leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-red-950/30 to-gray-950/30 backdrop-blur-lg border border-red-500/20 rounded-3xl p-10 text-center">
            <p className="text-xl text-gray-300 leading-relaxed mb-4">
              Without these, traffic increases — but revenue does not.
            </p>
            <p className="text-2xl font-bold text-white">
              That's why SEO is never executed in isolation.
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
            SEO Without Systems Is Just Traffic
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            If your business needs SEO as part of a structured growth system — not as a disconnected tactic — request a strategic conversation.
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
          <h2 className="text-3xl font-bold mb-8 text-center">SEO Authority and Long-Term Visibility</h2>

          <div className="space-y-8 text-gray-300">
            <div>
              <h3 className="text-xl font-bold mb-3 text-white">SEO Services South Africa</h3>
              <p className="leading-relaxed">
                As a professional SEO agency operating in South Africa, we work exclusively with established businesses that understand the difference between traffic and revenue. Our approach to search engine optimisation South Africa focuses on building sustainable visibility that supports predictable client acquisition, not vanity metrics.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">Organic Traffic Growth Through Strategic SEO</h3>
              <p className="leading-relaxed">
                Organic traffic growth is valuable only when it brings qualified prospects who match your ideal customer profile. Our SEO infrastructure is designed to attract, qualify, and route the right visitors — those who are actively searching for solutions you provide and are positioned to make buying decisions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">Professional SEO Agency Built on Systems</h3>
              <p className="leading-relaxed">
                Unlike traditional SEO services that operate in isolation, our professional SEO approach integrates search visibility with conversion infrastructure, lead capture systems, and follow-up automation. This ensures that search engine optimisation delivers business outcomes, not just rankings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-400 font-medium">
            Butterbloom Media — Growth Systems, Not Marketing Chaos
          </p>
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default SEOServices;
