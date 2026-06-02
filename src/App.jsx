import { useState, useEffect } from "react";
import { NICHES, FRAMEWORK, SCRIPTS } from "./data";
import "./App.css";

function ScriptCard({ script, niche }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const fullText = [
    script.hook1, "",
    script.hook2, "",
    script.line3, "",
    ...script.body, "",
    script.cta,
  ].join("\n");

  const copy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fieldMap = { tam: script.tam, hook1: script.hook1, hook2: script.hook2, line3: script.line3, body: script.body.join(" ➜ ") };

  return (
    <div className="script-card">
      <div className="script-title">{script.title}</div>

      <div className="framework-steps">
        {FRAMEWORK.map((f) => (
          <div
            key={f.key}
            className={`step-row ${expanded === f.key ? "step-active" : ""}`}
            onClick={() => setExpanded(expanded === f.key ? null : f.key)}
          >
            <div className="step-left">
              <span className="step-num">{f.step}</span>
              <div>
                <span className="step-label">{f.label}</span>
                <span className="step-desc">{f.desc}</span>
              </div>
            </div>
            <span className="step-arrow">{expanded === f.key ? "▲" : "▼"}</span>
            {expanded === f.key && (
              <div className="step-content">{fieldMap[f.key]}</div>
            )}
          </div>
        ))}
      </div>

      <div className="script-body">
        <div className="script-section">
          <span className="section-tag tag-orange">LINE 1 — CURIOSITY</span>
          <p>{script.hook1}</p>
        </div>
        <div className="script-section">
          <span className="section-tag tag-blue">LINE 2 — CREDIBILITY</span>
          <p>{script.hook2}</p>
        </div>
        <div className="script-section">
          <span className="section-tag tag-green">LINE 3 — VALUE</span>
          <p>{script.line3}</p>
        </div>
        <div className="script-section">
          <span className="section-tag tag-purple">BODY — TENSION</span>
          {script.body.map((line, i) => (
            <p key={i} className={line.startsWith("BUT") || line.startsWith("SO") ? "tension-line" : "body-line"}>
              {line}
            </p>
          ))}
        </div>
        <div className="script-section">
          <span className="section-tag tag-yellow">CTA</span>
          <p className="cta-text">{script.cta}</p>
        </div>
      </div>

      <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={copy}>
        {copied ? "✓ COPIED!" : "📋 COPY SCRIPT"}
      </button>
    </div>
  );
}

export default function App() {
  const [niche, setNiche] = useState("war");
  const [scriptIdx, setScriptIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const scripts = SCRIPTS[niche] || [];
  const script = scripts[scriptIdx] || scripts[0];

  const handleNiche = (id) => { setNiche(id); setScriptIdx(0); };

  return (
    <div className={`app ${loaded ? "loaded" : ""}`}>
      <div className="bg-grid" />
      <div className="bg-glow" />

      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="badge">CHRIS CHUNG FRAMEWORK</div>
          <h1 className="title">
            <span className="title-accent">100K Views</span>
            <br />Script Generator
          </h1>
          <p className="subtitle">
            High TAM → Curiosity → Hook → Value → Tension
          </p>
        </header>

        {/* Niche Tabs */}
        <div className="niche-tabs">
          {NICHES.map((n) => (
            <button
              key={n.id}
              className={`niche-btn ${niche === n.id ? "niche-active" : ""}`}
              onClick={() => handleNiche(n.id)}
            >
              {n.label}
            </button>
          ))}
        </div>

        {/* Script Variants */}
        {scripts.length > 1 && (
          <div className="variant-tabs">
            {scripts.map((s, i) => (
              <button
                key={i}
                className={`variant-btn ${scriptIdx === i ? "variant-active" : ""}`}
                onClick={() => setScriptIdx(i)}
              >
                {s.title}
              </button>
            ))}
          </div>
        )}

        {/* Script */}
        {script && <ScriptCard script={script} niche={niche} />}

        {/* Footer */}
        <footer className="footer">
          <p>Framework by Chris Chung · Built for content creators</p>
          <p className="footer-niche">{NICHES.find(n => n.id === niche)?.topic} · {NICHES.find(n => n.id === niche)?.lang}</p>
        </footer>
      </div>
    </div>
  );
}
