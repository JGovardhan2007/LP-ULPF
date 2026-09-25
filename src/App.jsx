import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Section1Hero from './components/Section1Hero';
import Section2Sha256 from './components/Section2Sha256';
import Section3Parsing from './components/Section3Parsing';
import Section4Vault from './components/Section4Vault';
import Section5Usp from './components/Section5Usp';
import Section6Demo from './components/Section6Demo';
import Section6Download from './components/Section6Download';
import DocsPage from './components/DocsPage';

const SECTION_IDS = [
  'section-1',
  'section-2',
  'section-3',
  'section-4',
  'section-5',
  'section-6',
  'section-7',
];

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const isLockedRef = React.useRef(false);
  const lockTimerRef = React.useRef(null);
  const currentIndexRef = React.useRef(0);

  useEffect(() => {
    if (activePage === 'home') {
      document.documentElement.classList.add('snap-active');
    } else {
      document.documentElement.classList.remove('snap-active');
    }
    return () => {
      document.documentElement.classList.remove('snap-active');
    };
  }, [activePage]);

  // Section-by-section scroll snapping with pause break (stops continuous free-fall)
  useEffect(() => {
    if (activePage !== 'home') return;

    const getSectionIndex = () => {
      const scrollY = window.scrollY;
      let closestIdx = 0;
      let minDiff = Infinity;
      SECTION_IDS.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) {
          const diff = Math.abs(scrollY - el.offsetTop);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
          }
        }
      });
      return closestIdx;
    };

    const scrollToSection = (targetIdx) => {
      if (targetIdx < 0 || targetIdx >= SECTION_IDS.length) return;
      isLockedRef.current = true;
      currentIndexRef.current = targetIdx;

      const targetEl = document.getElementById(SECTION_IDS[targetIdx]);
      if (targetEl) {
        window.scrollTo({ top: targetEl.offsetTop, behavior: 'smooth' });
      }

      // 850ms cooldown: smooth scroll completes (~450ms) + small stationary pause break (~400ms)
      // to absorb trackpad/mousewheel inertia and allow user to view the whole section clearly
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      lockTimerRef.current = setTimeout(() => {
        isLockedRef.current = false;
      }, 850);
    };

    const handleWheel = (e) => {
      // Prevent browser momentum from shooting straight to the bottom
      e.preventDefault();

      // If in cooldown / pause break, absorb excess inertia
      if (isLockedRef.current) return;

      // Filter out micro trackpad noise
      if (Math.abs(e.deltaY) < 18) return;

      const currentIdx = getSectionIndex();
      if (e.deltaY > 0) {
        if (currentIdx < SECTION_IDS.length - 1) {
          scrollToSection(currentIdx + 1);
        }
      } else {
        if (currentIdx > 0) {
          scrollToSection(currentIdx - 1);
        }
      }
    };

    const handleKeyDown = (e) => {
      const downKeys = ['ArrowDown', 'PageDown', ' '];
      const upKeys = ['ArrowUp', 'PageUp'];

      if (downKeys.includes(e.key)) {
        e.preventDefault();
        if (isLockedRef.current) return;
        const currentIdx = getSectionIndex();
        if (currentIdx < SECTION_IDS.length - 1) {
          scrollToSection(currentIdx + 1);
        }
      } else if (upKeys.includes(e.key)) {
        e.preventDefault();
        if (isLockedRef.current) return;
        const currentIdx = getSectionIndex();
        if (currentIdx > 0) {
          scrollToSection(currentIdx - 1);
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e) => {
      if (isLockedRef.current) return;
      if (e.changedTouches && e.changedTouches[0]) {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        if (Math.abs(deltaY) > 40) {
          const currentIdx = getSectionIndex();
          if (deltaY > 0 && currentIdx < SECTION_IDS.length - 1) {
            scrollToSection(currentIdx + 1);
          } else if (deltaY < 0 && currentIdx > 0) {
            scrollToSection(currentIdx - 1);
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, [activePage]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#070709',
        color: '#f5f4ef',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Top Navbar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area */}
      <main>
        {activePage === 'home' && (
          <>
            {/* Section 1 as sketched in Drawing 1 */}
            <Section1Hero />

            {/* Section 2 as sketched in Drawing 2 */}
            <Section2Sha256 />

            {/* Section 3 as sketched in Drawing 3 */}
            <Section3Parsing />

            {/* Section 4 as sketched in Drawing 4 */}
            <Section4Vault />

            {/* Section 5 as sketched in Drawing 5 & requested by user */}
            <Section5Usp />

            {/* Section 6: Live Prototype Demonstration */}
            <Section6Demo />

            {/* Section 7: Final Download Section (windows | mac | linux) */}
            <Section6Download />
          </>
        )}

        {activePage === 'docs' && <DocsPage />}

        {activePage === 'download' && <Section6Download />}
      </main>
    </div>
  );
}
