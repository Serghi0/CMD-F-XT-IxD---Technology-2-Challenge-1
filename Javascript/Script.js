function generateRandomNumber(){
var number = Math.floor(Math.random()*54600000);
document.getElementById('numberAmountMars').innerHTML= number + "/ 54600000 km";
return number;
}// De random generated number wordt gegenereerd

function decideFase(number){
	var fase=0;
	switch(true){
		case (number==0):
		fase=1;
		break;		
		case (number<=10920000):
		fase=2;
		break;
		case (number>=10920000 && number<=21840000):
		fase=3;
		break;
		case (number>=21840000 && number<=32760000):
		fase=4;
		break;
		case (number>=32760000 && number<=43680000):
		fase=5;
		break;
		case (number>=43680000 && number<=54600000 ):
		fase=6;
		break;
		case (number==54600000):
		fase=7;
		break;
	}
	return fase;
	}// De fase wordt bepaald d.m.v. de random generated number

function decideRocketPosition(number){
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

function pad(number, length) {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;

}//zorgt dat een getal de gewenste aantal digits bevat

function bepaalTijd(fase){
	var days;
	minutes = pad(Math.floor(Math.random()*60),2);
	switch(true){
		case(fase==1):		
		days = pad(Math.floor(Math.random()*(238-237+1)+237),3);
		hours = pad(Math.floor(Math.random()*24),2);
		break;
		case(fase==2):
		days = pad(Math.floor(Math.random()*(237-198+1)+198),3);
		hours = pad(Math.floor(Math.random()*(8-1+1)+1),2);
		break;
		case(fase==3):
		days = pad(Math.floor(Math.random()*(158-119+1)+119),3);
		hours = pad(Math.floor(Math.random()*(16-1+1)+1),2);
		break;
		case(fase==4):
		days = pad(Math.floor(Math.random()*(119-79+1)+79),3);
		hours = pad(Math.floor(Math.random()*24),2);
		break;
		case(fase==5):
		days =pad(Math.floor(Math.random()*(79-39+1)+39),3);
		hours = pad(Math.floor(Math.random()*(8-1+1)+1),2);
		break;
		case(fase==6):
		days = pad(Math.floor(Math.random()*39),3);
		hours = pad(Math.floor(Math.random()*(16-1+1)+1),2);	
		break;
		case(fase==7):
		days = pad(0,3);
		hours = pad(Math.floor(Math.random()*24),2);
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

function getFuelValue(gauge, number) {
	switch(true){
		case (number==1):
		  gauge.currentValue = gauge._max;
		break;		
		case (number==2):
		gauge.currentValue = ((gauge._max/7) * 6);
		break;
		case (number==3):
		gauge.currentValue = ((gauge._max/7) * 5);
		break;
		case (number==4):
		gauge.currentValue = ((gauge._max/7) * 4);
		break;
		case (number==5):
		gauge.currentValue = ((gauge._max/7) * 3);
		break;
		case (number==6):
		gauge.currentValue = ((gauge._max/7) * 2);
		break;
		case (number==7):
		gauge.currentValue = (gauge._max/7);
		break;
}
  return gauge.currentValue;

}

function getSpeedValue(gauge, number) {
	if(number==1){
		gauge.currentValue = gauge._max;
	}else if(number>=2 && number<7){
		gauge.currentValue = ((gauge._max/7) * 5);
	}else if(number==7){
		gauge.currentValue = (gauge._max/7);
	}

  return gauge.currentValue;

}

/*function updateGauges() {
  speedGauges.forEach(function (gauge) {
    gauge.write(getSpeedValue(gauge));
  });  
  fuelGauges.forEach(function (gauge) {
    gauge.write(getFuelValue(gauge));
  });
}*/ //optionele update gauge functie


/*--------------------------------------------------------------------------------*/
/*----------------------------------menu------------------------------------------*/

/*document.getElementsByClassName('menutoggle')[0].onclick = function () {
	var menu = document.getElementsByTagName('body')[0];
	if(menu.className == "active"){
		menu.className = "inactive";
	} else {
		menu.className = "active";
	}
}*/
//Dit moet nog uitgewerkt worden(optioneel)

/*----------------------------onloadFunctions-------------------------------------*/

window.onload = function(){
var number = decideFase(generateRandomNumber());
decideRocketPosition(number);
bepaalTijd(number);
createFuelGauge({ clazz: 'fuel', label:  'Fuel in kJ' });
createSpeedGauge({ clazz: 'speed', label:  'Speed in km/h' });
fuelGauges.forEach(function (gauge) {
  gauge.write(getFuelValue(gauge,number));
});
speedGauges.forEach(function (gauge) {
    gauge.write(getSpeedValue(gauge,number));
});
//setInterval(updateGauges, 500);
//updateGauges();
};