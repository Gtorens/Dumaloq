import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { MapPinIcon, UsersIcon, ShieldCheckIcon, CogIcon } from './IconComponents';

const iconMap: { [key: string]: React.ReactNode } = {
    mapPin: <MapPinIcon className="feature-icon" />,
    users: <UsersIcon className="feature-icon" />,
    shieldCheck: <ShieldCheckIcon className="feature-icon" />,
    cog: <CogIcon className="feature-icon" />
};

const OpportunityCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => {
    return (
        <div className="section-card card-spacing opportunity-card-specific">
            <div className="flex justify-center items-center mb-4 text-accent-red">
                {icon}
            </div>
            <h3 className="opportunity-card-title mb-2 text-light-text dark:text-dark-text">{title}</h3>
            <p className="opportunity-card-description text-light-text-secondary dark:text-dark-text-secondary">{description}</p>
        </div>
    );
};


const Opportunities: React.FC = () => {
    const { texts } = useAppContext();
    
    return (
        <section className="py-20 bg-light-primary dark:bg-dark-primary transition-colors duration-300 modern-section section-spacing">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="opportunities-title mb-4 text-light-text dark:text-dark-text">{texts.opportunities.title}</h2>
                </div>
                <div className="modern-card-grid max-w-7xl mx-auto">
                    {texts.opportunities.items.map(item => (
                        <OpportunityCard 
                            key={item.title}
                            icon={iconMap[item.icon]}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Opportunities;
