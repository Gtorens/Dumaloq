import React, { useState, useCallback } from 'react';
import { useAppContext } from '../../contexts/AppContext';

// Декоративные элементы для фона в стиле киберпанк
const FloorDecorations: React.FC = () => (
  <>
    {/* Геометрические линии */}
    <div className="absolute top-10 left-10 w-24 h-px bg-gradient-to-r from-accent-red/60 via-accent-red/40 to-transparent"></div>
    <div className="absolute top-10 left-10 w-px h-24 bg-gradient-to-b from-accent-red/60 via-accent-red/40 to-transparent"></div>
    
    {/* Треугольники */}
    <div className="absolute top-20 right-16 w-0 h-0 border-l-[8px] border-l-accent-red/30 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
    <div className="absolute bottom-10 left-1/3 w-0 h-0 border-r-[10px] border-r-accent-red/20 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
    
    {/* Квадраты и ромбы */}
    <div className="absolute bottom-20 right-1/4 w-6 h-6 border border-accent-red/35 rotate-45 animate-pulse" style={{animationDelay: '1.5s'}}></div>
    <div className="absolute top-1/3 left-20 w-8 h-8 bg-accent-red/25 transform rotate-45 animate-pulse" style={{animationDelay: '0.8s'}}></div>
    <div className="absolute bottom-1/3 right-20 w-5 h-5 bg-accent-red/30 transform rotate-45 animate-pulse" style={{animationDelay: '2s'}}></div>
    
    {/* Анимированные точки */}
    <div className="absolute top-1/4 right-8 w-2 h-2 bg-accent-red/80 rounded-full animate-ping"></div>
    <div className="absolute bottom-1/4 left-12 w-1.5 h-1.5 bg-accent-red/70 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
    
    {/* Диагональные линии */}
    <div className="absolute top-16 left-32 w-16 h-px bg-accent-red/50 transform rotate-45 origin-left"></div>
    <div className="absolute bottom-16 right-32 w-20 h-px bg-accent-red/40 transform -rotate-45 origin-right"></div>
    
    {/* Сетка */}
    <div className="absolute top-40 left-4 w-10 h-10 border border-accent-red/30 opacity-60">
      <div className="w-full h-px bg-accent-red/30 mt-1/2"></div>
      <div className="w-px h-full bg-accent-red/30 ml-1/2"></div>
    </div>
    
    {/* Дополнительные геометрические элементы */}
    <div className="absolute top-60 right-4 w-8 h-8 border border-accent-red/25 opacity-80">
      <div className="w-full h-px bg-accent-red/25 mt-1/2"></div>
      <div className="w-px h-full bg-accent-red/25 ml-1/2"></div>
    </div>
  </>
);

type Tab = 'floor1' | 'floor2' | 'floor3' | 'floor4';

