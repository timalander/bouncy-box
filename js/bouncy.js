function Container () {
	this.w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)-50;
	this.h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-50;
	this.box_array = [];
}

function Box (container, x, y) {
	this.x = x;
	this.y = y;
	directions = ['up', 'down', 'left', 'right'];
	this.direction = directions[Math.floor(Math.random()*4)];
	console.log(this.direction)
	this.div = document.createElement("div")
	this.div.className = "box";
	this.div.style.left = '' + x + 'px';
	this.div.style.top = '' + y + 'px';
	this.div.style.backgroundColor = getRandomColor();
	this.div.onclick = function () {
		box = new Box(container, Math.floor((Math.random()*container.w)), Math.floor((Math.random()*container.h)));
		container.box_array.push(box);
	}
	document.getElementsByTagName('body')[0].appendChild(this.div);
}

Box.prototype.move = function () {

	if (this.x > container.w) {
		this.direction = 'left';
	}
	else if (this.x < 0) {
		this.direction = 'right';
	}
	else if (this.y > container.h) {
		this.direction = 'up';
	}
	else if (this.y < 0) {
		this.direction = 'down';
	}

	if (this.direction === 'up') {
		this.y -= 1;
	}
	else if (this.direction === 'down') {
		this.y += 1;
	}
	else if (this.direction === 'left') {
		this.x -= 1;
	}
	else if (this.direction === 'right') {
		this.x += 1;
	}
	this.div.style.left = '' + this.x + 'px';
	this.div.style.top = '' + this.y + 'px';
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

window.onload = function start() {
	container = new Container();

	box = new Box(container, 4, 6); // initialize first box
	container.box_array.push(box);
	window.setInterval(function() {
		for (var i = 0; i < container.box_array.length; i++) {
			container.box_array[i].move();
		};
	}, 10);
}