// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page6_2
	 * @augments MPlay.MPlayPage
	 */
	var Page6_2 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page6_2.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page6_2.prototype.constructor = Page6_2;

	/**
	 * @override
	 */
	Page6_2.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		// FIXME : should be at HOME
		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");
	};

	Page6_2.prototype._createFlowElements = function() {

		var ryan = "%" + this._ryan;
		var player = this._player;

		var o = null;

		o = [
			{type: "dialog", speaker: "Your phone", text: "Your cell phone pings with an email. You open it. Your project grade: B-"},			

			{type: "goto", page: "scene 8.a"},
		];

		return o;
	};

	MPLAY.Page6_2 = Page6_2;
}());
