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

		this.setupHomeBackground();
	};

	Page6_2.prototype._createFlowElements = function() {

		var ryan = "%" + this._ryan;
		var player = this._player;
		var closephone = "%" + this._closephone;

		var o = null;

		o = [
			{type:"show_context", text:"You head home..."},
			{type: "dialog", speaker: "Your phone", text: "Your cell phone pings with an email. You open it."},

			// phone email exchange begins
			{type: "show", img: closephone, waitUntilShown: false},
			{type: "phone_textbox",
				label: "email",
				text: "Dear "+ player +", Priya, Ryan & Cat, Your group project grade: B-. I will hand back your comments in greater detail in class. -Prof Sweeney "},
			{type: "hide_phone_textbox", dialog: "$email"},
			{type: "hide", img: closephone},
			// phone email exchange ends

			{type: "goto", page: "scene 8.a"},
		];

		return o;
	};

	Page6_2.prototype._onUnload = function() {
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page6_2.prototype._onStart = function() {
		// this._owner._ambient = this._owner.getSoundManager().play("Home-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		// this._tweenVolumeIn();
	};

	MPLAY.Page6_2 = Page6_2;
}());
