// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page6_1
	 * @augments MPlay.MPlayPage
	 */
	var Page6_1 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page6_1.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page6_1.prototype.constructor = Page6_1;

	/**
	 * @override
	 */
	Page6_1.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		// FIXME : should be SCOTTIE's Bar
		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");
	};

	Page6_1.prototype._createFlowElements = function() {

		var ryan = "%" + this._ryan;
		var player = this._player;

		var o = null;

		o = [
			{type: "dialog", speaker: "Your phone", text: "Your cell phone pings with an email. You open it. Your project grade: B-"},			
			{type: "show", img: ryan, position: "center", expression: "sad", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Hey there. I was feeling down, so I decided to hit the gym to get out some frustration. You got the email right? About our grade?"},
			{type: "choices",
				choices :
					[{text: "Yeah. I'm with you. Feeling bad about our grade on that project."},
					{text : "Are you ok?"}]},

			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: ryan, position: "center", expression: "angry"},
			{type: "dialog", speaker: this._ryan, text: "Eh, yeah. I'm still sort of pissed. We had to rush Priya’s part of the project, and I feel like that's why we got that crappy grade. We both need to do well in this class… "},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: ryan, position: "center", expression: "neutral"},
			{type: "dialog", speaker: this._ryan, text: "You know what? It’ll be ok, we just need to make it through the final, and we’ll be starting our jobs in no time."},

			{type: "goto", page: "scene 8.a"},
		];

		return o;
	};

	MPLAY.Page6_1 = Page6_1;
}());
