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
		this._bgWidth = params.bgWidth || 900;
		this._bgHeight = params.bgHeight || 145.5;
		this._bgPath = params.bgPath || "/static/gnovel/res/textures/ui/phone_textBox.png";
		this._dontRemove = params.dontRemove || false;
		this._bgOffsetX = params.bgOffsetX || 0;
		this._bgOffsetY = params.bgOffsetY || 0;
		this._msgOffsetZ = params.msgOffsetZ || 0;
		this._msgOffsetY = params.msgOffsetY || 0;
		this._speakerOffsetX = params.speakerOffsetX || 0;
		this._speakerOffsetY = params.speakerOffsetY || 0;
		this._unclickable = params.unclickable || false;
		this._textBg = null; // private copy(might be shallow, might be referenced by Dialog.textBg)
		this._message = message;
		this._messageText = null;
		this._nameText = null;
		this._messageAlign = params.messageAlign || "center";
		this._temp = params.temp;
		this._center = params.center;
		var curspk = params.speaker;
		var prespk = Dialog._prevSpeaker;
		if (curspk == prespk) {
			this._hasTransition = false;
		}

		if (params.hasOwnProperty('createNewBg')) {
			this._hasTransition = params.createNewBg;
		}

		this._init();

		var dialog = this;
		this._mouseDownListener = function(event) {
			if (dialog._tweenComplete == false) {
				dialog._tweenComplete = true;
				dialog._onComplete();
			}
		}

		if(!this._unclickable) {
			this._page.getOwner().addMouseDownListener(this._mouseDownListener);
		}
	};

	// static class variable
	Dialog._textBg = null;
	Dialog._prevSpeaker = null;

	Dialog.prototype._init = function() {
		var x = this._x;
		var y = this._y;
		var z = this._page.getDialogLayer();

		if (Dialog._textBg != null && this._hasTransition && !this._dontRemove) {
			// if current speaker is different than the previous speaker, then we need to
			// close the previous dialog box if it still exists
			this._textBg = Dialog._textBg; // because this._textBg is null because of the ctor
			this._closeDialog();
		}
		else if(this._temp==true){
			// if current speaker is different than the previous speaker, then we need to
			// close the previous dialog box if it still exists
			this._textBg = Dialog._textBg; // because this._textBg is null because of the ctor
			this._closeDialog();
		}

		this._messageText = this._page.createTextBox(this._message, {
			align: this._messageAlign,
			charLine: this._charLine,
			font: this._font,
			center: this._center
		});

		this._nameText = this._page.createTextBox(this._params.speaker, {
			align: "left",
			charLine: this._charLine
		});

		var textHeight = this._messageText.canvas.textHeight;
		if (textHeight > 23) {
			if (textHeight > 46) {
				this._messageText.position.set(x, y + 50 + this._msgOffsetY, z + 20 + this._msgOffsetZ);
				this._nameText.position.set(this._messageText.position.x + this._speakerOffsetX, this._messageText.position.y + 20 + this._speakerOffsetY, z + 20);
			}else {
				this._messageText.position.set(x, y + 45 + this._msgOffsetY, z + 20 + this._msgOffsetZ);
				this._nameText.position.set(this._messageText.position.x + this._speakerOffsetX, this._messageText.position.y + 25 + this._speakerOffsetY, z + 20);
			}
		}else {
			this._messageText.position.set(x, y + 40 + this._msgOffsetY, z + 20 + this._msgOffsetZ);
			this._nameText.position.set(this._messageText.position.x + this._speakerOffsetX, this._messageText.position.y + 30 + this._speakerOffsetY, z + 20);
		}

		// add background textbox
		if (typeof Dialog._textBg === "undefined" || Dialog._textBg === null || this._hasTransition) {
			Dialog._textBg = this._page.createImage(
				this._bgPath,
				new THREE.Vector3(this._messageText.position.x + this._bgOffsetX, y + this._bgOffsetY, z - 20),
				this._bgWidth, this._bgHeight);

			var opacityDest = 1;
			if(this._params.dontShowBg) {
				opacityDest = 0;
			}else{
				this._page._addToScene(Dialog._textBg);
			}

			//slide in animation for context box
			if(this._type == "context") {
					var targetPos = {};
					targetPos.x = Dialog._textBg.position.x;
					Dialog._textBg.position.x = (Dialog._textBg.position.x-400);
					this._page.move(Dialog._textBg,{
						duration:600,
						x:targetPos.x,
						easing: TWEEN.Easing.Back.Out  //target position
					});

				this._textBg = Dialog._textBg;

				//slide in animation for message inside context box
				var targetPos = {};
				targetPos.x = this._messageText.position.x;
				this._messageText.position.x = (this._messageText.position.x-400);
				this._page.move(this._messageText,{
					duration:600,
					x:targetPos.x,  //target position
					easing: TWEEN.Easing.Back.Out
				});
			}
			else {
				Dialog._textBg.material.opacity = 0;
				//set scale to 0
				Dialog._textBg.scale.set(0, 0, 1);
				//pop in and scale dialog box
				this._page.tweenPulse(Dialog._textBg,{
					repeat: false,
					x:1,y:1,z:1,
					duration:300,
					easing: TWEEN.Easing.Back.Out});

					//fade in text box
				this._page.tweenMat(Dialog._textBg, {
					duration: 100,
					opacity: opacityDest,
					easing: TWEEN.Easing.Cubic.Out
				});

				this._textBg = Dialog._textBg;

				// fade in text and speaker
				//text should start writing at the very end of the text box popping up
				this._messageText.material.opacity = 0;
				this._page.tweenMat(this._messageText, {
					duration: 1000,
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
		}



		this._page._addToScene(this._messageText);

		//if (this._showSpeaker)
		//	this._page._addToScene(this._nameText);
	};



	Dialog.prototype._onComplete = function() {
		Dialog._prevSpeaker = this._params.speaker;

		//remove mousedown listener
		this._page.getOwner().removeMouseDownListener(this._mouseDownListener);

		var messageTextObj = this._messageText;
		var nameTextObj = this._nameText;
		var dialog = this;

		if (!dialog._dontRemove) {

			// fade out dialog speaker
			this._page.tweenMat(this._messageText, {
				duration: 800,
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
				duration: 800,
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
				if(this._textBg != null) {
					this._closeDialog();
				}
				if(Dialog._textBg != null) {
					this._textBg =Dialog._textBg;
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

		if(this._textBg != null){
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
		this._textBg = null;
	};

	Dialog.prototype.getImage = function() {
			return this._textBg;
	};

	GNOVEL.Dialog = Dialog;
}());
