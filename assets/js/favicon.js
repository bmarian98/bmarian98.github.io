// Function to generate a favicon with MB letters
function generateFavicon() {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  // Set background
  ctx.fillStyle = '#0d0d0d';
  ctx.fillRect(0, 0, 64, 64);

  // Add a subtle glow effect
  const gradient = ctx.createRadialGradient(32, 32, 5, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
  gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  // Add border
  ctx.strokeStyle = '#00f0ff';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, 60, 60);

  // Set text style
  ctx.fillStyle = '#00f0ff';
  ctx.font = 'bold 32px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Add text shadow for glow effect
  ctx.shadowColor = '#00f0ff';
  ctx.shadowBlur = 8;
  
  // Draw the text
  ctx.fillText('MB', 32, 32);

  // Convert canvas to favicon
  const link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = canvas.toDataURL('image/x-icon');
  
  // Remove any existing favicons
  const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
  existingFavicons.forEach(favicon => {
    favicon.parentNode.removeChild(favicon);
  });
  
  // Add the new favicon to the document
  document.getElementsByTagName('head')[0].appendChild(link);
}

// Generate favicon when the page loads
document.addEventListener('DOMContentLoaded', generateFavicon);

// Update favicon when theme changes
document.addEventListener('x-theme-changed', function() {
  setTimeout(generateFavicon, 100);
}); 