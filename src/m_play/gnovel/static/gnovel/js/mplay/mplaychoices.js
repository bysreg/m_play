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
		params.gapX = 340;
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

		//display BG filter for integrity choices
		//@FIXME show stronger BG blur for integrity chocies
		if (flowElement != null) {
			if (typeof flowElement.choices[0].integrityScore !== 'undefined' &&
				flowElement.choices[0].integrityScore != null) {

				}
		}

		for(var i = 0;i<choicesArr.length; i++)
		{
			var choiceText = choicesArr[i];
			params.posArr[i] = new THREE.Vector3();
			params.posArr[i].x = params.x;

			var textBg = null;
			/**
			**FIXME for displaying message text with choice box in same tween
			var textbox = null;
			textbox = this._page.createTextBox(this._choices[i], {charLine: this._params.charLine, center: this._params.center});

			var x = startx;
			var y = starty;
			if(this._params.posArr!==null) {
				x = params.posArr[i].x;
				y = params.posArr[i].y;
			}
*/
			// if(choiceText.length < 30) {
			// 	params.posArr[i].y = oneLineY;

			// 	textBg = this.createImage("/static/gnovel/res/textures/ui/text1line_wOutline.png", new THREE.Vector3(params.x + params.gapX * i, params.posArr[i].y - 20, this._uiLayer - 40), 320.7, 44.53125);
			// }else if(choiceText.length>=30 && choiceText.length<60){
			params.posArr[i].y = twoLineY;

			textBg = page.createImage("/static/gnovel/res/textures/ui/Selection Box.png", new THREE.Vector3(params.x + (params.gapX * i) - 10, params.posArr[i].y - 30, uiLayer - 40), 324, 167.2);
			// }else if(choiceText.length>=60) {
			// params.posArr[i].y = threeLineY;

			// textBg = this.createImage("/static/gnovel/res/textures/ui/textmultiline_wOutline.png", new THREE.Vector3(params.x + params.gapX * i - 5, params.posArr[i].y - 50, this._uiLayer - 40), 320.7, 160);
			// }

			textBg.material.opacity = 0;
			textBg.name = "choice_bg_" + i;
			//set scale to 0
			textBg.scale.set(0, 0, 1);
/**
**FIXME
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
*/
			//show choice animation

			//pop in and scale choice box
			page.tweenPulse(textBg,{
				repeat: false,
				x:1,y:1,z:1,
				duration:500,
				easing: TWEEN.Easing.Back.Out
				/**
				**FIXME
				onComplete: function(){
					if(textBg.scale.x > .5){
						page.tweenPulse(textbox,{
							repeat: false,
							x:1,y:1,z:1,
							duration:500,
							easing: TWEEN.Easing.Back.Out
						});

						//fade in box for text
					this._page.tweenMat(textbox, {
						duration: 500,
						opacity: 1,
						easing: TWEEN.Easing.Cubic.Out
					});
					}
				}*/
			});

				//fade in choice box
			page.tweenMat(textBg, {
				duration: 500,
				opacity: 1,
				easing: TWEEN.Easing.Cubic.Out
			});




			page._addToScene(textBg);
			choicesTextBg.push(textBg);

			/**
			*FIXME
			this._choicesBox.push(textbox);
			this._page._addToScene(this._choicesArr[i]);
			*/
		}

		GNOVEL.Choices.call(this, page, choicesArr, timedResponses, result, params);

		// tween from bottom of the screen to up
		for(var i=0;i<this._choicesTextBg.length;i++) {
			var textBg = this._choicesTextBg[i];
			var text = this._choicesBox[i];

			textBg.position.y -= 200;
			text.position.y -= 200;

			page.move(textBg, {
				y: textBg.position.y + 200,
				easing: TWEEN.Easing.Back.Out,
				duration: 1000});
			page.move(text, {
				y:text.position.y + 200,
				easing: TWEEN.Easing.Back.Out,
				duration: 1000});
		}
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
				var compassBack = pageObj.createImage("/static/gnovel/res/textures/ui/compass background.png", new THREE.Vector3(-400, -250, pageObj._uiLayer - 40), 150, 150);
				var compassFront = pageObj.createImage("/static/gnovel/res/textures/ui/compass main.png", new THREE.Vector3(-400, -250, pageObj._uiLayer - 40), 150, 150);
				var notifyBg = pageObj.createImage("/static/gnovel/res/textures/ui/Selection Box.png", new THREE.Vector3(0, 0, pageObj._uiLayer - 40), 324, 127.2);
				compassBack.material.opacity = 0;
				compassFront.material.opacity = 0;

				pageObj._addToScene(compassBack);
				pageObj._addToScene(compassFront);
				var delayFX = 500;

				//full COMPASS ANIMATION
				//fade compass in
				pageObj.tweenMat(compassFront, {
					easing: TWEEN.Easing.Cubic.Out,
					duration:1000,
					opacity: 1,
				});
				pageObj.tweenMat(compassBack, {
					easing: TWEEN.Easing.Cubic.Out,
					duration:1000,
					opacity: 1,
					onComplete: function() {

					//ANIMATE spin compass
							var duration = 200;
							var rotDest = .3;
							var rotTween = new TWEEN.Tween(compassFront.rotation)
								.to({
									z: 90*Math.PI/180, //rotates 90 degrees
								}, duration)
								.easing(TWEEN.Easing.Linear.None)
								.repeat(10)
								.onComplete(function() {

									//fade compass out
									pageObj.tweenMat(compassFront, {
										easing: TWEEN.Easing.Cubic.Out,
										duration: 800,
										opacity: 0,
										opacity2: 0,
										delay: delayFX,
									});
									pageObj.tweenMat(compassBack, {
										easing: TWEEN.Easing.Cubic.Out,
										duration: 800,
										opacity: 0,
										opacity2: 0,
										delay: delayFX,
										onComplete: function() {
											pageObj._removeFromScene(compassBack);
											pageObj._removeFromScene(compassFront);
										},
									});
									//delay and increase size while fading out
									pageObj.tweenPulse(compassBack, {
										x:5, y:5,
										duration: 1000,
										delay: delayFX,
										repeat: false,
									});

									pageObj.tweenPulse(compassFront, {
										x:5, y:5,
										duration: 1000,
										delay: delayFX,
										repeat: false,
									});

								});

							rotTween.start();
				},
			});
			}

			if (typeof flowElement.choices[resultId].relationship !== 'undefined' &&
				flowElement.choices[resultId].relationship != null) {

				var relationshipArr = flowElement.choices[resultId].relationship;
				for(var i=0;i<relationshipArr.length;i++)
				{
					var name = relationshipArr[i].name;
					var score = relationshipArr[i].score;
					relationshipManager.addRelationship(name, score);

					//display visual notification of relationship choice
					console.log("a character will remember this");
					//set what text should display based upon relationship score

					//FIXME - STILL NEEDS MORE TESTING
					if(relationshipArr[i].text != null){
						var charText = relationshipArr[i].text;
					}
					//if there is no text specified to show, then show default
					else{
						if(score > 0)
							var charText = name + " feels good about that";
						else if (score < 0)
							var charText = name + " feels negatively about that";
					}
					var relationText = pageObj.createTextBox(charText,{
						align: 'left',
						charLine: pageObj._charLine,
						font: "25px Noteworthy",
						fillstyle: '#ffffff',
					});
					relationText.position.set(-500, 260-(i*40), pageObj._uiLayer - 40);
					relationText.material.opacity = 0;
					pageObj._addToScene(relationText);

					pageObj.tweenMat(relationText, {
						easing: TWEEN.Easing.Cubic.Out,
						duration: 800,
						opacity: 1,
						opacity2: 0,
						chain: true,
						delay: 1000,
						onComplete: function() {
							pageObj._removeFromScene(relationText);
						},
					});
				}

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

							//pop out and scale down choice box
							pageObj.tweenPulse(choicesBox[resultId],{
								repeat: false,
								x:0,y:0,z:1,
								duration:500,
								easing: TWEEN.Easing.Back.Out
							});

								//fade out choice box
							pageObj.tweenMat(choicesBox[resultId], {
								duration: 500,
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

							//pop out and scale down choice box
							pageObj.tweenPulse(choicesTextBg[resultId],{
								repeat: false,
								x:0,y:0,z:1,
								duration:500,
								easing: TWEEN.Easing.Back.Out
							});
							pageObj.tweenMat(choicesTextBg[resultId], {
								duration: 500,
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

		this._mouse.x = event.clientX;
		this._mouse.y = event.clientY;
		this._page._owner.calcMousePositionRelativeToCanvas(this._mouse);

		//update picking ray with camera and mouse pos
		this._page._owner._raycaster.setFromCamera(this._mouse, this._page._owner.getCamera());

		//create array of objects intersected with
		var intersects = this._page._owner._raycaster.intersectObjects(this._choicesTextBg, true);
		if (intersects.length > 0 && !this._choosed) {
			var clickedObj = intersects[0].object;
			// clickedObj.material.color.setHex(0.5 * 0xffffff | 0x80000000);

			this._choosed = true;
			//this._page._removeFromScene(this.timer);
			//this._page._removeFromScene(this.timer2);
			//this._page._timerInstance.stop();
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

		this._mouse.x = event.clientX;
		this._mouse.y = event.clientY;
		this._page._owner.calcMousePositionRelativeToCanvas(this._mouse);

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
