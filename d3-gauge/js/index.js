// d3Gauge and xtend get pulled in via browserify-cdn standalone
// see script tags
var gauges = [];

function createGauge (opts) {
  var el = document.getElementById('gauge');
  el.setAttribute('class', 'gauge-container');
  document.body.appendChild(el);
  var g = d3Gauge(el, opts);
  g.currentValue = g._range / 2;
  gauges.push(g);
}

function getRandomNextValue(gauge) {
  gauge.currentValue += (Math.random() - 0.5) * gauge._range / 10; 
  if (gauge.currentValue < gauge._min) gauge.currentValue = gauge._min;
  if (gauge.currentValue > gauge._max) gauge.currentValue = gauge._max;
  return gauge.currentValue;
}

function updateGauges() {
  gauges.forEach(function (gauge) {
    gauge.write(getRandomNextValue(gauge));
  });
}

createGauge({ clazz: 'simple', label:  '' });


setInterval(updateGauges, 500);