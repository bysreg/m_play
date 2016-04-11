// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page9_2
	 * @augments MPlay.MPlayPage
	 */
	var Page9_2 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page9_2.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page9_2.prototype.constructor = Page9_2;

	/**
	 * @override
	 */
	Page9_2.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupGymBackground();
	};

	Page9_2.prototype._createFlowElements = function() {

		var cat = "%" + this._cat;

		var o = null;

		o = [
			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Cat");
			}, label: "catRelationshipScore"},

			{type: "compare", leftop: "$catRelationshipScore", operator: "greater equal", rightop: 0, goTrue: "#R+", goFalse: "#R-"},

			{type: "nothing", label: "R+"},
			{type: "show", img: cat, position: "left", waitUntilShown: false},
			{type: "show_ed_context", text: "Cat ended up getting a job in finance after graduating.  You still keep in touch with her.  Last time you spoke she was enjoying her job, but still felt a little stressed… as expected."},		
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			{type: "nothing", label: "R-"},
			{type: "show", img: cat, position: "left", waitUntilShown: false},
			{type: "show_ed_context", text: "Last you heard, Cat moved up to New York after graduating to work in finance.  You sometimes picture her toiling away in her cubicle, but otherwise she doesn’t cross your mind much."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			{type: "nothing", label: "gotoed"},
			{type: "goto", page: "scene ending"},
		];

		return o;
	};

	Page9_2.prototype._onUnload = function() {
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page9_2.prototype._onStart = function() {
		this._owner._ambient = this._owner.getSoundManager().play("Gym-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page9_2 = Page9_2;
}());
