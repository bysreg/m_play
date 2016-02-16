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
		var z = 200;	

		/**
		 *@function temporary tween decision on left & right.  should ultimately be based upon parent character's position
		 */
		//tween from the left
		if (x < 0) {
			x = 0;
			this._curTextBox.position.set(x - 100, y + 20, z + 20);
		}
		//tween from the right
		else if (x > 0) {
			x = 0;
			this._curTextBox.position.set(x + 100, y + 20, z + 20);
		} else {
			this._curTextBox.position.set(x, y + 20, z + 20);
		}


		if(GNOVEL.Dialog._textBg != null && this._hasTransition){	
			this._page._removeFromScene(GNOVEL.Dialog._textBg);
			GNOVEL.Dialog._textBg = null;
			Dialog._prevSpeaker = null;
		}

		// add background textbox
		if(typeof GNOVEL.Dialog._textBg === "undefined" || GNOVEL.Dialog._textBg === null || this._hasTransition){
			GNOVEL.Dialog._textBg = this._page.createImage("/static/gnovel/res/textures/blue_box.png", new THREE.Vector3(this._curTextBox.position.x, y, z), 900, 145.5);
			GNOVEL.Dialog._textBg.material.opacity = 0;
			this._page._addToScene(GNOVEL.Dialog._textBg);

			this._page.tweenMat(GNOVEL.Dialog._textBg, {
			duration: 1000,
			opacity: 0.7,
			easing: TWEEN.Easing.Cubic.Out
			});

			this._page.move(GNOVEL.Dialog._textBg, {
			duration: 1000,
			x: x,
			easing: TWEEN.Easing.Cubic.Out
			});
		}

		// alpha
		this._page.tweenMat(this._curTextBox, {
			duration: 1000,
			opacity: 0.7,
			easing: TWEEN.Easing.Cubic.Out
		});
		

		// move
		this._page.move(this._curTextBox, {
			duration: 1000,
			x: x,
			easing: TWEEN.Easing.Cubic.Out
		});
		

		this._page._addToScene(this._curTextBox);
	};

	Dialog.prototype._onComplete = function() {
		Dialog._prevSpeaker = this._params.speaker;

		//remove mousedown listener
		this._page.getOwner().removeMouseDownListener(this._mouseDownListener);		

		this._page._removeFromScene(this._curTextBox);
		if(!this._isDialogNext()) {
			this._page._removeFromScene(GNOVEL.Dialog._textBg);
		}
		this._curTextBox = null;

		if (this._params.onComplete != null) {
			this._params.onComplete(this);
		}
	};

	Dialog.prototype._isDialogNext = function() {
		return this._page._getFlow()._peekNext().type == GNOVEL.Flow.DIALOG;
	};

	GNOVEL.Dialog = Dialog;
}());