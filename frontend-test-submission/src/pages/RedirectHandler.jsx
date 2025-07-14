import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { log } from '../utils/logger';

function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    const urlObj = urls.find(u => u.shortcode === shortcode);
    if (!urlObj) {
      setError('Short URL not found.');
      log('frontend', 'error', 'route', `Shortcode ${shortcode} not found`);
      return;
    }
    if (new Date(urlObj.expiresAt) < new Date()) {
      setError('This short URL has expired.');
      log('frontend', 'warn', 'route', `Shortcode ${shortcode} expired`);
      return;
    }
    // Track click
    urlObj.clicks = (urlObj.clicks || 0) + 1;
    urlObj.clickDetails = urlObj.clickDetails || [];
    urlObj.clickDetails.push({
      timestamp: new Date().toLocaleString(),
      source: document.referrer || 'direct',
      location: 'unknown', // Optionally use a geolocation API
    });
    // Update localStorage
    const updated = urls.map(u => u.shortcode === shortcode ? urlObj : u);
    localStorage.setItem('shortenedUrls', JSON.stringify(updated));
    log('frontend', 'info', 'route', `Redirected to ${urlObj.url}`);
    // Redirect
    setTimeout(() => {
      window.location.href = urlObj.url;
    }, 1200);
  }, [shortcode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {error ? (
        <div className="text-red-500 text-xl font-semibold">{error}</div>
      ) : (
        <h1 className="text-2xl font-semibold">Redirecting...</h1>
      )}
    </div>
  );
}

export default RedirectHandler; 