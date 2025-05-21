import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Facebook, Twitter, Instagram, } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const Footer: React.FC = () => {
  const { t } = useApp();

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="h-6 w-6 text-teal-400" />
              <div>
                <h3 className="font-bold">{t('hero.title')}</h3>
                <p className="text-xs text-teal-400">Voice of Citizens</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              {t('footer.about')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-teal-400">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <FooterLink to="/" label={t('nav.home')} />
              <FooterLink to="/submit" label={t('nav.submit')} />
              <FooterLink to="/track" label={t('nav.track')} />
              <FooterLink to="/faq" label="FAQ" />
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-teal-400">{t('footer.govLinks')}</h4>
            <ul className="space-y-2">
              <FooterLink to="#" label="Ministry of Local Government" />
              <FooterLink to="#" label="Rwanda Development Board" />
              <FooterLink to="#" label="Irembo Services" />
              <FooterLink to="#" label="Rwanda Governance Board" />
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-teal-400">{t('footer.contact')}</h4>
            <address className="not-italic text-gray-300 text-sm space-y-2">
              <p>Kigali, Rwanda</p>
              <p>P.O. Box 1234</p>
              <p>Email: info@ijwiryabaturage.rw</p>
              <p>Phone: +250 788 123 456</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} {t('hero.title')}. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-300 hover:text-teal-400 transition-colors duration-200 text-sm"
    >
      {label}
    </Link>
  </li>
);

export default Footer;