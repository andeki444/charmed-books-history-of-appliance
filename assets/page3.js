/* ==========================================================================
   page3.js — Охлаждение холодильника от микрофона (или клика)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var coil = document.getElementById('coil');
  var waves = document.getElementById('waves');
  var snowflakes = document.getElementById('snowflakes');
  var dogCalm = document.getElementById('dog-calm');
  var dogWind = document.getElementById('dog-wind');
  var bubble = document.getElementById('bubble');
  var coolBubble = document.getElementById('cool-bubble');
  var fridge = document.getElementById('old-fridge');

  var coolingProgress = 0; // от 0 до 100
  var micStarted = false;

  function updateCoolingVisuals(progress) {
    var ratio = Math.min(1, progress / 100);

    // Трубка начинает светиться синим
    if (coil) {
      coil.style.filter = 'drop-shadow(0 0 ' + Math.round(ratio * 14) + 'px #00a8ff) brightness(' + (1 + ratio * 0.3) + ')';
    }

    // Проявляются волны и снежинки
    if (waves) {
      waves.style.opacity = ratio.toFixed(2);
      if (ratio > 0.3) waves.classList.add('active');
    }
    if (snowflakes) {
      snowflakes.style.opacity = ratio.toFixed(2);
    }

    // Когда охлаждение > 45%, у собаки поднимаются уши и прячется стартовый бабл
    if (ratio > 0.45) {
      if (dogCalm) dogCalm.style.opacity = '0';
      if (dogWind) dogWind.style.opacity = '1';
      if (bubble) bubble.style.opacity = '0';
    }

    // Финальный бабл: «Хладагент испаряется — отбирая тепло!»
    if (ratio >= 0.75 && coolBubble) {
      coolBubble.classList.add('visible');
    }
  }

  // Запуск прослушивания микрофона
  function initMicrophone() {
    if (micStarted || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    micStarted = true;

    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      var audioCtx = new AudioContext();
      var source = audioCtx.createMediaStreamSource(stream);
      var analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      var data = new Uint8Array(analyser.frequencyBinCount);

      function checkVolume() {
        analyser.getByteFrequencyData(data);
        var sum = 0;
        for (var i = 0; i < data.length; i++) sum += data[i];
        var avg = sum / data.length;

        // Если дуют в микрофон (средняя громкость выше порога 18)
        if (avg > 18 && coolingProgress < 100) {
          coolingProgress = Math.min(100, coolingProgress + (avg / 14));
          updateCoolingVisuals(coolingProgress);
        }

        if (coolingProgress < 100) {
          requestAnimationFrame(checkVolume);
        }
      }
      requestAnimationFrame(checkVolume);
    }).catch(function () {
      // Если доступ к микрофону отклонен — работает клик
    });
  }

  // Пробуем включить микрофон сразу + по первому клику
  initMicrophone();

  function boostCooling() {
    initMicrophone();
    coolingProgress = Math.min(100, coolingProgress + 35);
    updateCoolingVisuals(coolingProgress);
  }

  if (bubble) bubble.addEventListener('click', boostCooling);
  if (fridge) fridge.addEventListener('click', boostCooling);
  
  window.addEventListener('keydown', function (e) {
    if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') {
      window.location.reload();
    }
  });
});