'use client';
import { useState, useRef } from 'react';
import '../styles/Navbar.css';

const items = ['Home', 'About', 'Projects', 'Skills', 'Contact', 'Blog', 'Resume'];

export default function DiscSelector() {
  const ITEM_WIDTH = 100;
  const VISIBLE_RANGE = 3;
  const [startIndex, setStartIndex] = useState(Math.floor(items.length / 2));

  const touchStartX = useRef(0);
  const touchDelta = useRef(0);
  const isDragging = useRef(false);

  const getItemAt = (offset) => {
    const index = (startIndex + offset + items.length) % items.length;
    return items[index];
  };

  const rotateBy = (offset) => {
    setStartIndex((prev) => (prev + offset + items.length) % items.length);
  };

  const visibleItems = [];
  for (let i = -VISIBLE_RANGE; i <= VISIBLE_RANGE; i++) {
    visibleItems.push({
      key: getItemAt(i),
      label: getItemAt(i),
      offset: i,
    });
  }

  const handleClick = (offset) => {
    if (Math.abs(offset) === 1) {
      rotateBy(offset);
    }
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchDelta.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.touches[0].clientX;
    touchDelta.current = currentX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const threshold = 30;
    if (touchDelta.current > threshold) {
      rotateBy(-1); // swipe right
    } else if (touchDelta.current < -threshold) {
      rotateBy(1); // swipe left
    }

    touchDelta.current = 0;
  };

  return (
    <div
      className="wheel-wrapper"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="wheel-fixed">
        {visibleItems.map(({ key, label, offset }) => {
          const scale = offset === 0 ? 1.3 : 0.9;
          const opacity = offset === 0 ? 1 : 0.7;
          const isClickable = Math.abs(offset) === 1;

          return (
            <div
              key={key}
              className={`wheel-item ${offset === 0 ? 'selected' : ''} ${isClickable ? 'clickable' : ''}`}
              style={{
                width: `${ITEM_WIDTH}px`,
                height: `${ITEM_WIDTH}px`,
                transform: `scale(${scale})`,
                opacity,
                pointerEvents: isClickable ? 'auto' : 'none',
                fontSize: `${scale * 14}px`,
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
