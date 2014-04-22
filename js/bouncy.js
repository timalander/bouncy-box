function Container () {
	this.w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)-50;
	this.h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-50;
	this.box_array = [];
}

function Box (container, x, y) {
	this.x = x;
	this.y = y;
	this.container = container;
	this.dx = Math.floor((Math.random()+1)*2);
	this.dy = Math.floor((Math.random()+1)*2);
	this.div = document.createElement("div")
	this.div.className = "box";
	this.div.style.left = '' + x + 'px';
	this.div.style.top = '' + y + 'px';
	this.div.style.backgroundColor = getRandomColor();
	this.div.style.borderColor = getRandomColor();
	this.div.onclick = function () {
		box = new Box(container, Math.floor((Math.random()*container.w)), Math.floor((Math.random()*container.h)));
		container.box_array.push(box);
	}
	document.getElementsByTagName('body')[0].appendChild(this.div);
}

Box.prototype.animate = function () {
	window.onresize = function() {
		this.container.w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)-50;
		this.container.h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-50;
	}
	this.checkBounds();
	this.move();
	this.div.style.left = '' + this.x + 'px';
	this.div.style.top = '' + this.y + 'px';
}

Box.prototype.checkBounds = function () {
	if ((this.x > this.container.w) || (this.x < 0)) {
		this.dx = -this.dx;
	}
	else if ((this.y > this.container.h) || (this.y < 0)) {
		this.dy = -this.dy;
	}
}

Box.prototype.move = function () {
	this.x += this.dx;
	this.y += this.dy;
}

// from http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

window.onload = function start() {
	var container = new Container();
	var box = new Box(container, Math.floor((Math.random()*container.w)), Math.floor((Math.random()*container.h))); // initialize first box
	container.box_array.push(box);
	window.setInterval(function() {
		for (var i = 0; i < container.box_array.length; i++) {
			container.box_array[i].animate();
		};
	}, 10);
}