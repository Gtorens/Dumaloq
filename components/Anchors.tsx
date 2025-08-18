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
  return (
    <div className="floor-block">
      <img src={imageUrl} alt={title} className="floor-image-bg" />
      <div className="floor-overlay">
        <div className="floor-number">{floorNum}</div>
        <div className="floor-text-block">
          <h3 className="floor-title">{title}</h3>
          <p className="floor-description">{description}</p>
          <div className="floor-logos">
            {logos.map(logo => (
              <div key={logo.name} className="floor-logo">
                <img src={logo.url} alt={`${logo.name} logo`} title={logo.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FloorsOverview: React.FC = () => {
    const { texts } = useAppContext();

  return (
            <section className="py-20 section-variant-3 transition-colors duration-300 modern-section section-spacing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="floors-overview-title text-light-text dark:text-dark-text mb-4">{texts.floorsOverview.title}</h2>
          <p className="floors-overview-description max-w-3xl mx-auto text-light-text-secondary dark:text-dark-text-secondary">
            {texts.floorsOverview.subtitle}
          </p>
        </div>
        <div className="space-y-8">
          {texts.floorsOverview.floors.map((floor, index) => (
            <FloorCard key={floor.floorNum} {...floor} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FloorsOverview;