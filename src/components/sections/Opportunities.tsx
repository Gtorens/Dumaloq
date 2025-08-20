import React, { useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { MapPinIcon, UsersIcon, ShieldCheckIcon, CogIcon } from './IconComponents';

const iconMap: { [key: string]: React.ReactNode } = {
    mapPin: <MapPinIcon className="feature-icon" />,
    users: <UsersIcon className="feature-icon" />,
    shieldCheck: <ShieldCheckIcon className="feature-icon" />,
    cog: <CogIcon className="feature-icon" />
};

const OpportunityCard: React.FC<{ icon: React.ReactNode, title: string, description: string, index: number }> = React.memo(({ icon, title, description, index }) => {
    return (
        <div 
            className="section-card card-spacing opportunity-card-specific relative group hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {/* Декоративный фон карточки */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-red/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
                <div className="flex justify-center items-center mb-4 text-accent-red group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <h3 className="opportunity-card-title mb-2 text-light-text dark:text-dark-text group-hover:text-accent-red transition-colors duration-300">{title}</h3>
                <p className="opportunity-card-description text-light-text-secondary dark:text-dark-text-secondary">{description}</p>
            </div>
        </div>
    );
});

const Opportunities: React.FC = React.memo(() => {
    const { texts } = useAppContext();
    
    // Мемоизируем iconMap для оптимизации
    const memoizedIconMap = useMemo(() => iconMap, []);
    
    return (
        <section className="py-20 section-variant-2 transition-colors duration-300 modern-section section-spacing relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="opportunities-title mb-4 text-light-text dark:text-dark-text">{texts.opportunities.title}</h2>
                </div>
                <div className="modern-card-grid max-w-7xl mx-auto">
                    {texts.opportunities.items.map((item, index) => (
                        <OpportunityCard 
                            key={item.title}
                            icon={memoizedIconMap[item.icon]}
                            title={item.title}
                            description={item.description}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
});

OpportunityCard.displayName = 'OpportunityCard';
Opportunities.displayName = 'Opportunities';

export default Opportunities;
