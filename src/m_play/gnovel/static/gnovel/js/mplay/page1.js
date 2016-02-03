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
		this.move(this._bg, {z : this._bg.position.z + 1100, easing : TWEEN.Easing.Cubic.Out});	

		var textBox = this.addTextBox(" Hello World~~", 
			{fontsize: 46, 
			  borderColor: {r:255, g:0, b:0, a:1.0}, 
			  backgroundColor: {r:255, g:100, b:100, a:0.8} 
			});
		
		textBox.position.set(0, 0, 200);		
		//scene.add( spritey );
		this._owner._addToScene(textBox);
	};

	/**
	 * @override	 
	 */
	Page1.prototype._onMouseDown = function(event) {
		this._owner.goToPage(1, GNOVEL.TransitionType.FADE);
	};

	MPLAY.Page1 = Page1;
}());