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
	var Choices = function(page, choices, timedResponses, result, params) {
		this._choices = choices;
		this._page = page;
		this._result = result;
		this._params = params || {};
		this._mouseDownListener = null;
		this._mouseMoveListener = null;
		this._mouse = new THREE.Vector2();
		this._tweenHover;
		this._hoveredChoice = null;
		this._timedResponses = timedResponses;
		this._choicesBox = [];
		this._responseBox =[];
		this._choosed = false;

		this._init();

		// FIXME : force seconds to zero
		this._params.seconds = 0;

		if (this._params.hasOwnProperty('seconds') && this._params.seconds > 0) {
			this._timerCountdown(this._params.flowElement.speaker);
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
		var timer_material = new THREE.MeshBasicMaterial({
			color: 0xff5d87,
			opacity: 0,
			transparent: true
		});
		var timer2_material = new THREE.MeshBasicMaterial({
			color: 0xff5d87,
			opacity: 0,
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

			var timer2 = new THREE.Mesh(timer_plane, timer2_material);
			this.timer2 = timer2;
			timer2.position.x = 0;
			timer2.position.y = 0;
			timer2.position.z = 260;
			this._page._addToScene(timer2);
		}

		var textbox = null;
		var hasParam = GNOVEL.Util.hasParam;
		var startx = hasParam(this._params, 'x', 0);
		var starty = hasParam(this._params, 'y', -190);
		var startz = hasParam(this._params, 'z', this._page.getChoicesLayer() + 10);
		var gapY = hasParam(this._params, 'gapY', -40);
		var gapX = hasParam(this._params, 'gapX', 0);
		var posArr = hasParam(this._params, 'posArr', null);
		var charLine = this._params.charLine;

		//display BG filter screen

		for (var i = 0; i < this._choices.length; i++) {
			textbox = this._page.createTextBox(this._choices[i], {charLine: this._params.charLine});

			var x = startx;
			var y = starty;
			if(this._params.posArr!==null) {
				x = this._params.posArr[i].x;
				y = this._params.posArr[i].y;
			}

			if (textbox.canvas.textHeight > 23) {
				if (textbox.canvas.textHeight > 46) {
					textbox.position.set(x + (i * gapX), y + (i * gapY) + 20, startz);
				}else {
					textbox.position.set(x + (i * gapX), y + (i * gapY) + 5, startz);
				}
			}else {
				textbox.position.set(x + (i * gapX), y + (i * gapY), startz);
			}

			textbox.name = "choices";

			// hack : because we are using Text2D, we are going to identify the raycast based on this name
			textbox.children[0].name = "choice_" + i;

			textbox.material.opacity = 0;
			textbox.scale.set(0,0,1);
			//show and animation text inside choice box
			//pop in and scale choice box
			this._page.tweenPulse(textbox,{
				repeat: false,
				x:1,y:1,z:1,
				duration:500,
				easing: TWEEN.Easing.Back.Out
			});

				//fade in choice box
			this._page.tweenMat(textbox, {
				duration: 500,
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
	 *
	 *Each short timer will run after the other.  At the end of a timer,
	 *the character will say a new dialogue until time is over from the main timer.
	 */
	Choices.prototype._timerCountdown = function(speaker) {

		var pageObj = this._page;
		var choices = this;
		//position of dialog based upon speaker
		var dialogX = this._params.dialogX;
		var dialogY = this._params.dialogY;
		var duration = this._params.seconds * 1000 || 1000;
		var timer = this.timer;
		var timer2 = this.timer2;
		var count = 0;

		var mainTimer = new TWEEN.Tween(timer.scale)
			.to({
				x: 0,
				y: 1,
				z: 1,
			}, 10000)
			.easing(TWEEN.Easing.Linear.None).onComplete(function() {
			if (choices._choosed) {
				// do nothing
				//choices._onChoiceComplete(choices._result.choiceId);
				shortTimer.stop();
			} else {
				// auto select the first option
				choices._result.choiceId = 0;
				choices._onChoiceComplete(choices._result.choiceId);
				shortTimer.stop();
			}
		})
		.onUpdate(function() {
			//if timer is halfway done, show the short timer
			if(timer.scale.x < .3){
					timer.material.opacity = 1;
				}
		});

		/**
		*Non-visual timer where characters say something
		*/
		var shortTimer = new TWEEN.Tween(timer2.scale)
			.to({
				x: 0,
				y: 1,
				z: 1,
			}, 3000)
			.easing(TWEEN.Easing.Linear.None)
			.onUpdate(function() {
				//timer2.material.opacity = 0;
				//if timer almost over, remove previous text box
				if(timer2.scale.x < .3){
					if(count>0){
						// pageObj.tweenMat(choices._responseBox[count-1]._messageText,{
						// 	opacity: 0,
						// 	easing: TWEEN.Easing.Cubic.Out,
						// 	duration: 200,
						// });
						// pageObj.tweenMat(choices._responseBox[count-1]._textBg,{
						// 	opacity: 0,
						// 	easing: TWEEN.Easing.Cubic.Out,
						// 	duration: 200,
						// });
						//
						choices._responseBox[count-1]._messageText.material.opacity = 0;
						choices._responseBox[count-1]._textBg.material.opacity = 0;
					}
				}
			})
			.onComplete(function() {
			if (choices._choosed) {
				// do nothing
			} else {
				//move to next text in responses array
				if(count <= choices._timedResponses.length-1){
					//
					choices._responseBox.push(pageObj._showTempDialog(choices._timedResponses[count],dialogX,dialogY, choices._params));

					//after the first response displays, then make invisible & move to next response
					if (count > 0){
						choices._responseBox[count-1]._messageText.material.opacity = 0;
						choices._responseBox[count-1]._textBg.material.opacity = 0;
						pageObj._removeFromScene(choices._responseBox[count-1]);
					}
					count++;
					//pageObj._addToScene(timer2);
					timer2.scale.x = 1;
					//timer2.material.opacity = 0;
					//do timer again
					shortTimer.start();
				}
			}
		});

		mainTimer.onStart(function() {
			pageObj._timerInstance = pageObj.getOwner().getSoundManager().play("Timer", {interrupt: pageObj.getOwner().getSoundManager().INTERRUPT_ANY, loop: 20});
		});
		mainTimer.start();
		shortTimer.start();
	};

	Choices.prototype._cleanUp = function() {
		//remove mousedown listener
		this._page.getOwner().removeMouseDownListener(this._mouseDownListener);
		this._page.getOwner().removeMouseMoveListener(this._mouseMoveListener);

		// clean up all objects from scene
		if (this._params.seconds != null && this._params.seconds > 0) {
			this._page._removeFromScene(this.timer);
			this._page._removeFromScene(this.timer2);
			this._page._timerInstance.stop();
		}


		for (var i = 0; i < this._timedResponses.length; i++) {
			if(this._responseBox[i]!=null){
				this._page._removeFromScene(this._responseBox[i]);
				this._responseBox[i]._onComplete();
			}
		}
	};

	Choices.prototype._onChoiceComplete = function() {

		this._cleanUp();

		var pageObj = this._page;
		var choices = this;
		var delayDuration = 1000;

		for (var i = 0; i < this._choices.length; i++) {
			this._page._removeFromScene(this._choicesBox[i]);
		}

		//call onChoiceComplete from parent class
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
			this._page._removeFromScene(this.timer2);
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
		//var intersects2 = this._page._owner._raycaster.intersectObjects(this._page.choicesTextBg, true);
		if (intersects.length > 0) {
			if(this._hoveredChoice != intersects[0].object){
				this._hoveredChoice = intersects[0].object;
				//do hover effect on intersected object
				this._hoveredChoice.currentHex = this._hoveredChoice.material.color.getHex();
				this._hoveredChoice.material.color.setHex(0xff0000);
				this._tweenHover = this._page.tweenPulse(this._hoveredChoice,{x:1.2, y:1.2, z:1, duration: 400, repeat:true });
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
					this._tweenHover.stop();
					//TWEEN.Tween.removeTweens(this._hoveredChoice);
					this._page.tweenPulse(this._hoveredChoice,{x:1, y:1, z:1, duration: 300, repeat:false})
			}
			this._hoveredChoice = null;
		}
		//console.log("interactable object is hovered");
	};

	GNOVEL.Choices = Choices;
}());
