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
			{type: "show_ed_context", text: "Professor Sweeney still teaches Programming & Society. He likes to email his former students articles on the state of affairs for technology in the modern world. You usually read them."},		
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			{type: "nothing", label: "I-"},
			{type: "show", img: professor, position: "center", waitUntilShown: false},
			{type: "show_ed_context", text: "Professor Sweeney still teaches Programming & Society. He has since rewritten his syllabus to avoid situations like the one Ryan caused."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			{type: "nothing", label: "gotoed"},
			{type: "goto", page: "scene ending", transition: "fade"},
		];

		return o;
	};

	/**
	 * @override
	 */
	Page9_3.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	MPLAY.Page9_3 = Page9_3;
}());
