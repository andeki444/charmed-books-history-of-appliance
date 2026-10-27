/* ==========================================================================
   page4.js — Открытие дверцы холодильника с пингвином и падение мороженого
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var doorClosed = document.getElementById('door-closed');
  var doorOpen = document.getElementById('door-open');
  var bubble3 = document.getElementById('bubble3');
  var catSit = document.getElementById('cat-sit');
  var catWalk = document.getElementById('cat-walk');
  var icecream = document.getElementById('icecream');

  var isOpen = false;

  function openFridge() {
    if (isOpen) return;
    isOpen = true;

    // Открываем дверцу
    if (doorClosed) {
      doorClosed.style.opacity = '0';
      doorClosed.style.pointerEvents = 'none';
    }
    if (doorOpen) {
      doorOpen.style.opacity = '1';
      doorOpen.style.pointerEvents = 'auto';
    }

    // Убираем подсказку
    if (bubble3) {
      bubble3.style.opacity = '0';
      bubble3.style.pointerEvents = 'none';
    }

    // Рожок мороженого выпадает на пол, а кот идёт к нему
    setTimeout(function () {
      if (icecream) icecream.classList.add('dropped');
      if (catSit) catSit.style.opacity = '0';
      if (catWalk) catWalk.style.opacity = '1';
    }, 150);

    // Отмечаем, что история про холодильник полностью пройдена!
    localStorage.setItem('done_fridge', 'true');

    // Показываем кнопки перехода: в конструктор "Сделай сам" или на Главную
    var navBox = document.createElement('div');
    navBox.style.cssText = 'position:absolute; bottom:4%; left:50%; transform:translateX(-50%); display:flex; gap:12px; z-index:30;';
    navBox.innerHTML =
      '<a href="./5.html" style="background:#0284c7; color:#fff; padding:10px 16px; border-radius:12px; text-decoration:none; font-family:Montserrat,sans-serif; font-size:13px; font-weight:600; white-space:nowrap;">🧪 Сделай сам!</a>' +
      '<a href="./index.html" style="background:#16a34a; color:#fff; padding:10px 16px; border-radius:12px; text-decoration:none; font-family:Montserrat,sans-serif; font-size:13px; font-weight:600; white-space:nowrap;">🏠 На главную</a>';
    document.getElementById('overflow-wrapper').appendChild(navBox);
  }

  if (doorClosed) doorClosed.addEventListener('click', openFridge);
  if (bubble3) bubble3.addEventListener('click', openFridge);

  window.addEventListener('keydown', function (e) {
    if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') {
      window.location.reload();
    }
  });

  function setNextButtonLock(locked) {
    document.querySelectorAll('button, a').forEach(function (btn) {
      if (btn.textContent && btn.textContent.toUpperCase().indexOf('ЧИТАТЬ ДАЛЕЕ') !== -1) {
        if (locked) {
          btn.style.opacity = '0.35';
          btn.style.pointerEvents = 'none';
          btn.title = 'Сначала подуйте в микрофон или нажмите на холодильник!';
        } else {
          btn.style.opacity = '1';
          btn.style.pointerEvents = 'auto';
          btn.title = '';
        }
      }
    });
  }
  setTimeout(function () { setNextButtonLock(true); }, 300);
});