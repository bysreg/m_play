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
		var integrityManager = this._integrityManager;
		var relationshipManager = this._relationshipManager;
		var pageObj = page;
		params._waitForTransition = true;
		//FIXME
		//Need to speicify position of dialog box
		params.dialogX = params.x;
		params.dialogY = params.y;
		var choicesTextBg = [];
		this._choicesTextBg = choicesTextBg;

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
		var choices = this;
		var delayDuration = 1000;
		var flowElement = this._params.flowElement;
		var choices = this._choices;
		var choicesBox = this._choicesBox;
		var resultId = this._result.choiceId;
		var choicesTextBg = this._choicesTextBg;
		var jumpArr = this._params.jumpArr;

		var moveSelectedChoiceToCenter = function() {

			//remove player's choice after it has shown on screen for specified time
			pageObj.move(choicesBox[resultId], {
				x: 0,
				duration: 400,
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
				duration: 400,
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
					duration: 800,
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					onComplete: function() {
						//console.log("remove");
						pageObj._removeFromScene(choiceTextBg);
						count++;
						if (count == choicesTextBg.length - 1) {
							// if all unselected choices are already faded out, then start to move the selected choice to the center
							moveSelectedChoiceToCenter();
						}
					}
				});

				pageObj.tweenMat(choicesBox[i], {
					duration: 800,
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					onComplete: function() {
						pageObj._removeFromScene(choicesBox[i]);
					}
				});
			}
		}

		//call onChoiceComplete from parent class
		if (this._params.onChoiceComplete != null) {
			this._params.onChoiceComplete(this._result.choiceId);
		}
	};

	MPLAY.MPlayChoices = MPlayChoices;
}());