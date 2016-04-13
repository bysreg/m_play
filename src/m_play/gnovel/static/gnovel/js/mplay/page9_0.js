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
			{type: "show_ed_context", text: "You and Ryan start working together after graduation. He was right, the job was an incredible opportunity. You stay good friends, and Ryan credits you for saving his butt in Programming & Society."},		
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			{type: "nothing", label: "I+R-"},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "show_ed_context", text: "You and Ryan both start work after graduation. But the whole situation in the Programming & Society class has strained your relationship. You two are no longer as close as you used to be."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

	// negative integrity			
			{type: "nothing", label: "neg-int"},

			{type: "compare", leftop: "$ryanRelationshipScore", operator: "greater equal", rightop: 0, goTrue: "#I-R+", goFalse: "#I-R-"},

			{type: "nothing", label: "I-R+"},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "show_ed_context", text: "Ryan and you were nervous about starting work after that whole mess with Programming & Society.  Your boss was not too pleased after he heard about what happened with the exam.  You and Ryan remain good friends.  Ryan swears he will never listen to his brother’s advice again."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			{type: "nothing", label: "I-R-"},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "show_ed_context", text: "You and Ryan end up working together.  Things get awkward at work when your boss finds out about what happened in your last semester in school.  You two are no longer as close as you used to be."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			{type: "nothing", label: "gotoed"},
			{type: "goto", page: "scene ending"},
		];

		return o;
	};

	Page9_0.prototype._onUnload = function() {
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page9_0.prototype._onStart = function() {
		this._owner._ambient = this._owner.getSoundManager().play("UC-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page9_0 = Page9_0;
}());