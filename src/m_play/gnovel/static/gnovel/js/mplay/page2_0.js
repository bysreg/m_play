// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page2_0
	 * @augments MPLAY.MPlayPage
	 */
	var Page2_0 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page2_0.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page2_0.prototype.constructor = Page2_0;

	/**
	 * @override
	 */
	Page2_0.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupCafeBackground();
	};

	Page2_0.prototype._createFlowElements = function() {
		var priya = "%" + this._priya;

		var o = null;

		o = [
			{type:"show_context", text:"At the cafe..."},
			{type: "show", img: priya, expression: "happy", position: "center"},
			{type: "dialog", speaker: "Priya", text: "Oh, hey, I didn’t know you hang out here too!  Ryan told me you got a job lined up.  Congrats!"},
			{type: "choices", choices : [{text: "Thanks!", go: "#sweet"}, {text : "Thanks!  Ryan interned there this summer and referred me.", go : "#sweet"}]},

			{type: "nothing", label: "sweet"},
			{type: "show", img: priya, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "That’s so sweet! Last semester, Ryan was my date to the Indian Grad Association’s banquet. He’s such a good sport. Really goes out of his way for his friends."},
			{type: "choices", choices : [{text: "That was nice of him.", go: "#nice"}, {text : "You guys seem close.", relationship: {name: "priya", score: "1"}, go : "#close"}]},

			{type: "nothing", label: "nice"},
			{type: "show", img: priya, expression: "happy", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "So nice! Well it was nice talking with you. See you in class."},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},
			{type: "nothing", label: "close"},
			{type: "show", img: priya, expression:"happy", position:"center", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", relationship: {name: "priya", score: 1}, text: "We’re good friends… like you two!  See you in class."},

			{type: "goto", page: "scene 4", label: "gonextscene"},
		];

		return o;
	};

	/**
	 * @override
	 */
	Page2_0.prototype._onUnload = function() {
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page2_0.prototype._onStart = function() {
		// this._owner._ambient = this._owner.getSoundManager().play("Cafe-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});

		// this._tweenVolumeIn();
	};

	MPLAY.Page2_0 = Page2_0;
}());
