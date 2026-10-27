/* ==========================================================================
   page9.js — Логика конструктора «Сделай сам: Мини-стиральная машинка»
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Фиксируем прохождение главы стиральной машины
  localStorage.setItem('done_washer', 'true');

  var jar = document.getElementById('jar-container');
  var lid = document.getElementById('jar-lid');
  var water = document.getElementById('jar-water');
  var socks = document.getElementById('jar-socks');
  var foam = document.getElementById('jar-foam');
  var status = document.getElementById('diy-washer-status');

  var btn1 = document.getElementById('btn-water');
  var btn2 = document.getElementById('btn-socks');
  var btn3 = document.getElementById('btn-shake');
  var btn4 = document.getElementById('btn-rinse');

  // Шаг 1: Налить воду и порошок
  btn1.addEventListener('click', function () {
    water.classList.add('filled');
    btn1.disabled = true;
    btn2.disabled = false;
    status.textContent = 'Шаг 2: Положите внутрь носки и плотно закройте крышку';
  });

  // Шаг 2: Положить носки и закрыть крышку
  btn2.addEventListener('click', function () {
    socks.classList.add('dropped');
    lid.classList.add('closed');
    btn2.disabled = true;
    btn3.disabled = false;
    status.textContent = 'Шаг 3: Нажмите «Потрясти контейнер!», чтобы запустить стирку';
  });

  // Шаг 3: Встряска контейнера
  btn3.addEventListener('click', function () {
    btn3.disabled = true;
    jar.classList.add('shaking');
    foam.style.opacity = '1';
    socks.style.transition = 'transform 0.15s linear';

    var spin = setInterval(function () {
      var r = Math.floor(Math.random() * 60) - 30;
      socks.style.transform = 'translateY(10px) rotate(' + r + 'deg)';
    }, 120);

    setTimeout(function () {
      clearInterval(spin);
      jar.classList.remove('shaking');
      socks.style.transform = 'translateY(15px) rotate(0deg)';
      btn4.disabled = false;
      status.textContent = 'Шаг 4: Отлично! Теперь замените воду для полоскания';
    }, 1600);
  });

  // Шаг 4: Полоскание
  btn4.addEventListener('click', function () {
    btn4.disabled = true;
    foam.style.opacity = '0';
    water.classList.add('clean-rinse');
    jar.classList.add('shaking');

    setTimeout(function () {
      jar.classList.remove('shaking');
      socks.textContent = '🧦✨';
      status.textContent = '🎉 Готово! Мини-стиральная машинка выстирала и прополоскала вещи!';
    }, 1100);
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') window.location.reload();
  });
});