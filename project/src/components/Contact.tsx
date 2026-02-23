import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
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

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-red-950/5 to-[#0a0a0f]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              Request a Strategic Conversation
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-8"></div>

            <div className="max-w-3xl mx-auto space-y-4 text-gray-300 leading-relaxed">
              <p className="text-lg">
                Butterbloom Media partners with established businesses that are ready for structured, long-term growth.
              </p>
              <p className="text-lg font-medium text-white">
                We do not offer once-off projects, low-budget engagements, or reactive marketing support.
              </p>
              <p className="text-lg">
                Our work is built around retainers, systems, and accountability — not quick fixes.
              </p>
              <p className="text-lg">
                If you're exploring predictable growth through structured systems, you're in the right place.
              </p>
              <p className="text-gray-400 text-sm mt-6 italic">
                Minimum engagement and standard retainer terms apply.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>

                <div className="space-y-6">
                  <a href="mailto:info@mrbutterbloom.co.za" className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-red-500/50 transition-all">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Email</div>
                      <div className="font-medium">info@mrbutterbloom.co.za</div>
                    </div>
                  </a>

                  <a href="tel:+27838228458" className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Phone</div>
                      <div className="font-medium">+27 83 822 8458</div>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-red-500/30 transition-all">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Serving</div>
                      <div className="font-medium">South Africa & Beyond</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="font-bold mb-4">Connect With Us</h4>
                  <div className="flex gap-4">
                    <a
                      href="https://www.facebook.com/profile.php?id=100088705351454"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:scale-110 transition-all duration-300 flex items-center justify-center font-bold"
                      title="Facebook"
                    >
                      f
                    </a>
                    <a
                      href="https://www.instagram.com/butterbloom_media/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:scale-110 transition-all duration-300 flex items-center justify-center font-bold"
                      title="Instagram"
                    >
                      i
                    </a>
                    <a
                      href="https://www.linkedin.com/in/gillian-gertse-250808a0/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:scale-110 transition-all duration-300 flex items-center justify-center font-bold"
                      title="LinkedIn"
                    >
                      in
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-950/30 to-blue-950/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Our Approach</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Retainer-based partnerships, not one-off projects
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Structured systems designed for predictability
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Revenue-focused reporting and optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Professional execution at every stage
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Request a Strategic Conversation</h3>

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                action="/thank-you"
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="contact" />

                <p style={{ display: 'none' }}>
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-red-500 transition-colors duration-300"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-red-500 transition-colors duration-300"
                    placeholder="+27 83 822 8458"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Primary Interest</label>
                  <select
                    name="service"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    required
                  >
                    <option value="">Select primary interest</option>
                    <option value="growth-system">Complete Growth System</option>
                    <option value="infrastructure">Digital Infrastructure</option>
                    <option value="acquisition">Acquisition Channel Development</option>
                    <option value="automation">Lead Capture & Automation</option>
                    <option value="seo">SEO Services</option>
                    <option value="other">Other / Unsure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Tell Us About Your Business</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-red-500 transition-colors duration-300 resize-none"
                    placeholder="Current revenue, team size, what you're looking to achieve..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-blue-500 rounded-xl font-semibold hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  Request a Strategic Conversation
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-gray-500 text-xs">
                  Butterbloom Media — Growth Systems, Not Marketing Chaos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2">
        <a
          href="https://wa.me/27838228458"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 hover:scale-110 transition-all duration-300 group"
        >
          <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </a>
        <span className="text-sm font-medium text-white bg-green-600/90 px-3 py-1 rounded-full whitespace-nowrap">
          Chat With Us
        </span>
      </div>
    </section>
  );
};

export default Contact;
