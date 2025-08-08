# Task 4 – Make a Website Mobile-Friendly Using CSS Media Queries

This folder contains a desktop‑first page upgraded to be fully responsive using CSS media queries.

## What’s included
- `index.html` – Desktop‑first markup with semantic sections
- `style.css` – Responsive CSS with media queries at 1024px, 768px, 480px
- `script.js` – Mobile navigation (hamburger) toggle and small UX enhancements

## How to run
1. Open `TASK4/index.html` in Chrome (double‑click the file or use Live Server in VS Code).
2. Open Chrome DevTools → Toggle device toolbar (Ctrl+Shift+M) to test mobile sizes.

## What was improved (per requirements)
- Viewport meta tag for proper scaling on mobile
- Fixed widths replaced by fluid widths (`max-width`, percentages, Grid/Flex)
- Navigation collapses to a hamburger under 768px and stacks vertically
- Columns stack vertically on small screens
- Font sizes and paddings reduced on small screens for readability
- Images set to `max-width: 100%` and `height: auto` to prevent overflow
- `overflow-x: hidden` on `body` to avoid horizontal scroll issues
- Sticky header with accessible, keyboard-friendly nav toggle

## Breakpoints
- ≤ 1024px: Hero becomes single column; grid becomes 2 columns
- ≤ 768px: Mobile nav (hamburger), main layout becomes single column, cards stack
- ≤ 480px: Compact spacing, smaller type and tighter paddings

## Tips for validation
- Try content zoom at 200% – layout should still work
- Check landscape/portrait modes on phone emulators
- Test long titles or more cards; layout should remain flexible

## Next steps (optional)
- Add CSS container queries for even finer control
- Lazy‑load large images; serve responsive `srcset` images
- Add prefers-reduced-motion media query for reduced animations
