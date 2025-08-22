import React from 'react';

interface DecorativeElement {
  type: 'line' | 'triangle' | 'square' | 'point' | 'diagonal' | 'grid';
  position: { x: number; y: number };
  size?: { width: number; height: number };
  rotation?: number;
  opacity?: number;
  animationDelay?: string;
}

interface CyberpunkDecorationsProps {
  side: 'left' | 'right';
  className?: string;
  elements?: DecorativeElement[];
}

const defaultElements: DecorativeElement[] = [
  // Геометрические линии
  { type: 'line', position: { x: 10, y: 24 }, size: { width: 20, height: 1 }, opacity: 0.6 },
  { type: 'line', position: { x: 10, y: 24 }, size: { width: 1, height: 20 }, opacity: 0.6 },
  
  // Треугольники
  { type: 'triangle', position: { x: 18, y: 56 }, size: { width: 8, height: 5 }, opacity: 0.25, animationDelay: '1s' },
  { type: 'triangle', position: { x: 8, y: 28 }, size: { width: 10, height: 6 }, opacity: 0.2, animationDelay: '2s' },
  
  // Квадраты
  { type: 'square', position: { x: 20, y: 40 }, size: { width: 6, height: 6 }, rotation: 45, opacity: 0.3, animationDelay: '0.5s' },
  
  // Анимированные точки
  { type: 'point', position: { x: 14, y: 20 }, size: { width: 2, height: 2 }, opacity: 0.8 },
  { type: 'point', position: { x: 22, y: 75 }, size: { width: 1.5, height: 1.5 }, opacity: 0.7, animationDelay: '1.5s' },
  
  // Диагональные линии
  { type: 'diagonal', position: { x: 24, y: 32 }, size: { width: 16, height: 1 }, rotation: 45, opacity: 0.5 },
  { type: 'diagonal', position: { x: 20, y: 80 }, size: { width: 18, height: 1 }, rotation: -45, opacity: 0.4 },
  
  // Сетка
  { type: 'grid', position: { x: 4, y: 48 }, size: { width: 8, height: 8 }, opacity: 0.25 },
];

const CyberpunkDecorations: React.FC<CyberpunkDecorationsProps> = ({
  side,
  className = '',
  elements = defaultElements
}) => {
  const sideClasses = side === 'left' 
    ? 'left-0' 
    : 'right-0';

  const renderElement = (element: DecorativeElement, index: number) => {
    const sidePosition = side === 'left' ? 'left' : 'right';
    const positionStyle: React.CSSProperties = {
      [sidePosition]: `${element.position.x * 0.25}rem`,
      top: `${element.position.y * 0.25}rem`
    };
    
    const commonStyles: React.CSSProperties = {
      ...positionStyle,
      animationDelay: element.animationDelay || '0s',
      opacity: element.opacity || 0.5
    };

    switch (element.type) {
      case 'line': {
        const isHorizontal = (element.size?.height || 1) === 1;
        const gradientDirection = isHorizontal 
          ? (side === 'left' ? 'bg-gradient-to-r' : 'bg-gradient-to-l')
          : 'bg-gradient-to-b';
        return (
          <div
            key={`${element.type}-${index}`}
            className={`absolute ${gradientDirection} from-accent-red/60 via-accent-red/40 to-transparent`}
            style={{
              ...commonStyles,
              width: `${(element.size?.width || 1) * 0.25}rem`,
              height: `${(element.size?.height || 1) * 0.25}rem`
            }}
          />
        );
      }

      case 'triangle': {
        const triangleStyle: React.CSSProperties = {
          ...commonStyles,
          width: 0,
          height: 0
        };
        
        if (side === 'left') {
          triangleStyle.borderLeft = `${element.size?.width || 8}px solid rgba(220, 38, 38, ${element.opacity || 0.25})`;
        } else {
          triangleStyle.borderRight = `${element.size?.width || 8}px solid rgba(220, 38, 38, ${element.opacity || 0.25})`;
        }
        triangleStyle.borderTop = `${(element.size?.height || 5)}px solid transparent`;
        triangleStyle.borderBottom = `${(element.size?.height || 5)}px solid transparent`;
        
        return (
          <div
            key={`${element.type}-${index}`}
            className="absolute animate-pulse"
            style={triangleStyle}
          />
        );
      }

      case 'square':
        return (
          <div
            key={`${element.type}-${index}`}
            className="absolute border border-accent-red animate-pulse"
            style={{
              ...commonStyles,
              width: `${(element.size?.width || 6) * 0.25}rem`,
              height: `${(element.size?.height || 6) * 0.25}rem`,
              transform: `rotate(${element.rotation || 0}deg)`
            }}
          />
        );

      case 'point':
        return (
          <div
            key={`${element.type}-${index}`}
            className="absolute bg-accent-red rounded-full animate-ping"
            style={{
              ...commonStyles,
              width: `${(element.size?.width || 2) * 0.25}rem`,
              height: `${(element.size?.height || 2) * 0.25}rem`
            }}
          />
        );

      case 'diagonal': {
        const originClass = side === 'left' ? 'origin-left' : 'origin-right';
        return (
          <div
            key={`${element.type}-${index}`}
            className={`absolute bg-accent-red ${originClass}`}
            style={{
              ...commonStyles,
              width: `${(element.size?.width || 16) * 0.25}rem`,
              height: `${(element.size?.height || 1) * 0.25}rem`,
              transform: `rotate(${element.rotation || 45}deg)`
            }}
          />
        );
      }

      case 'grid': {
        return (
          <div
            key={`${element.type}-${index}`}
            className="absolute border border-accent-red"
            style={{
              ...commonStyles,
              width: `${(element.size?.width || 8) * 0.25}rem`,
              height: `${(element.size?.height || 8) * 0.25}rem`
            }}
          >
            <div 
              className="w-full bg-accent-red" 
              style={{
                height: '1px',
                marginTop: '50%'
              }}
            />
            <div 
              className="h-full bg-accent-red" 
              style={{
                width: '1px',
                marginLeft: '50%',
                marginTop: '-50%'
              }}
            />
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className={`hidden xl:block absolute ${sideClasses} top-0 w-64 h-full pointer-events-none ${className}`}>
      <div className="relative w-full h-full">
        {elements.map((element, index) => renderElement(element, index))}
      </div>
    </div>
  );
};

export default CyberpunkDecorations;