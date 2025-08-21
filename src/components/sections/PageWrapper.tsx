import React, { useRef, Suspense, lazy } from 'react';
import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';
import Location from './Location';
import FloorsOverview from './Anchors';
import Contact from './Contact';
import Opportunities from './Opportunities';
import Atmosphere from './Atmosphere';

// Lazy load non-critical components
const LazyFloorPlans = lazy(() => import('./FloorPlans'));
const LazyTechnicalSpecs = lazy(() => import('./TechnicalSpecs'));
const LazyRentalConditions = lazy(() => import('./RentalConditions'));
const LazyFAQ = lazy(() => import('./FAQ'));

// Loading component for lazy-loaded sections
const SectionLoader: React.FC = () => (
  <div className="py-20 bg-light-background dark:bg-dark-background">
    <div className="container mx-auto px-4">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  </div>
);

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
                    <FloorsOverview />
                </section>
                <Atmosphere />
                <section id="plans">
                    <div ref={floorPlansRef}>
                        <Suspense fallback={<SectionLoader />}>
                            <LazyFloorPlans />
                        </Suspense>
                    </div>
                </section>
                <Suspense fallback={<SectionLoader />}>
                    <LazyTechnicalSpecs />
                </Suspense>
                <Suspense fallback={<SectionLoader />}>
                    <LazyRentalConditions onCTAClick={scrollToContact} />
                </Suspense>
                <Suspense fallback={<SectionLoader />}>
                    <LazyFAQ />
                </Suspense>
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