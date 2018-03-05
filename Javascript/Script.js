function generateRandomNumber(){
number1 = Math.floor(Math.random()*54600000);
document.getElementById('numberAmountMars').innerHTML= number1 + "/ 54600000 Km";
return number1;
}

function decideFase(){
	var number=generateRandomNumber();
	var fase=0;
	switch(true){
		case (number==0):
		fase=1;
		break;		
		case (number<10920000):
		fase=2;
		break;
		case (number>10920000 && number<21840000):
		fase=3;
		break;
		case (number>21840000 && number<32760000):
		fase=4;
		break;
		case (number>32760000 && number<43680000):
		fase=5;
		break;
		case (number>43680000 && number<54600000 ):
		fase=6;
		break;
		case (number==54600000):
		fase=7;
		break;
	}
	return fase;
	}

function decideRocketPosition(){
	var number = decideFase();
	switch(true){
		case (number==1):
		document.getElementById("rocket").id = "rocket";
		break;		
		case (number==2):
		document.getElementById("rocket").id = "rocket2";
		break;
		case (number==3):
		document.getElementById("rocket").id = "rocket3";
		break;
		case (number==4):
		document.getElementById("rocket").id = "rocket4";
		break;
		case (number==5):
		document.getElementById("rocket").id = "rocket5";
		break;
		case (number==6):
		document.getElementById("rocket").id = "rocket6";
		break;
		case (number==7):
		document.getElementById("rocket").id = "rocket7";
		break;
	}
}
function bepaalTijd(){
	var days;
	minutes = Math.floor(Math.random()*60);
	var fase = decideFase();
	switch(true){
		case(fase==1):		
		days = Math.floor(Math.random()*(238-237+1)+237);
		hours = Math.floor(Math.random()*24);
		break;
		case(fase==2):
		days = Math.floor(Math.random()*(237-198+1)+198);
		hours = Math.floor(Math.random()*(8-1+1)+1);
		break;
		case(fase==3):
		days = Math.floor(Math.random()*(158-119+1)+119);
		hours = Math.floor(Math.random()*(16-1+1)+1);
		break;
		case(fase==4):
		days = Math.floor(Math.random()*(119-79+1)+79);
		hours = Math.floor(Math.random()*24);
		break;
		case(fase==5):
		days =Math.floor(Math.random()*(79-39+1)+39);
		hours = Math.floor(Math.random()*(8-1+1)+1);
		break;
		case(fase==6):
		days = Math.floor(Math.random()*39);
		hours = Math.floor(Math.random()*(16-1+1)+1);	
		break;
		case(fase==7):
		days = 0;
		hours = Math.floor(Math.random()*24);
		break;
	}

		document.getElementById('daysAantal').innerHTML= days;
		document.getElementById('hoursAantal').innerHTML= hours;
		document.getElementById('minutesAantal').innerHTML= minutes;

}

document.getElementsByClassName('menutoggle')[0].onclick = function () {
	var menu = document.getElementsByTagName('body')[0];
	if(menu.className == "active"){
		menu.className = "inactive";
	} else {
		menu.className = "active";
	}
}


// d3Gauge and xtend get pulled in via browserify-cdn standalone
// see script tags
var gauges = [];

function createGauge (opts) {
  var el = document.getElementById('gauge');
  el.setAttribute('class', 'gauge-container');
  document.getElementById('fuelMeter').appendChild(el);
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




window.onload = function(){
decideRocketPosition();
bepaalTijd();
createGauge({ clazz: 'simple', label:  '' });
setInterval(updateGauges, 500);
};