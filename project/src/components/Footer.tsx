const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050508] border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                Butterbloom Media
              </span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed mb-2">
              Growth Systems, Not Marketing Chaos
            </p>
            <p className="text-gray-500 text-sm max-w-md leading-relaxed">
              Structured, revenue-focused growth systems for established businesses. Retainer-based partnerships since 2022.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-red-500 transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-red-500 transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-red-500 transition-colors">Portfolio</a></li>
              <li><a href="#testimonials" className="hover:text-red-500 transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-red-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Growth System</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#services" className="hover:text-blue-500 transition-colors">Digital Infrastructure</a></li>
              <li><a href="#services" className="hover:text-blue-500 transition-colors">Acquisition Channels</a></li>
              <li><a href="#services" className="hover:text-blue-500 transition-colors">Lead Automation</a></li>
              <li><a href="#services" className="hover:text-blue-500 transition-colors">Performance Reporting</a></li>
              <li><a href="/seo-services-south-africa" className="hover:text-blue-500 transition-colors">SEO Services</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Butterbloom Media. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
