/* ==========================================================================
   page6.js — Плавная ручная стирка вверх-вниз по стиральной доске
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var hotspot = document.getElementById('board-hotspot');
  var bgRiver = document.getElementById('bg-river');
  var closeup = document.getElementById('closeup-layer');
  var shirt = document.getElementById('shirt');
  var hint = document.getElementById('wash-hint');

  var washProgress = 0;
  var phase = 0; // фаза для плавного движения вверх-вниз по синусоиде
  var completed = false;
  var lastX = null;
  var lastY = null;

  function setNextLock(locked) {
    document.querySelectorAll('button, a').forEach(function (btn) {
      if (btn.textContent && btn.textContent.toUpperCase().indexOf('ЧИТАТЬ ДАЛЕЕ') !== -1) {
        btn.style.opacity = locked ? '0.35' : '1';
        btn.style.pointerEvents = locked ? 'none' : 'auto';
      }
    });
  }
  setTimeout(function () { setNextLock(true); }, 300);

  function openWashboard() {
    closeup.classList.add('active');
  }

  if (hotspot) hotspot.addEventListener('click', openWashboard);
  if (bgRiver) bgRiver.addEventListener('click', openWashboard);

  function onRubMove(clientX, clientY) {
    if (completed || !closeup.classList.contains('active')) return;

    if (lastX !== null && lastY !== null) {
      var dist = Math.hypot(clientX - lastX, clientY - lastY);
      if (dist > 2) {
        // Увеличиваем прогресс стирки и фазу синусоиды
        washProgress = Math.min(100, washProgress + dist * 0.12);
        phase += dist * 0.06;

        // Плавное движение футболки ВВЕРХ-ВНИЗ вдоль наклона доски (без дерганий!)
        var moveY = Math.sin(phase) * 28; // амплитуда вверх-вниз 28px
        var moveX = Math.sin(phase) * -4; // легкий наклон вдоль оси доски
        var rot = Math.cos(phase) * 2.5;

        shirt.style.transform = 'translate(' + moveX.toFixed(1) + 'px, ' + moveY.toFixed(1) + 'px) rotate(' + rot.toFixed(1) + 'deg)';
        hint.textContent = 'Стираем на доске... (' + Math.round(washProgress) + '%)';

        if (washProgress >= 100 && !completed) {
          completed = true;
          shirt.style.transform = 'translate(0, 0) scale(1.04)';
          shirt.style.filter = 'drop-shadow(0 0 18px #ffffff) brightness(1.12)';
          hint.textContent = '✨ Бельё выстирано! Можете нажать «Читать далее →»';
          setNextLock(false);
        }
      }
    }
    lastX = clientX;
    lastY = clientY;
  }

  window.addEventListener('mousemove', function (e) {
    onRubMove(e.clientX, e.clientY);
  });

  window.addEventListener('touchmove', function (e) {
    if (!closeup.classList.contains('active')) return;
    e.preventDefault();
    onRubMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') window.location.reload();
  });
});