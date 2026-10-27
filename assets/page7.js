document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var washer = document.getElementById('thor-washer');
  var bubble = document.getElementById('bubble-hold');
  var status = document.getElementById('motor-status');
  var waves = document.querySelectorAll('.thor-wave');

  var holdProgress = 0;
  var completed = false;
  var holdTimer = null;

  function setNextLock(locked) {
    document.querySelectorAll('button, a').forEach(function (btn) {
      if (btn.textContent && btn.textContent.toUpperCase().indexOf('ЧИТАТЬ ДАЛЕЕ') !== -1) {
        btn.style.opacity = locked ? '0.35' : '1';
        btn.style.pointerEvents = locked ? 'none' : 'auto';
      }
    });
  }
  setTimeout(function () { setNextLock(true); }, 300);

  function startHold(e) {
    if (e) e.preventDefault();
    if (completed || holdTimer) return;

    washer.classList.add('vibrating');
    if (bubble) bubble.style.opacity = '0';
    waves.forEach(function (w) { w.style.opacity = '1'; });

    holdTimer = setInterval(function () {
      holdProgress = Math.min(100, holdProgress + 4);
      status.textContent = '⚡ Мотор вращает барабан... (' + holdProgress + '%)';

      if (holdProgress >= 100 && !completed) {
        completed = true;
        clearInterval(holdTimer);
        holdTimer = null;
        status.textContent = '✅ Стирка на моторе Thor завершена! Можете читать далее →';
        setNextLock(false);
      }
    }, 80);
  }

  function stopHold() {
    if (holdTimer) {
      clearInterval(holdTimer);
      holdTimer = null;
    }
    if (!completed) {
      washer.classList.remove('vibrating');
      waves.forEach(function (w) { w.style.opacity = '0'; });
      status.textContent = 'Удерживайте машинку, чтобы досчитать до 100% (' + holdProgress + '%)';
    }
  }

  [washer, bubble].forEach(function (el) {
    if (!el) return;
    el.addEventListener('mousedown', startHold);
    el.addEventListener('touchstart', startHold, { passive: false });
  });

  window.addEventListener('mouseup', stopHold);
  window.addEventListener('touchend', stopHold);

  window.addEventListener('keydown', function (e) {
    if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') window.location.reload();
  });
});