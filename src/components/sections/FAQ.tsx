import React, { useState, useCallback } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { ChevronDownIcon } from './IconComponents';
import SEO from '../ui/SEO';

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onToggle: () => void; index: number }> = React.memo(({ question, answer, isOpen, onToggle, index }) => (
  <div 
    className="faq-card mb-4"
    itemScope
    itemProp="mainEntity"
    itemType="https://schema.org/Question"
  >
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center text-left p-6"
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${index}`}
    >
      <h3 
        className="text-xl font-semibold text-light-text dark:text-dark-text pr-4"
        itemProp="name"
      >
        {question}
      </h3>
      <ChevronDownIcon className={`w-6 h-6 text-accent-red transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
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
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{texts.faq.title}</h2>
          <p className="max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
            {texts.faq.subtitle}
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          {texts.faq.items.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openItems.has(index)}
              onToggle={() => toggleItem(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

FAQItem.displayName = 'FAQItem';
FAQ.displayName = 'FAQ';

export default FAQ;
