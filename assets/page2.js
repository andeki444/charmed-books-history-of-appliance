/* ==========================================================================
   page2.js — Перетаскивание куска льда в погреб (Section 1)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var ice = document.getElementById('ice');
  var wrapper = document.getElementById('overflow-wrapper');
  var dropZone = document.getElementById('drop-zone');
  var hint = document.getElementById('ice-hint');

  if (!ice || !wrapper) return;

  var isDragging = false;
  var isPlaced = false;
  var offsetX = 0;
  var offsetY = 0;

  function onPointerDown(e) {
    if (isPlaced) return;
    isDragging = true;
    ice.classList.add('dragging');
    if (dropZone) dropZone.classList.add('highlight');

    var rect = ice.getBoundingClientRect();
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    var clientY = e.touches ? e.touches[0].clientY : e.clientY;

    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!isDragging || isPlaced) return;

    var wrapRect = wrapper.getBoundingClientRect();
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    var clientY = e.touches ? e.touches[0].clientY : e.clientY;

    var leftPx = clientX - wrapRect.left - offsetX;
    var topPx = clientY - wrapRect.top - offsetY;

    var leftPct = (leftPx / wrapRect.width) * 100;
    var topPct = (topPx / wrapRect.height) * 100;

    ice.style.left = Math.max(0, Math.min(80, leftPct)) + '%';
    ice.style.top = Math.max(0, Math.min(80, topPct)) + '%';
  }

  function onPointerUp() {
    if (!isDragging || isPlaced) return;
    isDragging = false;
    ice.classList.remove('dragging');
    if (dropZone) dropZone.classList.remove('highlight');

    var currentLeft = parseFloat(ice.style.left);
    var currentTop = parseFloat(ice.style.top);

    // Если лед поднесли близко к центру погреба (x: 32..60%, y: 36..68%)
    if (currentLeft > 30 && currentLeft < 62 && currentTop > 35 && currentTop < 70) {
      isPlaced = true;
      ice.classList.add('placed');
      if (hint) {
        hint.textContent = 'Отлично! Продукты охлаждены и сохранят свежесть ❄️';
        hint.classList.add('success');
      }
    }
  }

  ice.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  ice.addEventListener('touchstart', onPointerDown, { passive: false });
  window.addEventListener('touchmove', onPointerMove, { passive: false });
  window.addEventListener('touchend', onPointerUp);
  
  window.addEventListener('keydown', function (e) {
    if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') {
      window.location.reload();
    }
  });
});