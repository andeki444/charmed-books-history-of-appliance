/* ==========================================================================
   page1.js — Авто-обрезка прозрачных полей PNG + интерактив комнаты
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Автоматическая обрезка пустых прозрачных полей вокруг объектов
  function trimTransparentEdges(img) {
    if (img.dataset.trimmed) return;
    try {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var w = img.naturalWidth;
      var h = img.naturalHeight;
      if (!w || !h) return;

      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0);

      var data = ctx.getImageData(0, 0, w, h).data;
      var top = h, left = w, right = 0, bottom = 0;
      var found = false;

      for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
          var alpha = data[(y * w + x) * 4 + 3];
          if (alpha > 10) {
            if (x < left) left = x;
            if (x > right) right = x;
            if (y < top) top = y;
            if (y > bottom) bottom = y;
            found = true;
          }
        }
      }

      if (found && (left > 0 || top > 0 || right < w - 1 || bottom < h - 1)) {
        var trimW = right - left + 1;
        var trimH = bottom - top + 1;
        var outCanvas = document.createElement('canvas');
        outCanvas.width = trimW;
        outCanvas.height = trimH;
        outCanvas.getContext('2d').drawImage(canvas, left, top, trimW, trimH, 0, 0, trimW, trimH);
        img.dataset.trimmed = 'true';
        img.src = outCanvas.toDataURL('image/png');
      }
    } catch (e) {
      // Если открыто через file:// и браузер блокирует Canvas CORS — оставляем как есть
    }
  }

  var trimTargets = document.querySelectorAll('.autotrim');
  trimTargets.forEach(function (img) {
    if (img.complete && img.naturalWidth > 0) {
      trimTransparentEdges(img);
    } else {
      img.addEventListener('load', function () {
        trimTransparentEdges(img);
      });
    }
  });

  // 2. Переходы по клику на бытовую технику
  var appliances = document.querySelectorAll('.appliance');
  var techPages = {
    fridge: '2.html',
    washer: '5.html',
    vacuum: '9.html',
    toaster: '13.html',
    tv: '17.html',
    microwave: '21.html'
  };

  appliances.forEach(function (item) {
    item.addEventListener('click', function () {
      var techKey = item.getAttribute('data-tech');
      var targetPage = techPages[techKey];
      var scene = document.getElementById('scene');

      // Плавное приближение (зум) и затемнение перед переходом в историю
      item.style.filter = 'drop-shadow(0 0 25px #ffe600) brightness(1.2)';
      if (scene) {
        scene.style.transition = 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease';
        scene.style.transform = 'scale(1.18)';
        scene.style.opacity = '0';
      }

      setTimeout(function () {
        if (targetPage) {
          window.location.href = './' + targetPage;
        }
      }, 500);
    });
  });

  // 3. Интерактив кошки и собаки
  var cat = document.getElementById('cat');
  if (cat) {
    cat.addEventListener('click', function () {
      cat.style.animation = 'none';
      cat.offsetHeight;
      cat.style.transform = 'translateY(-6px) rotate(-6deg)';
      setTimeout(function () {
        cat.style.transform = '';
        cat.style.animation = 'catTailMove 4.5s ease-in-out infinite';
      }, 250);
    });
  }

  var dog = document.getElementById('dog');
  if (dog) {
    dog.addEventListener('click', function () {
      dog.style.animation = 'none';
      dog.offsetHeight;
      dog.style.transform = 'scale(1.05)';
      setTimeout(function () {
        dog.style.transform = '';
        dog.style.animation = 'dogEarTwitch 5s ease-in-out infinite';
      }, 250);
    });
  }
  // Карта перехода к главам техники (с учетом всех страниц конструктора)
  var techPages = {
    fridge: '2.html',      // Холодильник (страницы 2, 3, 4 + конструктор 5)
    washer: '6.html',      // Стиральная машина (страницы 6, 7, 8 + конструктор 9)
    vacuum: '10.html',
    toaster: '14.html',
    tv: '18.html',
    microwave: '22.html'
  };

  // Отмечаем пройденные истории на главной странице
  var completedMap = {
    fridge: localStorage.getItem('done_fridge') === 'true',
    washer: localStorage.getItem('done_washer') === 'true'
  };

  Object.keys(completedMap).forEach(function (key) {
    if (completedMap[key]) {
      var el = document.getElementById(key);
      if (el) {
        el.classList.add('tech-completed');
        // Создаем значок галочки над прибором
        var badge = document.createElement('div');
        badge.className = 'completed-badge';
        badge.innerHTML = '✓ Изучено';
        badge.style.left = el.style.left || getComputedStyle(el).left;
        badge.style.top = el.style.top || getComputedStyle(el).top;
        el.parentNode.appendChild(badge);
      }
    }
  });

  // Сброс всего прогресса по клавише R для удобного тестирования
  window.addEventListener('keydown', function (e) {
    if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') {
      localStorage.clear();
      window.location.reload();
    }
  });
});