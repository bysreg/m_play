// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page9_3
	 * @augments MPlay.MPlayPage
	 */
	var Page9_3 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page9_3.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page9_3.prototype.constructor = Page9_3;

	/**
	 * @override
	 */
	Page9_3.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this._setEffect(false);

		this.setupClassBackground();
	};

	Page9_3.prototype._createFlowElements = function() {

		var professor = "%" + this._professor;

		var o = null;

		o = [
			{type: "custom", func: function(page){
				return page.getIntegrityManager().getIntegrity();
			}, label: "IntegrityScore"},

			{type: "compare", leftop: "$IntegrityScore", operator: "greater", rightop: 0, goTrue: "#I+", goFalse: "#I-"},
			
			{type: "nothing", label: "I+"},
			{type: "show", img: professor, position: "center", expression: "happy", waitUntilShown: false},
			{type: "show_ed_context", text: "Professor Sweeney still teaches Programming &amp; Society. You kept in touch with him, and he often sends you articles on the state of affairs for technology in the modern world. You usually read them."},		
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			{type: "nothing", label: "I-"},
			{type: "show", img: professor, position: "center", waitUntilShown: false},
			{type: "show_ed_context", text: "Professor Sweeney still teaches Programming &amp; Society. He has since changed his exams to avoid situations like the one you and Ryan caused."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			{type: "nothing", label: "gotoed"},
			{type: "goto", page: "scene ending", transition: "fade"},
		];

		return o;
	};

	Page9_3.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);
		
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page9_3.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		this._owner._ambient = this._owner.getSoundManager().play("Class-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page9_3 = Page9_3;
}());
