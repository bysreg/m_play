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
	};

	PageTest.prototype._createFlowElements = function() {

		var ryan = "%" + this._ryan;
		var catsphone = "%" + this._catsphone;
		var closephone = "%" + this._closephone;
		var yourphone = "%" + this._yourphone;		
		var player = this._player;

		var o = null;

		o = [
			
			{type: "dialog", speaker: "Your phone", text: "Awesome!  Both you and Priya are in my group.  This is Priya.  She’s here from India,and an excellent study buddy."},
			{type: "dialog", speaker: "Your phone", text: "Ryan here helped me so much last semester.  Always goes out of his way.  Nice to meet you."},
			{type: "dialog", speaker: "Your phone", text: "Hey, my name is Cat.  Uhh… I’m in the business school.  Nice to meet you guys… sorry I’m a little all over the place.  I lost my phone yesterday –"},
			{type: "dialog", speaker: "Your phone", text: "Were you at Scottie's Bar yesterday?  We found a phone there."},
			{type: "dialog", speaker: "Your phone", text: "Oh my God, do you guys have it with you?"},

		];

		return o;
	};

	/**
	 * @override
	 */
	PageTest.prototype._onUnload = function() {
		this._owner.saveData("catsPhoneStatus", this._catsPhoneStatus);
	};

	MPLAY.PageTest = PageTest;
}());
