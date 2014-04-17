function Container () {
	this.w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	this.h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	this.box_array = [];
}

function Box (container, x, y) {
	this.x = x;
	this.y = y;
	this.div = document.createElement("div")
	this.div.className = "box";
	this.div.style.left = '' + x + 'px';
	this.div.style.top = '' + y + 'px';
	this.div.onclick = function () {
		box = new Box(container, Math.floor((Math.random()*container.w)), Math.floor((Math.random()*container.h)));
		container.box_array.push(box);
	}
	document.getElementsByTagName('body')[0].appendChild(this.div);
}

Box.prototype.move = function () {
	this.y++;
	this.x++;
	this.div.style.left = '' + this.y + 'px';
	this.div.style.top = '' + this.x + 'px';
}

window.onload = function start() {
	container = new Container();

	box = new Box(container, 0, 0); // initialize first box
	container.box_array.push(box);
	window.setInterval(function() {
		for (var i = 0; i < container.box_array.length; i++) {
			container.box_array[i].move();
		};
	}, 50);
}