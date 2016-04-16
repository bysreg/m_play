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

			{type: "compare", leftop: "$IntegrityScore", operator: "greater", rightop: 0, goTrue: "#pos-int", goFalse: "#neg-int"},

	// positive integrity
			{type: "nothing", label: "pos-int"},

			{type: "compare", leftop: "$ryanRelationshipScore", operator: "greater", rightop: 0, goTrue: "#I+R+", goFalse: "#I+R-"},

			{type: "nothing", label: "I+R+"},
			{type: "show", img: ryan, position: "left", expression: "happy", waitUntilShown: false},
			{type: "show_ed_context", text: "You and Ryan start working together after graduation. He was right, the job with TechFast was an incredible opportunity. You stay good friends, and Ryan credits you for saving his butt in Programming &amp; Society. You’re both currently working on a startup, making an app called CiteMe! It’s a reference app for students."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			{type: "nothing", label: "I+R-"},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "show_ed_context", text: "You and Ryan both start work at TechFast after graduation, but the whole situation in the Programming & Society class has strained your relationship. You see Ryan every day, and your conversations usually involve the weather."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

	// negative integrity
			{type: "nothing", label: "neg-int"},

			{type: "compare", leftop: "$ryanRelationshipScore", operator: "greater equal", rightop: 0, goTrue: "#I-R+", goFalse: "#I-R-"},

			{type: "nothing", label: "I-R+"},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "show_ed_context", text: "Ryan and you were nervous about starting work after that whole mess with Programming & Society. Your boss was not pleased after he heard about what happened with the exam, but did not rescind your job offers. You and Ryan remain good friends. Ryan swears he will never listen to his brother’s advice again."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

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

	Page9_0.prototype._createRandomPlaylist = function() {
		var playlist = null;
		playlist = [
					{audio:"Uc-girllaughing", playrate: 0.02},
					{audio:"Uc-mantalking", playrate: 0.05},
					{audio:"Uc-womantalking", playrate: 0.03},
					{audio:"Uc-steps", playrate: 0.1}
					];
		return playlist;
	};	

	Page9_0.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page9_0.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		this._owner._ambient = this._owner.getSoundManager().play("UC-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	/**
	 * @override
	 */
	Page9_0.prototype._update = function() {
		MPLAY.MPlayPage.prototype._update.call(this);

		this._multiTracksPlayer.shuffle();
	};	

	MPLAY.Page9_0 = Page9_0;
}());
