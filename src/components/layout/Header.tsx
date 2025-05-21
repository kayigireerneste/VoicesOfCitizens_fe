import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare } from 'lucide-react';
import ThemeLanguageSwitch from '../ThemeLanguageSwitch';
import { useApp } from '../../contexts/AppContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useApp();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white dark:bg-gray-800 shadow-md' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <MessageSquare className="h-8 w-8 text-teal-700 dark:text-teal-500" />
          <div>
            <h1 className="text-xl font-bold text-teal-700 dark:text-teal-500">
              {t('hero.title')}
            </h1>
            <p className="text-xs text-teal-600 dark:text-teal-400">
              Voice of Citizens
            </p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-8">
            <NavLink to="/" label={t('nav.home')} active={location.pathname === '/'} />
            <NavLink to="/submit" label={t('nav.submit')} active={location.pathname === '/submit'} />
            <NavLink to="/track" label={t('nav.track')} active={location.pathname === '/track'} />
            <NavLink to="/login" label={t('nav.login')} active={location.pathname === '/login'} />
          </nav>
          <ThemeLanguageSwitch />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeLanguageSwitch />
          <button 
            className="text-teal-700 dark:text-teal-500 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg animate-fadeIn">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink to="/" label={t('nav.home')} active={location.pathname === '/'} />
            <MobileNavLink to="/submit" label={t('nav.submit')} active={location.pathname === '/submit'} />
            <MobileNavLink to="/track" label={t('nav.track')} active={location.pathname === '/track'} />
            <MobileNavLink to="/login" label={t('nav.login')} active={location.pathname === '/login'} />
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink: React.FC<{ to: string; label: string; active: boolean }> = ({ to, label, active }) => (
  <Link 
    to={to} 
    className={`font-medium transition-colors duration-200 ${
      active 
        ? 'text-teal-700 dark:text-teal-500 border-b-2 border-teal-700 dark:border-teal-500' 
        : 'text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400'
    }`}
  >
    {label}
  </Link>
);

const MobileNavLink: React.FC<{ to: string; label: string; active: boolean }> = ({ to, label, active }) => (
  <Link 
    to={to} 
    className={`p-2 font-medium transition-colors duration-200 ${
      active 
        ? 'text-teal-700 dark:text-teal-500 bg-teal-50 dark:bg-teal-900/20 rounded-lg' 
        : 'text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
    }`}
  >
    {label}
  </Link>
);

export default Header;