import React from 'react';

export default function Section6Demo() {
  return (
    <section
      id="section-6"
      style={{
        height: '100vh',
        minHeight: '100vh',
        maxHeight: '100vh',
        paddingTop: '80px',
        paddingBottom: '30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: '#070709',
        overflow: 'hidden',
        borderTop: '1px solid rgba(245, 244, 239, 0.05)',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      {/* Top Header: Side Heading "Live Demonstration" with Clean Underline */}
      <div
        style={{
          width: '100%',
          padding: '0 48px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'inline-block' }}>
          <h2
            style={{
              fontFamily: "'Outfit', -apple-system, sans-serif",
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              fontWeight: 900,
              letterSpacing: '0.04em',
              color: '#f5f4ef',
              lineHeight: 1.1,
              marginBottom: '10px',
              textShadow: '0 6px 30px rgba(0,0,0,0.9)',
            }}
          >
            Live Demonstration
          </h2>

          <div
            style={{
              width: '100%',
              height: '3px',
              backgroundColor: '#f5f4ef',
              borderRadius: '2px',
              boxShadow: '0 2px 10px rgba(245, 244, 239, 0.25)',
            }}
          />
        </div>
      </div>

      {/* Main Video Center Stage */}
      <div
        style={{
          width: '100%',
          padding: '0 48px',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          minHeight: 0,
          margin: '16px 0',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '920px',
            maxHeight: '480px',
            aspectRatio: '16 / 9',
            backgroundColor: '#0d0e12',
            borderRadius: '12px',
            border: '1px solid rgba(245, 244, 239, 0.12)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <video
            src="/assets/demo.mp4"
            controls
            playsInline
            preload="metadata"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              backgroundColor: '#000',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Bottom Area: Technical Tag & Page Marker "6" */}
      <div
        style={{
          width: '100%',
          padding: '0 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.74rem',
            color: '#5c5952',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          SYSTEM PROTOTYPE RUNTIME &bull; NTRO PROBLEM STATEMENT 26156
        </span>

        {/* Bottom Right: Page Number "6" */}
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#5c5952',
          }}
        >
          6
        </div>
      </div>
    </section>
  );
}
