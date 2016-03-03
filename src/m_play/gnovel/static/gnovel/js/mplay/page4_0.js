// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page4_0
	 * @augments MPLAY.MPlayPage
	 */
	var Page4_0 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page4_0.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page4_0.prototype.constructor = Page4_0;

	/**
	 * @override
	 */
	Page4_0.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");

	};

	Page4_0.prototype._createFlowElements = function() {
		var priya = "%" + this._priya;

		var cgAssignmentStatus = this._owner.getSavedData("cgAssignmentStatus");

		// variables from scene 2
		var isAssignmentGiven = (cgAssignmentStatus > 0);

		var o = null;

		o = [
			{type: "compare", leftop: isAssignmentGiven, operator: "equal", rightop: 1, goTrue: "#assignment_given", goFalse: "#assignment_notgiven"},

			{type: "show", img: priya, expression: "thoughtful", position: "center", label: "assignment_given"},
			{type: "dialog", speaker: "Priya", text: "Hey, listen.  About the other day with Ryan.  My roommate got in big trouble for sharing old assignments in a class.  That’s why I was a little upset with you guys."},
			{type: "choices", choices : [{text: "I’m sorry to hear about your roommate.", go: "#failed"}, {text : "Don’t worry about that.  What ended up happening to your roommate?", go : "#failed1"}]},
			{type: "dialog", speaker: "Priya", text: "She failed her course, and almost got kicked out of school.  She would have lost her visa.  Be careful next time, ok?", label: "failed1"},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},
			
			{type: "show", img: priya, position: "center", label: "assignment_notgiven"},
			{type: "dialog", speaker: "Priya", text: "I wanted to thank you for not giving Ryan the old CG homeworks.  My roommate got in trouble for something like that."},
			{type: "choices", choices : [{text: "Oh yeah, no worries.", go: "#failed"}, {text : "Yeah, you were right, it’s not worth the risk.  What happened to your roommate? ", relationship: {name: "priya", score: 1}, go : "#failed2"}]},
			// should be a sad priya here.
			{type: "dialog", speaker: "Priya", text: "She failed her course, and almost got kicked out of school.  She was an idiot, did something stupid.", label: "failed2"},

			{type: "goto", page: "scene 6.a", label: "gonextscene"},
		];

		return o;
	}

	MPLAY.Page4_0 = Page4_0;
}());
