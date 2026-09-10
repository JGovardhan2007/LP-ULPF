import React, { useState } from 'react';

const USP_CARDS = [
  {
    id: 'zero-drop',
    title: '0% Drop',
    subtitle: 'Zero Packet Loss',
    why: 'Ring buffers and fallback classifiers guarantee zero dropped packets even during 100k+ EPS network spikes. Unparseable bytes are preserved untouched.',
  },
  {
    id: '100k-eps',
    title: '100k EPS',
    subtitle: 'Bare-Metal Rust',
    why: 'Native Rust wire daemon runs on Tokio UDP 5140 with zero-copy hardware hashing, delivering sub-millisecond p99 latency.',
  },
  {
    id: 'offline',
    title: '100% Offline',
    subtitle: 'Air-Gapped Ready',
    why: 'Self-contained local execution with offline GeoIP databases and local ML models. Zero external internet or cloud dependencies.',
  },
  {
    id: 'evidence',
    title: 'Court Evidence',
    subtitle: 'Section 65B Chain of Custody',
    why: 'Every packet is hashed with SHA-256 the instant it hits the socket, bound to UUIDv4 for Section 65B legal admissibility.',
  },
  {
    id: 'ocsf',
    title: 'Unified OCSF',
    subtitle: 'Class 4001 Schema',
    why: 'Normalizes multi-vendor logs from Cisco, Palo Alto, Fortinet, Windows, and Linux into standard Class 4001 network activity.',
  },
  {
    id: 'threat-ai',
    title: 'Threat AI',
    subtitle: '4-Model Ensemble',
    why: '4 unsupervised algorithms spot spatial anomalies, boundary drift, high-entropy tunnels, and C2 beacons without labeled training data.',
  },
  {
    id: 'hot-reload',
    title: 'Hot Reload',
    subtitle: 'Sub-Second Parsers',
    why: 'Add or update declarative YAML vendor parser definitions in under 1 second without restarting the ingestion daemon.',
  },
  {
    id: 'parquet',
    title: 'Parquet Lake',
    subtitle: '88% Compression',
    why: 'Snappy columnar compression slashes disk footprint by 88% while enabling ultra-fast DuckDB and SIEM queries.',
  },
];

function UspCard({ item }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        height: '210px',
        backgroundColor: '#0c0d12',
        border: isHovered
          ? '1px solid rgba(245, 244, 239, 0.35)'
          : '1px solid rgba(245, 244, 239, 0.09)',
        borderRadius: '12px',
        padding: '24px',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        boxShadow: isHovered
          ? '0 16px 36px rgba(0, 0, 0, 0.85)'
          : 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      {/* Front Content (Normal state: Large clean title + small subtitle) */}
      <div
        style={{
          filter: isHovered ? 'blur(6px)' : 'none',
          opacity: isHovered ? 0.15 : 1,
          transition: 'filter 0.3s ease, opacity 0.3s ease',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '2.1rem',
            fontWeight: 800,
            color: '#f5f4ef',
            letterSpacing: '0.02em',
            marginBottom: '6px',
            lineHeight: 1.1,
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.74rem',
            color: '#8c8980',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {item.subtitle}
        </div>
      </div>

      {/* Frosted Glass Overlay on Hover (Fixed size, blurs background, reveals reason) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '24px',
          backgroundColor: 'rgba(10, 11, 15, 0.92)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          opacity: isHovered ? 1 : 0,
          pointerEvents: isHovered ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem',
            color: '#f5f4ef',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '10px',
            borderBottom: '1px solid rgba(245, 244, 239, 0.15)',
            paddingBottom: '4px',
            width: '100%',
          }}
        >
          WHY: {item.title}
        </div>
        <p
          style={{
            fontSize: '0.86rem',
            color: '#cfc9bd',
            lineHeight: 1.55,
            fontWeight: 400,
            margin: 0,
          }}
        >
          {item.why}
        </p>
      </div>
    </div>
  );
}

export default function Section5Usp() {
  return (
    <section
      id="section-5"
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
      {/* Top Header: Title "Why WEED" + Clean Single Underline (NO subtitle paragraph) */}
      <div
        style={{
          width: '100%',
          padding: '0 48px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 2,
          marginBottom: '40px',
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
            Why WEED
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

      {/* Main Interactive USP Cards Grid: Fixed Size Rectangles with Frosted Glass Hover */}
      <div
        style={{
          width: '100%',
          padding: '0 48px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 2,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}
        >
          {USP_CARDS.map((item) => (
            <UspCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Bottom Area: Page Number "5" */}
      <div
        style={{
          width: '100%',
          padding: '0 48px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 2,
          marginTop: '32px',
        }}
      >
        {/* Bottom Right: Page Number "5" */}
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#5c5952',
          }}
        >
          5
        </div>
      </div>
    </section>
  );
}
