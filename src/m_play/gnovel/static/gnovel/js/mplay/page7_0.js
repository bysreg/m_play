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

		this._closephoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 160), 519, 950);
		this._closephoneImg.material.opacity = 0;

		this._setObjectTag(this._closephone, this._closephoneImg);
	};

	Page7_0.prototype._createFlowElements = function() {

		var professor = "%" + this._professor;	
		var player = this._player;
		var closephone = "%" + this._closephone;

		var o = null;

		o = [
			//{type: "show", img: professor, position: "center", waitUntilShown: false},
			//{type: "dialog", speaker: "Your phone", text: "I want to remind everyone about our final coming up next week. Please visit me during office hours, I am here to help..."},			
			// {type: "show_phone_notif"},	

			// phone email exchange begins
			{type: "show", img: closephone},
			{type: "phone_textbox",
				label: "email_box",
				bgOffsetY: -80,
				bgHeight: 300,
				bgWidth: 400,
				y: 250,
				charLine: 37,
				text: "I want to remind everyone about our final coming up next week. Please visit me during office hours, I am here to help... - Prof. Sweeney"},
			{type: "hide_phone_textbox", dialog: "$email_box"},
			{type: "hide", img: closephone},
			// phone email exchange ends

			{type: "goto", page: "scene 8.b"},
		];

		return o;
	};

	MPLAY.Page7_0 = Page7_0;
}());
