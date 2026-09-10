import React from 'react';

const PARSING_DATA = [
  {
    raw: '<134>1 2026-09-10 fw01 %ASA-4-106023: Deny udp src 198.51.100.42:51820 dst 10.0.4.12:53',
    json: '{"event":"DENY","vendor":"cisco_asa","src":"198.51.100.42","dst_port":53,"ocsf":"1.1.0"}',
  },
  {
    raw: '<13>Sep 10 12:00:02 auth-srv sshd[4912]: Failed password for invalid user admin from 203.0.113.88',
    json: '{"event":"AUTH_FAIL","service":"sshd","user":"admin","src_ip":"203.0.113.88","status":401}',
  },
  {
    raw: '<46>1 dc01 Microsoft-Windows-Security 4625: Account Logon Failure Administrator Status 0xC000006D',
    json: '{"event_id":4625,"schema":"windows_evtx","target_user":"Administrator","result":"FAILURE"}',
  },
  {
    raw: '<13>Sep 10 12:00:04 edge-dns named[842]: client @0x7f92 10.0.4.12 query: TXT exfil-c2.net',
    json: '{"type":"DNS_QUERY","qname":"exfil-c2.net","client":"10.0.4.12","entropy":4.88,"risk":"HIGH"}',
  },
  {
    raw: '<14>1 host-linux-01 kernel: [UFW BLOCK] IN=eth0 SRC=192.168.1.100 DST=10.0.0.1 PROTO=TCP DPT=445',
    json: '{"action":"UFW_BLOCK","protocol":"TCP","dst_port":445,"src_ip":"192.168.1.100","proto_num":6}',
  },
];

// Quadrupled stream for continuous infinite ticker without jumping
const STREAM_ITEMS = [...PARSING_DATA, ...PARSING_DATA, ...PARSING_DATA, ...PARSING_DATA];

export default function Section3Parsing() {
  return (
    <section
      id="section-3"
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
        borderTop: '1px solid rgba(245, 244, 239, 0.05)',
      }}
    >
      {/* Top Labels: JSON SCRIPT at Left, RAW STRING at Right */}
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
          JSON SCRIPT
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
          RAW STRING
        </span>
      </div>

      {/* Main Single Stream Line moving from Right to Left (<--) with Zero-Lag Dual-Clip Threshold */}
      <div
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
        {/* Layer 1: Left Side of Threshold (Clipped to Left 50%) -> Structured JSON Script */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)',
            WebkitClipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <div className="stream-rtl">
            {STREAM_ITEMS.map((item, idx) => (
              <div
                key={idx}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1.15rem',
                  letterSpacing: '0.5px',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: '#20c997',
                }}
              >
                <span style={{ color: '#00d8f6', marginRight: '6px' }}>&lt;json&gt;</span>
                {item.json}
              </div>
            ))}
          </div>
        </div>

        {/* Layer 2: Right Side of Threshold (Clipped to Right 50%) -> Raw Syslog String */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
            WebkitClipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <div className="stream-rtl">
            {STREAM_ITEMS.map((item, idx) => (
              <div
                key={idx}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1.15rem',
                  letterSpacing: '0.5px',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: '#f5f4ef',
                }}
              >
                <span style={{ color: '#ff922b', marginRight: '8px' }}>&lt;&lt;</span>
                {item.raw}
              </div>
            ))}
          </div>
        </div>

        {/* Center Vertical Dividing Line with Soft Fading at Top and Bottom (as sketched) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '0%',
            bottom: '0%',
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, rgba(245, 244, 239, 0.25) 20%, #ffffff 50%, rgba(245, 244, 239, 0.25) 80%, transparent)',
            transform: 'translateX(-50%)',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Bottom Area: Big Bold "Parsing" Title + Underline + Description (Left) & Page 3 (Right) */}
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
        {/* Bottom Left: Cinematic "Parsing" with Back Soft Shadow */}
        <div style={{ maxWidth: '640px', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '-15px',
              left: '-20px',
              width: '340px',
              height: '100px',
              backgroundColor: 'rgba(0, 216, 246, 0.05)',
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
              Parsing
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
            Multi-vendor syslog normalization engine converting heterogeneous, unstructured network and endpoint strings
            into standardized, machine-readable JSON schema (OCSF v1.1.0) with zero line-rate delay.
          </p>
        </div>

        {/* Bottom Right: Page Number "3" */}
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#5c5952',
          }}
        >
          3
        </div>
      </div>
    </section>
  );
}
