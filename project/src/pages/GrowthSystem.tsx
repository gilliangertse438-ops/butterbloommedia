import { useEffect, useState } from 'react';
import { Target, Building2, Zap, TrendingUp, CheckCircle, X, ArrowRight } from 'lucide-react';
import Contact from '../components/Contact';

const GrowthSystem = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
    document.title = 'How the Butterbloom Growth System Works | Butterbloom Media';
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const steps = [
    {
      number: '01',
      icon: Target,
      title: 'Diagnose',
      subtitle: 'Clarity Before Action',
      description: 'We start by identifying:',
      points: [
        'Where growth is breaking down',
        'Which channel actually matters',
        'What systems are missing',
      ],
      footer: 'No execution begins without clarity. This prevents wasted spend and scattered effort.',
    },
    {
      number: '02',
      icon: Building2,
      title: 'Build',
      subtitle: 'Growth Infrastructure',
      description: 'We build the foundation required for scale:',
      points: [
        'Conversion-focused digital infrastructure',
        'Clear positioning and offer structure',
        'One primary acquisition channel (paid or organic)',
      ],
      footer: 'We do not "try everything." We build what works.',
    },
    {
      number: '03',
      icon: Zap,
      title: 'Automate',
      subtitle: 'Remove Founder Dependency',
      description: 'We implement systems that:',
      points: [
        'Capture and qualify leads automatically',
        'Route prospects into structured follow-up',
        'Reduce manual intervention and chaos',
      ],
      footer: 'Growth should not depend on availability or heroics.',
    },
    {
      number: '04',
      icon: TrendingUp,
      title: 'Optimise',
      subtitle: 'Measure What Matters',
      description: 'Every system is monitored and refined through:',
      points: [
        'Clear KPIs tied to revenue activity',
        'Monthly performance reviews',
        'Data-driven optimisation',
      ],
      footer: 'If it can\'t be measured, it doesn\'t scale.',
    },
  ];

  const forList = [
    'Already generate revenue',
    'Have operational complexity',
    'Want predictable growth',
    'Value structure and accountability',
  ];

  const notForList = [
    'One-off projects',
    'Low-budget engagements',
    'Businesses without revenue',
    'Clients seeking constant reactive support',
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
                How the Butterbloom Growth System™ Works
              </h1>

              <div className="max-w-4xl mx-auto space-y-6 text-gray-300 text-lg leading-relaxed">
                <p className="text-xl md:text-2xl">
                  Most businesses don't fail because of bad marketing.
                </p>
                <p className="text-xl md:text-2xl">
                  They stall because growth depends on founders, fragmented tactics, and disconnected tools.
                </p>
                <p className="text-xl md:text-2xl font-medium text-white mt-8">
                  The Butterbloom Growth System™ replaces chaos with structure — and guesswork with predictable execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="text-6xl font-bold text-white/10">
                        {step.number}
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-blue-500 rounded-2xl flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold mb-2">{step.title}</h2>
                    <h3 className="text-xl text-gray-400 mb-6">{step.subtitle}</h3>

                    <p className="text-gray-300 mb-4">{step.description}</p>

                    <ul className="space-y-3 mb-6">
                      {step.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 border-t border-white/10">
                      <p className="text-gray-400 italic">{step.footer}</p>
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
                    <div className="relative bg-gradient-to-br from-red-950/30 to-blue-950/30 backdrop-blur-lg border border-white/10 rounded-3xl p-16 flex items-center justify-center">
                      <div className="text-center">
                        <step.icon className="w-32 h-32 text-white/20 mx-auto mb-4" />
                        <div className="text-8xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                          {step.number}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                This system is designed for businesses that:
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
                This is not for:
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
            Request a strategic conversation to determine if there's a fit.
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

      <Contact />
    </div>
  );
};

export default GrowthSystem;
