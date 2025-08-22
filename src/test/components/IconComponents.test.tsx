import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CarIcon, MountainIcon, MapPinIcon } from '../../components/sections/IconComponents';

describe('CarIcon', () => {
  it('renders correctly with default props', () => {
    render(<CarIcon />);
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CarIcon className="custom-class" />);
    const icon = document.querySelector('svg');
    expect(icon).toHaveClass('custom-class');
  });

  it('has correct SVG structure', () => {
    render(<CarIcon />);
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon?.tagName).toBe('svg');
  });
});

describe('MountainIcon', () => {
  it('renders correctly with default props', () => {
    render(<MountainIcon />);
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<MountainIcon className="mountain-icon" />);
    const icon = document.querySelector('svg');
    expect(icon).toHaveClass('mountain-icon');
  });

  it('has correct SVG structure', () => {
    render(<MountainIcon />);
    const svg = document.querySelector('svg');
    expect(svg?.tagName).toBe('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('fill', 'none'); // Corrected from 'currentColor'
  });
});

describe('MapPinIcon', () => {
  it('renders correctly with default props', () => {
    render(<MapPinIcon />);
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<MapPinIcon className="map-pin-custom" />);
    const icon = document.querySelector('svg');
    expect(icon).toHaveClass('map-pin-custom');
  });

  it('has correct SVG structure for location icon', () => {
    render(<MapPinIcon />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.tagName).toBe('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('fill', 'none'); // Corrected from 'currentColor'
  });
});

describe('Icon accessibility', () => {
  it('all icons are properly rendered', () => {
    render(
      <>
        <CarIcon /> <MountainIcon /> <MapPinIcon />
      </>
    );

    const svgElements = document.querySelectorAll('svg');
    expect(svgElements).toHaveLength(3);
    // Check that all SVG icons exist
    svgElements.forEach(svg => {
      expect(svg).toBeInTheDocument();
    });
  });
});
