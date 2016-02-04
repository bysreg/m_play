// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page1
	 * @augments GNOVEL.Page
	 */
	var Page1 = function() {
		GNOVEL.Page.call(this);
	};

	Page1.prototype = Object.create(GNOVEL.Page.prototype);
	Page1.prototype.constructor = Page1;

	/**
	 * @override
	 */
	Page1.prototype._onLoad = function() {
		GNOVEL.Page.prototype._onLoad.call(this);

		this.setBackground("/static/gnovel/res/textures/test1.jpg");
		this._bg.position.z = -1000;
		this.move(this._bg, {z : this._bg.position.z + 1000, easing : TWEEN.Easing.Cubic.Out});

		var position = new THREE.Vector3(1,1,5);
		var obj = this.createImage("/static/gnovel/res/textures/ryan-happy.jpg",position);
		this.addCharacter("ryan",obj);

		this.showHUD();

	};

	/**
	 * @override
	 */
	Page1.prototype._onMouseDown = function(event) {
		this._owner.goToPage(1, GNOVEL.TransitionType.FADE);
	};

	MPLAY.Page1 = Page1;
}());
