import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  Download, 
  Sparkles, 
  AlertCircle, 
  Check, 
  Copy, 
  ExternalLink, 
  RefreshCw, 
  Wifi, 
  Globe, 
  Mail, 
  FileText,
  Trash2,
  Settings,
  Server
} from 'lucide-react';

const DEFAULT_API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const PRESETS = [
  { label: 'Website URL', icon: Globe, value: 'https://github.com' },
  { label: 'Wi-Fi Network', icon: Wifi, value: 'WIFI:S:MyHomeWiFi;T:WPA;P:Password123;;' },
  { label: 'Email Contact', icon: Mail, value: 'mailto:contact@example.com?subject=Hello' },
  { label: 'Plain Text', icon: FileText, value: 'Hello from FastAPI QR Generator!' },
];

export default function App() {
  const [inputText, setInputText] = useState('');
  const [qrCodeBase64, setQrCodeBase64] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [apiBaseUrl, setApiBaseUrl] = useState(DEFAULT_API_BASE);
  const [showConfig, setShowConfig] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'connected' | 'offline' | 'checking'
  const [lastGeneratedText, setLastGeneratedText] = useState('');
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('qr_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('qr_history', JSON.stringify(history.slice(0, 6)));
    } catch (e) {
      console.warn('Could not save history to localStorage', e);
    }
  }, [history]);

  // Ping backend status
  useEffect(() => {
    checkBackendHealth();
  }, [apiBaseUrl]);

  const checkBackendHealth = async () => {
    setBackendStatus('checking');
    try {
      // Test sending an empty request to check if server responds (even 400 means server is alive and CORS is working)
      const res = await fetch(`${apiBaseUrl.replace(/\/$/, '')}/generate_QR`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: '' }),
      });
      // A response of 400 or 200 confirms the endpoint is reachable
      if (res.status === 400 || res.ok) {
        setBackendStatus('connected');
      } else {
        setBackendStatus('offline');
      }
    } catch {
      setBackendStatus('offline');
    }
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();

    const trimmed = inputText.trim();
    if (!trimmed) {
      setErrorMessage('Please enter some text or a URL before generating.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    const targetUrl = `${apiBaseUrl.replace(/\/$/, '')}/generate_QR`;

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: trimmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Backend returned error (e.g., 400 {"error": "The text cannot be empty"})
        const message = data.error || data.detail || `Server responded with status ${response.status}`;
        throw new Error(message);
      }

      if (data.qr_code) {
        setQrCodeBase64(data.qr_code);
        setLastGeneratedText(trimmed);
        setBackendStatus('connected');

        // Add to history
        setHistory((prev) => {
          const filtered = prev.filter((item) => item.text !== trimmed);
          return [
            { text: trimmed, qr_code: data.qr_code, timestamp: Date.now() },
            ...filtered,
          ].slice(0, 6);
        });
      } else {
        throw new Error('No QR code returned from server.');
      }
    } catch (err) {
      console.error('Failed to generate QR Code:', err);
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setErrorMessage(
          `Could not connect to backend at ${targetUrl}. Ensure the FastAPI server is running (e.g. uvicorn main:app --reload).`
        );
        setBackendStatus('offline');
      } else {
        setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrCodeBase64) return;
    try {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${qrCodeBase64}`;
      const sanitizedName = lastGeneratedText
        ? lastGeneratedText.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '_')
        : 'qr_code';
      link.download = `qrcode_${sanitizedName}_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const handleCopyBase64 = () => {
    if (!qrCodeBase64) return;
    navigator.clipboard.writeText(`data:image/png;base64,${qrCodeBase64}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectHistoryItem = (item) => {
    setInputText(item.text);
    setLastGeneratedText(item.text);
    setQrCodeBase64(item.qr_code);
    setErrorMessage('');
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('qr_history');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-grid-pattern flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                QR Code Studio
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  FastAPI Powered
                </span>
              </h1>
              <p className="text-xs text-slate-400">High precision, instant QR generator</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Backend connection badge */}
            <div 
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-all ${
                backendStatus === 'connected' 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                  : backendStatus === 'offline' 
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}
              title={`Target: ${apiBaseUrl}`}
            >
              <span className={`w-2 h-2 rounded-full ${
                backendStatus === 'connected' 
                  ? 'bg-emerald-500 animate-pulse' 
                  : backendStatus === 'offline' 
                  ? 'bg-rose-500' 
                  : 'bg-amber-500 animate-ping'
              }`} />
              <span className="hidden sm:inline font-medium">
                {backendStatus === 'connected' ? 'API Connected' : backendStatus === 'offline' ? 'API Disconnected' : 'Checking API...'}
              </span>
            </div>

            {/* Config Button */}
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition border border-transparent hover:border-slate-700"
              title="Configure API Endpoint"
              aria-label="Configure API Endpoint"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expandable API Config Bar */}
        {showConfig && (
          <div className="bg-slate-900/95 border-b border-slate-800 px-4 py-3 sm:px-6 transition-all">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Server className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Backend Base URL:</span>
                <input
                  type="text"
                  value={apiBaseUrl}
                  onChange={(e) => setApiBaseUrl(e.target.value)}
                  placeholder="http://localhost:8000"
                  className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono text-xs w-64 sm:w-80"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={checkBackendHealth}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition font-medium"
                >
                  <RefreshCw className="w-3 h-3" />
                  Test Connection
                </button>
                <button
                  onClick={() => setApiBaseUrl('http://localhost:8000')}
                  className="text-slate-400 hover:text-slate-200 underline"
                >
                  Reset Default
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Form & Presets */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="mb-5">
                <h2 className="text-xl font-bold text-white tracking-tight">Generate QR Code</h2>
                <p className="text-sm text-slate-400 mt-1">
                  Type any URL, text string, Wi-Fi configuration, or payload to encode into a high-res QR code.
                </p>
              </div>

              {/* Quick Preset Buttons */}
              <div className="mb-5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Quick Templates
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => {
                    const Icon = preset.icon;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setInputText(preset.value);
                          setErrorMessage('');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-700/80 hover:border-indigo-500/30 text-xs font-medium transition duration-150"
                      >
                        <Icon className="w-3.5 h-3.5 text-slate-400" />
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="qr-input" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Content / Payload <span className="text-rose-400">*</span>
                    </label>
                    {inputText && (
                      <button
                        type="button"
                        onClick={() => setInputText('')}
                        className="text-xs text-slate-400 hover:text-slate-200 transition"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <textarea
                      id="qr-input"
                      rows={4}
                      value={inputText}
                      onChange={(e) => {
                        setInputText(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="Enter a URL (e.g. https://example.com) or any custom text..."
                      className={`w-full bg-slate-950/90 text-slate-100 placeholder-slate-500 text-sm rounded-xl p-3.5 border transition-all resize-none font-mono focus:outline-none focus:ring-2 ${
                        errorMessage
                          ? 'border-rose-500/70 focus:ring-rose-500/30'
                          : 'border-slate-700/80 focus:border-indigo-500 focus:ring-indigo-500/20'
                      }`}
                    />
                    <div className="absolute bottom-2.5 right-3 text-[11px] font-mono text-slate-500 pointer-events-none">
                      {inputText.length} chars
                    </div>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm animate-in fade-in slide-in-from-top-1 duration-200">
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-xs uppercase tracking-wide text-rose-400">Error</p>
                      <p className="text-xs leading-relaxed">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Generate Button */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isLoading || !inputText.trim()}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
                      isLoading || !inputText.trim()
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                        : 'bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white shadow-indigo-600/30 ring-1 ring-indigo-400/30'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate QR Code</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Recent History Section */}
            {history.length > 0 && (
              <div className="bg-slate-900/50 rounded-2xl border border-slate-800/80 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Recent Generations
                  </h3>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-slate-500 hover:text-rose-400 flex items-center gap-1 transition"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {history.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectHistoryItem(item)}
                      className={`text-left p-2.5 rounded-xl border transition-all flex items-center gap-3 group ${
                        lastGeneratedText === item.text
                          ? 'bg-indigo-950/40 border-indigo-500/40 ring-1 ring-indigo-500/20'
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                      }`}
                    >
                      <img
                        src={`data:image/png;base64,${item.qr_code}`}
                        alt="Thumbnail"
                        className="w-9 h-9 rounded bg-white p-0.5 shrink-0 border border-slate-300"
                      />
                      <div className="overflow-hidden min-w-0 flex-1">
                        <p className="text-xs font-mono text-slate-300 truncate group-hover:text-indigo-300">
                          {item.text}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: QR Code Preview & Download */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[440px]">
              
              {qrCodeBase64 ? (
                <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
                  {/* Badge */}
                  <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                    <Check className="w-3.5 h-3.5" />
                    <span>QR Code Ready</span>
                  </div>

                  {/* QR Container */}
                  <div className="relative group p-4 bg-white rounded-2xl shadow-2xl shadow-indigo-950/50 ring-4 ring-slate-800/80 mb-5">
                    <img
                      src={`data:image/png;base64,${qrCodeBase64}`}
                      alt="Generated QR Code"
                      className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-lg transition-transform group-hover:scale-[1.02] duration-200"
                    />
                  </div>

                  {/* Text preview */}
                  <div className="w-full max-w-sm mb-5 px-3 py-2 bg-slate-950/70 rounded-lg border border-slate-800/80">
                    <p className="text-[11px] font-mono text-slate-400 truncate text-center" title={lastGeneratedText}>
                      {lastGeneratedText}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="w-full space-y-2">
                    <button
                      onClick={handleDownload}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/50"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download QR Code (.png)</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handleCopyBase64}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700/80 transition"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Data URL</span>
                          </>
                        )}
                      </button>

                      {lastGeneratedText.startsWith('http://') || lastGeneratedText.startsWith('https://') ? (
                        <a
                          href={lastGeneratedText}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700/80 transition"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open Link</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(lastGeneratedText);
                            alert('Copied text to clipboard!');
                          }}
                          className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700/80 transition"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Raw Text</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Empty Placeholder State */
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                  <div className="w-24 h-24 rounded-2xl bg-slate-950/80 border-2 border-dashed border-slate-800 flex items-center justify-center mb-4 text-slate-600 relative">
                    <QrCode className="w-12 h-12 stroke-[1.5]" />
                    {/* Viewfinder corner accents */}
                    <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-indigo-500/60" />
                    <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-indigo-500/60" />
                    <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-indigo-500/60" />
                    <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-indigo-500/60" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-1">No QR Code Generated Yet</h3>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Type text or a link on the left and click &quot;Generate QR Code&quot; to preview and download your high-resolution code.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>FastAPI + React QR Generator</span>
          <span className="font-mono text-[11px] text-slate-600">
            Target: POST {apiBaseUrl.replace(/\/$/, '')}/generate_QR
          </span>
        </div>
      </footer>
    </div>
  );
}
