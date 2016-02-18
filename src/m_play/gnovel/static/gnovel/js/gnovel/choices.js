// namespace
var GNOVEL = GNOVEL || {};

(function() {
	"use strict";
	/**
	 *@param{page = ; type = the type of choice-dialogue, action, location; }
	 *choices = array of choices possible
	 *result = what should happen after choice selected
	 */
	/**
	 * @class  Choices
	 * @constructor
	 */
	var Choices = function(page, choices, result, params) {
		this._choices = choices;
		this._page = page;
		this._result = result;
		this._params = params || {};
		this._mouseDownListener = null;
		this._mouseMoveListener = null;

		this._choicesBox = [];
		this._uiElements = [];
		this._choosed = false;

		this._init();

		if (params != null) {
			if (params.seconds != null && params.seconds > 0) {
				this._countdown();
			}
		}

		var choices = this;
		this._mouseDownListener = function(event) {
			choices._onMouseDown(event);
		};
		this._mouseMoveListener = function(event) {
			choices._onMouseMove(event);
		};

		this._page.getOwner().addMouseDownListener(this._mouseDownListener);
		this._page.getOwner().addMouseMoveListener(this._mouseMoveListener);
	};

	Choices.prototype._init = function() {
		// add timer progress bar and choicesboxes
		var timer_material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			opacity: 0.2,
			transparent: true
		});

		if (this._params.seconds > 0) {
			var timer_plane = new THREE.PlaneBufferGeometry(20, 8);
			var timer = new THREE.Mesh(timer_plane, timer_material);
			this.timer = timer;
			timer.position.x = -390;
			timer.position.y = -350;
			timer.position.z = 75;
			this._page._addToScene(timer);
		}

		var textbox;
		var mouse = new THREE.Vector2(), hoveredChoice;
		this._mouse = mouse;
		this._hoveredChoice = hoveredChoice;
		var startx = this._params.x || -200;
		var starty = this._params.y || -200;
		var startz = this._params.z || 220;
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
			textbox.position.set(200 + startx, i * -50 + starty, startz + 10);
			textbox.name = "choices";

			// hack : because we are using Text2D, we are going to identify the raycast based on this name
			textbox.children[0].name = "choice_" + i;

			this._choicesBox.push(textbox);
			this._page._addToScene(this._choicesBox[i]);
		};
		//if location type, show
		if (this._params.type == "location") {
			//show UI images to click on
			var loc1 = this._page.createImage("/static/gnovel/res/textures/house_sprite.png", new THREE.Vector3(100, -100, 200), 100, 100);
			var loc2 = this._page.createImage("/static/gnovel/res/textures/open-book.jpeg", new THREE.Vector3(-100, -100, 200), 100, 100);
			this._uiElements.push(loc1);
			this._uiElements.push(loc2);
			this._page._addToScene(loc1);
			this._page._addToScene(loc2);
		}
	};

	/**
	 * This function will only be called by this class when params.seconds > 0
	 */
	Choices.prototype._countdown = function() {
		var choices = this;
		var tween = new TWEEN.Tween(this.timer.position).to({
			x: 390,
			y: -350,
			z: -100
		}, this._params.seconds * 1000).onComplete(function() {
			if (choices._choosed) {
				// do nothing, because we already call _Page3 on mouse down
			} else {
				// auto select the first option
				choices._result.choiceId = 0;
				choices._onChoiceComplete(choices._result.choiceId);
			}
		});
		tween.start();
	};

	Choices.prototype._onChoiceComplete = function() {
		//remove mousedown listener
		this._page.getOwner().removeMouseDownListener(this._mouseDownListener);

		// clean up all objects from scene
		if (this._params.seconds != null && params.seconds > 0) {
			this._page._removeFromScene(timer.timer);
		}

		for (var i = 0; i < this._choices.length; i++) {
			this._page._removeFromScene(this._choicesBox[i]);
		}

		if (this._params.onChoiceComplete != null) {
			this._params.onChoiceComplete(this._result.choiceId);
		}
	};

	Choices.prototype._onMouseDown = function(event) {

		event.preventDefault();

		this._mouse.x = (event.clientX / this._page._owner._renderer.domElement.clientWidth) * 2 - 1;
		this._mouse.y = -(event.clientY / this._page._owner._renderer.domElement.clientHeight) * 2 + 1;

		//update picking ray with camera and mouse pos
		this._page._owner._raycaster.setFromCamera(this._mouse, this._page._owner.getCamera());

		//create array of objects intersected with
		var intersects = this._page._owner._raycaster.intersectObjects(this._choicesBox, true);
		if (intersects.length > 0 && !this._choosed) {
			var clickedObj = intersects[0].object;
			clickedObj.material.color.setHex(0.5 * 0xffffff | 0x80000000);

			this._choosed = true;
			this._page._removeFromScene(this.timer);
			for (var i = 0; i < this._choices.length; i++) {

				if (this._choicesBox[i].children[0].name == intersects[0].object.name) {
					//console.log("clicked on " + i);
					this._result.choiceId = i;
				}
			}

			this._onChoiceComplete();
		}
	};

	Choices.prototype._onMouseMove = function(event){

		event.preventDefault();

		this._mouse.x = (event.clientX / this._page._owner._renderer.domElement.clientWidth) * 2 - 1;
		this._mouse.y = -(event.clientY / this._page._owner._renderer.domElement.clientHeight) * 2 + 1;

		//update picking ray with camera and mouse pos
		this._page._owner._raycaster.setFromCamera(this._mouse, this._page._owner.getCamera());

		var intersects = this._page._owner._raycaster.intersectObjects(this._choicesBox, true);
		if (intersects.length > 0) {
			if(this._hoveredChoice != intersects[0].object){

				this._hoveredChoice = intersects[0].object;
				//do hover effect on intersected object
				this._hoveredChoice.currentHex = this._hoveredChoice.material.color.getHex();
				this._hoveredChoice.material.color.setHex(0xff0000);

				for (var i = 0; i < this._choices.length; i++) {

					if (this._choicesBox[i].children[0].name == intersects[0].object.name) {
						console.log("clicked on " + i);
					}
				}
			}

			//on hover change mouse cursor to pointer
			this._page._owner.getContainer().style.cursor = 'pointer';
		}
		else{
			//reset hover effect, and set back to normal
			if(this._hoveredChoice)
			{
				this._hoveredChoice.material.color.setHex(this._hoveredChoice.currentHex);
					this._page._owner.getContainer().style.cursor = 'auto';
			}
			this._hoveredChoice = null;
		}
		//console.log("interactable object is hovered");
	};

	GNOVEL.Choices = Choices;
}());
