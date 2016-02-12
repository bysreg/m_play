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
		this._textBg = null;
		this._mouseDownListener = null;
		this._curTextBox = this._page.createTextBox(message, params || {});				

		this._init();

		var dialog = this;
		this._mouseDownListener = function(event) {
			dialog._onComplete();
		}
		document.addEventListener('mousedown', this._mouseDownListener, false);
	};

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

		// add background textbox
		var textBg = this._page.createImage("/static/gnovel/res/textures/blue_box.png", new THREE.Vector3(this._curTextBox.position.x, y, z), 900, 145.5);
		textBg.material.opacity = 0;
		this._page._addToScene(textBg);
		this._textBg = textBg;

		// alpha
		this._page.tweenMat(this._curTextBox, {
			duration: 1000,
			opacity: 0.7,
			easing: TWEEN.Easing.Cubic.Out
		});
		this._page.tweenMat(textBg, {
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
		this._page.move(textBg, {
			duration: 1000,
			x: x,
			easing: TWEEN.Easing.Cubic.Out
		});

		this._page._addToScene(this._curTextBox);
	};

	Dialog.prototype._onComplete = function() {
		//remove mousedown listener
		document.removeEventListener('mousedown', this._mouseDownListener, false);

		this._page._removeFromScene(this._curTextBox);
		this._page._removeFromScene(this._textBg);
		this._curTextBox = null;

		if (this._params.onComplete != null) {
			this._params.onComplete(this);
		}
	}

	GNOVEL.Dialog = Dialog;
}());