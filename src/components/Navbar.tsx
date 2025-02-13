"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from "@/components/ui/button";

// Custom hook to track scroll position
function useScrolled(threshold = 10) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}

const Navbar = () => {
  const isScrolled = useScrolled();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Close menu on Escape key press
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
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Get in Touch' },
  ];

  // Navbar background & shadow based on scroll position
  const navClasses = isScrolled
    ? 'bg-background/95 shadow-lg backdrop-blur-sm'
    : 'bg-background/90 backdrop-blur-sm';

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${navClasses}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex items-center space-x-3 text-2xl sm:text-2xl md:text-3xl font-bold logo-font transition-transform duration-300 group"
            aria-label="Go to homepage"
          >
            <Image
              src="/logo.webp"
              alt="Dara Gallopin Logo"
              width={40}
              height={40}
              className="w-auto h-6 md:h-7"
            />
            <span className="text-foreground group-hover:text-accent transition-colors transform group-hover:scale-105">
              DARA GALLOPIN
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.slice(0, -1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 transition-colors duration-300 group ${
                  pathname === link.href
                    ? 'text-accent'
                    : isScrolled
                    ? 'text-foreground/80 hover:text-foreground'
                    : 'text-foreground/90 hover:text-accent'
                }`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-1/2 h-0.5 bg-accent transition-all duration-300 transform -translate-x-1/2 ${
                    pathname === link.href ? 'w-1/2' : 'w-0 group-hover:w-1/2'
                  }`}
                />
              </Link>
            ))}
            <Button 
              asChild
              className={`${isScrolled ? 'btn-primary' : 'bg-transparent border border-foreground/20 text-foreground hover:text-accent hover:border-accent'}`}
            >
              <Link href={navLinks[3].href}>
                {navLinks[3].label}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            className="btn-ghost md:hidden"
            size="icon"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 bg-background/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={`absolute top-16 left-0 right-0 md:hidden transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 pointer-events-none'
        }`}
      >
        <div className="mx-4 rounded-lg overflow-hidden shadow-lg">
          <div className="px-4 py-3 space-y-2 bg-card backdrop-blur-md">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                asChild
                className={`w-full justify-start ${pathname === link.href ? 'btn-primary' : 'btn-ghost'}`}
              >
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
