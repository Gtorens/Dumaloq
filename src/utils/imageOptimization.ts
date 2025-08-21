// Image optimization utilities for better performance

export interface ImageOptimizationOptions {
  lazy?: boolean;
  placeholder?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

export const createOptimizedImage = (
  src: string,
  alt: string,
  options: ImageOptimizationOptions = {}
): string => {
  const {
    lazy = true,
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==',
    sizes = '100vw',
    loading = 'lazy',
    decoding = 'async'
  } = options;

  return `
    <img 
      src="${placeholder}"
      data-src="${src}"
      alt="${alt}"
      sizes="${sizes}"
      loading="${loading}"
      decoding="${decoding}"
      class="optimized-image ${lazy ? 'lazy' : ''}"
      onload="this.classList.remove('lazy'); this.src=this.dataset.src;"
    />
  `;
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadCriticalImages = async (imageUrls: string[]): Promise<void> => {
  const criticalImages = imageUrls.slice(0, 3); // Only preload first 3 images
  await Promise.allSettled(criticalImages.map(preloadImage));
};

// Intersection Observer for lazy loading
export const setupLazyLoading = (): void => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Responsive image helper
export const getResponsiveImageSrc = (
  baseSrc: string,
  width: number,
  format: 'webp' | 'jpg' | 'png' = 'webp'
): string => {
  // This would integrate with an image optimization service
  // For now, return the original source
  return baseSrc;
};

// Image compression utility
export const compressImage = async (
  file: File,
  quality: number = 0.8,
  maxWidth: number = 1920
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      const { width, height } = img;
      const scale = Math.min(1, maxWidth / width);
      
      canvas.width = width * scale;
      canvas.height = height * scale;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(
        (blob) => resolve(blob!),
        'image/jpeg',
        quality
      );
    };
    
    img.src = URL.createObjectURL(file);
  });
};