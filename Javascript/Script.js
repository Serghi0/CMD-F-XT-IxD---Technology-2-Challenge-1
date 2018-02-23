function generateRandomNumber(){
number1 = Math.floor(Math.random()*100000000);
number2= 0;
if(number1 < 56000000){
document.getElementById('number').innerHTML= number1;

}
else{
document.getElementById('number').innerHTML= number2;

}
}



document.getElementsByClassName('menutoggle')[0].onclick = function () {
	var menu = document.getElementsByTagName('body')[0];
	if(menu.className == "active"){
		menu.className = "inactive";
	} else {
		menu.className = "active";
	}
}

window.onload = function(){
generateRandomNumber();
};