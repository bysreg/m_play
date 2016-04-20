// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page8_3
	 * @augments MPlay.MPlayPage
	 */
	var Page8_3 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page8_3.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page8_3.prototype.constructor = Page8_3;

	/**
	 * @override
	 */
	Page8_3.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupOfficeBackground();
	};

	Page8_3.prototype._createFlowElements = function() {

		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var professor = "%" + this._professor;
		var player = this._player;
		var closephone = "%" + this._closephone;

		var o = null;

		o = [
			{type: "show_context", text: "A few days after the test, you and Ryan are called into Professor Sweeney’s office."},
			{type: "show", img: professor, expression: "sad", position: "center"},
			{type: "dialog", speaker: this._professor, text: "I noticed a very strange mistake that only you two made on the exam.  You see, last year there was an error on one of the prompts."},

			// {type: "choices", choices : [
			// 	{text: "I can explain-"},
			// 	{text: "But Professor-"},
			// 	],
			// seconds: 5},


			{type: "dialog", speaker: this._professor, text: "Now, I know that wasn't the case on this year's exam.  Can you both explain how you made last year's mistake on this year's exam?", label: "first"},

			// {type: "choices", choices : [
			// 	{text: "You see-"},
			// 	{text: "We just-"},
			// 	],
			// seconds: 5},


			{type: "dialog", speaker: this._professor, text: "Potential consequences of an academic violation are failing the exam, the course and possible expulsion from your graduate programs."},
			{type: "dialog", speaker: this._professor, text: "There is an appeals process as well, but before we go down that road, I'd like to hear from you."},

			{type: "dialog", speaker: this._professor, text: "Ryan, " + this._player + ", please explain yourselves."},
			{type: "hide", img: this._professor},

			{type: "nothing", label: "email"},
			
			{type: "goto", page: "scene 9.d.a"},
		];

		return o;
	};

	Page8_3.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);
		
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page8_3.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);
		
		this._owner._ambient = this._owner.getSoundManager().play("Office-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page8_3 = Page8_3;
}());
