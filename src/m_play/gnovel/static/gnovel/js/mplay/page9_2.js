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

		this._setEffect(false);

		this.setupGymBackground();
	};

	Page9_2.prototype._createFlowElements = function() {

		var cat = "%" + this._cat;

		var o = null;

		o = [
			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Cat");
			}, label: "catRelationshipScore"},
			/**
			* Cat Relationship Scores
			*<0 = Bad
			*>0 = Neutral
			*>2 = Great
			*/
			{type: "compare", leftop: "$catRelationshipScore", operator: "greater equal", rightop: 2, goTrue: "#R+", goFalse: "#ed2"},

			//positive relationship ending
			{type: "nothing", label: "R+"},
			{type: "show", img: cat, position: "left", waitUntilShown: false},
			{type: "show_ed_context", text: "Cat ended up getting a finance job in New York after graduation. You still keep in touch with her, and have made plans to visit her later this month. She’s extended an open invitation for you to visit her, and her new apartment in Brooklyn."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			//neutral relationship ending
			{type: "nothing", label: "ed2"},
			{type: "compare", leftop: "$catRelationshipScore", operator: "greater equal", rightop: 0, goTrue: "#R0", goFalse: "#R-"},
			{type: "nothing", label: "R0"},
			{type: "show", img: cat, position: "left", waitUntilShown: false},
			{type: "show_ed_context", text: "Cat moved up to New York after graduating to work in finance. Sometimes you picture her toiling away in her cubicle, but otherwise she doesn’t cross your mind much."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			//bad relationship ending
			{type: "nothing", label: "R-"},
			{type: "show", img: cat, position: "left", waitUntilShown: false},
			{type: "show_ed_context", text: "Cat moved up to New York after graduating to work in finance. Sometimes you picture her toiling away in her cubicle, but otherwise she doesn’t cross your mind much."},
			{type: "jump", condition: true, goTrue: "#gotoed", goFalse: 1000},

			{type: "nothing", label: "gotoed"},
			{type: "goto", page: "scene 10.d", transition: "fade"},
		];

		return o;
	};

	MPLAY.Page9_2 = Page9_2;
}());
