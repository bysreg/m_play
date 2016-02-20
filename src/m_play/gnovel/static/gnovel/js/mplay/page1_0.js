// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page1_0
	 * @augments MPLAY.MPlayPage
	 */
	var Page1_0 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page1_0.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page1_0.prototype.constructor = Page1_0;

	/**
	 * @override
	 */
	Page1_0.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);		

		this.setBackground("/static/gnovel/res/textures/backgrounds/classroom.png");

		//create images
		this._professorImg = this.createImage("/static/gnovel/res/textures/char/sweeney-neutral.png", new THREE.Vector3(75, -160, 180), 500, 858);

		var pageObj = this;

		this._professorImg.material.opacity = 0;

		this._professor = "professor";

		// add object tags
		this._setObjectTag(this._professor, this._professorImg);
	};

	Page1_0.prototype._createFlowElements = function() {
		var professor = "%professor";
		var o = null;

		o = [
			{type: "show", img: professor, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Prof. Sweeney", text: "My aim in Programming and Society is to help you become a better programmer. Technology impacts how society operates. I will challenge you to look deeper into the programs, apps, and technologies that you use."},
			{type: "dialog", speaker: "Prof. Sweeney", text: "The second half of each lesson will break into your assigned study groups. Please use this time wisely, you’ll have a group project later in the semester."}, 
			{type: "hide", img: professor},
			{type: "goto", page: "scene 2.b"},
		];

		return o;
	}

	MPLAY.Page1_0 = Page1_0;
}());
