import React, { useState } from 'react';
import BrandLogoIcon from './BrandLogoIcon';

const OCSF_SCHEMA_EXAMPLE = {
  event_id: "a3b8e8f2-51c3-4927-9c88-7f9104de0123",
  time: 1725409200000,
  timestamp_iso: "2026-09-04T00:20:00.000Z",
  category_uid: 4,
  category_name: "Network Activity",
  class_uid: 4001,
  class_name: "Network Traffic",
  severity_id: 3,
  severity: "Warning",
  action_id: 2,
  action: "blocked",
  raw_event: "%ASA-4-106023: Deny tcp src outside:198.51.100.25/44332 dst inside:10.0.0.15/80",
  raw_event_hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  hash_algorithm: "SHA-256",
  parser: {
    name: "cisco_asa_parser",
    version: "1.2.0",
    processing_latency_ms: 0.42,
  },
  metadata: {
    product: {
      vendor_name: "Cisco",
      name: "ASA Firewall",
      version: "9.16.2",
    },
    collector: {
      hostname: "collector-node-delhi-01",
      interface: "eth0",
      protocol: "syslog-udp",
    },
  },
  network: {
    transport_protocol: "TCP",
    protocol_num: 6,
    direction: "inbound",
    bytes_in: 0,
    bytes_out: 0,
    session_id: "981240",
  },
  src_endpoint: {
    ip: "198.51.100.25",
    port: 44332,
    mac: "00:50:56:A1:B2:C3",
    interface: "outside",
    autonomous_system: {
      number: 15169,
      organization: "Example ISP",
    },
  },
  dst_endpoint: {
    ip: "10.0.0.15",
    port: 80,
    interface: "inside",
    hostname: "web-srv-prod-01",
  },
  user: {
    name: "rahul_sharma",
    uid: "EMP-4091",
    domain: "CORP",
    email: "rahul.s@agency.gov.in",
  },
  device: {
    hostname: "PRINTER-FLR-2",
    type: "Network Device",
    os: "Cisco Adaptive Security Appliance OS",
  },
  process: {
    pid: 24891,
    name: "sshd",
    path: "/usr/sbin/sshd",
  },
  application: {
    name: "SSH",
    operation: "authentication",
    status: "failure",
  },
  unmapped: {
    access_group: "OUTSIDE-IN",
    raw_flags: "[0x0, 0x0]",
  },
};

