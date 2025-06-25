import { useState, useRef, useEffect } from 'react';

export default function useReviewCarousel(
  length,
  slideSelector = '.review-card',
  visibleCount = 1
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const containerRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const animationRef = useRef(null);

  useEffect(
    () => () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    },
    []
  );

  useEffect(() => {
    if (!containerRef.current || length <= 1) return;

    const updateSlideWidth = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      let width = 0;

      if (visibleCount > 1) {
        width = containerWidth / visibleCount;
      } else {
        const slide = containerRef.current.querySelector(slideSelector);
        if (!slide) return;
        width = slide.offsetWidth;
      }

      setSlideWidth(width);
      setCurrentTranslate(-currentIndex * width);
    };

    updateSlideWidth();
    const ro = new ResizeObserver(updateSlideWidth);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [length, currentIndex, slideSelector, visibleCount]);

  // Index wrapping
  const updateIndex = (newIndex) => {
    if (length <= 1) return;
    let valid = newIndex;
    if (newIndex < 0) valid = length - 1;
    if (newIndex >= length) valid = 0;
    setCurrentIndex(valid);
    setCurrentTranslate(-valid * slideWidth);
  };

  const next = () => updateIndex(currentIndex + 1);
  const prev = () => updateIndex(currentIndex - 1);

  const onDragStart = (e) => {
    if (length <= 1) return;
    const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    setStartX(x);
    setIsDragging(true);
    setPrevTranslate(currentTranslate);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  const onDragMove = (e) => {
    if (!isDragging || length <= 1) return;
    e.preventDefault();
    const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const diff = x - startX;
    animationRef.current = requestAnimationFrame(() => {
      setCurrentTranslate(prevTranslate + diff);
    });
  };

  const onDragEnd = () => {
    if (!isDragging || length <= 1) return;
    setIsDragging(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    const movedBy = currentTranslate - prevTranslate;
    const threshold = slideWidth * 0.2;
    if (movedBy < -threshold) next();
    else if (movedBy > threshold) prev();
    else setCurrentTranslate(-currentIndex * slideWidth);
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
    setIndex: (index) => updateIndex(index), 
  };
}
