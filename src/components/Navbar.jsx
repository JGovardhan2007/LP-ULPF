import React from 'react';
import BrandLogoIcon from './BrandLogoIcon';

export default function Navbar({ activePage, setActivePage }) {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'rgba(7, 7, 9, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(245, 244, 239, 0.06)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* Brand with Icon */}
        <div
          onClick={() => setActivePage('home')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <BrandLogoIcon size={30} />
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: '#f5f4ef',
            }}
          >
            WEED
          </span>
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: '#e03131',
            }}
          />
        </div>

        {/* 3 Nav Items: home, docs, download */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'docs', label: 'Docs' },
            { id: 'download', label: 'Download' },
          ].map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'download') {
                    if (activePage !== 'home') {
                      setActivePage('home');
                    }
                    setTimeout(() => {
                      document.getElementById('section-6')?.scrollIntoView({ behavior: 'smooth' });
                    }, 60);
                  } else if (item.id === 'home') {
                    setActivePage('home');
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 50);
                  } else if (item.id === 'docs') {
                    setActivePage('docs');
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 50);
                  }
                }}
                style={{
                  background: isActive ? 'rgba(245, 244, 239, 0.08)' : 'transparent',
                  border: 'none',
                  color: isActive ? '#f5f4ef' : '#8c8980',
                  padding: '7px 18px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#f5f4ef';
                    e.currentTarget.style.backgroundColor = 'rgba(245, 244, 239, 0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#8c8980';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
