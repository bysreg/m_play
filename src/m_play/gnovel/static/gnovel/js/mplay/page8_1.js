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

		this.setupUcBackground();
	};

	Page8_1.prototype._createFlowElements = function() {

		var cat = "%" + this._cat;
		var ryan = "%" + this._ryan;
		var professor = "%" + this._professor;
		var player = this._player;

		var o = null;

		o = [
			{type: "show_context", text: "A few days after the test... "},
			{type: "show_context", text: "you run into Ryan at the UC"},
			{type: "show", img: ryan, expression: "sad"},
			{type: "dialog", speaker: this._ryan, text: "Hey.  I'm on my way to meet with the professor.  Apparently they do cycle some of the questions... whatever.  I think it will end up ok.  I just have to get chewed out.  See you around."},
			{type: "hide", img: ryan},

			{type: "dialog", speaker: "", text: "After RYAN leaves, you run into CAT and chat with her"},
			{type: "show", img: cat, expression: "angry"},
			{type: "dialog", speaker: this._cat, text: "Was that Ryan?  Jeez, heard about what happened.  You're lucky Ryan didn't tell them he showed you the test.  That's enough to get you in trouble too.  Well I hope it works out ok for him, that's going to be an awkward conversation with his job if he fails the class."},

			{type: "goto", page: "scene ending"},
		];

		return o;
	};

	Page8_1.prototype._onUnload = function() {
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page8_1.prototype._onStart = function() {
		this._owner._ambient = this._owner.getSoundManager().play("UC-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page8_1 = Page8_1;
}());
