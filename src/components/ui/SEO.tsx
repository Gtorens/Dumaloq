import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'business.business';
  locale?: string;
  siteName?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/images/hero-building.jpg',
  url = 'https://dumaloq.uz',
  type = 'business.business',
  locale = 'ru_RU',
  siteName = 'Dumaloq TRC'
}) => {
  const fullTitle = `${title} | ${siteName}`;
  
  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Дополнительные SEO мета-теги */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Dumaloq TRC" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Структурированные данные JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ShoppingCenter",
          "name": "Dumaloq TRC",
          "description": "Современный торгово-развлекательный центр в Узбекистане",
          "url": "https://dumaloq.uz",
          "telephone": "+998 90 123 45 67",
          "email": "sales@dumoloq.uz",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "UZ",
            "addressLocality": "Ташкент",
            "addressRegion": "Ташкентская область"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "41.2995",
            "longitude": "69.2401"
          },
          "openingHours": "Mo-Su 10:00-22:00",
          "sameAs": [
            "https://instagram.com/dumaloq",
            "https://facebook.com/dumaloq"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
