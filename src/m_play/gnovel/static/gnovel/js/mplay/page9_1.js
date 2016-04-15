// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page9_1
	 * @augments MPlay.MPlayPage
	 */
	var Page9_1 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page9_1.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page9_1.prototype.constructor = Page9_1;

	/**
	 * @override
	 */
	Page9_1.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupCafeBackground();
	};

	Page9_1.prototype._createFlowElements = function() {

		var priya = "%" + this._priya;

		var o = null;

		o = [
			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Priya");
			}, label: "priyaRelationshipScore"},

			{type: "compare", leftop: "$priyaRelationshipScore", operator: "greater", rightop: 0, goTrue: "#R+", goFalse: "#R-"},

			{type: "nothing", label: "R+"},
			{type: "show", img: priya, position: "right", expression: "happy", waitUntilShown: false},
			{type: "show_ed_context", text: "Priya still has another year left at school, but keeps in contact with both you and Ryan. You suspect that there’s something happening between them, but so far they’ve been pretty secretive. She no longer uses codeHub on her assignments."},		
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			{type: "nothing", label: "R-"},
			{type: "show", img: priya, position: "right", waitUntilShown: false},
			{type: "show_ed_context", text: "Priya still has another year left at school, but you don’t really talk to her. Last you heard, she wasn’t talking to Ryan much either."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			{type: "nothing", label: "gotoed"},
			{type: "goto", page: "scene 10.c"},
		];

		return o;
	};

	Page9_1.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);
		
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page9_1.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		this._owner._ambient = this._owner.getSoundManager().play("Cafe-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page9_1 = Page9_1;
}());
