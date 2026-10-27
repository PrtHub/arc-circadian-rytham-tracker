const fs = require('fs');
const html = fs.readFileSync('web/dist/index.html', 'utf8');
const match = html.match(/class="brand"[^>]*><img src="([^"]+)"/);
if (match) {
  const data = match[1];
  console.log('src starts with:', data.slice(0, 50));
  if (data.startsWith('data:image/webp;base64,')) {
    const base64 = data.replace('data:image/webp;base64,', '');
    fs.writeFileSync('public/brand-icon.webp', Buffer.from(base64, 'base64'));
    console.log('Saved public/brand-icon.webp, size:', Buffer.from(base64, 'base64').length);
  }
}
