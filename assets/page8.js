document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var socks1 = document.getElementById('socks-1');
  var socks2 = document.getElementById('socks-2');
  var socks3 = document.getElementById('socks-3');
  var catSleep = document.getElementById('cat-sleep');
  var catAwake = document.getElementById('cat-awake');
  var bubbleShake = document.getElementById('bubble-shake');
  var bubbleDone = document.getElementById('bubble-done');
  var shakeZone = document.getElementById('washer-shake-zone');
  var wrapper = document.getElementById('overflow-wrapper');

  var spinProgress = 0;
  var completed = false;
  var angle = 0;

  function addWashEnergy(amount) {
    if (completed) return;
    spinProgress = Math.min(100, spinProgress + amount);
    angle += 35;

    // Вращаем белье в барабане и переключаем 3 стадии пены
    [socks1, socks2, socks3].forEach(function (s) {
      if (s) s.style.transform = 'rotate(' + angle + 'deg)';
    });

    if (spinProgress > 30 && spinProgress < 75) {
      socks1.style.opacity = '0';
      socks2.style.opacity = '1';
    } else if (spinProgress >= 75) {
      socks2.style.opacity = '0';
      socks3.style.opacity = '1';
    }

    if (spinProgress >= 100 && !completed) {
      completed = true;
      if (catSleep) catSleep.style.opacity = '0';
      if (catAwake) catAwake.style.opacity = '1';
      if (bubbleShake) bubbleShake.style.opacity = '0';
      if (bubbleDone) bubbleDone.style.opacity = '1';

      // Отмечаем главу "Стиральная машина" как пройденную для главной страницы
      localStorage.setItem('done_washer', 'true');

      // Показываем финальные кнопки выбора: "Сделай сам" или "На главную"
      var navBox = document.createElement('div');
      navBox.style.cssText = 'position:absolute; bottom:4%; left:50%; transform:translateX(-50%); display:flex; gap:12px; z-index:30;';
      navBox.innerHTML =
        '<a href="./9.html" style="background:#0284c7; color:#fff; padding:10px 16px; border-radius:12px; text-decoration:none; font-family:Montserrat,sans-serif; font-size:13px; font-weight:600; white-space:nowrap;">🧪 Сделай сам!</a>' +
        '<a href="./1.html" style="background:#16a34a; color:#fff; padding:10px 16px; border-radius:12px; text-decoration:none; font-family:Montserrat,sans-serif; font-size:13px; font-weight:600; white-space:nowrap;">🏠 На главную</a>';
      wrapper.appendChild(navBox);
    }
  }

  // 1. Тряска мышкой или клики на ноутбуке
  if (shakeZone) {
    shakeZone.addEventListener('mousemove', function () { addWashEnergy(1.8); });
    shakeZone.addEventListener('click', function () { addWashEnergy(18); });
  }
  if (bubbleShake) {
    bubbleShake.addEventListener('click', function () { addWashEnergy(20); });
  }

  // 2. Тряска смартфона/планшета через акселерометр
  window.addEventListener('devicemotion', function (e) {
    var acc = e.accelerationIncludingGravity;
    if (!acc) return;
    var total = Math.abs(acc.x || 0) + Math.abs(acc.y || 0);
    if (total > 22) addWashEnergy(4);
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') window.location.reload();
  });
});