import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { ChevronDownIcon } from './IconComponents';

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onToggle: () => void }> = ({ question, answer, isOpen, onToggle }) => (
  <div className="faq-card mb-4">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center text-left p-6"
    >
      <h3 className="text-xl font-semibold text-light-text dark:text-dark-text pr-4">{question}</h3>
      <ChevronDownIcon className={`w-6 h-6 text-accent-red transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (
      <div className="px-6 pb-6">
        <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">{answer}</p>
      </div>
    )}
  </div>
);

const FAQ: React.FC = () => {
  const { texts } = useAppContext();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 section-variant-3 transition-colors duration-300 modern-section section-spacing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">{texts.faq.title}</h2>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
            {texts.faq.subtitle}
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          {texts.faq.items.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
