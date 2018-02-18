document.getElementsByClassName('menutoggle')[0].onclick = function () {
	var menu = document.getElementsByTagName('body')[0];
	if(menu.className == "active"){
		menu.className = "inactive";
	} else {
		menu.className = "active";
	}
}