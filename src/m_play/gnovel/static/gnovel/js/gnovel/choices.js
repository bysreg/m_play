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
		this._mouse = new THREE.Vector2();
		this._hoveredChoice = null;

		this._choicesBox = [];		
		this._choosed = false;

		this._init();
		
		if (this._params.hasOwnProperty('seconds') && this._params.seconds > 0) {
			this._countdown();
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
			color: 0xff5d87,
			opacity: 1.0,
			transparent: true
		});

		if (this._params.seconds > 0) {
			var timer_plane = new THREE.PlaneBufferGeometry(800, 15);
			var timer = new THREE.Mesh(timer_plane, timer_material);
			this.timer = timer;
			timer.position.x = 0;
			timer.position.y = -280;
			timer.position.z = 260;
			this._page._addToScene(timer);
		}

		var textbox = null;	
		var hasParam = GNOVEL.Util.hasParam;			
		var startx = hasParam(this._params, 'x', 0);
		var starty = hasParam(this._params, 'y', -190);
		var startz = hasParam(this._params, 'z', this._page.getChoicesLayer() + 10);
		var gapY = hasParam(this._params, 'gapY', -40);
		var gapX = hasParam(this._params, 'gapX', 0);
		var posArr = hasParam(this._params, 'pos', null);
		var charLine = this._params.charLine;

		for (var i = 0; i < this._choices.length; i++) {
			textbox = this._page.createTextBox(this._choices[i], {charLine: this._params.charLine});			

			var x = startx;
			var y = starty;			
			if(this._params.posArr!==null) {
				x = this._params.posArr[i].x;
				y = this._params.posArr[i].y;				
			}

			textbox.position.set(x + (i * gapX), y + (i * gapY) + 20, startz);
			textbox.name = "choices";

			// hack : because we are using Text2D, we are going to identify the raycast based on this name
			textbox.children[0].name = "choice_" + i;

			textbox.material.opacity = 0;			
			this._page.tweenMat(textbox, {
				duration: 800,
				opacity: 1,
				easing: TWEEN.Easing.Cubic.Out
			});

			this._choicesBox.push(textbox);
			this._page._addToScene(this._choicesBox[i]);
		};

		//if location type, show
		if (this._params.type == "location") {
			//show UI images to click on
			var loc1 = this._page.createImage("/static/gnovel/res/textures/house_sprite.png", new THREE.Vector3(100, -100, 200), 100, 100);
			var loc2 = this._page.createImage("/static/gnovel/res/textures/open-book.jpeg", new THREE.Vector3(-100, -100, 200), 100, 100);			
			this._page._addToScene(loc1);
			this._page._addToScene(loc2);
		}
	};

	/**
	 * This function will only be called by this class when params.seconds > 0
	 */
	Choices.prototype._countdown = function() {

		var pageObj = this._page;
		var choices = this;
		var duration = this._params.seconds * 1000 || 1000;

		var tween = new TWEEN.Tween(this.timer.scale)
			.to({
				x: 0,
				y: 1,
				z: 1,
			}, duration)
			.easing(TWEEN.Easing.Linear.None).onComplete(function() {
			if (choices._choosed) {
				// do nothing
			} else {
				// auto select the first option
				choices._result.choiceId = 0;
				choices._onChoiceComplete(choices._result.choiceId);
			}
		});
		tween.onStart(function() {
			pageObj._timerInstance = pageObj.getOwner().getSoundManager().play("Timer", {interrupt: pageObj.getOwner().getSoundManager().INTERRUPT_ANY, loop: 20});
		});
		tween.start();
	};

	Choices.prototype._onChoiceComplete = function() {

		//remove mousedown listener
		this._page.getOwner().removeMouseDownListener(this._mouseDownListener);
		this._page.getOwner().removeMouseMoveListener(this._mouseMoveListener);

		// clean up all objects from scene
		if (this._params.seconds != null && this._params.seconds > 0) {
			this._page._removeFromScene(this.timer);
			this._page._timerInstance.stop();
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
