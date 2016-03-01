// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page8_2
	 * @augments MPlay.MPlayPage
	 */
	var Page8_2 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page8_2.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page8_2.prototype.constructor = Page8_2;

	/**
	 * @override
	 */
	Page8_2.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupClassBackground();
	};

	Page8_2.prototype._createFlowElements = function() {

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
				]}, 


			{type: "dialog", speaker: this._professor, text: "Now, I know that wasn't the case on this year's exam.  Can you both explain how you made last year's mistake on this year's exam?", label: "first"},
			
			{type: "choices", choices : [
				{text: "You see-"}, 
				{text: "We just-"},
				]}, 


			{type: "dialog", speaker: this._professor, text: "Potential consequences of an academic violation are failing the exam, the course and possible expulsion from your graduate programs.  There is an appeals process as well, but before we go down that road, I'd like to hear from you.", label: "second"},

			{type: "dialog", speaker: this._professor, text: "RYAN, " + this._player + ", please tell me your side of the story."},

			{type: "dialog", speaker: "Context", text: "You receive an email. It reads: ..."},
			{type: "dialog", speaker: this._professor, text: "After much deliberation, I have come up with my own solution to address your violation:"},
			{type: "dialog", speaker: this._professor, text: "As a consequence of unauthorized possession and use of last year’s exam, you will need to retake the final, with the highest possible grade starting at the class average, an 80%."},
			{type: "dialog", speaker: this._professor, text: "As we discussed in our meeting, I will cut you some slack though I am extremely disappointed.  Since I believe you did not consciously act in bad faith, I will not be moving forward with proceedings for this violation.  Please take this as a learning experience to reflect on your actions."},

			{type: "dialog", speaker: "Context", text: "You receive a text from Ryan:"},
			{type: "dialog", speaker: this._ryan, text: "Hey!!  I passed too!  Got the same grade as you C.  Happy it turned out ok for us.  Definitely not taking any more advice from my bro anytime soon…"},

			]; 

		return o;
	};

	MPLAY.Page8_2 = Page8_2;
}());