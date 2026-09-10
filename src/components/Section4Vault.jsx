import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOG_RECORDS = [
  '{"event":"INGEST","src":"198.51.100.42:51820","dst":"10.0.4.12:53","proto":"UDP"}',
  '{"event":"AUTH_FAIL","service":"sshd","user":"admin","src_ip":"203.0.113.88","port":22}',
  '{"event_id":4625,"schema":"windows_evtx","target":"Administrator","status":"0xC000006D"}',
  '{"type":"DNS_QUERY","qname":"exfil-c2.net","client":"10.0.4.12","entropy":4.88}',
  '{"action":"UFW_BLOCK","src_ip":"192.168.1.100","dst_ip":"10.0.0.1","proto":"TCP"}',
  '{"vendor":"palo_alto","rule":"THREAT_DROP","threat":"Suspicious_TLS_Sni"}',
  '{"sensor":"iot_gw_04","telemetry":"modbus_crc_err","dev_id":"PL-8421"}',
];

export default function Section4Vault() {
  const [fileVersion, setFileVersion] = useState(1);
  const [activeLineIdx, setActiveLineIdx] = useState(0);
  const [committedLines, setCommittedLines] = useState([]);
  const [lineProgress, setLineProgress] = useState(0); // 0.0 to 1.0 continuous progress
  const [fileIsExiting, setFileIsExiting] = useState(false);

  const railRef = useRef(null);
  const [railWidth, setRailWidth] = useState(500);

  // Measure rail width dynamically
  useEffect(() => {
    const updateWidth = () => {
      if (railRef.current) {
        setRailWidth(railRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Continuous linear animation loop via requestAnimationFrame (NO stopping, NO fading!)
  useEffect(() => {
    if (fileIsExiting) return;

    let animId;
    let startTime = null;
    const duration = 2600; // 2.6 seconds per line for smooth, readable flow

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1.0);

      setLineProgress(progress);

      if (progress < 1.0) {
        animId = requestAnimationFrame(animate);
      } else {
        // Line has finished scrolling completely into the file
        setCommittedLines((prev) => [...prev, LOG_RECORDS[activeLineIdx]]);

        if (activeLineIdx < LOG_RECORDS.length - 1) {
          setActiveLineIdx((prev) => prev + 1);
          setLineProgress(0);
        } else {
          // File is totally filled with all 7 lines!
          setTimeout(() => {
            setFileIsExiting(true);
            setTimeout(() => {
              setFileVersion((prev) => prev + 1);
              setCommittedLines([]);
              setActiveLineIdx(0);
              setLineProgress(0);
              setFileIsExiting(false);
            }, 650);
          }, 1400);
        }
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [activeLineIdx, fileVersion, fileIsExiting]);

  // Precise vertical alignment:
  // File height = 370px. Header = 40px. Body top padding = 8px. Each line slot = 38px.
  // Center Y for line idx = 40 + 8 + idx * 38 + 19 = 67 + idx * 38px.
  const lineCenterY = 67 + activeLineIdx * 38;

  // Horizontal motion calculations:
  // Phase 1: 0.0 to 0.45 -> String glides across the rail towards the file.
  // Phase 2: 0.45 to 1.0 -> String touches the file boundary and streams directly into the line character-by-character.
  const touchThreshold = 0.45;
  const isTouching = lineProgress >= touchThreshold;

  const currentRecord = LOG_RECORDS[activeLineIdx] || '';
  const totalChars = currentRecord.length;

  let railDisplayString = currentRecord;
  let lineDisplayString = '';
  let charsEntered = 0;

  // Rail X position during travel
  // At progress = 0: string is at left end (-railWidth + 60px)
  // At progress = touchThreshold: string reaches the file border (translateX = 0)
  let railTranslateX = 0;

  if (!isTouching) {
    const travelRatio = lineProgress / touchThreshold; // 0 to 1
    railTranslateX = (-railWidth * 0.75) * (1 - travelRatio);
    railDisplayString = currentRecord;
    lineDisplayString = '';
  } else {
    // String has touched the file: characters flow into the file line by line
    const entryRatio = (lineProgress - touchThreshold) / (1.0 - touchThreshold); // 0 to 1
    charsEntered = Math.min(totalChars, Math.max(1, Math.floor(totalChars * entryRatio)));

    lineDisplayString = currentRecord.substring(0, charsEntered);
    railDisplayString = currentRecord.substring(charsEntered);
    railTranslateX = 0;
  }

  return (
    <section
      id="section-4"
      style={{
        height: '100vh',
        minHeight: '100vh',
        maxHeight: '100vh',
        paddingTop: '65px',
        paddingBottom: '22px',
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
      {/* Top Header Bar: Clean "JSON SCRIPT" (NO arrow mark) on Left, Vault Tag on Right */}
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
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#8c8980',
          }}
        >
          IMMUTABLE LOG VAULT ARCHIVE
        </span>
      </div>

      {/* Main Interactive Stage: Seamless pixel connection between Rail and File */}
      <div
        style={{
          width: '100%',
          padding: '0 48px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 580px',
          alignItems: 'center',
          gap: '0px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 2,
          minWidth: 0,
          margin: '6px 0',
        }}
      >
        {/* Left Side: Continuous Stream Rail dynamically aligned with active file line */}
        <div
          ref={railRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '370px',
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          {/* Subtle guide line at the EXACT pixel Y coordinate of the active line */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: `${lineCenterY}px`,
              height: '1px',
              backgroundColor: 'rgba(245, 244, 239, 0.12)',
              transition: 'top 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          {/* Glowing Touch Point at the exact junction where rail meets the file */}
          <div
            style={{
              position: 'absolute',
              right: '0px',
              top: `${lineCenterY - 3}px`,
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: isTouching ? '#20c997' : 'rgba(245, 244, 239, 0.3)',
              boxShadow: isTouching ? '0 0 14px #20c997' : 'none',
              transition: 'top 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.1s ease',
              zIndex: 3,
            }}
          />

          {/* THE STREAMING STRING ON THE RAIL: Glides smoothly and feeds into the file */}
          <div
            style={{
              position: 'absolute',
              right: '8px',
              top: `${lineCenterY - 10}px`,
              transform: `translateX(${railTranslateX}px)`,
              whiteSpace: 'nowrap',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.78rem',
              color: '#00d8f6',
              letterSpacing: '0.02em',
              textShadow: '0 0 10px rgba(0, 216, 246, 0.35)',
              willChange: 'transform',
              pointerEvents: 'none',
              transition: 'top 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {railDisplayString && (
              <>
                <span style={{ color: '#ff922b', fontWeight: 700 }}>&gt;&gt;</span>
                <span>{railDisplayString}</span>
              </>
            )}
          </div>
        </div>

        {/* Right Side: TALL STRETCHED FILE DOCUMENT (audit_vault_vN.log) */}
        {/* All 7 lines fill completely, then file slides out to the right */}
        <div style={{ position: 'relative', width: '100%', height: '370px', minWidth: 0 }}>
          <AnimatePresence mode="wait">
            {!fileIsExiting && (
              <motion.div
                key={`vault-doc-${fileVersion}`}
                initial={{ opacity: 0, y: 35, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  x: 350,
                  transition: { duration: 0.6, ease: 'easeInOut' },
                }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  height: '370px',
                  backgroundColor: '#0d0e12',
                  border: '1px solid rgba(245, 244, 239, 0.14)',
                  borderRadius: '14px',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.85)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  position: 'relative',
                  boxSizing: 'border-box',
                }}
              >
                {/* File Header Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 18px',
                    height: '40px',
                    backgroundColor: '#13151c',
                    borderBottom: '1px solid rgba(245, 244, 239, 0.1)',
                    boxSizing: 'border-box',
                    flexShrink: 0,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e03131' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff922b' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#20c997' }} />
                    <span
                      style={{
                        marginLeft: '10px',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        color: '#f5f4ef',
                        letterSpacing: '0.5px',
                      }}
                    >
                      audit_vault_v{fileVersion}.log
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.72rem',
                      color: committedLines.length === LOG_RECORDS.length ? '#20c997' : '#ff922b',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {committedLines.length === LOG_RECORDS.length
                      ? 'ARCHIVED & SEALED'
                      : `${committedLines.length}/${LOG_RECORDS.length} LINES`}
                  </span>
                </div>

                {/* Stretched File Content: 7 lines completely filled */}
                <div
                  style={{
                    flex: 1,
                    padding: '6px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.74rem',
                    lineHeight: 1.45,
                    backgroundColor: '#090a0e',
                    overflow: 'hidden',
                    boxSizing: 'border-box',
                  }}
                >
                  {LOG_RECORDS.map((record, idx) => {
                    const isCommitted = idx < committedLines.length;
                    const isActive = idx === activeLineIdx && !isCommitted;

                    return (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          borderLeft: isCommitted
                            ? '2px solid #20c997'
                            : isActive
                            ? '2px solid #00d8f6'
                            : '2px solid rgba(245, 244, 239, 0.05)',
                          paddingLeft: '10px',
                          height: '38px',
                          overflow: 'hidden',
                          position: 'relative',
                          boxSizing: 'border-box',
                        }}
                      >
                        {/* Line number: 01, 02, ... 07 */}
                        <span
                          style={{
                            color: isCommitted ? '#5c5952' : isActive ? '#00d8f6' : '#2a2c35',
                            userSelect: 'none',
                            fontWeight: 600,
                            flexShrink: 0,
                            width: '24px',
                          }}
                        >
                          0{idx + 1}
                        </span>

                        {/* Already committed full line */}
                        {isCommitted && (
                          <span style={{ color: '#cfc9bd', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {record}
                          </span>
                        )}

                        {/* Actively streaming line: Characters appear as they cross into the file */}
                        {isActive && (
                          <div
                            style={{
                              position: 'relative',
                              width: '100%',
                              height: '100%',
                              overflow: 'hidden',
                              display: 'flex',
                              alignItems: 'center',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <span style={{ color: '#f5f4ef' }}>
                              {lineDisplayString}
                              {isTouching && charsEntered < totalChars && (
                                <span
                                  style={{
                                    display: 'inline-block',
                                    width: '6px',
                                    height: '13px',
                                    backgroundColor: '#20c997',
                                    marginLeft: '2px',
                                    verticalAlign: 'middle',
                                  }}
                                />
                              )}
                            </span>
                          </div>
                        )}

                        {/* Awaiting line */}
                        {!isCommitted && !isActive && (
                          <span style={{ color: '#252732', fontStyle: 'italic', fontSize: '0.7rem' }}>
                            --
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Stretched File Footer Bar */}
                <div
                  style={{
                    padding: '8px 18px',
                    height: '36px',
                    backgroundColor: '#11131a',
                    borderTop: '1px solid rgba(245, 244, 239, 0.08)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.7rem',
                    color: '#8c8980',
                    fontFamily: 'JetBrains Mono, monospace',
                    boxSizing: 'border-box',
                    flexShrink: 0,
                  }}
                >
                  <span>FORMAT: OCSF JSON + SHA256</span>
                  <span>IMMUTABLE STORAGE</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Area: Minimalist Title "Storage" + Single Cream Underline + Short Description & Page 4 */}
      <div
        style={{
          width: '100%',
          padding: '0 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Bottom Left: Tag + Title "Storage" + Single Clean Underline + Short Description */}
        <div style={{ maxWidth: '640px', position: 'relative' }}>
          <div
            style={{
              fontSize: '0.74rem',
              color: '#8c8980',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.06em',
              marginBottom: '6px',
              textTransform: 'uppercase',
            }}
          >
            STREAM &rarr; IMMUTABLE DISK ARCHIVE &nbsp;|&nbsp; CONTINUOUS INGEST
          </div>

          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '8px' }}>
            <h2
              style={{
                fontFamily: "'Outfit', -apple-system, sans-serif",
                fontSize: 'clamp(2rem, 4.2vw, 3.2rem)',
                fontWeight: 900,
                letterSpacing: '0.04em',
                color: '#f5f4ef',
                lineHeight: 1.1,
                marginBottom: '6px',
                textShadow: '0 6px 30px rgba(0,0,0,0.9)',
              }}
            >
              Storage
            </h2>

            {/* Single Clean Cream Underline */}
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

          {/* Short, concise 1-line description */}
          <p
            style={{
              fontSize: '0.92rem',
              color: '#cfc9bd',
              lineHeight: 1.45,
              fontWeight: 400,
              margin: 0,
            }}
          >
            Line-rate storage engine archives raw logs and normalized OCSF JSON directly into immutable local disk.
          </p>
        </div>

        {/* Bottom Right: Page Number "4" */}
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#5c5952',
          }}
        >
          4
        </div>
      </div>
    </section>
  );
}
