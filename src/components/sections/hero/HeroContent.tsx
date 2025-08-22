import React from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import { Button } from '../../ui';

interface HeroContentProps {
  onCTAClick: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ onCTAClick }) => {
  const { texts } = useAppContext();

  return (
    <div className="relative z-10 p-4 max-w-4xl mx-auto animate-fade-in">
      <h1 
        className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight opacity-0 animate-fade-in-up" 
        style={{
          textShadow: '2px 2px 8px rgba(0,0,0,0.8)', 
          animationDelay: '0.3s'
        }}
        itemProp="name"
      >
        {texts.hero.title}
      </h1>
      
      <p 
        className="text-lg md:text-2xl mb-8 font-light max-w-3xl mx-auto opacity-0 animate-fade-in-up" 
        style={{animationDelay: '0.6s'}}
        itemProp="description"
      >
        {texts.hero.subtitle}
      </p>
      
      <Button
        onClick={onCTAClick}
        variant="gradient"
        size="lg"
        className="opacity-0 animate-fade-in-up"
        style={{animationDelay: '0.9s'}}
        aria-label="Посмотреть свободные площади"
        aria-describedby="cta-description"
      >
        {texts.hero.cta}
        <span id="cta-description" className="sr-only">
          Перейти к разделу с планами этажей и доступными площадями
        </span>
      </Button>
    </div>
  );
};

export default HeroContent;
