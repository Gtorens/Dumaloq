import React, { useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';
import Location from './Location';
import Anchors from './Anchors';
import FloorPlans from './FloorPlans';
import TechnicalSpecs from './TechnicalSpecs';
import Contact from './Contact';
import Opportunities from './Opportunities';
import Atmosphere from './Atmosphere';
import RentalConditions from './RentalConditions';
import FAQ from './FAQ';


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
                <section id="about">
                    <Location />
                </section>
                <section id="tenants">
                    <Opportunities />
                </section>
                <section id="floors">
                    <Anchors />
                </section>
                <Atmosphere />
                <section id="plans">
                    <div ref={floorPlansRef}>
                        <FloorPlans />
                    </div>
                </section>
                <TechnicalSpecs />
                <RentalConditions onCTAClick={scrollToContact} />
                <section id="faq">
                    <FAQ />
                </section>
                <section id="contacts">
                    <div ref={contactRef}>
                        <Contact />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default PageWrapper;