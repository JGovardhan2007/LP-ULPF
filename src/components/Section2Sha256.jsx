import React, { useState, useEffect, useRef } from 'react';

const LOG_PAIRS = [
  {
    raw: '<134>1 2026-09-10 fw01.corp %ASA-4-106023: Deny udp src 198.51.100.42:53',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  },
  {
    raw: '<13>Sep 10 12:00:02 auth-srv sshd[4912]: Failed password for invalid root',
    hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
  },
  {
    raw: '<46>1 2026-09-10 dc01 Microsoft-Windows-Security-4625: Logon Failure Admin',
    hash: '4a6b2c89f28d8b9e0f635c8263dae81254bf2578fa981e28945628b6d4981329',
  },
  {
    raw: '<13>Sep 10 12:00:04 edge-dns named[842]: client query TXT exfil-c2.net',
    hash: '92d13b9148d2894a739d48e89408bcf1354a896d8849bfa8669485f2b8492043',
  },
  {
    raw: '<14>1 2026-09-10 host-linux-01 kernel: [UFW BLOCK] IN=eth0 SRC=192.168.1.1',
    hash: 'b5d8481545ecda15b0de067b079603a11884483a992d9f36f33d76378e9f2963',
  },
];

const TARGET_LEN = 64;
const CHAR_WIDTH = 13.5; // Monospace width
const STRING_PIXEL_WIDTH = TARGET_LEN * CHAR_WIDTH; // ~864px
const GAP_PIXELS = 260; // Clean, comfortable spacing between strings (no long wait, no overlap)
const STRIDE = STRING_PIXEL_WIDTH + GAP_PIXELS; // ~1124px
const NUM_ITEMS = LOG_PAIRS.length;
const TOTAL_TRACK_LENGTH = STRIDE * NUM_ITEMS;

export default function Section2Sha256() {
  const containerRef = useRef(null);
  const [baseOffset, setBaseOffset] = useState(0);
  const [midX, setMidX] = useState(600);

  // Track viewport center
  useEffect(() => {
    const updateMid = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMidX(rect.width / 2);
      } else {
        setMidX(window.innerWidth / 2);
      }
    };
    updateMid();
    window.addEventListener('resize', updateMid);
    return () => window.removeEventListener('resize', updateMid);
  }, []);

  // Continuous linear scrolling loop with higher frequency
  useEffect(() => {
    let animId;
    let offset = 0;
    const speed = 2.4; // Smooth, deliberate speed

    const animate = () => {
      offset += speed;
      if (offset >= TOTAL_TRACK_LENGTH) {
        offset = 0;
      }
      setBaseOffset(offset);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      id="section-2"
      style={{
        height: '100vh',
        minHeight: '100vh',
        boxSizing: 'border-box',
        paddingTop: '80px',
        paddingBottom: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: '#070709',
        overflowX: 'hidden',
      }}
    >
      {/* Top Labels: RAW STRINGS at Left, SHA CODE at Right */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 48px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.25rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#f5f4ef',
          }}
        >
          RAW STRINGS
        </span>

        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.25rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#f5f4ef',
          }}
        >
          SHA CODE
        </span>
      </div>

      {/* The Single Continuous Stream Line with steady flow and zero overlap */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '140px',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        {LOG_PAIRS.map((pair, idx) => {
          // Calculate string X position on the screen
          // We modulo so the train loops infinitely without jumping
          let itemX = (baseOffset - idx * STRIDE) % TOTAL_TRACK_LENGTH;
          if (itemX < -STRING_PIXEL_WIDTH - 200) {
            itemX += TOTAL_TRACK_LENGTH;
          }
          // Wrap from right to left smoothly
          if (itemX > window.innerWidth + 200) {
            itemX -= TOTAL_TRACK_LENGTH;
          }

          const rawPadded = pair.raw.padEnd(TARGET_LEN, ' ').slice(0, TARGET_LEN);
          const hashString = pair.hash;

          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: 0,
                transform: `translateX(${itemX}px)`,
                display: 'inline-flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.15rem',
                letterSpacing: '1px',
                willChange: 'transform',
              }}
            >
              {Array.from({ length: TARGET_LEN }).map((_, i) => {
                const charAbsoluteX = itemX + i * CHAR_WIDTH;
                const isCrossing = Math.abs(charAbsoluteX - midX) <= 12;
                const isPastCenter = charAbsoluteX > midX + 12;

                let charToDisplay;
                let charColor;

                if (isCrossing) {
                  const scrambleChars = '0123456789abcdefABCDEF$#@!&*';
                  charToDisplay = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                  charColor = '#ff922b';
                } else if (isPastCenter) {
                  charToDisplay = hashString[i] || '0';
                  charColor = '#20c997';
                } else {
                  charToDisplay = rawPadded[i] || ' ';
                  charColor = '#f5f4ef';
                }

                return (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      width: `${CHAR_WIDTH}px`,
                      textAlign: 'center',
                      color: charColor,
                      textShadow: isCrossing
                        ? '0 0 12px rgba(255, 146, 43, 0.8)'
                        : (isPastCenter ? '0 0 10px rgba(32, 201, 151, 0.4)' : 'none'),
                      userSelect: 'none',
                    }}
                  >
                    {charToDisplay}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Bottom Area: Big Bold SHA256 Title + Underline + Description (Left) & Page 2 (Right) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '0 48px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Bottom Left: Cinematic SHA256 with Back Soft Shadow */}
        <div style={{ maxWidth: '640px', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '-15px',
              left: '-20px',
              width: '340px',
              height: '100px',
              backgroundColor: 'rgba(245, 244, 239, 0.04)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
              borderRadius: '50%',
            }}
          />

          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
            <h2
              style={{
                fontFamily: "'Outfit', -apple-system, sans-serif",
                fontSize: 'clamp(3rem, 6.5vw, 5rem)',
                fontWeight: 900,
                letterSpacing: '0.04em',
                color: '#f5f4ef',
                lineHeight: 1,
                marginBottom: '12px',
                textShadow: '0 6px 30px rgba(0,0,0,0.9)',
              }}
            >
              SHA256
            </h2>
            {/* Bold Underline as sketched */}
            <div
              style={{
                width: '100%',
                height: '4px',
                backgroundColor: '#f5f4ef',
                borderRadius: '2px',
                boxShadow: '0 2px 14px rgba(245, 244, 239, 0.3)',
              }}
            />
          </div>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#cfc9bd',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Zero-latency cryptographic wire hashing executed on raw socket buffers prior to schema normalization.
            Guarantees strict Section 65B Indian Evidence Act court admissibility and tamper-evident evidentiary custody.
          </p>
        </div>

        {/* Bottom Right: Page Number "2" */}
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#5c5952',
          }}
        >
          2
        </div>
      </div>
    </section>
  );
}
