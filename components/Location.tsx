import React from 'react';
import { CarIcon, MountainIcon, MapPinIcon } from './IconComponents';
import { useAppContext } from '../contexts/AppContext';

const Location: React.FC = () => {
  const { texts, theme } = useAppContext();

  return (
    <section className="py-20 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors duration-300 modern-section section-spacing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{texts.location.title}</h2>
          <p className="max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
            {texts.location.subtitle}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2 h-96 rounded-lg overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000.916175953041!2d69.7559563154084!3d41.55231067924844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDMzJzA4LjMiTiA2OcKwNDUnMzAuNyJF!5e0!3m2!1sen!2sus!4v1620912000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              className="dark:filter dark:grayscale-[1] dark:contrast-[1.2] dark:opacity-[0.8]"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="Dumoloq Location"
            ></iframe>
          </div>
          <div className="w-full lg:w-1/2 space-y-8">
            <div className={`section-card ${theme === 'light' ? 'light-card-specific' : ''}`}>
              <div className="flex items-center text-xl font-semibold mb-2">
                <MapPinIcon className="w-6 h-6 mr-3 text-accent-red" />
                {texts.location.map.title}
              </div>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=41.552305,69.758531" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent-red hover:underline text-lg"
              >
                {texts.location.map.link}
              </a>
            </div>
            <div className={`section-card ${theme === 'light' ? 'light-card-specific' : ''}`}>
              <div className="flex items-center text-xl font-semibold mb-2">
                 <CarIcon className="w-6 h-6 mr-3 text-accent-red" />
                 {texts.location.traffic.title}
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-lg">
                <strong className="text-light-text dark:text-dark-text text-3xl font-bold dark:drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]">{texts.location.traffic.value}</strong> {texts.location.traffic.description}
              </p>
            </div>
            <div className={`section-card ${theme === 'light' ? 'light-card-specific' : ''}`}>
              <div className="flex items-center text-xl font-semibold mb-2">
                <MountainIcon className="w-6 h-6 mr-3 text-accent-red" />
                {texts.location.radius.title}
              </div>
              <ul className="list-disc list-inside text-light-text-secondary dark:text-dark-text-secondary space-y-2 text-lg">
                {texts.location.radius.items.map((item, index) => (
                   <li key={index}><strong className="text-light-text dark:text-dark-text">{item.label}</strong> {item.value}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;