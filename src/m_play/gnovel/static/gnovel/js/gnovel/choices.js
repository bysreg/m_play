// namespace 
var GNOVEL = GNOVEL || {};

(function() {
	"use strict";

	var Choices = function(page, choices, result, params) {		
		this._choices = choices;
		this._page = page;		
		this._result = result;
		this._params = params || {};

		this._choicesBox = [];
		this._choosed = false;		

		this._init();

		if (params != null) {
			if (params.seconds != null && params.seconds > 0) {
				this._countdown();
			}			
		}

		// HACKS
		// FIXME : should not
		var choices = this;
		document.addEventListener('mousedown', function(event) { _onMouseDown(event, choices); }, false);
	};

	Choices.prototype._init = function() {
		// add timer progress bar and choicesboxes
		var timer_material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			opacity: 0.2,
			transparent: true
		});

		if(this._params.seconds > 0) {
			var timer_plane = new THREE.PlaneBufferGeometry(20, 8);
			var timer = new THREE.Mesh(timer_plane, timer_material);
			this.timer = timer;
			timer.position.x = -390;			
			timer.position.y = -350;
			timer.position.z = 75;
			this._page._addToScene(timer);
		}	

		var textbox;	
		var startx = this._params.x || 0;
		var starty = this._params.y || 0;	
		var startz = this._params.z || 75;
		for (var i = 0; i < this._choices.length; i++) {
			textbox = this._page.createTextBox(this._choices[i], {
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
			textbox.position.set(i * 400 + startx, -200 + starty, startz + 10);
			textbox.name = "choices";

			// hack : because we are using Text2D, we are going to identify the raycast based on this name
			textbox.children[0].name = ""+i;

			this._choicesBox.push(textbox);
			this._page._addToScene(this._choicesBox[i]);			
		};
	};

	function _onMouseDown(event, choiceObj) {		
		choiceObj._onMouseDown(event);
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
				// do nothing, because we already call _onChoiceComplete on mouse down
			} else {
				// auto select the first option
				this._result.choiceId = 0;
				timer._onChoiceComplete();
			}
		});
		tween.start();
	};

	Choices.prototype._onChoiceComplete = function() {
		// clean up all objects from scene
		if(this._params.seconds != null && params.seconds > 0) {
			this._page._removeFromScene(timer.timer);	
		}

		for (var i = 0; i < this._choices.length; i++) {
			this._page._removeFromScene(this._choicesBox[i]);
		}

		if(this._params.onChoiceComplete != null) {
			this._params.onChoiceComplete(this);
		}
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
		if (intersects.length > 0 && !this._choosed) {			
			clickedObj = intersects[0].object;
			clickedObj.material.color.setHex(0.5 * 0xffffff | 0x80000000);			

			this._choosed = true;
			this._page._removeFromScene(this.timer);
			for (var i = 0; i < this._choices.length; i++) {
				///*
				if(this._choicesBox[i].children[0].name == intersects[0].object.name)
				{
					console.log("clicked on " + i);
					this._result.choiceId = i;
				}
				//*/
			}

			this._onChoiceComplete();
		}		
	};

	GNOVEL.Choices = Choices;
}());