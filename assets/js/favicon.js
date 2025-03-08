// Function to generate a favicon with MB letters
function generateFavicon(forceRegenerate = false) {
  // Check if favicon is already stored in localStorage and we're not forcing regeneration
  const storedFavicon = localStorage.getItem('mbFavicon');
  const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  const storedTheme = localStorage.getItem('mbFaviconTheme');
  
  // If we have a stored favicon for the current theme and not forcing regeneration, use it
  if (storedFavicon && storedTheme === currentTheme && !forceRegenerate) {
    applyStoredFavicon(storedFavicon);
    return;
  }
  
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  // Set background
  ctx.fillStyle = currentTheme === 'dark' ? '#0d0d0d' : '#f4f4f4';
  ctx.fillRect(0, 0, 64, 64);

  // Add a subtle glow effect
  const glowColor = currentTheme === 'dark' ? 
    'rgba(0, 240, 255, 0.4)' : 'rgba(0, 153, 204, 0.4)';
  const gradient = ctx.createRadialGradient(32, 32, 5, 32, 32, 32);
  gradient.addColorStop(0, glowColor);
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  // Add border
  ctx.strokeStyle = currentTheme === 'dark' ? '#00f0ff' : '#0099cc';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, 60, 60);

  // Set text style
  ctx.fillStyle = currentTheme === 'dark' ? '#00f0ff' : '#0099cc';
  ctx.font = 'bold 32px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Add text shadow for glow effect
  ctx.shadowColor = currentTheme === 'dark' ? '#00f0ff' : '#0099cc';
  ctx.shadowBlur = 8;
  
  // Draw the text
  ctx.fillText('MB', 32, 32);

  // Convert canvas to data URL
  const faviconUrl = canvas.toDataURL('image/png');
  
  // Store in localStorage for future use
  localStorage.setItem('mbFavicon', faviconUrl);
  localStorage.setItem('mbFaviconTheme', currentTheme);
  
  // Apply the favicon
  applyStoredFavicon(faviconUrl);
}

// Function to apply a stored favicon
function applyStoredFavicon(faviconUrl) {
  // Remove any existing favicons
  const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
  existingFavicons.forEach(favicon => {
    favicon.parentNode.removeChild(favicon);
  });
  
  // Create and add the favicon link
  const link = document.createElement('link');
  link.type = 'image/png';
  link.rel = 'shortcut icon';
  link.href = faviconUrl;
  document.getElementsByTagName('head')[0].appendChild(link);
}

// Check if we need to generate the favicon or use stored one
document.addEventListener('DOMContentLoaded', function() {
  generateFavicon();
});

// Update favicon when theme changes
document.addEventListener('x-theme-changed', function() {
  // Short delay to ensure the theme class has been updated
  setTimeout(() => generateFavicon(true), 100);
}); 