const FloorPlans: React.FC = React.memo(() => {
  const { texts } = useAppContext();
  const [activeTab, setActiveTab] = useState<Tab>('floor3');

  const handleTabChange = useCallback((tabId: Tab) => {
    setActiveTab(tabId);
  }, []);

  const TabButton: React.FC<{ tabId: Tab; children: React.ReactNode }> = React.memo(({ tabId, children }) => (
    <button
      onClick={() => handleTabChange(tabId)}
      className={`modern-tab w-full md:w-auto text-left md:text-center relative group ${
        activeTab === tabId ? 'active' : ''
      }`}
    >
      {/* Декоративный элемент для активной вкладки */}
      {activeTab === tabId && (
        <div className="absolute inset-0 bg-accent-red/10 rounded-t-lg"></div>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  ));
  TabButton.displayName = 'TabButton';
  
  const TabContent: React.FC<{ tabId: Tab; children: React.ReactNode }> = React.memo(({ tabId, children }) => (
    <div className={`${activeTab === tabId ? 'block animate-fade-in' : 'hidden'} section-card md:rounded-tr-lg shadow-xl border-t-4 border-accent-red md:border-t-0 relative overflow-hidden`}>
      {/* Декоративный фон для контента */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">{children}</div>
    </div>
  ));
  TabContent.displayName = 'TabContent';
  
  const floorData = texts.floorPlans.tabs;

  return (
    <section className="py-20 bg-light-background dark:bg-dark-background transition-colors duration-300 modern-section section-spacing relative overflow-hidden">
      <FloorDecorations />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="floor-plans-title text-light-text dark:text-dark-text mb-4">{texts.floorPlans.title}</h2>
          <p className="floor-plans-subtitle max-w-3xl mx-auto text-light-text-secondary dark:text-dark-text-secondary">
            {texts.floorPlans.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row modern-tabs">
                <TabButton tabId="floor1">{floorData.floor1.title}</TabButton>
                <TabButton tabId="floor2">{floorData.floor2.title}</TabButton>
                <TabButton tabId="floor3">{floorData.floor3.title}</TabButton>
                <TabButton tabId="floor4">{floorData.floor4.title}</TabButton>
            </div>
            
            <TabContent tabId="floor1">
                <div className="floor-unified-block">
                    <div className="floor-image-top">
                        <img 
                          src="/images/opportunities/floor-1-opportunity.jpg" 
                          alt={floorData.floor1.imageAlt} 
                          className="floor-image"
                          loading="lazy"
                          decoding="async"
                        />
                    </div>
                    <div className="floor-content-below">
                        <h3 className="floor-concept-title mb-4">{floorData.floor1.conceptTitle}</h3>
                        <p className="floor-concept-text text-light-text-secondary dark:text-dark-text-secondary mb-6">{floorData.floor1.conceptText}</p>
                        <h3 className="floor-premises-title mb-4">{floorData.floor1.premisesTitle}</h3>
                         <ul className="list-disc list-inside text-light-text dark:text-dark-text space-y-2 floor-premises-list">
                           {floorData.floor1.premisesList.map((item, index) => <li key={index}><strong>{item.label}</strong> {item.value}</li>)}
                        </ul>
                    </div>
                </div>
            </TabContent>

            <TabContent tabId="floor2">
                <div className="floor-unified-block">
                    <div className="floor-image-top">
                        <img 
                          src="/images/opportunities/floor-2-opportunity.jpg" 
                          alt={floorData.floor2.imageAlt} 
                          className="floor-image"
                          loading="lazy"
                          decoding="async"
                        />
                    </div>
                    <div className="floor-content-below">
                        <h3 className="floor-concept-title mb-4">{floorData.floor2.conceptTitle}</h3>
                        <p className="floor-concept-text text-light-text-secondary dark:text-dark-text-secondary mb-6">{floorData.floor2.conceptText}</p>
                        <h3 className="floor-premises-title mb-4">{floorData.floor2.premisesTitle}</h3>
                         <ul className="list-disc list-inside text-light-text dark:text-dark-text space-y-2 floor-premises-list">
                            {floorData.floor2.premisesList.map((item, index) => <li key={index}><strong>{item.label}</strong> {item.value}</li>)}
                        </ul>
                    </div>
                </div>
            </TabContent>
            
            <TabContent tabId="floor3">
                <div className="floor-unified-block">
                    <div className="floor-image-top">
                        <img 
                          src="/images/opportunities/floor-3-opportunity.jpg" 
                          alt={floorData.floor3.imageAlt} 
                          className="floor-image"
                          loading="lazy"
                          decoding="async"
                        />
                    </div>
                    <div className="floor-content-below">
                        <h3 className="floor-concept-title mb-4">{floorData.floor3.conceptTitle}</h3>
                        <p className="floor-concept-text text-light-text-secondary dark:text-dark-text-secondary mb-6">{floorData.floor3.conceptText}</p>
                        <h3 className="floor-premises-title mb-4">{floorData.floor3.premisesTitle}</h3>
                         <ul className="list-disc list-inside text-light-text dark:text-dark-text space-y-2 floor-premises-list">
                            {floorData.floor3.premisesList.map((item, index) => <li key={index}><strong>{item.label}</strong> {item.value}</li>)}
                        </ul>
                    </div>
                </div>
            </TabContent>

            <TabContent tabId="floor4">
                <div className="floor-unified-block">
                    <div className="floor-image-top">
                        <img 
                          src="/images/opportunities/floor-4-opportunity.jpg" 
                          alt={floorData.floor4.imageAlt} 
                          className="floor-image"
                          loading="lazy"
                          decoding="async"
                        />
                    </div>
                    <div className="floor-content-below">
                        <h3 className="floor-concept-title mb-4">{floorData.floor4.conceptTitle}</h3>
                        <p className="floor-concept-text text-light-text-secondary dark:text-dark-text-secondary mb-6">{floorData.floor4.conceptText}</p>
                        <h3 className="floor-premises-title mb-4">{floorData.floor4.premisesTitle}</h3>
                         <ul className="list-disc list-inside text-light-text dark:text-dark-text space-y-2 floor-premises-list">
                            {floorData.floor4.premisesList.map((item, index) => <li key={index}><strong>{item.label}</strong> {item.value}</li>)}
                        </ul>
                    </div>
                </div>
            </TabContent>
        </div>
        <div className="text-center mt-12">
            <a href="/dumoloq-technical-documentation.pdf" download className="modern-button inline-flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                {texts.floorPlans.downloadButton}
            </a>
        </div>
      </div>
    </section>
  );
});

FloorPlans.displayName = 'FloorPlans';

export default FloorPlans;