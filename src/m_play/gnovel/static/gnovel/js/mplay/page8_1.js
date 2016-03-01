// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page8_1
	 * @augments MPlay.MPlayPage
	 */
	var Page8_1 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page8_1.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page8_1.prototype.constructor = Page8_1;

	/**
	 * @override
	 */
	Page8_1.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupClassBackground();
	};

	Page8_1.prototype._createFlowElements = function() {

		var cat = "%" + this._cat;		
		var ryan = "%" + this._ryan;
		var professor = "%" + this._professor;	
		var player = this._player;		

		var o = null;

		o = [			
			{type: "show", img: ryan, expression: "sad"},
			{type: "dialog", speaker: this._ryan, text: "Hey.  I'm on my way to meet with the professor.  Apparently they do cycle some of the questions... whatever.  I think it will end up ok.  I just have to get chewed out.  See you around."},			
			{type: "hide", img: ryan},
						
			{type: "dialog", speaker: "Context", text: "After RYAN leaves, you run into CAT and chat with her"},		
			{type: "show", img: cat, expression: "angry"},
			{type: "dialog", speaker: this._cat, text: "Was that Ryan?  Jeez, heard about what happened.  You're lucky Ryan didn't tell them he showed you the test.  That's enough to get you in trouble too.  Well I hope it works out ok for him, that's going to be an awkward conversation with his job if he fails the class."},

		]; 

		return o;
	};

	MPLAY.Page8_1 = Page8_1;
}());
