import React, { useState, useCallback } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { ChevronDownIcon } from './IconComponents';
import { AnimatedSection } from '../ui';

// Декоративные элементы для секции FAQ в стиле киберпанк
const FAQDecorations: React.FC = () => (
  <>
    {/* Левая сторона - киберпанк геометрия */}
    <div className="hidden xl:block absolute left-0 top-0 w-64 h-full pointer-events-none">
      <div className="relative w-full h-full">
        {/* Геометрические линии */}
        <div className="absolute top-20 left-12 w-20 h-px bg-gradient-to-r from-accent-red/60 via-accent-red/40 to-transparent"></div>
        <div className="absolute top-20 left-12 w-px h-20 bg-gradient-to-b from-accent-red/60 via-accent-red/40 to-transparent"></div>
        
        {/* Треугольники */}
        <div className="absolute top-52 left-8 w-0 h-0 border-l-[8px] border-l-accent-red/25 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-24 left-16 w-0 h-0 border-r-[8px] border-r-accent-red/20 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Квадраты */}
        <div className="absolute top-40 left-20 w-6 h-6 border border-accent-red/30 rotate-45 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Вопросительные знаки */}
        <div className="absolute top-1/4 left-14 text-accent-red/60 text-2xl animate-pulse">?</div>
        <div className="absolute bottom-1/3 left-10 text-accent-red/50 text-xl animate-pulse" style={{animationDelay: '1.5s'}}>?</div>
        
        {/* Диагональные линии */}
        <div className="absolute top-28 left-24 w-16 h-px bg-accent-red/50 transform rotate-45 origin-left"></div>
        <div className="absolute bottom-16 left-20 w-18 h-px bg-accent-red/40 transform -rotate-45 origin-left"></div>
        
        {/* Сетка */}
        <div className="absolute top-36 left-4 w-8 h-8 border border-accent-red/25 opacity-60">
          <div className="w-full h-px bg-accent-red/25 mt-1/2"></div>
          <div className="w-px h-full bg-accent-red/25 ml-1/2"></div>
        </div>
      </div>
    </div>

    {/* Правая сторона - киберпанк геометрия */}
    <div className="hidden xl:block absolute right-0 top-0 w-64 h-full pointer-events-none">
      <div className="relative w-full h-full">
        {/* Геометрические линии */}
        <div className="absolute top-16 right-10 w-18 h-px bg-gradient-to-l from-accent-red/60 via-accent-red/40 to-transparent"></div>
        <div className="absolute top-16 right-10 w-px h-18 bg-gradient-to-b from-accent-red/60 via-accent-red/40 to-transparent"></div>
        
        {/* Ромбы */}
        <div className="absolute top-56 right-14 w-5 h-5 border border-accent-red/30 rotate-45 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-20 right-8 w-4 h-4 bg-accent-red/35 transform rotate-45 animate-pulse" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-44 right-16 w-5 h-5 bg-accent-red/25 transform rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Вопросительные знаки */}
        <div className="absolute top-1/3 right-12 text-accent-red/60 text-2xl animate-pulse" style={{animationDelay: '0.8s'}}>?</div>
        <div className="absolute bottom-1/4 right-16 text-accent-red/50 text-xl animate-pulse" style={{animationDelay: '2.2s'}}>?</div>
        
        {/* Диагональные линии */}
        <div className="absolute top-24 right-20 w-16 h-px bg-accent-red/50 transform -rotate-45 origin-right"></div>
        <div className="absolute bottom-24 right-24 w-18 h-px bg-accent-red/40 transform rotate-45 origin-right"></div>
        
        {/* Сетка */}
        <div className="absolute top-48 right-4 w-6 h-6 border border-accent-red/25 opacity-60">
          <div className="w-full h-px bg-accent-red/25 mt-1/2"></div>
          <div className="w-px h-full bg-accent-red/25 ml-1/2"></div>
        </div>
      </div>
    </div>
  </>
);

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onToggle: () => void; index: number }> = React.memo(({ question, answer, isOpen, onToggle, index }) => (
  <div 
    className="faq-card mb-4"
    itemScope
    itemProp="mainEntity"
    itemType="https://schema.org/Question"
  >
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center text-left p-6 hover:bg-opacity-10 transition-all duration-300"
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${index}`}
    >
      <h3 
        className="text-xl font-semibold text-light-text dark:text-dark-text pr-4"
        itemProp="name"
      >
        {question}
      </h3>
      <ChevronDownIcon className={`w-6 h-6 text-accent-red transition-transform duration-300 ${
        isOpen ? 'rotate-180' : ''
      }`} />
    </button>
    
    {/* Простой контейнер для ответа */}
    {isOpen && (
      <div 
        className="px-6 pb-6"
        id={`faq-answer-${index}`}
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <p 
          className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed"
          itemProp="text"
        >
          {answer}
        </p>
      </div>
    )}
  </div>
));

const FAQ: React.FC = React.memo(() => {
  const { texts } = useAppContext();
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

  const toggleItem = useCallback((index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  return (
    <section className="py-20 section-variant-3 transition-colors duration-300 modern-section section-spacing relative overflow-hidden">
      <FAQDecorations />
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{texts.faq.title}</h2>
          <p className="max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
            {texts.faq.subtitle}
          </p>
        </AnimatedSection>
        <div className="max-w-4xl mx-auto faq-container">
          {texts.faq.items.map((item, index) => (
            <AnimatedSection key={index} animation="fadeInLeft" delay={index * 0.1}>
              <FAQItem
                question={item.question}
                answer={item.answer}
                isOpen={openItems.has(index)}
                onToggle={() => toggleItem(index)}
                index={index}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
});

FAQItem.displayName = 'FAQItem';
FAQ.displayName = 'FAQ';

export default FAQ;
