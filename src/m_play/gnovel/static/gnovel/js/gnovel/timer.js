// namespace 
var GNOVEL = GNOVEL || {};

(function() {
	"use strict";

	var Timer = function(page, seconds, choices, result) {
		this.seconds = seconds;
		this.choices = choices;
		this.page = page;
		this._scene = page._owner._scene;
		this.result = result;

		this.choicesBox = [];
		this.choosed = false;
	};

	Timer.prototype.init = function() {

		// add timer progress bar and choicesboxes
		var timer_material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			opacity: 0.2,
			transparent: true
		});
		var timer_plane = new THREE.PlaneBufferGeometry(20, 8);
		var timer = new THREE.Mesh(timer_plane, timer_material);
		this.timer = timer;
		timer.position.x = -390;
		timer.position.z = -100;
		timer.position.y = -350;
		this.page._addToScene(timer);
		var textbox;
		for (var i = 0; i < this.choices.length; i++) {
			textbox = this.page.addTextBox(this.choices[i], {
				fontsize: 46,
				borderColor: {
					r: 255,
					g: 255,
					b: 255,
					a: 0.8
				},
				backgroundColor: {
					r: 255,
					g: 255,
					b: 255,
					a: 0.8
				}
			});
			textbox.position.set(-130, -100 - i * 20, 300);
			this.choicesBox.push(textbox);
			this.page._addToScene(this.choicesBox[i]);
			this._scene.interactObjs.push(this.choicesBox[i]);
		};
	};

	Timer.prototype.countdown = function() {
		var timer = this;
		var tween = new TWEEN.Tween(this.timer.position).to({
			x: 390,
			y: -350,
			z: -100
		}, this.seconds * 1000).onComplete(function() {

			if (timer.choosed) {
				return timer.result;
			}else {

				for (var i = 0; i < timer.choices.length; i++) {
					timer.page._removeFromScene(timer.choicesBox[i]);
				}

				timer.page._removeFromScene(timer.timer);
			}
		});
		tween.start();
	};

	Timer.prototype._onMouseDown = function(event) {

		var clickedObj;
		event.preventDefault();
		var mouse = new THREE.Vector2();

		mouse.x = (event.clientX / this.page._owner._renderer.domElement.clientWidth) * 2 - 1;
		mouse.y = -(event.clientY / this.page._owner._renderer.domElement.clientHeight) * 2 + 1;

		//update picking ray with camera and mouse pos
		this.page._owner._raycaster.setFromCamera(mouse, this.page._owner.getCamera());

		//create array of objects intersected with
		var intersects = this.page._owner._raycaster.intersectObjects(this._scene.interactObjs, true);
		if (intersects.length > 0) {
			console.log("clicked");
			for (var i in intersects) {
				console.log(intersects[i].object);
			}
			clickedObj = intersects[0].object;
			clickedObj.material.color.setHex(0.5 * 0xffffff | 0x80000000);
		}
		this.result = intersects[0];
		this.choosed = true;
		this.page._removeFromScene(this.timer);
		for (var i = 0; i < this.choices.length; i++) {
			this.page._removeFromScene(this.choicesBox[i]);
		}
	};

	GNOVEL.Timer = Timer;
}());