// namespace
var MPLAY = MPLAY || {};

(function() {
	"use strict";

	/**
	 *@param{page = ; type = the type of choice-dialogue, action, location; }
	 *choices = array of choices possible
	 *result = what should happen after choice selected
	 */
	/**
	 * @class  MPlayChoices
	 * @augments GNOVEL.Choices
	 * @constructor
	 */
	var MPlayChoices = function(page, choicesArr, timedResponses, result, params) {
		params = params || {};
		var flowElement = params.flowElement;
		this._integrityManager = page._integrityManager;
		this._relationshipManager = page._relationshipManager;
		var pageObj = page;
		params._waitForTransition = true;
		//FIXME
		//Need to speicify position of dialog box
		params.dialogX = params.x;
		params.dialogY = params.y;
		var choicesTextBg = [];
		this._choicesTextBg = choicesTextBg;

		this._hoveredChoice = null;

		var uiLayer = page._uiLayer;

		params.x = -350;
		params.y = -100;
		params.gapX = 350;
		params.gapY = 0;
		params.charLine = 30;
		params.posArr = {};
		// params.dontGoToNextFlowAuto = true;

		var oneLineY = -220;
		var twoLineY = -200;
		var threeLineY = -180;

		if (choicesArr.length == 2) {
			params.x = -180;
			params.gapX = 400;
		}

		for (var i = 0; i < choicesArr.length; i++) {
			var choiceText = choicesArr[i];
			params.posArr[i] = new THREE.Vector3();
			params.posArr[i].x = params.x;

			var textBg = null;

			// if(choiceText.length < 30) {
			// 	params.posArr[i].y = oneLineY;

			// 	textBg = this.createImage("/static/gnovel/res/textures/ui/text1line_wOutline.png", new THREE.Vector3(params.x + params.gapX * i, params.posArr[i].y - 20, this._uiLayer - 40), 320.7, 44.53125);
			// }else if(choiceText.length>=30 && choiceText.length<60){
			params.posArr[i].y = twoLineY;

			textBg = page.createImage("/static/gnovel/res/textures/ui/Selection Box.png", new THREE.Vector3(params.x + (params.gapX * i) - 10, params.posArr[i].y - 30, uiLayer - 40), 324, 127.2);
			// }else if(choiceText.length>=60) {
			// params.posArr[i].y = threeLineY;

			// textBg = this.createImage("/static/gnovel/res/textures/ui/textmultiline_wOutline.png", new THREE.Vector3(params.x + params.gapX * i - 5, params.posArr[i].y - 50, this._uiLayer - 40), 320.7, 160);
			// }

			textBg.material.opacity = 0;
			textBg.name = "choice_bg_" + i;

			page.tweenMat(textBg, {
				duration: 800,
				opacity: 1,
				easing: TWEEN.Easing.Cubic.Out
			});

			page._addToScene(textBg);
			choicesTextBg.push(textBg);
		}

		GNOVEL.Choices.call(this, page, choicesArr, timedResponses, result, params);
	};

	MPlayChoices.prototype = Object.create(GNOVEL.Choices.prototype);
	MPlayChoices.prototype.constructor = MPlayChoices;


	/**
	 * @override
	 */
	MPlayChoices.prototype._onChoiceComplete = function() {

		this._cleanUp();

		var pageObj = this._page;
		var delayDuration = 700;
		var flowElement = this._params.flowElement;
		var choices = this._choices;
		var choicesBox = this._choicesBox;
		var choicesTextBg = this._choicesTextBg;
		var jumpArr = this._params.jumpArr;
		var self = this;
		var integrityManager = this._integrityManager;
		var relationshipManager = this._relationshipManager;
		var resultId = this._result.choiceId;

		// if flowElement is not defined and not null (not falsy)
		if (flowElement != null) {
			if (typeof flowElement.choices[resultId].integrityScore !== 'undefined' &&
				flowElement.choices[resultId].integrityScore != null) {

				integrityManager.addIntegrity(flowElement.choices[resultId].integrityScore);

				//display visual notification of integrity choice
				console.log("They will remember this");
				var compass = pageObj.createImage("/static/gnovel/res/textures/compass_sm.png", new THREE.Vector3(-500, 250, pageObj._uiLayer - 40), 100, 100);
				var notifyBg = pageObj.createImage("/static/gnovel/res/textures/ui/Selection Box.png", new THREE.Vector3(0, 0, pageObj._uiLayer - 40), 324, 127.2);
				pageObj._addToScene(compass);

				pageObj.tweenMat(compass, {
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800,
					opacity: 1,
					opacity2: 0,
					chain: true,
					delay: 500,
					onComplete: function() {
						pageObj._removeFromScene(compass);
					},
				});
			}

			if (typeof flowElement.choices[resultId].relationship !== 'undefined' &&
				flowElement.choices[resultId].relationship != null) {

				var name = flowElement.choices[resultId].relationship.name;
				var score = flowElement.choices[resultId].relationship.score;
				relationshipManager.addRelationship(name, score);

				//display visual notification of relationship choice
				console.log("a character will remember this");
				//set what text should display based upon relationship score

				//FIXME - STILL NEEDS TESTING

				if(score > 0)
					var charText = name + " feels good about that."
				else if (score < 0)
					var charText = name + " feels negatively about that."

				var relationText = pageObj.createTextBox(charText,{
					align: 'left',
					charLine: pageObj._charLine,
					font: "25px SF_Toontime Bold Italic",
					fillstyle: '#ffffff',
				});
				relationText.position.set(-530, 260, pageObj._uiLayer - 40);
				relationText.material.opacity = 0;
				pageObj._addToScene(relationText);

				pageObj.tweenMat(relationText, {
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800,
					opacity: 1,
					opacity2: 0,
					chain: true,
					delay: 400,
					onComplete: function() {
						pageObj._removeFromScene(relationText);
					},
				});

				//display compass in upper left
				var notifyBg = pageObj.createImage("/static/gnovel/res/textures/ui/Selection Box.png", new THREE.Vector3(-400, 200, pageObj._uiLayer - 40), 200, 100);

			}

			var choiceValue = flowElement.choices[resultId].text;
			pageObj.log("choice", pageObj._choiceNumber, choiceValue);
			pageObj._choiceNumber++;
		}

		var moveSelectedChoiceToCenter = function() {
			//var resultId = self._result.choiceId;

			//remove player's choice after it has shown on screen for specified time
			pageObj.move(choicesBox[resultId], {
				x: 0,
				duration: 800,
				easing: TWEEN.Easing.Cubic.Out,
				onComplete: function() { //move player choice to center of screen
					var time = 1;
					var delayTween = new TWEEN.Tween(time) //delay before removing choice from screen
						.to(0, delayDuration)
						.easing(TWEEN.Easing.Linear.None)
						.onComplete(function() {
							//pageObj._removeFromScene(choicesBox[resultId]);

							pageObj.tweenMat(choicesBox[resultId], {
								duration: 800,
								opacity: 0,
								easing: TWEEN.Easing.Cubic.Out,
								onComplete: function() {
									pageObj._removeFromScene(choicesBox[resultId]);
								}
							});
						})
					delayTween.start();
				}
			});

			//move players choice text box to center
			pageObj.move(choicesTextBg[resultId], {
				x: 0,
				duration: 800,
				easing: TWEEN.Easing.Cubic.Out,
				onComplete: function() { //move player choice to center of screen
					var time = 1;
					var delayTween = new TWEEN.Tween(time) //delay before removing choice from screen
						.to(0, delayDuration)
						.easing(TWEEN.Easing.Cubic.Out)
						.onComplete(function() {
							//pageObj._removeFromScene(choicesTextBg[resultId]);

							pageObj.tweenMat(choicesTextBg[resultId], {
								duration: 800,
								opacity: 0,
								easing: TWEEN.Easing.Cubic.Out,
								onComplete: function() {
									//console.log("remove");
									pageObj._removeFromScene(choicesTextBg[resultId]);

									//call onChoiceComplete from the parameter given to the class
									if (self._params.onChoiceComplete != null) {
										self._params.onChoiceComplete(self._result.choiceId);
									}

									// we should execute the next flow
									var jumpIndex = jumpArr[resultId];
									if (typeof jumpIndex === 'undefined') {
										// go to next flow
										pageObj._flow._next();
									} else {
										pageObj._flow._jump(jumpIndex);
									}
									pageObj._flow._exec();
									///////////////
								}
							});

						})
					delayTween.start();
				}
			});
		};

		var count = 0;
		for (var i = 0; i < this._choices.length; i++) {

			//do not remove player's choice yet!
			if (i != this._result.choiceId) {
				var choiceTextBg = choicesTextBg[i];

				pageObj.tweenMat(choiceTextBg, {
					duration: 400,
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					onComplete: function() {
						//console.log("remove");
						pageObj._removeFromScene(choiceTextBg);
						count++;
						if (count == choicesTextBg.length - 1) {
							// if all unselected choices are already faded out, then start to move the selected choice to the center
							//moveSelectedChoiceToCenter();
						}
					}
				});

				pageObj.tweenMat(choicesBox[i], {
					duration: 400,
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					onComplete: function() {
						pageObj._removeFromScene(choicesBox[i]);
					}
				});
			}
			//move selected choice to center at same time as other choices are fading
			else if (i == this._result.choiceId) {
				moveSelectedChoiceToCenter();
			}
		}
	};

	/**
	 * @override
	 */
	MPlayChoices.prototype._onMouseDown = function(event) {
		event.preventDefault();

		this._mouse.x = (event.clientX / this._page._owner._renderer.domElement.clientWidth) * 2 - 1;
		this._mouse.y = -(event.clientY / this._page._owner._renderer.domElement.clientHeight) * 2 + 1;

		//update picking ray with camera and mouse pos
		this._page._owner._raycaster.setFromCamera(this._mouse, this._page._owner.getCamera());

		//create array of objects intersected with
		var intersects = this._page._owner._raycaster.intersectObjects(this._choicesTextBg, true);
		if (intersects.length > 0 && !this._choosed) {
			var clickedObj = intersects[0].object;
			// clickedObj.material.color.setHex(0.5 * 0xffffff | 0x80000000);

			this._choosed = true;
			this._page._removeFromScene(this.timer);
			this._page._removeFromScene(this.timer2);
			for (var i = 0; i < this._choices.length; i++) {

				if (this._choicesTextBg[i].name == intersects[0].object.name) {
					//console.log("clicked on " + i);
					this._result.choiceId = i;
				}
			}

			this._onChoiceComplete();
		}
	};

	/**
	 * @override
	 */
	MPlayChoices.prototype._onMouseMove = function(event) {
		event.preventDefault();

		this._mouse.x = (event.clientX / this._page._owner._renderer.domElement.clientWidth) * 2 - 1;
		this._mouse.y = -(event.clientY / this._page._owner._renderer.domElement.clientHeight) * 2 + 1;

		//update picking ray with camera and mouse pos
		this._page._owner._raycaster.setFromCamera(this._mouse, this._page._owner.getCamera());

		var intersects = this._page._owner._raycaster.intersectObjects(this._choicesTextBg, true);
		if (intersects.length > 0) {
			if (this._hoveredChoice != intersects[0].object) {
				this._hoveredChoice = intersects[0].object;
				//do hover effect on intersected object
				this._hoveredChoice.currentHex = this._hoveredChoice.material.color.getHex();
				// this._hoveredChoice.material.color.setHex(0xff0000);
				this._tweenHover = this._page.tweenPulse(this._hoveredChoice, {
					x: 1.05,
					y: 1.05,
					z: 1,
					duration: 400,
					repeat: false
				});
			}

			//on hover change mouse cursor to pointer
			this._page._owner.getContainer().style.cursor = 'pointer';
		} else {
			//reset hover effect, and set back to normal
			if (this._hoveredChoice) {
				// this._hoveredChoice.material.color.setHex(this._hoveredChoice.currentHex);
				this._page._owner.getContainer().style.cursor = 'auto';
				this._tweenHover.stop();
				//TWEEN.Tween.removeTweens(this._hoveredChoice);
				this._page.tweenPulse(this._hoveredChoice, {
					x: 1,
					y: 1,
					z: 1,
					duration: 300,
					repeat: false
				})
			}
			this._hoveredChoice = null;
		}
		//console.log("interactable object is hovered");
	};

	MPLAY.MPlayChoices = MPlayChoices;
}());
