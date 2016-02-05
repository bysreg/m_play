// namespace 
var GNOVEL = GNOVEL || {};

(function() {
	"use strict";

	var Choices = function(page, choices, result, params) {		
		this._choices = choices;
		this._page = page;		
		this._result = result;
		this._params = params;

		this._choicesBox = [];
		this._choosed = false;

		this._init();

		if (params != null) {
			if (params.seconds != null && params.seconds > 0) {
				this._countdown();
			}			
		}
	};

	Choices.prototype._init = function() {
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
		this._page._addToScene(timer);
		var textbox;		
		for (var i = 0; i < this._choices.length; i++) {
			textbox = this._page.addTextBox(this._choices[i], {
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
			textbox.position.set(i * 100, -200, 250);
			this._choicesBox.push(textbox);
			this._page._addToScene(this._choicesBox[i]);			
		};
	};

	/**
	 * This function will only be called by this class when params.seconds > 0
	 */
	Choices.prototype._countdown = function() {
		var timer = this;
		var tween = new TWEEN.Tween(this.timer.position).to({
			x: 390,
			y: -350,
			z: -100
		}, this._params.seconds * 1000).onComplete(function() {

			if (timer._choosed) {
				return timer._result;
			} else {

				for (var i = 0; i < timer.choices.length; i++) {
					timer._page._removeFromScene(timer._choicesBox[i]);
				}

				timer._page._removeFromScene(timer.timer);
			}
		});
		tween.start();
	};

	Choices.prototype._onMouseDown = function(event) {
		var clickedObj;
		event.preventDefault();
		var mouse = new THREE.Vector2();

		mouse.x = (event.clientX / this._page._owner._renderer.domElement.clientWidth) * 2 - 1;
		mouse.y = -(event.clientY / this._page._owner._renderer.domElement.clientHeight) * 2 + 1;

		//update picking ray with camera and mouse pos
		this._page._owner._raycaster.setFromCamera(mouse, this._page._owner.getCamera());

		//create array of objects intersected with
		var intersects = this._page._owner._raycaster.intersectObjects(this._choicesBox, true);
		if (intersects.length > 0) {			
			clickedObj = intersects[0].object;
			clickedObj.material.color.setHex(0.5 * 0xffffff | 0x80000000);			

			this._result = intersects[0];
			this._choosed = true;
			this._page._removeFromScene(this.timer);
			for (var i = 0; i < this._choices.length; i++) {
				///*
				if(this._choicesBox[i] == intersects[0].object)
				{
					console.log("clicked on " + i);
				}
				//*/
				
				this._page._removeFromScene(this._choicesBox[i]);
			}
		}		
	};

	GNOVEL.Choices = Choices;
}());