import React, { useState } from 'react';

const GITHUB_REPO = 'https://github.com/JGovardhan2007/universal-log-preprocessing-framework';
const ZIP_URL = 'https://github.com/JGovardhan2007/universal-log-preprocessing-framework/archive/refs/heads/main.zip';
const DOCKER_CMD = 'docker compose up -d';

const DOWNLOAD_OPTIONS = [
  {
    id: 'windows',
    title: 'Windows',
    sub: 'Docker Desktop / Windows Server',
    arch: 'x86_64 / ARM64',
    url: ZIP_URL,
    cmd: DOCKER_CMD,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.401H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
      </svg>
    ),
  },
  {
    id: 'mac',
    title: 'macOS',
    sub: 'Apple Silicon (M1-M4) & Intel',
    arch: 'Universal Binary & Docker',
    url: ZIP_URL,
    cmd: DOCKER_CMD,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.61 1.34-.55.63-1.03 1.68-.9 2.71 1 .08 2.02-.51 2.59-1.2" />
      </svg>
    ),
  },
  {
    id: 'linux',
    title: 'Linux',
    sub: 'Ubuntu / Debian / RHEL / Arch',
    arch: 'x86_64 / aarch64 Bare-Metal',
    url: ZIP_URL,
    cmd: DOCKER_CMD,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 2c-3.142 0-4.001 2.463-4.001 4.542 0 1.218.423 2.467 1.087 3.32-.423.498-1.54 1.83-1.54 3.738 0 1.245.474 2.378 1.258 3.123C7.618 18.064 7 19.387 7 20.833c0 .645.523 1.167 1.167 1.167h7.666c.645 0 1.167-.522 1.167-1.167 0-1.446-.618-2.769-1.805-4.11.784-.745 1.258-1.878 1.258-3.123 0-1.908-1.117-3.24-1.54-3.738.664-.853 1.087-2.102 1.087-3.32C16.002 4.463 15.143 2 12.001 2z" />
      </svg>
    ),
  },
];

export default function Section6Download() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (cmd, id) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
      {/* Top Header: Title "Download" with Clean Underline & GitHub Link */}
      <div
        style={{
          width: '100%',
          padding: '0 48px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 2,
          marginBottom: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
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
            Download
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

        {/* Link to Main GitHub Repository */}
        <a
          href={GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#0f1117',
            border: '1px solid rgba(245, 244, 239, 0.15)',
            borderRadius: '6px',
            color: '#cfc9bd',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.78rem',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#f5f4ef';
            e.currentTarget.style.borderColor = 'rgba(245, 244, 239, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#cfc9bd';
            e.currentTarget.style.borderColor = 'rgba(245, 244, 239, 0.15)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>Repository &rarr;</span>
        </a>
      </div>

      {/* Main Download Stage: 3 Platforms separated by clean vertical lines (windows | mac | linux) as sketched */}
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
            gridTemplateColumns: 'repeat(3, 1fr)',
            position: 'relative',
            borderTop: '1px solid rgba(245, 244, 239, 0.08)',
            borderBottom: '1px solid rgba(245, 244, 239, 0.08)',
            padding: '40px 0',
          }}
        >
          {DOWNLOAD_OPTIONS.map((opt, idx) => (
            <div
              key={opt.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 36px',
                borderRight: idx < 2 ? '1px solid rgba(245, 244, 239, 0.12)' : 'none',
                position: 'relative',
                boxSizing: 'border-box',
              }}
            >
              {/* Platform Icon */}
              <div
                style={{
                  color: '#f5f4ef',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {opt.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#f5f4ef',
                  letterSpacing: '0.02em',
                  marginBottom: '6px',
                }}
              >
                {opt.title}
              </h3>

              {/* Subtitle */}
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.78rem',
                  color: '#8c8980',
                  marginBottom: '8px',
                }}
              >
                {opt.sub}
              </div>

              {/* Architecture tag */}
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.7rem',
                  color: '#5c5952',
                  letterSpacing: '0.05em',
                  marginBottom: '28px',
                }}
              >
                {opt.arch}
              </div>

              {/* Download Button */}
              <a
                href={opt.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  maxWidth: '240px',
                  padding: '12px 20px',
                  backgroundColor: '#f5f4ef',
                  color: '#070709',
                  borderRadius: '8px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  marginBottom: '12px',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <span>Download .zip</span>
              </a>

              {/* Terminal Quick Copy Command */}
              <button
                onClick={() => handleCopy(opt.cmd, opt.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  maxWidth: '240px',
                  height: '38px',
                  padding: '0 14px',
                  backgroundColor: '#0f1117',
                  border: '1px solid rgba(245, 244, 239, 0.12)',
                  borderRadius: '6px',
                  color: copiedId === opt.id ? '#20c997' : '#cfc9bd',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.74rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  boxSizing: 'border-box',
                }}
              >
                <span>$ {copiedId === opt.id ? 'Copied to clipboard!' : opt.cmd}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Area: Page Number "6" */}
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
          }}
        >
          UNIVERSAL LOG PREPROCESSING FRAMEWORK &bull; RELEASE v1.0.0 &bull; AIR-GAPPED READY
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
