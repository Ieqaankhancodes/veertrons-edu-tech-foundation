import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/vetf_logo.png';

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 lg:gap-16">

        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-4 mb-6">
            <div className="w-16 h-12 sm:w-20 sm:h-14 flex items-center justify-center overflow-hidden shrink-0">
              <img src={logo} alt="Veertrons Foundation" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-white text-lg font-heading font-bold uppercase tracking-wide">Veertrons</p>
              <p className="text-brand-lightBlue text-xs font-medium uppercase tracking-widest">Foundation</p>
            </div>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
            Empowering minds and uplifting futures through holistic development, education, and health programs across the region.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/donate" className="bg-brand-orange hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors">
              Support Us
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/#mission" className="text-gray-400 hover:text-white transition-colors">Our Mission</Link></li>
            <li><Link to="/#programs" className="text-gray-400 hover:text-white transition-colors">Programs</Link></li>
            <li><Link to="/#get-involved" className="text-gray-400 hover:text-white transition-colors">Get Involved</Link></li>
            <li><Link to="/#contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tax Exemption Info</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm font-medium text-center md:text-left">
          &copy; {new Date().getFullYear()} Veertrons Foundation. All rights reserved.
        </p>
        <p className="text-gray-600 text-sm">Designed by a Professional IT Company</p>
      </div>
    </footer>
  );
}
