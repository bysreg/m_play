// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class PageTest
	 * @augments MPlay.MPlayPage
	 */
	var PageTest = function() {
		MPLAY.MPlayPage.call(this);
	};

	PageTest.prototype = Object.create(MPLAY.MPlayPage.prototype);
	PageTest.prototype.constructor = PageTest;

	/**
	 * @override
	 */
	PageTest.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");

		this._yourphoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 140), 250, 458);
		this._yourphone = "yourphone";
		this._setObjectTag(this._yourphone, this._yourphoneImg);		
	};

	PageTest.prototype._createFlowElements = function() {
		var professor = "%" + this._professor;
		var ryan = "%" + this._ryan;
		var catsphone = "%" + this._catsphone;
		var closephone = "%" + this._closephone;
		var yourphone = "%" + this._yourphone;		
		var player = this._player;
		var priya = "%" + this._priya;

		var o = null;

		o = [
			{type: "show", expression:"happy", position:"left", img: ryan},
			{type: "dialog", speaker: this._ryan, text: "happy"},
			{type: "show", img: ryan, position: "left"},			
			{type: "dialog", speaker: this._ryan, text: "neutral"},
			{type: "show", expression:"happy", position:"left", img: ryan},
			{type: "dialog", speaker: this._ryan, text: "happy"},
			
			{type: "show", position:"left", img: ryan},
			{type: "dialog", speaker: this._ryan, text: "ye yeey"},

			{type: "show", img: priya, expression:"thoughtful", position: "center", waitUntilShown: false, flip: true},
			{type: "dialog", speaker: this._ryan, text: "bla bla bla"},
			
			{type: "show", img: priya, expression:"thoughtful", position: "right", waitUntilShown: false, flip: true},
			{type: "dialog", speaker: this._ryan, text: "bla bla bla"},
		];

		return o;
	};

	MPLAY.PageTest = PageTest;
}());
