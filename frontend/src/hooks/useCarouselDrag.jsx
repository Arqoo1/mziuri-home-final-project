import { useState, useRef, useEffect } from 'react';

export default function useReviewCarousel(length) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const containerRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const animationRef = useRef(null);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Measure slide width and handle resizing
  useEffect(() => {
    if (!containerRef.current || length === 0) return;

    const updateSlideWidth = () => {
      // Get the first slide's width (assuming all slides are same width)
      const slide = containerRef.current.querySelector('.review-card');
      if (slide) {
        const width = slide.offsetWidth;
        setSlideWidth(width);
        setCurrentTranslate(-currentIndex * width);
      }
    };

    updateSlideWidth();
    const resizeObserver = new ResizeObserver(updateSlideWidth);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [length, currentIndex]);

  const updateIndex = (newIndex) => {
    if (length <= 1) return; // No need to slide if only one item
    
    let validIndex = newIndex;
    if (newIndex < 0) {
      validIndex = length - 1;
    } else if (newIndex >= length) {
      validIndex = 0;
    }
    
    setCurrentIndex(validIndex);
    setCurrentTranslate(-validIndex * slideWidth);
  };

  const next = () => updateIndex(currentIndex + 1);
  const prev = () => updateIndex(currentIndex - 1);

  const onDragStart = (e) => {
    if (length <= 1) return; // Don't drag if only one item
    
    const x = getClientX(e);
    setStartX(x);
    setIsDragging(true);
    setPrevTranslate(currentTranslate);
    
    // Cancel any ongoing animations
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const onDragMove = (e) => {
    if (!isDragging || length <= 1) return;
    
    e.preventDefault();
    const x = getClientX(e);
    const diff = x - startX;
    
    // Smooth dragging with requestAnimationFrame
    animationRef.current = requestAnimationFrame(() => {
      setCurrentTranslate(prevTranslate + diff);
    });
  };

  const onDragEnd = () => {
    if (!isDragging || length <= 1) return;
    
    setIsDragging(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const movedBy = currentTranslate - prevTranslate;
    const threshold = slideWidth * 0.2;

    if (movedBy < -threshold) {
      next();
    } else if (movedBy > threshold) {
      prev();
    } else {
      // Return to original position
      setCurrentTranslate(-currentIndex * slideWidth);
    }
  };

  // Helper function to get clientX from both touch and mouse events
  const getClientX = (e) => {
    return e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  };

  return {
    currentIndex,
    currentTranslate,
    isDragging,
    containerRef,
    onDragStart,
    onDragMove,
    onDragEnd,
    next,
    prev,
  };
}