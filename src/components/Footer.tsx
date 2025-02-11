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
  { href: 'https://x.com', label: 'Twitter', icon: FaXTwitter },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary to-primary-dark text-text py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
          {/* Brand & Contact */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link 
              href="/"
              className="logo-font text-2xl sm:text-3xl md:text-3xl font-extrabold hover:text-primary_accent transition-colors"
            >
              DARA GALLOPIN
            </Link>
            <p className="text-sm md:text-base max-w-xs">
              Transforming moments into masterpieces.
            </p>
            <div className="flex flex-col items-center md:items-start space-y-2">
              <a 
                href="mailto:info@daragallopin.com" 
                className="flex items-center space-x-2 hover:text-primary_accent transition-colors text-sm md:text-base"
              >
                <FaEnvelope className="w-5 h-5" />
                <span>info@daragallopin.com</span>
              </a>
              <div className="flex items-center space-x-2 text-sm md:text-base">
                <FaLocationDot className="w-5 h-5" />
                <span>Bali, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-4 relative inline-block 
                           after:content-[''] after:absolute after:-bottom-1 
                           after:left-1/2 md:after:left-0 after:translate-x-[-50%] 
                           md:after:translate-x-0 after:w-10 after:h-1 after:bg-primary_accent">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary_accent transition-transform transform hover:translate-x-2 text-sm md:text-base"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-4 relative inline-block 
                           after:content-[''] after:absolute after:-bottom-1 
                           after:left-1/2 md:after:left-0 after:translate-x-[-50%] 
                           md:after:translate-x-0 after:w-10 after:h-1 after:bg-primary_accent">
              Connect
            </h3>
            <nav className="flex items-center space-x-4 md:space-x-6 justify-center md:justify-start">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 hover:text-primary_accent transition-all"
                  >
                    <Icon className="w-6 h-6 hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline-block text-sm">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 md:mt-12 border-t border-text/20 pt-6 text-center">
          <p className="text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} DARA GALLOPIN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
