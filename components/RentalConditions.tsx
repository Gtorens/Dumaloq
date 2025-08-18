import React from 'react';
import { useAppContext } from '../contexts/AppContext';

interface RentalConditionsProps {
    onCTAClick: () => void;
}

const RentalConditions: React.FC<RentalConditionsProps> = ({ onCTAClick }) => {
    const { texts } = useAppContext();

    return (
        <section className="py-20 bg-light-background dark:bg-dark-background transition-colors duration-300 section-spacing">
            <div className="container mx-auto px-4 text-center">
                <div className="section-card max-w-4xl mx-auto p-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
                        {texts.rentalConditions.title}
                    </h2>
                    <p className="max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary mb-8">
                        {texts.rentalConditions.description}
                    </p>
                    <button
                        onClick={onCTAClick}
                        className="modern-button text-lg py-4 px-8"
                    >
                        {texts.rentalConditions.cta}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default RentalConditions;
