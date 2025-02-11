'use client';

import Link from 'next/link';
import { FaInstagram, FaXTwitter, FaEnvelope, FaLocationDot } from 'react-icons/fa6';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://instagram.com', label: 'Instagram', icon: FaInstagram },
  { href: 'https://twitter.com', label: 'Twitter', icon: FaXTwitter },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary to-primary-dark backdrop-blur-md text-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link 
              href="/"
              className="text-2xl font-bold text-text hover:text-primary_accent transition-all duration-300 transform hover:scale-[1.02]"
            >
              DARA GALLOPIN
            </Link>
            <p className="text-text/90 text-center md:text-left">
              Transforming moments into masterpieces
            </p>
            <div className="flex flex-col space-y-2 mt-4">
              <a 
                href="mailto:contact@example.com" 
                className="flex items-center space-x-2 text-text/80 hover:text-primary_accent transition-all duration-300 group"
              >
                <FaEnvelope className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>info@daragallopin.com</span>
              </a>
              <div className="flex items-center space-x-2 text-text/80">
                <FaLocationDot className="w-4 h-4" />
                <span>Bali, Indonesia</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-6 text-text relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-0.5 after:bg-primary_accent">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text/80 hover:text-primary_accent transition-all duration-300 transform hover:translate-x-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-6 text-text relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-0.5 after:bg-primary_accent">
              Connect
            </h3>
            <nav className="flex flex-col space-y-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text/80 hover:text-primary_accent transition-all duration-300 flex items-center gap-3 group"
                >
                  <link.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-text/10 text-center">
          <p className="text-text/70">
            &copy; {new Date().getFullYear()} DARA GALLOPIN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;