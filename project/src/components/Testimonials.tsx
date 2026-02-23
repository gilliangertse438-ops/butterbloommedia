import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
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

  const testimonials = [
    {
      name: 'Thabo Mokoena',
      role: 'Founder, E-commerce Company',
      rating: 5,
      text: 'The system they built has been running consistently for 18 months. No more guessing, no more chasing tactics. We have predictable lead flow and clear visibility into what drives revenue. The professionalism is unmatched.',
    },
    {
      name: 'Amanda van der Merwe',
      role: 'Managing Partner, Professional Services Firm',
      rating: 5,
      text: 'They replaced chaos with structure. Monthly reporting is tied directly to pipeline activity, not vanity metrics. The team is responsive, strategic, and operates like an extension of our business.',
    },
    {
      name: 'Sipho Dlamini',
      role: 'CEO, B2B Technology Company',
      rating: 5,
      text: 'Butterbloom focused on building one acquisition channel that actually scales. No distractions. No over-promising. Just consistent execution and transparent communication. That approach delivered results.',
    },
    {
      name: 'Nicole Swanepoel',
      role: 'Operations Director, Service Business',
      rating: 5,
      text: 'The automation system they implemented removed founder dependency and gave us back 40 hours per week. Everything runs predictably now. We can finally focus on delivery instead of firefighting marketing.',
    },
    {
      name: 'Kagiso Petersen',
      role: 'Founder, Online Platform',
      rating: 5,
      text: 'They designed a growth system from scratch that integrated seamlessly with our operations. No fluff. No hype. Just structured work that compounds over time. This is what professional marketing looks like.',
    },
    {
      name: 'Rachel Naidoo',
      role: 'Head of Growth, Retail Company',
      rating: 5,
      text: 'Working with Butterbloom is refreshingly different. They set clear boundaries, maintain high standards, and deliver on commitments. The results have been consistent quarter over quarter.',
    },
  ];

  return (
    <section id="testimonials" ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-blue-950/5 to-[#0a0a0f]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              What Partners Say About Working With Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Structured engagements. Consistent performance. Professional execution. Results that compound over time.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-16 h-16 text-red-500" />
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-red-500 text-red-500" />
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
                  "{testimonial.text}"
                </p>

                <div className="border-t border-white/10 pt-4">
                  <div className="font-bold text-lg">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl"></div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-8 bg-gradient-to-r from-red-950/30 to-blue-950/30 backdrop-blur-lg border border-white/10 rounded-full px-12 py-6">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                  4.9/5
                </div>
                <div className="text-gray-400 text-sm mt-1">Average Rating</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                  Happy Clients Across Borders
                </div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                  98%
                </div>
                <div className="text-gray-400 text-sm mt-1">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
