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
		this._curTextBox = this._page.createTextBox(message, params || {});
		this._nameBox = this._page.createTextBox(params.speaker, {align: "left"});				
		this._tweenComplete = false;

		var curspk = params.speaker;
		var prespk = Dialog._prevSpeaker;
		if(curspk == prespk)
		{
			this._hasTransition = false;
		}			
	
		this._init();

		var dialog = this;
		this._mouseDownListener = function(event) {
			if(dialog._tweenComplete == false) {
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

		/**
		 *@function temporary tween decision on left & right.  should ultimately be based upon parent character's position
		 */
		//tween from the left
		if (x < 0) {
			x = 0;
			this._curTextBox.position.set(x - 100, y + 40, z + 20);
		}
		//tween from the right
		else if (x > 0) {
			x = 0;
			this._curTextBox.position.set(x + 100, y + 40, z + 20);
		} else {
			this._curTextBox.position.set(x, y + 40, z + 20);
		}

		if(Dialog._textBg != null && this._hasTransition){	
			this._closeDialog();
		}

		this._nameBox.position.set(this._curTextBox.position.x - 420, this._curTextBox.position.y + 30, z + 20);

		// add background textbox
		if(typeof Dialog._textBg === "undefined" || Dialog._textBg === null || this._hasTransition){
			Dialog._textBg = this._page.createImage("/static/gnovel/res/textures/blue_box.png", new THREE.Vector3(this._curTextBox.position.x, y, z), 900, 145.5);
			Dialog._textBg.material.opacity = 0;
			this._page._addToScene(Dialog._textBg);

			this._page.tweenMat(Dialog._textBg, {
			duration: 500,
			opacity: 0.7,
			easing: TWEEN.Easing.Cubic.Out
			});

			this._page.move(Dialog._textBg, {
			duration: 500,
			x: x,
			easing: TWEEN.Easing.Cubic.Out
			});
		}

		// alpha
		this._page.tweenMat(this._curTextBox, {
			duration: 500,
			opacity: 0.7,
			easing: TWEEN.Easing.Cubic.Out
		});
		this._page.tweenMat(this._nameBox, {
			duration: 500,
			opacity: 0.7,
			easing: TWEEN.Easing.Cubic.Out
		});
		
		// move
		this._page.move(this._curTextBox, {
			duration: 500,
			x: x,
			easing: TWEEN.Easing.Cubic.Out
		});
		this._page.move(this._nameBox, {
			duration: 500,
			x: this._nameBox.x,
			easing: TWEEN.Easing.Cubic.Out
		});
		
		this._page._addToScene(this._curTextBox);
		this._page._addToScene(this._nameBox);
	};

	Dialog.prototype._onComplete = function() {
		Dialog._prevSpeaker = this._params.speaker;

		//remove mousedown listener
		this._page.getOwner().removeMouseDownListener(this._mouseDownListener);

		var textBoxObj = this._curTextBox;
		var nameBoxObj = this._nameBox;
		var dialog = this;		

		this._page.tweenMat(this._curTextBox, {
			duration: 500,
			opacity: 0,
			easing: TWEEN.Easing.Cubic.Out,
			onComplete: function() {
				dialog._page._removeFromScene(textBoxObj);
			},
		});
		this._page.tweenMat(this._nameBox, {
			duration: 500,
			opacity: 0,
			easing: TWEEN.Easing.Cubic.Out,
			onComplete: function() {
				dialog._page._removeFromScene(nameBoxObj);
			},
		});

		if(!this._isDialogNext()) {
			this._closeDialog();
		}
		this._curTextBox = null;

		if (this._params.onComplete != null) {
			this._params.onComplete(this);
		}
	};

	Dialog.prototype._isDialogNext = function() {
		if(this._page._getFlow()._peekNext() == null) {
			return null;
		}			

		return this._page._getFlow()._peekNext().type == GNOVEL.Flow.DIALOG;
	};

	Dialog.prototype._closeDialog = function() {
		var dialog = this;
		var textBgObj = this._textBg;
		this._page.tweenMat(Dialog._textBg, {
			duration: 500,
			opacity: 0,
			easing: TWEEN.Easing.Cubic.Out,
			onComplete: function() {
				dialog._page._removeFromScene(textBgObj);
			},
		});
		
		Dialog._textBg = null;
		Dialog._prevSpeaker = null;
	};

	GNOVEL.Dialog = Dialog;
}());