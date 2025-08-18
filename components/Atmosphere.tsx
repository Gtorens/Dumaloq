import React, { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

const Atmosphere: React.FC = () => {
    const { texts } = useAppContext();
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => {
        // Calculate the offset relative to the component's position
        const element = document.getElementById('atmosphere-section');
        if (element) {
            const rect = element.getBoundingClientRect();
            // Start effect when element is in view
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                 setOffsetY(window.pageYOffset - element.offsetTop);
            }
        }
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section 
            id="atmosphere-section"
            className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center text-center text-white overflow-hidden atmosphere-background section-spacing"
            style={{ backgroundImage: "url('/images/atmosphere/gateway-mountains.jpg')" }}
        >
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 p-4 max-w-4xl mx-auto animate-fade-in">
                <h2 className="atmosphere-title mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    {texts.atmosphere.title}
                </h2>
                <h3 className="atmosphere-subtitle text-gray-200 mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    {texts.atmosphere.subtitle}
                </h3>
                <p className="atmosphere-description max-w-3xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                    {texts.atmosphere.description}
                </p>
            </div>
        </section>
    );
};

export default Atmosphere;
