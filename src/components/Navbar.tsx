"use client"
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeMenu]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' }
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary/95 shadow-lg backdrop-blur-sm' 
          : 'bg-primary-dark/90 backdrop-blur-sm'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold transition-all duration-300 group"
            aria-label="Go to homepage"
          >
            <span className="text-text group-hover:text-primary_accent transition-all transform group-hover:scale-[1.02]">
              DARA GALLOPIN
            </span>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 transition-all group ${
                  pathname === link.href 
                    ? 'text-primary_accent' 
                    : isScrolled
                      ? 'text-text/80 hover:text-text'
                      : 'text-text/90 hover:text-primary_accent'
                }`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
                <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary_accent transition-all duration-300 transform -translate-x-1/2 group-hover:w-1/2 ${
                  pathname === link.href ? 'w-1/2' : ''
                }`} />
              </Link>
            ))}
            <Link
              href="/contact"
              className={`ml-4 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-95 ${
                isScrolled
                  ? 'bg-primary_accent hover:bg-primary_accent-light text-primary shadow-lg hover:shadow-xl'
                  : 'border-2 border-text text-text hover:bg-primary_accent hover:text-primary hover:border-primary_accent'
              }`}
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 active:scale-90 ${
              isScrolled
                ? 'text-text/80 hover:text-text hover:bg-primary_accent/10'
                : 'text-text hover:text-primary_accent hover:bg-text/10'
            }`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={closeMenu}
      />

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`absolute top-16 left-0 right-0 md:hidden transform transition-all duration-300 ease-out ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 pointer-events-none'
        }`}
      >
        <div className="mx-4 rounded-lg overflow-hidden">
          <div className="px-2 pt-2 pb-3 space-y-1.5 bg-primary-dark/95 backdrop-blur-lg shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg transition-all duration-300 active:scale-[0.98] ${
                  pathname === link.href 
                    ? 'text-primary_accent bg-primary_accent/10' 
                    : 'text-text/80 hover:text-text hover:bg-primary_accent/10'
                }`}
                onClick={closeMenu}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block px-4 py-3 mt-3 text-center bg-primary_accent text-primary hover:bg-primary_accent-light rounded-lg transition-all duration-300 active:scale-[0.98] shadow-lg"
              onClick={closeMenu}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;