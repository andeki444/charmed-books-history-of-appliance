document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  localStorage.setItem('done_fridge', 'true');

  var btn1 = document.querySelector('[data-step="1"]');
  var btn2 = document.querySelector('[data-step="2"]');
  var btn3 = document.querySelector('[data-step="3"]');
  var sand = document.getElementById('layer-sand');
  var water = document.getElementById('layer-water');
  var food = document.getElementById('layer-food');
  var status = document.getElementById('diy-status');

  btn1.addEventListener('click', function () {
    sand.classList.add('layer-shown');
    btn1.disabled = true;
    btn2.disabled = false;
    status.textContent = 'Шаг 2 из 3: Заполните камеру льдом и холодной водой';
  });

  btn2.addEventListener('click', function () {
    water.classList.add('layer-shown');
    btn2.disabled = true;
    btn3.disabled = false;
    status.textContent = 'Шаг 3 из 3: Поместите продукты внутрь';
  });

  btn3.addEventListener('click', function () {
    food.classList.add('layer-shown');
    btn3.disabled = true;
    status.textContent = '🎉 Готово! Мини-холодильник охлаждает без электричества!';
  });
});