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

		this.setupClassBackground();
	};

	Page1_0.prototype._createFlowElements = function() {
		var professor = "%" + this._professor;
		var o = null;

		o = [
			{type: "show_context", text:"A few days later, in Programming & Society class…", waitUntilShown: true},
			{type: "show", img: professor, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Prof. Sweeney", text: "My aim in Programming and Society is to help you become a better programmer. "},
			{type: "dialog", speaker: "Prof. Sweeney", text: "In the The second half of each lesson, you will break into your assigned study groups."},
			{type: "dialog", speaker: "Prof. Sweeney", text: "Please use this time wisely, you’ll have a group project later in the semester."},
			{type: "goto", page: "scene 2.b"},
		];

		return o;
	};

	/**
	 * @override
	 */
	Page1_0.prototype._onStart = function() {
		this._owner._ambient = this._owner.getSoundManager().play("Classroom-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	Page1_0.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	MPLAY.Page1_0 = Page1_0;
}());
