'use strict';

window.renderStatistics = function(ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(110, 20, 420, 270);
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = 'white';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var getMaxElement = function() {
    var max = -1;
    var maxIndex = -1;

    for (var i = 0 ; i < times.length; i++) {
      var time = times[i];
      if (time > max) {
        max = time;
        maxIndex = i;
      }
    }
    return max;
  };

  var histogramHeight = 150; // px;
  var step = histogramHeight / (getMaxElement() - 0); // px;
  var barWidth = 40; // px;
  var indent = 90;    // px;
  var initialX = 155; // px;
  var initialY = 100;  // px;
  var initialTimesY = 90; //px;
  var lineHeight = 20;// px;

  var getRandomValue = function (minValue, maxValue) {
    return Math.random() * (maxValue - minValue) + minValue;
  };

  for (var i = 0; i < times.length; i++) {
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + getRandomValue(0.1, 1) + ')';
    ctx.fillRect(initialX + indent * i, initialY + histogramHeight - times[i] * step, barWidth, times[i] * step);
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], initialX + indent * i, initialY + histogramHeight + lineHeight);
    ctx.fillText(times[i].toFixed(), initialX + indent * i, initialTimesY + (histogramHeight - times[i] * step));
  }
};
