import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Search, BarChart2, Shield, ArrowRight } from 'lucide-react';
// Remove i18next import, use AppContext for translation
import { useApp } from '../contexts/AppContext';

const HomePage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-800 to-blue-900 text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto animate-fadeIn" style={{animationDelay: '0.2s'}}>
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn" style={{animationDelay: '0.4s'}}>
            <Link 
              to="/submit" 
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>{t('hero.submit')}</span>
            </Link>
            <Link 
              to="/track" 
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Search size={20} />
              <span>{t('hero.track')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard 
              title={t('stats.resolved')} 
              value="3,547" 
              description={t('stats.resolved.desc')} 
              color="text-green-600"
            />
            <StatCard 
              title={t('stats.response')} 
              value="48 hrs" 
              description={t('stats.response.desc')} 
              color="text-blue-600"
            />
            <StatCard 
              title={t('stats.satisfaction')} 
              value="94%" 
              description={t('stats.satisfaction.desc')} 
              color="text-teal-600"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">{t('features.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MessageCircle size={24} className="text-teal-600" />}
              title={t('features.submit.title')}
              description={t('features.submit.desc')}
              step="1"
            />
            <FeatureCard 
              icon={<BarChart2 size={24} className="text-teal-600" />}
              title={t('features.track.title')}
              description={t('features.track.desc')}
              step="2"
            />
            <FeatureCard 
              icon={<Shield size={24} className="text-teal-600" />}
              title={t('features.resolve.title')}
              description={t('features.resolve.desc')}
              step="3"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">{t('categories.title')}</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('categories.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CategoryCard title={t('categories.infrastructure')} description={t('categories.infrastructure.desc')} />
            <CategoryCard title={t('categories.healthcare')} description={t('categories.healthcare.desc')} />
            <CategoryCard title={t('categories.education')} description={t('categories.education.desc')} />
            <CategoryCard title={t('categories.utilities')} description={t('categories.utilities.desc')} />
            <CategoryCard title={t('categories.transport')} description={t('categories.transport.desc')} />
            <CategoryCard title={t('categories.admin')} description={t('categories.admin.desc')} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Link 
            to="/submit" 
            className="inline-flex items-center space-x-2 bg-white text-teal-800 px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-opacity-90"
          >
            <span>{t('cta.button')}</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; description: string; color: string }> = ({ 
  title, value, description, color 
}) => (
  <div className="bg-white rounded-lg p-8 shadow-md text-center border-t-4 border-teal-600 hover:shadow-lg transition-shadow duration-300 animate-slideInUp">
    <h3 className="text-gray-700 font-medium mb-2">{title}</h3>
    <p className={`text-4xl font-bold mb-2 ${color}`}>{value}</p>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; step: string }> = ({
  icon, title, description, step
}) => (
  <div className="bg-white rounded-lg p-8 shadow-md relative hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slideInUp">
    <div className="absolute -top-4 -left-4 bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
      {step}
    </div>
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const CategoryCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="border border-gray-200 rounded-lg p-6 hover:border-teal-500 hover:shadow-md transition-all duration-300 animate-slideInUp">
    <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default HomePage;