// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page8_4
	 * @augments MPlay.MPlayPage
	 */
	var Page8_4 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page8_4.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page8_4.prototype.constructor = Page8_4;

	/**
	 * @override
	 */
	Page8_4.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupClassBackground();
	};

	Page8_4.prototype._createFlowElements = function() {

		var cat = "%" + this._cat;
		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var professor = "%" + this._professor;
		var player = this._player;

		var o = null;

		o = [
			{type: "dialog", speaker: "", text: "A few days after the test, you run into Priya and Cat at the Café"},
			{type: "show", img: priya, expression: "sad", position: "right"},
			{type: "dialog", speaker: this._priya, text: "Did you hear about Ryan?  He got in trouble for using that exam."},

			{type: "choices", choices : [
				{text: "What happened?"},
				{text: "Oh no..."},
				]},

			{type: "show", img: cat, expression: "thoughtful", position: "left"},
			{type: "dialog", speaker: this._cat, text: "There was a typo on last year's exam, and Ryan repeated it.  So they knew he had access to it."},


			{type: "dialog", speaker: this._priya, text: "He told me he has to talk to Prof. Sweeney to sort it out."},
			{type: "dialog", speaker: this._cat, text: "You're lucky he didn't tell the professor that you saw the exam too - you'd be in trouble with him."},
			{type: "dialog", speaker: this._priya, text: "I guess you're in the clear."},
			{type: "dialog", speaker: this._cat, text: "Aren't you guys working at the same company after graduation?  That's going to be awkward.  Hopefully Ryan won't lose his offer."},
			{type: "dialog", speaker: this._priya, text: "Let’s hope."},

			{type: "goto", page: "scene ending"},
		];

		return o;
	};

	MPLAY.Page8_4 = Page8_4;
}());
