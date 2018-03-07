function generateRandomNumber(){
number1 = Math.floor(Math.random()*54600000);
document.getElementById('numberAmountMars').innerHTML= number1 + "/ 54600000 Km";
return number1;
}// De random generated number wordt gegenereerd

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
	}// De fase wordt bepaald d.m.v. de random generated number

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
}// De raket positie wordt bepaald d.m.v. de fase

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
}// De tijd wordt bepaald d.m.v. de fase

/*---------------------------------Gauges---------------------------------------*/

// d3Gauge gets pulled in via browserify-cdn standalone
// see script tags
var speedGauges = [];
var fuelGauges = [];

function createFuelGauge (opts) {
  var el = document.getElementById('fuelGauge');
  el.setAttribute('class', 'gauge-container');
  document.getElementById('fuelMeter').appendChild(el);
  var g = fuelGauge(el, opts);
  g.currentValue = g._range / 2;
  fuelGauges.push(g);
}//De fuel gauge wordt creert.

function createSpeedGauge (opts) {
  var el = document.getElementById('speedGauge');
  el.setAttribute('class', 'gauge-container');
  document.getElementById('speedMeter').appendChild(el);
  var g = speedGauge(el, opts);
  g.currentValue = g._range / 2;
  speedGauges.push(g);
}//De speed gauge wordt creert.

function getRandomNextFuelValue(gauge) {
  gauge.currentValue = 150000;
  //gauge.currentValue += (Math.random() - 0.5) * gauge._range / 10; 
  //if (gauge.currentValue < gauge._min) gauge.currentValue = gauge._min;
  //if (gauge.currentValue > gauge._max) gauge.currentValue = gauge._max;
  return gauge.currentValue;
}

function getRandomNextSpeedValue(gauge) {
  gauge.currentValue = 95716;
  //gauge.currentValue += (Math.random() - 0.5) * gauge._range / 10; 
  //if (gauge.currentValue < gauge._min) gauge.currentValue = gauge._min;
  //if (gauge.currentValue > gauge._max) gauge.currentValue = gauge._max;
  return gauge.currentValue;
}

function updateGauges() {
  speedGauges.forEach(function (gauge) {
    gauge.write(getRandomNextSpeedValue(gauge));
  });  
  fuelGauges.forEach(function (gauge) {
    gauge.write(getRandomNextFuelValue(gauge));
  });
}

/*--------------------------------------------------------------------------------*/
/*----------------------------------menu------------------------------------------*/

document.getElementsByClassName('menutoggle')[0].onclick = function () {
	var menu = document.getElementsByTagName('body')[0];
	if(menu.className == "active"){
		menu.className = "inactive";
	} else {
		menu.className = "active";
	}
}
//Dit moet nog uitgewerkt worden

/*----------------------------onloadFunctions-------------------------------------*/

window.onload = function(){
decideRocketPosition();
bepaalTijd();
createFuelGauge({ clazz: 'fuel', label:  '' });
createSpeedGauge({ clazz: 'speed', label:  '' });
setInterval(updateGauges, 500);
};