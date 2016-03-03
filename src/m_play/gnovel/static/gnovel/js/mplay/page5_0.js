// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page5_0
	 * @augments MPLAY.MPlayPage
	 */
	var Page5_0 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page5_0.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page5_0.prototype.constructor = Page5_0;

	/**
	 * @override
	 */
	Page5_0.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupClassBackground();
	};

	Page5_0.prototype._createFlowElements = function() {
		var professor = "%" + this._professor;	

		var o = null;

		o = [
			{type: "show", img: professor, expression: "happy", position: "center"},
			{type: "dialog", speaker: "Prof. Sweeney", text: "I hope you're making good progress on the projects!  Please make sure you get plenty of rest and build in lots of time to complete it.  It will probably take longer than you think it will.  Dismissed."},

			{type: "goto", page: "scene 6.b"},
		];

		return o;
	}

	MPLAY.Page5_0 = Page5_0;
}());
