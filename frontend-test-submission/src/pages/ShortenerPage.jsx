import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { log } from '../utils/logger';

const initialRows = [
  { url: '', validity: '', shortcode: '', error: '' },
];

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isValidShortcode(code) {
  return /^[a-zA-Z0-9]{3,10}$/.test(code);
}

function ShortenerPage() {
  const [rows, setRows] = useState(initialRows);
  const [results, setResults] = useState([]);
  const [shortcodes, setShortcodes] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleChange = (idx, field, value) => {
    const updated = [...rows];
    updated[idx][field] = value;
    updated[idx].error = '';
    setRows(updated);
  };

  const addRow = () => {
    if (rows.length < 5) setRows([...rows, { url: '', validity: '', shortcode: '', error: '' }]);
  };

  const removeRow = (idx) => {
    if (rows.length > 1) setRows(rows.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newResults = [];
    const newShortcodes = [...shortcodes];
    const updatedRows = rows.map((row, idx) => {
      let error = '';
      if (!isValidUrl(row.url)) {
        error = 'Invalid URL';
        valid = false;
        log('frontend', 'error', 'component', `Invalid URL at row ${idx + 1}`);
      } else if (row.shortcode && (!isValidShortcode(row.shortcode) || newShortcodes.includes(row.shortcode))) {
        error = 'Invalid or duplicate shortcode';
        valid = false;
        log('frontend', 'error', 'component', `Invalid or duplicate shortcode at row ${idx + 1}`);
      }
      return { ...row, error };
    });
    setRows(updatedRows);
    if (!valid) return;

    // Generate unique shortcodes if not provided
    const generatedRows = updatedRows.map((row) => {
      let code = row.shortcode;
      if (!code) {
        do {
          code = Math.random().toString(36).substring(2, 8);
        } while (newShortcodes.includes(code));
      }
      newShortcodes.push(code);
      return {
        ...row,
        shortcode: code,
        validity: row.validity ? parseInt(row.validity) : 30,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 60000 * (row.validity ? parseInt(row.validity) : 30)).toISOString(),
        clicks: 0,
        clickDetails: [],
      };
    });
    setShortcodes(newShortcodes);
    setResults(generatedRows);
    setSuccess(true);
    log('frontend', 'info', 'component', 'Shortened URLs created');
    // Save to localStorage
    localStorage.setItem('shortenedUrls', JSON.stringify([...JSON.parse(localStorage.getItem('shortenedUrls') || '[]'), ...generatedRows]));
  };

  return (
    <div className="max-w-2xl mx-auto py-10 mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {rows.map((row, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow flex flex-col gap-2 mb-6 relative">
            <div className="flex items-center gap-2">
              <div className="flex-1 flex flex-col gap-2">
                <input
                  type="text"
                  className="border p-2 rounded"
                  placeholder="Long URL"
                  value={row.url}
                  onChange={e => handleChange(idx, 'url', e.target.value)}
                  required
                />
                <input
                  type="number"
                  className="border p-2 rounded"
                  placeholder="Validity (minutes, default 30)"
                  value={row.validity}
                  onChange={e => handleChange(idx, 'validity', e.target.value)}
                  min={1}
                />
                <input
                  type="text"
                  className="border p-2 rounded"
                  placeholder="Custom Shortcode (optional)"
                  value={row.shortcode}
                  onChange={e => handleChange(idx, 'shortcode', e.target.value)}
                  maxLength={10}
                />
                {row.error && <div className="text-red-500 text-sm">{row.error}</div>}
              </div>
              {rows.length > 1 && (
                <button
                  type="button"
                  className="ml-2 px-2 py-1 text-red-500 hover:underline border border-red-200 rounded h-fit self-start"
                  onClick={() => removeRow(idx)}
                  style={{ zIndex: 10 }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="flex gap-2 mt-6">
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addRow} disabled={rows.length >= 5}>
            Add URL
          </button>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Shorten
          </button>
        </div>
      </form>
      {success && results.length > 0 && (
        <div className="mt-8">
          <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-center">Shortened URLs created successfully!</div>
          <h2 className="text-xl font-semibold mb-4">Shortened Links</h2>
          <ul className="space-y-2">
            {results.map((res, idx) => (
              <li key={idx} className="bg-gray-100 p-3 rounded flex flex-col">
                <span className="font-mono text-blue-600">{window.location.origin + '/' + res.shortcode}</span>
                <span className="text-sm">Expires at: {new Date(res.expiresAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-center">
            <Link to="/stats" className="text-blue-600 underline">View Statistics</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShortenerPage; 