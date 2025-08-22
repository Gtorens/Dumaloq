import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav 
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Хлебные крошки"
      role="navigation"
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg 
                className="w-4 h-4 text-gray-400 mx-2" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
            
            {item.current ? (
              <span 
                className="text-gray-500 dark:text-gray-400 font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : item.href ? (
              <a 
                href={item.href}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-gray-700 dark:text-gray-300">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      
      {/* Структурированные данные для SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": item.href ? `https://dumaloq.uz${item.href}` : undefined
          }))
        })}
      </script>
    </nav>
  );
};

export default Breadcrumbs;
