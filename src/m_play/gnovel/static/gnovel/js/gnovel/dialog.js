//namespace
var GNOVEL = GNOVEL || {};

(function() {
	"use strict";

	/**
	 * @class  Dialog
	 * @constructor
	 */
	var Dialog = function(page, message, x, y, params) {
		this._page = page;
		this._params = params;
		this._x = x;
		this._y = y;
		this._hasTransition = true;
		this._mouseDownListener = null;
		this._tweenComplete = false;
		this._showSpeaker = params.showSpeaker || true;
		this._charLine = params.charLine || 72;
		this._bgWidth = params.bgWidth || 900;
		this._bgHeight = params.bgHeight || 145.5;
		this._bgPath = params.bgPath || "/static/gnovel/res/textures/blue_box.png";
		this._dontRemove = params.dontRemove || false;
		this._bgOffsetY = params.bgOffsetY || 0;
		this._msgOffsetZ = params.msgOffsetZ || 0;
		this._msgOffsetY = params.msgOffsetY || 0;

		this._messageText = this._page.createTextBox(message, params || {});
		this._nameText = this._page.createTextBox(params.speaker, {
			align: "left",
			charLine: this._charLine
		});

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

		this._page.getOwner().addMouseDownListener(this._mouseDownListener);
	};

	// static class variable
	Dialog._textBg = null;
	Dialog._prevSpeaker = null;

	Dialog.prototype._init = function() {
		var x = this._x;
		var y = this._y;
		var z = this._page.getDialogLayer();

		this._messageText.position.set(x, y + 40 + this._msgOffsetY, z + 20 + this._msgOffsetZ);

		if (Dialog._textBg != null && this._hasTransition && !this._dontRemove) {
			// if current speaker is different than the previous speaker, then we need to 
			// close the previous dialog box if it still exists
			this._closeDialog();
		}

		this._nameText.position.set(this._messageText.position.x - 420, this._messageText.position.y + 30, z + 20);

		// add background textbox
		if (typeof Dialog._textBg === "undefined" || Dialog._textBg === null || this._hasTransition) {
			Dialog._textBg = this._page.createImage(
				this._bgPath, 
				new THREE.Vector3(this._messageText.position.x, y + this._bgOffsetY, z - 20),
				this._bgWidth, this._bgHeight);

			Dialog._textBg.material.opacity = 0;
			this._page._addToScene(Dialog._textBg);
			this._page.tweenMat(Dialog._textBg, {
				duration: 800,
				opacity: 0.7,
				easing: TWEEN.Easing.Cubic.Out
			});

		}

		// fade in text and speaker
		this._page.tweenMat(this._messageText, {
			duration: 800,
			opacity: 0.7,
			easing: TWEEN.Easing.Cubic.Out
		});
		this._page.tweenMat(this._nameText, {
			duration: 800,
			opacity: 0.7,
			easing: TWEEN.Easing.Cubic.Out
		});

		this._page._addToScene(this._messageText);

		if (this._showSpeaker)
			this._page._addToScene(this._nameText);
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

			if (!this._isDialogNext()) {
				this._closeDialog();
			}
		} else {
			if (dialog._params.onComplete != null) {
				dialog._params.onComplete(dialog);
			}
		}		
	};

	Dialog.prototype._isDialogNext = function() {
		if (this._page._getFlow()._peekNext() == null) {
			return null;
		}

		return this._page._getFlow()._peekNext().type == GNOVEL.Flow.DIALOG;
	};

	Dialog.prototype._closeDialog = function() {
		var dialog = this;
		var textBgObj = Dialog._textBg;

		this._page.tweenMat(Dialog._textBg, {
			duration: 800,
			opacity: 0,
			easing: TWEEN.Easing.Cubic.Out,
			onComplete: function() {
				dialog._page._removeFromScene(textBgObj);
			},
		});

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
		}

		Dialog._textBg = null;
		Dialog._prevSpeaker = null;
	};

	GNOVEL.Dialog = Dialog;
}());