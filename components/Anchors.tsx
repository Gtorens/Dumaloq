import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const FloorCard: React.FC<{
  floorNum: string;
  title: string;
  description: string;
  logos: { url: string; name: string }[];
  imageUrl: string;
  index: number;
}> = ({ floorNum, title, description, logos, imageUrl, index }) => {
  const isEven = index % 2 === 1; // Четные индексы (1, 3) будут иметь обратный порядок
  
  return (
    <div className={`floor-block ${isEven ? 'flex-row-reverse' : ''}`}>
      <div className="floor-image-wrapper">
        <div className="relative">
          <div className="floor-number">{floorNum}</div>
          <img src={imageUrl} alt={title} className="floors-overview-image" />
        </div>
      </div>
      <div className="floor-content section-card">
        <h3 className="floors-overview-title text-light-text dark:text-dark-text mb-3">{title}</h3>
        <p className="floors-overview-description text-light-text-secondary dark:text-dark-text-secondary mb-6">{description}</p>
        <div className="flex flex-wrap items-center gap-6">
          {logos.map(logo => (
            <img key={logo.name} src={logo.url} alt={`${logo.name} logo`} className="h-10 md:h-12 object-contain dark:grayscale dark:opacity-70 dark:hover:grayscale-0 dark:hover:opacity-100 transition-all duration-300" title={logo.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

const FloorsOverview: React.FC = () => {
    const { texts } = useAppContext();

  return (
            <section className="py-20 bg-light-primary dark:bg-dark-primary transition-colors duration-300 modern-section section-spacing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="floors-overview-title text-light-text dark:text-dark-text mb-4">{texts.floorsOverview.title}</h2>
          <p className="floors-overview-description max-w-3xl mx-auto text-light-text-secondary dark:text-dark-text-secondary">
            {texts.floorsOverview.subtitle}
          </p>
        </div>
        <div className="space-y-20">
          {texts.floorsOverview.floors.map((floor, index) => (
            <FloorCard key={floor.floorNum} {...floor} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FloorsOverview;