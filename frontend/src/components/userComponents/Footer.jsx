import { Heart, Phone, Mail, MapPin, Shield, Award, Truck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-50 to-indigo-50 border-t border-slate-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Vijaya Pharmaceuticals</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Your trusted partner in quality healthcare since 1995. Providing premium pharmaceutical products with excellence and care.
              </p>
            </div>
            
            {/* Trust Badges */}
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-teal-400">25+</div>
                <div className="text-xs text-slate-500">Years</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-indigo-400">10k+</div>
                <div className="text-xs text-slate-500">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-violet-400">500+</div>
                <div className="text-xs text-slate-500">Products</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-slate-900">Quick Links</h4>
            <nav className="space-y-3">
              <Link to="/" className="block text-slate-600 hover:text-teal-600 transition-colors duration-300">
                Home
              </Link>
              <Link to="/user/product" className="block text-slate-600 hover:text-teal-600 transition-colors duration-300">
                Products
              </Link>
              <Link to="/user/company" className="block text-slate-600 hover:text-teal-600 transition-colors duration-300">
                Company
              </Link>
              <Link to="/user/contact" className="block text-slate-600 hover:text-teal-600 transition-colors duration-300">
                Contact
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-slate-900">Our Services</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-teal-600" />
                <span className="text-slate-600">Premium Quality</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-indigo-600" />
                <span className="text-slate-600">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-violet-600" />
                <span className="text-slate-600">Expert Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span className="text-slate-600">Secure & Safe</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-6 text-slate-900">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-600">+1 (123) 456-7890</p>
                  <p className="text-xs text-slate-500">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-600">contact@company.com</p>
                  <p className="text-xs text-slate-500">Quick Response</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-violet-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-600">Vijaya Pharmaceuticals</p>
                  <p className="text-xs text-slate-500">Visit Our Store</p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            {/* <div className="mt-6">
              <h5 className="text-sm font-semibold text-slate-900 mb-3">Stay Updated</h5>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-indigo-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-teal-50 to-indigo-50 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <p className="text-sm text-slate-600">
                © 2024 Vijaya Pharmaceuticals. All rights reserved.
              </p>
              <div className="hidden sm:flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-xs text-slate-500">FDA Approved</span>
              </div>
            </div>

            {/* Legal Links */}
            <nav className="flex items-center space-x-6">
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-teal-600 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-teal-600 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-teal-600 transition-colors duration-300"
              >
                HIPAA Compliance
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Certifications Bar */}
      {/* <div className="bg-gradient-to-r from-teal-50 to-indigo-50 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-wrap items-center justify-center space-x-8 text-xs text-slate-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>FDA Registered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-teal-600" />
              <span>ISO Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>Licensed Pharmacists</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-violet-600" />
              <span>Healthcare Excellence</span>
            </div>
          </div>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;