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

		this.setupClassBackground();
	};

	Page8_3.prototype._createFlowElements = function() {

		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var professor = "%" + this._professor;	
		var player = this._player;		

		var o = null;

		o = [			
			{type: "show", img: professor, expression: "sad"},
			{type: "dialog", speaker: this._professor, text: "I noticed a very strange mistake that only you two made on the exam.  You see, last year there was an error on one of the prompts."},
			
			{type: "choices", choices : [
				{text: "I can explain-"}, 
				{text: "But Professor-"},
				],
			seconds: 5}, 


			{type: "dialog", speaker: this._professor, text: "Now, I know that wasn't the case on this year's exam.  Can you both explain how you made last year's mistake on this year's exam?", label: "first"},
			
			{type: "choices", choices : [
				{text: "You see-"}, 
				{text: "We just-"},
				],
			seconds: 5}, 


			{type: "dialog", speaker: this._professor, text: "Potential consequences of an academic violation are failing the exam, the course and possible expulsion from your graduate programs.  There is an appeals process as well, but before we go down that road, I'd like to hear from you.", label: "second"},

			{type: "dialog", speaker: this._professor, text: "RYAN, " + this._player + ", please tell me your side of the story."},
			{type: "hide", img: this._professor},

			{type: "dialog", speaker: "Email - Prof. Sweeney", text: "You receive an email. It reads: ..."},
			{type: "dialog", speaker: "Email - Prof. Sweeney", text: "After much deliberation, I have decided on the following to address your violation:"},
			{type: "dialog", speaker: "Email - Prof. Sweeney", text: "As a consequence of unauthorized possession and use of last year’s exam, you will receive a 0 on the final. As we discussed in our meeting, I am extremely disappointed.  I will be in touch about the possibility of moving forward with proceedings for this violation. Prof. Sweeney"},

			{type: "dialog", speaker: "Text - Ryan", text: "You receive a text from Ryan:"},

			{type: "dialog", speaker: this._ryan, text: "You get Sweeney’s email?... Shit, what now? If we fail the class, don’t know about the job…  You ok?"},

			{type: "goto", page: "scene ending"},
		]; 

		return o;
	};

	MPLAY.Page8_3 = Page8_3;
}());
