// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page7_0
	 * @augments MPlay.MPlayPage
	 */
	var Page7_0 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page7_0.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page7_0.prototype.constructor = Page7_0;

	/**
	 * @override
	 */
	Page7_0.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupClassBackground();
	};

	Page7_0.prototype._createFlowElements = function() {

		var professor = "%" + this._professor;	
		var player = this._player;

		var o = null;

		o = [
			{type: "show", img: professor, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Your phone", text: "I want to remind everyone about our final coming up next week. Please visit me during office hours, I am here to help..."},			
		];

		return o;
	};

	MPLAY.Page7_0 = Page7_0;
}());
