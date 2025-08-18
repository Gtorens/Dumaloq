import React, { useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';
import Location from './Location';
import FloorsOverview from './Anchors';
import FloorPlans from './FloorPlans';
import TechnicalSpecs from './TechnicalSpecs';
import Contact from './Contact';
import Opportunities from './Opportunities';
import Atmosphere from './Atmosphere';
import RentalConditions from './RentalConditions';

const PageWrapper: React.FC = () => {
    const floorPlansRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    const scrollToFloorPlans = () => {
        floorPlansRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    
    const scrollToContact = () => {
        contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <>
            <Header />
            <main>
                <Hero onCTAClick={scrollToFloorPlans} />
                <Location />
                <Opportunities />
                <FloorsOverview />
                <Atmosphere />
                <div ref={floorPlansRef}>
                    <FloorPlans />
                </div>
                <TechnicalSpecs />
                <RentalConditions onCTAClick={scrollToContact} />
                <div ref={contactRef}>
                    <Contact />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default PageWrapper;