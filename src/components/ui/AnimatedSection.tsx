import React, { type JSX } from 'react';
import { useScrollAnimation, type AnimationDirection } from '../../hooks/useScrollAnimation';

// Мапинг legacy анимаций к новым направлениям
const animationToDirection: Record<string, AnimationDirection> = {
  fadeInUp: 'up',
  fadeInDown: 'down',
  fadeInLeft: 'left',
  fadeInRight: 'right',
  zoomIn: 'scale',
  fadeIn: 'fade'
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: AnimationDirection;
  animation?: string; // Legacy support
  delay?: number;
  threshold?: number;
  as?: keyof JSX.IntrinsicElements;
  triggerOnce?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  direction = 'up',
  animation, // Legacy support
  delay = 0,
  threshold = 0.1,
  as: Component = 'div',
  triggerOnce = true,
  ...props
}) => {
  // Определяем направление из legacy анимации или используем проп direction
  const animationDirection = animation ? animationToDirection[animation] || 'up' : direction;
  
  const { ref, animationClass } = useScrollAnimation({
    direction: animationDirection,
    delay,
    threshold,
    triggerOnce,
    rootMargin: '0px 0px -100px 0px'
  });

  const ComponentToRender = Component as any;

  return (
    <ComponentToRender
      ref={ref}
      className={`${animationClass} ${className}`}
      {...props}
    >
      {children}
    </ComponentToRender>
  );
};

AnimatedSection.displayName = 'AnimatedSection';

export default AnimatedSection;