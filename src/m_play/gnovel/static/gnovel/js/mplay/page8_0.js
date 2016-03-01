// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page8_0
	 * @augments MPlay.MPlayPage
	 */
	var Page8_0 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page8_0.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page8_0.prototype.constructor = Page8_0;

	/**
	 * @override
	 */
	Page8_0.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupClassBackground();
	};

	Page8_0.prototype._createFlowElements = function() {

		var cat = "%" + this._cat;		
		var ryan = "%" + this._ryan;
		var professor = "%" + this._professor;	
		var player = this._player;		

		var o = null;

		o = [			
			{type: "show", img: ryan, expression: "happy"},
			{type: "dialog", speaker: this._ryan, text: "Hey!  Glad I caught you.  I wanted to let you know that I ended up doing ok on that test.  Probably not my best work, but what can you do."},
			{type: "dialog", speaker: this._ryan, text: "Oh! Got to run - I'm meeting Priya for a drink.  I have to go apologize to her - maybe grovel a little."},
			{type: "hide", img: ryan},
						
			{type: "dialog", speaker: "Context", text: "After RYAN leaves, you run into CAT and chat with her"},		
			{type: "show", img: cat, expression: "happy"},
			{type: "dialog", speaker: this._cat, text: "Was that Ryan?  I heard about his fight with Priya.  This class has been insane!  I think I’m going to stick with my business classes next semester…"},

		]; 

		return o;
	};

	MPLAY.Page8_0 = Page8_0;
}());
