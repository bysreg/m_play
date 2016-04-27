// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page9_0
	 * @augments MPlay.MPlayPage
	 */
	var Page9_0 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page9_0.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page9_0.prototype.constructor = Page9_0;

	/**
	 * @override
	 */
	Page9_0.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this._setEffect(false);

		this.setupUcBackground();
	};

	Page9_0.prototype._createFlowElements = function() {

		var ryan = "%" + this._ryan;

		var o = null;

		o = [
			{type: "custom", func: function(page){
				return page.getIntegrityManager().getIntegrity();
			}, label: "IntegrityScore"},
			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore"},

			/**
			* Ryan Relationship Scores
			*<2 = Bad
			*>2 = Neutral
			*>5 = Great
			*/
			{type: "compare", leftop: "$IntegrityScore", operator: "greater", rightop: 0, goTrue: "#pos-int", goFalse: "#neg-int"},

	// positive integrity
			{type: "nothing", label: "pos-int"},

			{type: "compare", leftop: "$ryanRelationshipScore", operator: "greater equal", rightop: 5, goTrue: "#I+R+", goFalse: "#I+ed2"},

			//positive relationship
			{type: "nothing", label: "I+R+"},
			{type: "show", img: ryan, position: "left", expression: "happy", waitUntilShown: false},
			{type: "show_ed_context", text: "You and Ryan start working together after graduation. He was right, the job with TechFast was an incredible opportunity. You stay good friends, and Ryan credits you helping him through Programming & Society. You’re both currently working on a startup, making an app called CiteMe! It’s a reference app for students."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			//neutral relationship
			{type: "nothing", label: "I+ed2"},
			{type: "compare", leftop: "$ryanRelationshipScore", operator: "greater equal", rightop: 2, goTrue: "#I+R0", goFalse: "#I+R-"},
			{type: "nothing", label: "I+R0"},
			{type: "show", img: ryan, position: "left", expression: "happy", waitUntilShown: false},
			{type: "show_ed_context", text: "You and Ryan both start work at TechFast after graduation, but the whole situation in the Programming & Society class has strained your relationship. You see Ryan every day, and your conversations usually involve the weather."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			//negative relationship
			{type: "nothing", label: "I+R-"},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "show_ed_context", text: "You and Ryan both start work at TechFast after graduation, but the whole situation in the Programming & Society class has strained your relationship. You see Ryan every day, and your conversations usually involve the weather."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

	// negative integrity
			{type: "nothing", label: "neg-int"},

			{type: "compare", leftop: "$ryanRelationshipScore", operator: "greater equal", rightop: 5, goTrue: "#I-R+", goFalse: "#I-ed2"},

			{type: "nothing", label: "I-R+"},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "show_ed_context", text: "Ryan and you were nervous about starting work after that whole mess with Programming & Society. Your boss was not pleased after he heard about what happened with the exam, but did not rescind your job offers. You and Ryan remain good friends. Ryan swears he will never listen to his brother’s advice again."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			//neutral relationship
			{type: "nothing", label: "I-ed2"},
			{type: "compare", leftop: "$ryanRelationshipScore", operator: "greater equal", rightop: 2, goTrue: "#I-R0", goFalse: "#I-R-"},
			{type: "nothing", label: "I-R0"},
			{type: "show", img: ryan, position: "left", expression: "happy", waitUntilShown: false},
			{type: "show_ed_context", text: "You and Ryan end up working together, but are no longer as close as you used to be. Things get awkward at work when your boss finds out about what happened in your last semester in school. Ryan ends up leaving TechFast to work at a startup somewhere in Pittsburgh. He seems to be doing well, as far as you can tell from your newsfeed."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			//negative relationship
			{type: "nothing", label: "I-R-"},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "show_ed_context", text: "You and Ryan end up working together, but are no longer as close as you used to be. Things get awkward at work when your boss finds out about what happened in your last semester in school. Ryan ends up leaving TechFast to work at a startup somewhere in Pittsburgh. He seems to be doing well, as far as you can tell from your newsfeed."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			{type: "nothing", label: "gotoed"},
			// {type: "hide", img: ryan},
			{type: "goto", page: "scene 10.b", transition: "fade"},
		];

		return o;
	};

	Page9_0.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		var integrityScore = this.getIntegrityManager().getIntegrity();
		var relationshipScore = this.getRelationshipManager().getRelationship("Ryan");

		var ed = "Ed-music-bad";
		if (integrityScore > 0 && relationshipScore > 0) {
			ed = "Ed-music-happy";
		};

		this._owner._ambient = this._owner.getSoundManager().play(ed, {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 1.0});
		// this._tweenVolumeIn();
	};

	MPLAY.Page9_0 = Page9_0;
}());
