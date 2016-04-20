//namespace
var GNOVEL = GNOVEL || {};

(function() {
	"use strict";

	/**
	 * @class  Dialog
	 * @constructor
	 */
	var Dialog = function(page, message, x, y, params) {
		var hasParam = GNOVEL.Util.hasParam;

		this._page = page;
		this._params = params || {};
		this._x = x;
		this._y = y;
		this._type = params.type;
		this._hasTransition = true;
		this._mouseDownListener = null;
		this._tweenComplete = false;
		this._showSpeaker = hasParam(params.showSpeaker, true);
		this._charLine = params.charLine || 72;
		this._font = params.font;
		this._fillstyle = params.fillstyle;
		this._bgWidth = params.bgWidth || 900;
		this._bgHeight = params.bgHeight || 145.5;
		this._bgPath = params.bgPath || "/static/gnovel/res/textures/ui/phone_textBox.png";
		this._dontRemove = params.dontRemove || false;
		this._bgOffsetX = params.bgOffsetX || 0;
		this._bgOffsetY = params.bgOffsetY || 0;
		this._msgOffsetZ = params.msgOffsetZ || 0;
		this._msgOffsetY = params.msgOffsetY || 0;
		this._msgOffsetX = params.msgOffsetX || 0;
		this._speakerOffsetX = params.speakerOffsetX || 0;
		this._speakerOffsetY = params.speakerOffsetY || 0;
		this._middleBubbleTailOffsetY = 12;
		this._otherBubbleTailOffsetY = 8;
		this._otherBubbleTailOffsetX = 30;
		this._unclickable = params.unclickable || false;
		this._textBg = null; // private copy(might be shallow, might be referenced by Dialog.textBg)
		this._message = message;
		this._messageText = null;
		this._nameText = null;
		this._messageAlign = params.messageAlign || "center";
		this._temp = params.temp;
		this._center = params.center;
		this._isDialog = params.isDialog || false;
		this._mouseDownListenerAdded = false;

		this._bubble = params.bubble;



		var curspk = params.speaker;
		var prespk = Dialog._prevSpeaker;
		if (curspk == prespk) {
			this._hasTransition = false;
		}

		var curbub = params.bubble;
		var prebub = Dialog._prevBubble;
		if (curbub != prebub) {
			this._hasTransition = true;
		};

		if (params.hasOwnProperty('createNewBg')) {
			this._hasTransition = params.createNewBg;
		}

		var dialog = this;
		this._mouseDownListener = function(event) {
			if (dialog._tweenComplete == false) {
				dialog._tweenComplete = true;
				dialog._onComplete();
			}
		}

		this._init();
	};

	// static class variable
	Dialog._textBg = null;
	Dialog._prevSpeaker = null;
	Dialog._prevBubble = null;

	Dialog.prototype._init = function() {
		var x = this._x;
		var y = this._y;
		var z = this._page.getDialogLayer();
		var myDialog = this;

		if (Dialog._textBg != null && this._hasTransition && !this._dontRemove) {
			// if current speaker is different than the previous speaker, then we need to
			// close the previous dialog box if it still exists
			this._textBg = Dialog._textBg; // because this._textBg is null because of the ctor
			this._closeDialog();
		} else if (this._temp == true) {
			// if current speaker is different than the previous speaker, then we need to
			// close the previous dialog box if it still exists
			this._textBg = Dialog._textBg; // because this._textBg is null because of the ctor
			this._closeDialog();
		}

		var characterLine = this._charLine;
		if (this._type == "context") {
			if (this._message.length >= 90) {
				characterLine = 45;
			}
		}
		this._messageText = this._page.createTextBox(this._message, {
				align: this._messageAlign,
				charLine: characterLine,
				font: this._font,
				center: this._center,
				fillstyle: this._fillstyle,
			});

		this._nameText = this._page.createTextBox(this._params.speaker, {
			align: "left",
			charLine: this._charLine
		});

		var textHeight = this._messageText.canvas.textHeight;
		var textWidth = this._messageText.canvas.textWidth;
		var y_text;
		var x_text;
		if (this._isDialog) {
			var tailOffsetY;
			var tailOffsetX;
			if (x == 0) {
				tailOffsetY = this._middleBubbleTailOffsetY;
			} else {
				tailOffsetY = this._otherBubbleTailOffsetY;
				tailOffsetX = this._otherBubbleTailOffsetX;
			}


			var camera = this._page.getOwner().getCamera();
			var scale = (camera.position.z - (z + 20)) / (camera.position.z - (z - 20));
			textHeight = textHeight / scale;
			var y_far = y + textHeight / 2 - tailOffsetY + this._msgOffsetY;
			y_text = camera.position.y - (camera.position.y - y_far) * scale;

			var x_far = x + textWidth / 2 - tailOffsetX + this._msgOffsetX;
			x_text = camera.position.x - (camera.position.x  - x_far) * scale;
		}
		else {
			y_text = y + textHeight / 2 + this._msgOffsetY;
			x_text = x;
		}

		// if (textHeight > 23) {
		// 	if (textHeight > 46) {
		// 		this._messageText.position.set(x, y + 50 + this._msgOffsetY, z + 20 + this._msgOffsetZ);
		// 		this._nameText.position.set(this._messageText.position.x + this._speakerOffsetX, this._messageText.position.y + 20 + this._speakerOffsetY, z + 20);
		// 	}else {
		// 		this._messageText.position.set(x, y + 45 + this._msgOffsetY, z + 20 + this._msgOffsetZ);
		// 		this._nameText.position.set(this._messageText.position.x + this._speakerOffsetX, this._messageText.position.y + 25 + this._speakerOffsetY, z + 20);
		// 	}
		// }else {
		this._messageText.position.set(x_text, y_text, z + 20 + this._msgOffsetZ);
		this._nameText.position.set(this._messageText.position.x + this._speakerOffsetX, this._messageText.position.y + 30 + this._speakerOffsetY, z + 20);
		// }

		// add background textbox
		if (typeof Dialog._textBg === "undefined" || Dialog._textBg === null || this._hasTransition) {
			Dialog._textBg = this._page.createImage(
				this._bgPath,
				new THREE.Vector3(this._messageText.position.x + this._bgOffsetX, y + this._bgOffsetY, z - 20),
				this._bgWidth, this._bgHeight);

			var opacityDest = 1;
			if (this._params.dontShowBg) {
				opacityDest = 0;
			} else {
				this._page._addToScene(Dialog._textBg);
			}

			if (this._type == "context") {
				this._messageText.position.x -= 10;
				var textHeight = this._messageText.canvas.textHeight;
				if (textHeight >= 69) {
					var textWidth = this._messageText.canvas.textWidth;
					var scale_h = textHeight * 1.7 / 240;
					var scale_w = textWidth * 1.5 / 1080;
					var scale = scale_h;
					Dialog._textBg.position.y -= textHeight / 4;
					if (characterLine == 45) {
						scale = scale_w;
						Dialog._textBg.position.x += textWidth / 8;
					};
					this._messageText.position.y -= textHeight / 4;
				}else {
					var scale = 0.5;
				}
				Dialog._textBg.scale.set(scale, scale, 1);
				var targetPos = {};
				targetPos.x = Dialog._textBg.position.x;
				Dialog._textBg.position.x = (Dialog._textBg.position.x - 400);
				this._page.move(Dialog._textBg, {
					duration: 600,
					x: targetPos.x,
					easing: TWEEN.Easing.Back.Out //target position
				});

				this._textBg = Dialog._textBg;

				//slide in animation for message inside context box
				var targetPos = {};
				targetPos.x = this._messageText.position.x;
				this._messageText.position.x = (this._messageText.position.x - 400);
				this._page.move(this._messageText, {
					duration: 600,
					x: targetPos.x, //target position
					easing: TWEEN.Easing.Back.Out,
				});

				this._addMouseDownListener();

			} else {
				Dialog._textBg.material.opacity = 0;
				//set scale to 0
				Dialog._textBg.scale.set(0, 0, 1);
				//bool that tells tween if text already showing from tween
				var textShowing = false;
				//pop in and scale dialog box
				this._page.tweenPulse(Dialog._textBg, {
					repeat: false,
					x: 1,
					y: 1,
					z: 1,
					duration: 300,
					easing: TWEEN.Easing.Back.Out,
					temp: this._temp,
					onUpdate: function() {
						//makes text come in after text box has began showing
						if ((myDialog._textBg.scale.x > .5) && !textShowing) {
							textShowing = true;
							myDialog._page.tweenMat(myDialog._messageText, {
								duration: 500,
								opacity: 1,
								easing: TWEEN.Easing.Cubic.Out,
								onComplete: function() {
									myDialog._addMouseDownListener();
								}
							});

						}
					}
				});

				//fade in text box while it is popping
				this._page.tweenMat(Dialog._textBg, {
					duration: 100,
					opacity: opacityDest,
					easing: TWEEN.Easing.Cubic.Out
				});

				this._textBg = Dialog._textBg;

				// fade in text and speaker
				this._messageText.material.opacity = 0;
				this._page.tweenMat(this._messageText, {
					duration: 500,
					opacity: 1,
					easing: TWEEN.Easing.Cubic.Out
				});

				this._nameText.material.opacity = 0;
				this._page.tweenMat(this._nameText, {
					duration: 800,
					opacity: 1,
					easing: TWEEN.Easing.Cubic.Out
				});
			}
		}else{
			// we reuse the background from the previous dialog

			if (!this._mouseDownListenerAdded) {
				this._addMouseDownListener();
			}
		}

		this._page._addToScene(this._messageText);

		// if (this._showSpeaker)
		// 	this._page._addToScene(this._nameText);
	};

	Dialog.prototype._addMouseDownListener = function() {
		if (!this._mouseDownListenerAdded && !this._unclickable) {
			this._page.getOwner().addMouseDownListener(this._mouseDownListener);
		}
	};

	Dialog.prototype._onComplete = function() {
		Dialog._prevSpeaker = this._params.speaker;
		Dialog._prevBubble = this._params.bubble;

		//remove mousedown listener
		this._page.getOwner().removeMouseDownListener(this._mouseDownListener);

		var messageTextObj = this._messageText;
		var nameTextObj = this._nameText;
		var dialog = this;

		if (!dialog._dontRemove) {

			// fade out dialog message text
			this._page.tweenMat(this._messageText, {
				duration: 500,
				opacity: 0,
				easing: TWEEN.Easing.Cubic.Out,
				onComplete: function() {
					dialog._page._removeFromScene(messageTextObj);

					if (dialog._params.onComplete != null) {
						dialog._params.onComplete(dialog);
					}
				},
			});

			// fade out dialog text
			this._page.tweenMat(this._nameText, {
				duration: 500,
				opacity: 0,
				easing: TWEEN.Easing.Cubic.Out,
				onComplete: function() {
					dialog._page._removeFromScene(nameTextObj);
				},
			});

			this._nameText = null;
			this._messageText = null;

			// if the next flow is not dialog, or it has different speaker, then we need to close the
			// dialog
			if (!this._isDialogNext() || this._isDifferentSpeakerNext()) {
				if (this._textBg != null) {
					this._closeDialog();
				}
				if (Dialog._textBg != null) {
					this._textBg = Dialog._textBg;
					this._closeDialog();
				}
			}
		} else {

			if (dialog._params.onComplete != null) {
				dialog._params.onComplete(dialog);
			}
		}
	};

	Dialog.prototype._isDialogNext = function() {
		if (this._page._getFlow()._peekNext() == null) {
			return false;
		}

		return this._page._getFlow()._peekNext().type == GNOVEL.Flow.DIALOG;
	};

	Dialog.prototype._isDifferentSpeakerNext = function() {
		if (this._page._getFlow()._peekNext() == null) {
			return false;
		}

		return this._page._getFlow()._peekNext().speaker !== this._params.speaker;
	}

	Dialog.prototype._closeDialog = function() {
		var dialog = this;
		var textBgObj = this._textBg;

		if (this._textBg != null) {
			this._page.tweenMat(this._textBg, {
				duration: 800,
				opacity: 0,
				easing: TWEEN.Easing.Cubic.Out,
				onComplete: function() {
					dialog._page._removeFromScene(textBgObj);
				},
			});
		}

		if (this._messageText !== null) {
			var msgTextObj = this._messageText;
			this._page.tweenMat(this._messageText, {
				duration: 800,
				opacity: 0,
				easing: TWEEN.Easing.Cubic.Out,
				onComplete: function() {
					dialog._page._removeFromScene(msgTextObj);
				},
			});
			this._messageText = null;
		}

		if (this._nameText !== null) {
			var nameTextObj = this._nameText;
			this._page.tweenMat(this._nameText, {
				duration: 800,
				opacity: 0,
				easing: TWEEN.Easing.Cubic.Out,
				onComplete: function() {
					dialog._page._removeFromScene(nameTextObj);
				},
			});
			this._nameText = null;
		}

		Dialog._textBg = null;
		Dialog._prevSpeaker = null;
		Dialog._prevBubble = null;
		this._textBg = null;
	};

	Dialog.prototype.getImage = function() {
		return this._textBg;
	};

	GNOVEL.Dialog = Dialog;
}());
