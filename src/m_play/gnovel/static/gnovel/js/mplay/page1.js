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
		var obj = this.createImage("/static/gnovel/res/textures/char/ryan-happy.png",position);
		this._addToScene(obj);
		this.addCharacter("ryan",obj);

		this.showHUD();

		var textBox = this.addTextBox(" Hello World~~", 
			{fontsize: 32, 
			  borderColor: {r:255, g:0, b:0, a:1.0}, 
			  backgroundColor: {r:255, g:100, b:100, a:0.8} 
			});
		
		textBox.position.set(0, 0, 100);
		this._addToScene(textBox);

		var flow = [
			{type : "Dialog", text : "it is the first day...."}, 
			{type : "Dialog", text : "... and as we wrap up"},
			{type : "Dialog", text : "you gather"},
			{type : "Dialog", text : "hey nice to meet"}, 
			{type : "Choice", choices : ["not at all", "oh, what did you"]},
		];

		this._setFlow(flow);
		var result = {};
		var timer = new GNOVEL.Timer(this, 10, ['choice1', 'choice2'], result);
		timer.init();
		this.timer = timer;
		timer.countdown();
	};

	Page1.prototype._onUnload = function() {
		GNOVEL.Page.prototype._onUnload.call(this);


	};

	/**
	 * @override	 
	 */
	Page1.prototype._onMouseDown = function(event) {
//		this._owner.goToPage(1, GNOVEL.TransitionType.FADE);
		this.timer._onMouseDown(event);
	};

	MPLAY.Page1 = Page1;
}());
