import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Section1Hero() {
  const [hoveredNode, setHoveredNode] = useState(null);

  const devices = [
    {
      id: 'D1',
      label: 'Workstation',
      sub: 'macOS / Linux Host',
      image: '/assets/devices/laptop.jpg',
    },
    {
      id: 'D2',
      label: 'Wi-Fi Router',
      sub: 'Enterprise AP / 514',
      image: '/assets/devices/router.jpg',
    },
    {
      id: 'D3',
      label: 'Rack Server',
      sub: 'Database & Auth Srv',
      image: '/assets/devices/server.jpg',
    },
    {
      id: 'D4',
      label: 'IoT Gateway',
      sub: 'Edge Telemetry Node',
      image: '/assets/devices/iot.jpg',
    },
  ];

  const rawLogsLine1 = [
    '<134>1 2026-09-10T12:00:01Z fw01.corp %ASA-4-106023: Deny udp src 198.51.100.42:51820 dst 10.0.4.12:53 by access-group "INSPECT"',
    '<13>Sep 10 12:00:02 auth-srv sshd[4912]: Failed password for invalid user admin from 203.0.113.88 port 51221 ssh2',
    '<46>1 2026-09-10T12:00:03.110Z dc01 Microsoft-Windows-Security-Auditing 4625 - An account failed to log on: User-09',
    '<13>Sep 10 12:00:04 edge-dns named[842]: client @0x7f92 10.0.4.12#54321 (d3d3LmV4ZmlsdHJhdGlvbg): query: TXT + (10.0.4.1)',
  ];

  const rawLogsLine2 = [
    '<14>1 2026-09-10T12:00:05Z host-linux-01 kernel: [UFW BLOCK] IN=eth0 OUT= SRC=192.168.1.100 DST=10.0.0.1 PROTO=TCP DPT=445',
    '<13>Sep 10 12:00:06 endpoint-04 powershell.exe: -EncodedCommand SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIABO...',
    '<134>1 2026-09-10T12:00:07Z palo-alto-01 TRAFFIC,drop,10.1.4.19,172.217.16.206,443,ssl,alert',
    '<86>1 2026-09-10T12:00:08Z k8s-node-02 kubelet[1104]: E0910 Unauthorized API token access attempt from 10.244.0.1',
  ];

  return (
    <section
      id="section-1"
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
      {/* Top Title & Tagline */}
      <div style={{ textAlign: 'center', marginBottom: '30px', padding: '0 20px' }}>
        <h1
          style={{
            fontFamily: "'Outfit', -apple-system, sans-serif",
            fontSize: 'clamp(3.4rem, 7.5vw, 5.6rem)',
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: '#f5f4ef',
            lineHeight: 1,
            marginBottom: '14px',
          }}
        >
          WEED
        </h1>
        <p
          style={{
            fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#8c8980',
            fontWeight: 500,
          }}
        >
          Line-Rate Log Ingestion &amp; Preprocessing Framework
        </p>
      </div>

      {/* Balanced Center Layout */}
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          paddingLeft: '48px',
          paddingRight: '0',
          position: 'relative',
        }}
      >
        {/* Left Side: Devices + Long Stretched Cable Bridge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '400px',
          }}
        >
          {/* Devices Column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              width: '210px',
              flexShrink: 0,
              zIndex: 3,
            }}
          >
            {devices.map((device) => {
              const isHovered = hoveredNode === device.id;
              return (
                <div
                  key={device.id}
                  onMouseEnter={() => setHoveredNode(device.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                    transform: isHovered ? 'translateX(6px)' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: '62px',
                      height: '62px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: '#000000',
                      border: isHovered
                        ? '1px solid rgba(245, 244, 239, 0.4)'
                        : '1px solid rgba(245, 244, 239, 0.1)',
                      flexShrink: 0,
                      position: 'relative',
                    }}
                  >
                    <img
                      src={device.image}
                      alt={device.label}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        right: '4px',
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        fontFamily: 'JetBrains Mono, monospace',
                        color: '#f5f4ef',
                        background: 'rgba(0,0,0,0.75)',
                        padding: '1px 4px',
                        borderRadius: '3px',
                      }}
                    >
                      {device.id}
                    </div>
                  </div>

                  <div>
                    <div style={{ color: '#f5f4ef', fontWeight: 600, fontSize: '0.9rem' }}>
                      {device.label}
                    </div>
                    <div style={{ color: '#8c8980', fontSize: '0.74rem', marginTop: '2px' }}>
                      {device.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Long Stretched Cable Bridge to Firewall */}
          <div
            style={{
              flex: 1,
              height: '400px',
              position: 'relative',
              marginLeft: '12px',
            }}
          >
            <svg
              viewBox="0 0 500 400"
              preserveAspectRatio="none"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'visible',
              }}
            >
              {/* Subtle Base Guide Wires */}
              <path d="M 0 50 C 260 50, 300 200, 500 200" fill="none" stroke="rgba(245, 244, 239, 0.12)" strokeWidth="1.5" />
              <path d="M 0 150 C 240 150, 320 200, 500 200" fill="none" stroke="rgba(245, 244, 239, 0.12)" strokeWidth="1.5" />
              <path d="M 0 250 C 240 250, 320 200, 500 200" fill="none" stroke="rgba(245, 244, 239, 0.12)" strokeWidth="1.5" />
              <path d="M 0 350 C 260 350, 300 200, 500 200" fill="none" stroke="rgba(245, 244, 239, 0.12)" strokeWidth="1.5" />

              {/* Line 1 (D1): Device -> Firewall, then Firewall -> Device */}
              <path
                d="M 0 50 C 260 50, 300 200, 500 200"
                pathLength="100"
                fill="none"
                stroke="#ff922b"
                strokeWidth="3.2"
                strokeLinecap="round"
                className="beam-to-firewall"
                style={{ animationDelay: '0s' }}
              />
              <path
                d="M 0 50 C 260 50, 300 200, 500 200"
                pathLength="100"
                fill="none"
                stroke="#ffba53"
                strokeWidth="2.6"
                strokeLinecap="round"
                className="beam-to-device"
                style={{ animationDelay: '0s' }}
              />

              {/* Line 2 (D2): Device -> Firewall, then Firewall -> Device */}
              <path
                d="M 0 150 C 240 150, 320 200, 500 200"
                pathLength="100"
                fill="none"
                stroke="#ff922b"
                strokeWidth="3.2"
                strokeLinecap="round"
                className="beam-to-firewall"
                style={{ animationDelay: '0.8s' }}
              />
              <path
                d="M 0 150 C 240 150, 320 200, 500 200"
                pathLength="100"
                fill="none"
                stroke="#ffba53"
                strokeWidth="2.6"
                strokeLinecap="round"
                className="beam-to-device"
                style={{ animationDelay: '0.8s' }}
              />

              {/* Line 3 (D3): Device -> Firewall, then Firewall -> Device */}
              <path
                d="M 0 250 C 240 250, 320 200, 500 200"
                pathLength="100"
                fill="none"
                stroke="#ff922b"
                strokeWidth="3.2"
                strokeLinecap="round"
                className="beam-to-firewall"
                style={{ animationDelay: '1.6s' }}
              />
              <path
                d="M 0 250 C 240 250, 320 200, 500 200"
                pathLength="100"
                fill="none"
                stroke="#ffba53"
                strokeWidth="2.6"
                strokeLinecap="round"
                className="beam-to-device"
                style={{ animationDelay: '1.6s' }}
              />

              {/* Line 4 (D4): Device -> Firewall, then Firewall -> Device */}
              <path
                d="M 0 350 C 260 350, 300 200, 500 200"
                pathLength="100"
                fill="none"
                stroke="#ff922b"
                strokeWidth="3.2"
                strokeLinecap="round"
                className="beam-to-firewall"
                style={{ animationDelay: '2.4s' }}
              />
              <path
                d="M 0 350 C 260 350, 300 200, 500 200"
                pathLength="100"
                fill="none"
                stroke="#ffba53"
                strokeWidth="2.6"
                strokeLinecap="round"
                className="beam-to-device"
                style={{ animationDelay: '2.4s' }}
              />
            </svg>
          </div>
        </div>

        {/* Center: 3D FIREWALL Monolith (Exactly in the Middle of the Screen) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '180px',
            flexShrink: 0,
            zIndex: 4,
            padding: '0 10px',
          }}
        >
          <div
            style={{
              width: '140px',
              height: '260px',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#000000',
              border: '1px solid rgba(245, 244, 239, 0.14)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.9)',
              position: 'relative',
            }}
          >
            <img
              src="/assets/devices/firewall.jpg"
              alt="Firewall Monolith"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.88rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: '#f5f4ef',
              }}
            >
              FIREWALL
            </span>
            <div style={{ fontSize: '0.72rem', color: '#8c8980', marginTop: '2px' }}>
              UDP 5140 Ingestion Hub
            </div>
          </div>
        </div>

        {/* Right Side: Raw Log Stream Stretching All the Way to the Screen End */}
        <div
          style={{
            width: '100%',
            overflow: 'hidden',
            paddingLeft: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#8c8980',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              Raw Log Stream
            </span>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#20c997',
              }}
            />
          </div>

          {/* Line 1: Pure continuous streaming text (NO boxes) */}
          <div
            style={{
              overflow: 'hidden',
              padding: '10px 0',
              maskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
            }}
          >
            <div className="log-ticker-track" style={{ animationDuration: '30s' }}>
              {[...rawLogsLine1, ...rawLogsLine1].map((log, index) => (
                <div
                  key={index}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.8rem',
                    color: '#cfc9bd',
                    whiteSpace: 'nowrap',
                    padding: '2px 0',
                  }}
                >
                  <span style={{ color: '#ff922b', marginRight: '8px', opacity: 0.9 }}>&gt;</span>
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Line 2: Reverse continuous stream (NO boxes) */}
          <div
            style={{
              overflow: 'hidden',
              padding: '8px 0',
              marginTop: '8px',
              maskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
            }}
          >
            <div
              className="log-ticker-track"
              style={{ animationDuration: '36s', animationDirection: 'reverse' }}
            >
              {[...rawLogsLine2, ...rawLogsLine2].map((log, index) => (
                <div
                  key={index}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.76rem',
                    color: '#8c8980',
                    whiteSpace: 'nowrap',
                    padding: '2px 0',
                  }}
                >
                  <span style={{ color: '#e03131', marginRight: '8px', opacity: 0.85 }}>#</span>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Page Number 1 at the Bottom Right */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '36px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '1.25rem',
          fontWeight: 600,
          color: '#5c5952',
        }}
      >
        1
      </div>
    </section>
  );
}
