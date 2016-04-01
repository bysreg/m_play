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

		this.setupCafeBackground();
	};

	Page8_4.prototype._createFlowElements = function() {

		var cat = "%" + this._cat;
		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var professor = "%" + this._professor;
		var player = this._player;

		var o = null;

		o = [
			{type: "show_context", text: "A few days after the test..."},
			{type: "show_context", text:"you run into Priya and Cat at the Café"},

			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Priya");
			}, label: "priyaRelationshipScore1"},
			{type: "compare", leftop: "$priyaRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#pos-priya1", goFalse: "#comparepriya1"},
			
			{type: "nothing", label: "pos-priya1"},
			{type: "show", img: priya, expression: "sad", position: "right"},
			{type: "dialog", speaker: this._priya, text: player + " did you hear from Ryan?  He got caught for using that exam."},

			{type: "choices", choices : [
				{text: "What happened?"},
				{text: "Oh no..."},
				]},

			{type: "show", img: cat, expression: "thoughtful", position: "left"},
			{type: "dialog", speaker: this._cat, text: "There was a typo on last year's exam, and Ryan repeated it.  So they knew he had access to it."},
			{type: "show", img: priya, position: "right"},
			{type: "dialog", speaker: this._priya, text: "He told me he has to talk to Prof. Sweeney to sort it out. Good thing you didn’t use it too."},
			{type: "dialog", speaker: this._cat, text: "Yeah and good thing he didn't tell the professor that you saw the exam too - you'd be in trouble with him."},
			{type: "goto", page: "scene ending"},

			{type: "nothing", label: "comparepriya1"},
			{type: "compare", leftop: "$priyaRelationshipScore1", operator: "equal", rightop: 0, goTrue: "#zero-priya1", goFalse: "#neg-priya1"},

			{type: "nothing", label: "zero-priya1"},
			{type: "show", img: priya, expression: "sad", position: "right"},
			{type: "dialog", speaker: this._priya, text: "Did you hear from Ryan?  He got caught for using that exam."},

			{type: "choices", choices : [
				{text: "What happened?"},
				{text: "Oh no..."},
				]},

			{type: "show", img: cat, expression: "thoughtful", position: "left"},
			{type: "dialog", speaker: this._cat, text: "There was a typo on last year's exam, and Ryan repeated it.  They knew he had access to it."},
			{type: "show", img: priya, position: "right"},
			{type: "dialog", speaker: this._priya, text: "He told me he has to talk to Prof. Sweeney to sort it out."},
			{type: "dialog", speaker: this._cat, text: "You're lucky he didn't tell the professor that you saw the exam too - you'd be in trouble with him."},
			{type: "show", img: priya, expression: "angry", position: "right"},
			{type: "dialog", speaker: this._priya, text: "I guess you're in the clear."},
			{type: "goto", page: "scene ending"},

			{type: "nothing", label: "neg-priya1"},
			{type: "show", img: priya, expression: "sad", position: "right"},
			{type: "dialog", speaker: this._priya, text: "I want you to know that Ryan got in trouble for using that exam."},

			{type: "choices", choices : [
				{text: "What happened?"},
				{text: "Oh no..."},
				]},

			{type: "show", img: cat, expression: "thoughtful", position: "left"},
			{type: "dialog", speaker: this._cat, text: "There was a typo on last year's exam, and Ryan repeated it.  So they knew he had access to it."},
			{type: "show", img: priya, position: "right"},
			{type: "dialog", speaker: this._priya, text: "He told me he has to talk to Prof. Sweeney to sort it out."},
			{type: "dialog", speaker: this._cat, text: "You're lucky he didn't tell the professor that you saw the exam too - you'd be in trouble with him."},
			{type: "show", img: priya, expression: "angry", position: "right"},
			{type: "dialog", speaker: this._priya, text: "Yeah, I guess you're in the clear."},
			{type: "show", img: cat, position: "left"},
			{type: "dialog", speaker: this._cat, text: "Aren't you guys working at the same company after graduation?  That's going to be awkward.  Hopefully Ryan won't lose his offer."},
			{type: "show", img: priya, position: "right"},
			{type: "dialog", speaker: this._priya, text: "Let's hope."},
			{type: "goto", page: "scene ending"},
		];

		return o;
	};

	Page8_4.prototype._onUnload = function() {
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page8_4.prototype._onStart = function() {
		this._owner._ambient = this._owner.getSoundManager().play("Classroom-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page8_4 = Page8_4;
}());
