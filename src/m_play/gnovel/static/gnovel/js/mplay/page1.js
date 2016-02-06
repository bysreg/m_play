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

		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");		

		//=============================

		var position = new THREE.Vector3(1,1,25);
		var obj = this.createImage("/static/gnovel/res/textures/char/ryan-happy.png",position, 1200, 1500);
		this._addToScene(obj);
		this.addCharacter("ryan",obj);

		//this.showHUD();

		var textBox = this.createTextBox("Hi nice to meet you!", 
			{fontsize: 6, 
			  borderColor: {r:255, g:0, b:0, a:1.0}, 
			  backgroundColor: {r:255, g:100, b:100, a:0.8} 
			});
		
		textBox.position.set(-200, 200, 75);
		this._addToScene(textBox);

		var result = {};
		//var choices = new GNOVEL.Choices(this, ['Not at all', 'Oh, what did you do before deciding to get your MBA?'], result, {x: -200});	
	};

	Page1.prototype._onUnload = function() {
		GNOVEL.Page.prototype._onUnload.call(this);
	};

	/**
	 * @override	 
	 */
	Page1.prototype._onMouseDown = function(event) {
//		this._owner.goToPage(1, GNOVEL.TransitionType.FADE);		
	};

	MPLAY.Page1 = Page1;
}());