const DOC_NAV = [
  { id: 'schema', label: '1. OCSF Standard Schema' },
  { id: 'overview', label: '2. NTRO 26156 Overview' },
  { id: 'architecture', label: '3. Dual-Engine Core' },
  { id: 'cascade', label: '4. 3-Tier Classification' },
  { id: 'parsers', label: '5. Vendor Parsers' },
  { id: 'benchmarks', label: '6. Stress Benchmarks' },
  { id: 'quickstart', label: '7. Quickstart' },
];

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState('schema');
  const [copied, setCopied] = useState(false);

  const copySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(OCSF_SCHEMA_EXAMPLE, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (id) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      style={{
        paddingTop: '100px',
        paddingBottom: '80px',
        minHeight: '100vh',
        backgroundColor: '#070709',
        color: '#f5f4ef',
      }}
    >
      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '48px',
          alignItems: 'start',
        }}
      >
        {/* Sticky Sidebar Navigation */}
        <aside
          style={{
            position: 'sticky',
            top: '100px',
            backgroundColor: '#0c0d12',
            border: '1px solid rgba(245, 244, 239, 0.08)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#8c8980',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '10px',
              paddingBottom: '8px',
              borderBottom: '1px solid rgba(245, 244, 239, 0.08)',
            }}
          >
            Documentation Index
          </div>

          {DOC_NAV.map((nav) => (
            <button
              key={nav.id}
              onClick={() => scrollTo(nav.id)}
              style={{
                background: activeTab === nav.id ? 'rgba(245, 244, 239, 0.08)' : 'transparent',
                border: 'none',
                color: activeTab === nav.id ? '#f5f4ef' : '#8c8980',
                padding: '8px 12px',
                borderRadius: '6px',
                textAlign: 'left',
                fontSize: '0.8rem',
                fontFamily: 'JetBrains Mono, monospace',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {nav.label}
            </button>
          ))}
        </aside>

        {/* Right Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {/* Header */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '18px', marginBottom: '8px' }}>
              <BrandLogoIcon size={52} />
              <div>
                <h1
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '3rem',
                    fontWeight: 900,
                    color: '#f5f4ef',
                    lineHeight: 1.1,
                    marginBottom: '8px',
                  }}
                >
                  Technical Documentation
                </h1>
                <div style={{ width: '100%', height: '3px', backgroundColor: '#f5f4ef', borderRadius: '2px' }} />
              </div>
            </div>
            <p style={{ color: '#8c8980', fontSize: '1rem', marginTop: '12px' }}>
              Universal Log Pre-processing Framework (ULPF / WEED) &bull; NTRO Problem Statement 26156
            </p>
          </div>

          {/* Section 1: Official OCSF Schema Specification */}
          <section id="schema" style={{ scrollMarginTop: '110px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.8rem', fontWeight: 800 }}>
                1. OCSF Standard Schema (Class 4001: Network Traffic)
              </h2>
              <button
                onClick={copySchema}
                style={{
                  padding: '7px 14px',
                  backgroundColor: '#161822',
                  border: '1px solid rgba(245, 244, 239, 0.15)',
                  borderRadius: '6px',
                  color: copied ? '#20c997' : '#f5f4ef',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.74rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {copied ? 'Copied JSON!' : 'Copy Schema JSON'}
              </button>
            </div>

            <p style={{ color: '#cfc9bd', lineHeight: 1.6, marginBottom: '20px' }}>
              The canonical OCSF v1.1.0 JSON representation produced by ULPF. Enforces 6 structural layers: Mandatory Base, Forensic Chain-of-Custody (Section 65B), Network Context, Identity &amp; Auth, Endpoint/Application, and Extensibility:
            </p>

            {/* Code Block */}
            <div
              style={{
                backgroundColor: '#090a0f',
                border: '1px solid rgba(245, 244, 239, 0.12)',
                borderRadius: '12px',
                padding: '24px',
                overflowX: 'auto',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.78rem',
                lineHeight: 1.6,
                color: '#cfc9bd',
                boxShadow: '0 20px 40px rgba(0,0,0,0.85)',
              }}
            >
              <pre style={{ margin: 0 }}>
                {`{
  /* =========================================================
     1. MANDATORY BASE (Every log must have these)
     ========================================================= */
  "event_id": "a3b8e8f2-51c3-4927-9c88-7f9104de0123",
  "time": 1725409200000,
  "timestamp_iso": "2026-09-04T00:20:00.000Z",
  "category_uid": 4,
  "category_name": "Network Activity",
  "class_uid": 4001,
  "class_name": "Network Traffic",
  "severity_id": 3,
  "severity": "Warning",
  "action_id": 2,
  "action": "blocked",

  /* =========================================================
     2. FORENSIC & PROVENANCE LAYER (NTRO Core Requirement)
     ========================================================= */
  "raw_event": "%ASA-4-106023: Deny tcp src outside:198.51.100.25/44332 dst inside:10.0.0.15/80",
  "raw_event_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "hash_algorithm": "SHA-256",
  "parser": {
    "name": "cisco_asa_parser",
    "version": "1.2.0",
    "processing_latency_ms": 0.42
  },
  "metadata": {
    "product": {
      "vendor_name": "Cisco",
      "name": "ASA Firewall",
      "version": "9.16.2"
    },
    "collector": {
      "hostname": "collector-node-delhi-01",
      "interface": "eth0",
      "protocol": "syslog-udp"
    }
  },

  /* =========================================================
     3. CATEGORY 4: NETWORK CONTEXT (Used if network-related)
     ========================================================= */
  "network": {
    "transport_protocol": "TCP",
    "protocol_num": 6,
    "direction": "inbound",
    "bytes_in": 0,
    "bytes_out": 0,
    "session_id": "981240"
  },
  "src_endpoint": {
    "ip": "198.51.100.25",
    "port": 44332,
    "mac": "00:50:56:A1:B2:C3",
    "interface": "outside",
    "autonomous_system": {
      "number": 15169,
      "organization": "Example ISP"
    }
  },
  "dst_endpoint": {
    "ip": "10.0.0.15",
    "port": 80,
    "interface": "inside",
    "hostname": "web-srv-prod-01"
  },

  /* =========================================================
     4. CATEGORY 3: IDENTITY & AUTH (Used if user/login event)
     ========================================================= */
  "user": {
    "name": "rahul_sharma",
    "uid": "EMP-4091",
    "domain": "CORP",
    "email": "rahul.s@agency.gov.in"
  },

  /* =========================================================
     5. CATEGORY 1 & 6: ENDPOINT / APP / IoT CONTEXT
     ========================================================= */
  "device": {
    "hostname": "PRINTER-FLR-2",
    "type": "Network Device",
    "os": "Cisco Adaptive Security Appliance OS"
  },
  "process": {
    "pid": 24891,
    "name": "sshd",
    "path": "/usr/sbin/sshd"
  },
  "application": {
    "name": "SSH",
    "operation": "authentication",
    "status": "failure"
  },

  /* =========================================================
     6. EXTENSIBILITY / UNMAPPED (Zero Data Loss Safety Net)
     ========================================================= */
  "unmapped": {
    "access_group": "OUTSIDE-IN",
    "raw_flags": "[0x0, 0x0]"
  }
}`}
              </pre>
            </div>
          </section>

          {/* Section 2: NTRO 26156 Overview */}
          <section id="overview" style={{ scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.8rem', fontWeight: 800, marginBottom: '14px' }}>
              2. NTRO 26156 Problem Statement
            </h2>
            <p style={{ color: '#cfc9bd', lineHeight: 1.7, marginBottom: '16px' }}>
              Modern enterprise security operations center (SOC) environments face critical challenges: multi-vendor log sprawl, unverified forensic evidence, massive SIEM ingestion taxes, and lack of explainability. ULPF solves these problems by providing:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ backgroundColor: '#0c0d12', padding: '16px', borderRadius: '8px', border: '1px solid rgba(245, 244, 239, 0.08)' }}>
                <div style={{ color: '#f5f4ef', fontWeight: 700, marginBottom: '4px' }}>Zero Information Loss</div>
                <div style={{ color: '#8c8980', fontSize: '0.8rem' }}>Preserves unedited wire bytes in raw_data with cryptographic hash for Section 65B legal court compliance.</div>
              </div>
              <div style={{ backgroundColor: '#0c0d12', padding: '16px', borderRadius: '8px', border: '1px solid rgba(245, 244, 239, 0.08)' }}>
                <div style={{ color: '#f5f4ef', fontWeight: 700, marginBottom: '4px' }}>100k+ EPS Bare Metal</div>
                <div style={{ color: '#8c8980', fontSize: '0.8rem' }}>Tokio async Rust wire daemon handles over 100k events/sec with sub-millisecond p99 latency (&lt;0.85ms).</div>
              </div>
              <div style={{ backgroundColor: '#0c0d12', padding: '16px', borderRadius: '8px', border: '1px solid rgba(245, 244, 239, 0.08)' }}>
                <div style={{ color: '#f5f4ef', fontWeight: 700, marginBottom: '4px' }}>Air-Gapped Ready</div>
                <div style={{ color: '#8c8980', fontSize: '0.8rem' }}>Completely self-contained with offline MaxMind GeoIP/ASN databases and local ML inference models.</div>
              </div>
              <div style={{ backgroundColor: '#0c0d12', padding: '16px', borderRadius: '8px', border: '1px solid rgba(245, 244, 239, 0.08)' }}>
                <div style={{ color: '#f5f4ef', fontWeight: 700, marginBottom: '4px' }}>88.2% Storage Savings</div>
                <div style={{ color: '#8c8980', fontSize: '0.8rem' }}>Rolling Snappy Parquet lake slashes SIEM disk consumption while speeding up analytical queries.</div>
              </div>
            </div>
          </section>

          {/* Section 3: Dual Engine Core */}
          <section id="architecture" style={{ scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.8rem', fontWeight: 800, marginBottom: '14px' }}>
              3. Hybrid Dual-Engine Architecture
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ backgroundColor: '#0c0d12', border: '1px solid rgba(245, 244, 239, 0.08)', borderRadius: '8px', padding: '20px' }}>
                <h3 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.95rem', color: '#f5f4ef', marginBottom: '8px' }}>
                  Rust Wire Daemon (core-engine/)
                </h3>
                <ul style={{ color: '#8c8980', fontSize: '0.8rem', lineHeight: 1.7, paddingLeft: '18px' }}>
                  <li>Native Tokio Async Socket (Port 5140)</li>
                  <li>Zero-Copy Wire SHA-256 Hasher</li>
                  <li>Bare-Metal &gt;100,000 EPS Throughput</li>
                  <li>Sub-millisecond p99 latency (&lt;0.85ms)</li>
                </ul>
              </div>

              <div style={{ backgroundColor: '#0c0d12', border: '1px solid rgba(245, 244, 239, 0.08)', borderRadius: '8px', padding: '20px' }}>
                <h3 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.95rem', color: '#f5f4ef', marginBottom: '8px' }}>
                  Python ML Subsystem (core_engine/)
                </h3>
                <ul style={{ color: '#8c8980', fontSize: '0.8rem', lineHeight: 1.7, paddingLeft: '18px' }}>
                  <li>10 Declarative YAML Hot-Reload Parsers</li>
                  <li>4-Model AI Threat Ensemble (IForest + OCSVM)</li>
                  <li>Rolling Columnar Snappy Parquet Lake</li>
                  <li>Dual-File .log &amp; .json Disk Storage</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: 3-Tier Cascade */}
          <section id="cascade" style={{ scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.8rem', fontWeight: 800, marginBottom: '14px' }}>
              4. 3-Tier Zero-Drop Classification Cascade
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ backgroundColor: '#0c0d12', border: '1px solid rgba(245, 244, 239, 0.08)', borderRadius: '8px', padding: '16px' }}>
                <span style={{ color: '#20c997', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', fontWeight: 700 }}>TIER 1: DECLARATIVE YAML MATCH</span>
                <p style={{ color: '#8c8980', fontSize: '0.82rem', marginTop: '4px' }}>
                  Evaluates high-speed vendor signatures (Cisco ASA, Palo Alto, Fortinet, Check Point). Regex named capture groups extract source/dest IPs, ports, and actions.
                </p>
              </div>

              <div style={{ backgroundColor: '#0c0d12', border: '1px solid rgba(245, 244, 239, 0.08)', borderRadius: '8px', padding: '16px' }}>
                <span style={{ color: '#00d8f6', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', fontWeight: 700 }}>TIER 2: STRUCTURAL DISCOVERY</span>
                <p style={{ color: '#8c8980', fontSize: '0.82rem', marginTop: '4px' }}>
                  Automatically identifies native JSON (json.loads), key-value pairs (k=v, k="v"), delimited CSV/TSV, and CEF/LEEF standard formats.
                </p>
              </div>

              <div style={{ backgroundColor: '#0c0d12', border: '1px solid rgba(245, 244, 239, 0.08)', borderRadius: '8px', padding: '16px' }}>
                <span style={{ color: '#ff922b', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', fontWeight: 700 }}>TIER 3: HEURISTIC REGEX (ZERO-DROP GUARANTEE)</span>
                <p style={{ color: '#8c8980', fontSize: '0.82rem', marginTop: '4px' }}>
                  Heuristic regexes scavenge raw IPv4/IPv6 addresses, port integers, and disposition tokens. Raw bytes are preserved in raw_data with 0% packet loss.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Vendor Parsers */}
          <section id="parsers" style={{ scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.8rem', fontWeight: 800, marginBottom: '14px' }}>
              5. Active Vendor Parser Registry (/parsers/)
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.15)', color: '#8c8980' }}>
                    <th style={{ padding: '10px 14px' }}>Vendor / Platform</th>
                    <th style={{ padding: '10px 14px' }}>Format</th>
                    <th style={{ padding: '10px 14px' }}>Parser File</th>
                    <th style={{ padding: '10px 14px' }}>Extracted Attributes</th>
                  </tr>
                </thead>
                <tbody style={{ color: '#cfc9bd' }}>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.06)' }}><td style={{ padding: '10px 14px', fontWeight: 600 }}>Cisco ASA</td><td style={{ padding: '10px 14px' }}>Syslog (%ASA-4-*)</td><td style={{ padding: '10px 14px', color: '#00d8f6' }}>cisco_asa.yaml</td><td style={{ padding: '10px 14px' }}>src_ip, src_port, dst_ip, dst_port, proto, action</td></tr>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.06)' }}><td style={{ padding: '10px 14px', fontWeight: 600 }}>Palo Alto PAN-OS</td><td style={{ padding: '10px 14px' }}>CSV Delimited</td><td style={{ padding: '10px 14px', color: '#00d8f6' }}>paloalto_panos.yaml</td><td style={{ padding: '10px 14px' }}>session_id, bytes_sent, bytes_rcvd, vsys, rule</td></tr>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.06)' }}><td style={{ padding: '10px 14px', fontWeight: 600 }}>Fortinet FortiGate</td><td style={{ padding: '10px 14px' }}>Key-Value Pairs</td><td style={{ padding: '10px 14px', color: '#00d8f6' }}>fortinet_fortigate.yaml</td><td style={{ padding: '10px 14px' }}>devname, policyid, srcintf, dstintf, duration</td></tr>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.06)' }}><td style={{ padding: '10px 14px', fontWeight: 600 }}>Check Point</td><td style={{ padding: '10px 14px' }}>Pipe Delimited</td><td style={{ padding: '10px 14px', color: '#00d8f6' }}>checkpoint_fw.yaml</td><td style={{ padding: '10px 14px' }}>hostname, product, service, rule, reason</td></tr>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.06)' }}><td style={{ padding: '10px 14px', fontWeight: 600 }}>pfSense / Suricata</td><td style={{ padding: '10px 14px' }}>CSV &amp; Syslog</td><td style={{ padding: '10px 14px', color: '#00d8f6' }}>pfsense_suricata.yaml</td><td style={{ padding: '10px 14px' }}>rule_id, sub_rule, tracker, flags, proto</td></tr>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.06)' }}><td style={{ padding: '10px 14px', fontWeight: 600 }}>Linux Auth (SSH)</td><td style={{ padding: '10px 14px' }}>Syslog RFC 3164</td><td style={{ padding: '10px 14px', color: '#00d8f6' }}>linux_auth.yaml</td><td style={{ padding: '10px 14px' }}>user, auth_method, src_ip, src_port, status</td></tr>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.06)' }}><td style={{ padding: '10px 14px', fontWeight: 600 }}>Windows Security</td><td style={{ padding: '10px 14px' }}>Event Log (4624/4625)</td><td style={{ padding: '10px 14px', color: '#00d8f6' }}>windows_event.yaml</td><td style={{ padding: '10px 14px' }}>EventID, Account_Name, Logon_Type</td></tr>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.06)' }}><td style={{ padding: '10px 14px', fontWeight: 600 }}>AWS VPC Flow</td><td style={{ padding: '10px 14px' }}>Space Delimited</td><td style={{ padding: '10px 14px', color: '#00d8f6' }}>aws_vpc_flow.yaml</td><td style={{ padding: '10px 14px' }}>interface_id, packets, bytes, start_time, end_time</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6: Benchmarks */}
          <section id="benchmarks" style={{ scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.8rem', fontWeight: 800, marginBottom: '14px' }}>
              6. Stress Test &amp; Benchmark Performance
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.15)', color: '#8c8980' }}>
                    <th style={{ padding: '10px 14px' }}>Metric</th>
                    <th style={{ padding: '10px 14px' }}>Tested Result</th>
                    <th style={{ padding: '10px 14px' }}>Benchmark Standard</th>
                  </tr>
                </thead>
                <tbody style={{ color: '#cfc9bd' }}>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.06)' }}><td style={{ padding: '10px 14px', fontWeight: 600 }}>Tested Dataset Scale</td><td style={{ padding: '10px 14px', color: '#20c997' }}>100,000 Records</td><td style={{ padding: '10px 14px' }}>Continuous high-throughput synthetic stream</td></tr>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.06)' }}><td style={{ padding: '10px 14px', fontWeight: 600 }}>Python Ingestion Throughput</td><td style={{ padding: '10px 14px', color: '#20c997' }}>11,876 EPS</td><td style={{ padding: '10px 14px' }}>PyArrow + Asyncio Socket Pipeline</td></tr>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.06)' }}><td style={{ padding: '10px 14px', fontWeight: 600 }}>Rust Wire Core Throughput</td><td style={{ padding: '10px 14px', color: '#20c997' }}>&gt;100,000 EPS</td><td style={{ padding: '10px 14px' }}>Tokio Native Non-Blocking Sockets</td></tr>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.06)' }}><td style={{ padding: '10px 14px', fontWeight: 600 }}>Packet Loss Rate</td><td style={{ padding: '10px 14px', color: '#20c997' }}>0.00%</td><td style={{ padding: '10px 14px' }}>Zero dropped packets</td></tr>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.06)' }}><td style={{ padding: '10px 14px', fontWeight: 600 }}>p99 Processing Latency</td><td style={{ padding: '10px 14px', color: '#20c997' }}>&lt; 0.85 ms</td><td style={{ padding: '10px 14px' }}>Sub-millisecond end-to-end normalization</td></tr>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.06)' }}><td style={{ padding: '10px 14px', fontWeight: 600 }}>Parquet Compression Ratio</td><td style={{ padding: '10px 14px', color: '#20c997' }}>88.2%</td><td style={{ padding: '10px 14px' }}>Snappy Columnar vs Raw Text</td></tr>
                  <tr style={{ borderBottom: '1px solid rgba(245, 244, 239, 0.06)' }}><td style={{ padding: '10px 14px', fontWeight: 600 }}>Automated Test Coverage</td><td style={{ padding: '10px 14px', color: '#20c997' }}>56 / 56 Passed (100%)</td><td style={{ padding: '10px 14px' }}>Full unit and integration validation</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 7: Quickstart */}
          <section id="quickstart" style={{ scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.8rem', fontWeight: 800, marginBottom: '14px' }}>
              7. Quickstart Deployment
            </h2>
            <div
              style={{
                backgroundColor: '#0c0d12',
                border: '1px solid rgba(245, 244, 239, 0.08)',
                borderRadius: '8px',
                padding: '20px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                color: '#cfc9bd',
                lineHeight: 1.8,
              }}
            >
              <div style={{ color: '#8c8980' }}># 1. Start air-gapped container stack</div>
              <div>docker-compose up -d</div>
              <br />
              <div style={{ color: '#8c8980' }}># 2. Access production Web Console on port 8080</div>
              <div>http://localhost:8080</div>
              <br />
              <div style={{ color: '#8c8980' }}># 3. Stream Syslog UDP packets to port 5140</div>
              <div>logger -n 127.0.0.1 -P 5140 &quot;&lt;134&gt;1 2026-09-10 fw01 %ASA-4-106023: Deny udp...&quot;</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
