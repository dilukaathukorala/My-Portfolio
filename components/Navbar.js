'use client';
import { useState, useRef, useEffect } from 'react';
import '../styles/Navbar.css';

const items = ['Home', 'About', 'Projects', 'Skills', 'Contact', 'Blog', 'Resume'];

export default function DiscSelector() {
  const VISIBLE_RANGE = 2;
  const [startIndex, setStartIndex] = useState(Math.floor(items.length / 2));
  const [translateSpacing, setTranslateSpacing] = useState(110); // slightly more spacing by default
  const touchStartX = useRef(null);
  const swipeThreshold = 30;

  // Adjust translateX spacing based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 500) {
        setTranslateSpacing(90); // better spacing for very small screens
      } else if (width < 768) {
        setTranslateSpacing(100);
      } else {
        setTranslateSpacing(110);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getItemAt = (offset) => {
    const index = (startIndex + offset + items.length) % items.length;
    return items[index];
  };

  const visibleItems = [];
  for (let i = -VISIBLE_RANGE; i <= VISIBLE_RANGE; i++) {
    visibleItems.push({
      key: getItemAt(i),
      label: getItemAt(i),
      offset: i,
    });
  }

  const rotateBy = (step) => {
    setStartIndex((prev) => (prev + step + items.length) % items.length);
  };

  const handleClick = (offset) => {
    if (Math.abs(offset) === 1) {
      rotateBy(offset);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const diffX = currentX - touchStartX.current;
    if (Math.abs(diffX) > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - touchStartX.current;
    if (Math.abs(diffX) > swipeThreshold) {
      rotateBy(diffX < 0 ? 1 : -1);
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="disc-wrapper"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="disc-wheel">
        {visibleItems.map(({ key, label, offset }) => {
          const absOffset = Math.abs(offset);

          let scale, opacity, color;
          if (absOffset === 0) {
            scale = 2.3;
            opacity = 1;
            color = '#222';
          } else if (absOffset === 1) {
            scale = 1.0;
            opacity = 0.7;
            color = '#666';
          } else {
            scale = 0.7;
            opacity = 0.4;
            color = '#aaa';
          }

          const translateX = offset * translateSpacing;
          const isClickable = absOffset === 1;
          const zIndex = 10 - absOffset;

          return (
            <div
              key={key}
              className={`disc-item ${offset === 0 ? 'selected' : ''} ${isClickable ? 'clickable' : ''}`}
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                opacity,
                pointerEvents: isClickable ? 'auto' : 'none',
                fontSize: `${scale * 14}px`,
                zIndex,
                color,
              }}
              onClick={() => handleClick(offset)}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
