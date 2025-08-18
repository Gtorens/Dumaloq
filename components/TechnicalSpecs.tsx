import React from 'react';
import { ParkingIcon, CeilingHeightIcon, UtilitiesIcon, ElevatorIcon, SecurityIcon, AirConditioningIcon } from './IconComponents';
import { useAppContext } from '../contexts/AppContext';

const SpecItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="section-card hover:border-accent-green card-spacing">
    <div className="flex flex-col items-center text-center mb-4">
      <div className="text-accent-green mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-light-text dark:text-dark-text">{title}</h3>
    </div>
    <p className="text-light-text-secondary dark:text-dark-text-secondary text-center">{description}</p>
  </div>
);

const TechnicalSpecs: React.FC = () => {
    const { texts } = useAppContext();

    const icons: { [key: string]: React.ReactNode } = {
        parking: <ParkingIcon className="tech-icon"/>,
        ceiling: <CeilingHeightIcon className="tech-icon"/>,
        utilities: <UtilitiesIcon className="tech-icon"/>,
        transport: <ElevatorIcon className="tech-icon"/>,
        security: <SecurityIcon className="tech-icon"/>,
        airconditioning: <AirConditioningIcon className="tech-icon"/>
    };

  return (
            <section className="py-20 section-variant-1 transition-colors duration-300 modern-section section-spacing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">{texts.techSpecs.title}</h2>
        </div>
        <div className="modern-card-grid max-w-6xl mx-auto">
          {texts.techSpecs.specs.map((spec, index) => (
            <SpecItem key={index} icon={icons[spec.icon]} title={spec.title} description={spec.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecs;