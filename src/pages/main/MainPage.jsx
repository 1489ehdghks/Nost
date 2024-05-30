import React, { useRef, useState, useEffect } from 'react';
import SideLayout from '../../widgets/layout/sideLayout/SideLayout';
import BookList from './component/BookList';
import SynopsysGenerator from './component/SynopsysGenerator';
import SummaryGenerator from './component/SummaryGenerator';
import './MainPage.scss';

const MainPage = () => {
  const containerRef = useRef(null);

  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
      const delta = event.deltaY;
      if (delta > 0) {
        navigateToNext();
      } else {
        navigateToPrev();
      }
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleScroll);
    };
  }, [currentSection]);

  const navigateToNext = () => {
    if (currentSection < 2) {
      setCurrentSection(currentSection + 1);
      const sections = containerRef.current.querySelectorAll('.section');
      sections[currentSection + 1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToPrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      const sections = containerRef.current.querySelectorAll('.section');
      sections[currentSection - 1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SideLayout>
      <div className="page-container" ref={containerRef} style={{}}>
        <BookList />
        <SynopsysGenerator />
        <SummaryGenerator />
      </div>
    </SideLayout>
  );
};

export default MainPage;
