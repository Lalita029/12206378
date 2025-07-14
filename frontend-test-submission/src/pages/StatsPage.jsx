import React, { useEffect, useState } from 'react';
import { log } from '../utils/logger';

function StatsPage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    log('frontend', 'info', 'page', 'Visited statistics page');
    const stored = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    setUrls(stored);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Shortened URL Statistics</h1>
      {urls.length === 0 ? (
        <div className="text-center text-gray-500">No URLs shortened yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2 border">Short URL</th>
                <th className="p-2 border">Created</th>
                <th className="p-2 border">Expires</th>
                <th className="p-2 border">Clicks</th>
                <th className="p-2 border">Click Details</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url, idx) => (
                <tr key={idx}>
                  <td className="p-2 border text-blue-600 font-mono">{window.location.origin + '/' + url.shortcode}</td>
                  <td className="p-2 border">{new Date(url.createdAt).toLocaleString()}</td>
                  <td className="p-2 border">{new Date(url.expiresAt).toLocaleString()}</td>
                  <td className="p-2 border text-center">{url.clicks || 0}</td>
                  <td className="p-2 border">
                    {url.clickDetails && url.clickDetails.length > 0 ? (
                      <ul className="text-xs">
                        {url.clickDetails.map((c, i) => (
                          <li key={i}>
                            {c.timestamp} | {c.source || 'unknown'} | {c.location || 'unknown'}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400">No clicks</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StatsPage; 