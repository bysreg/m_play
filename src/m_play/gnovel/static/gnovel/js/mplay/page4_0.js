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

		var isAssignmentGiven = 1;

		var o = null;

		o = [
			{type: "compare", leftop: isAssignmentGiven, operator: "equal", rightop: 1, goTrue: "#assignment_given", goFalse: "#assignment_notgiven"},

			{type: "show", img: priya, position: "center", label: "assignment_given"},
			{type: "dialog", speaker: "Priya", text: "Hey, listen.  About the other day with Ryan.  My roommate got in big trouble for sharing old assignments in a class.  That’s why I was a little upset with you guys."},
			{type: "choices", choices : [{text: "I’m sorry to hear about your roommate.", go: "#failed"}, {text : "Don’t worry about that.  What ended up happening to your roommate?", go : "#failed1"}]},
			{type: "dialog", speaker: "Priya", text: "She failed her course, and almost got kicked out of school.  She would have lost her visa.  Be careful next time, ok?", label: "failed1"},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},
			
			{type: "show", img: priya, position: "center", label: "assignment_notgiven"},
			{type: "dialog", speaker: "Priya", text: "I wanted to thank you for not giving Ryan the old CG homeworks.  My roommate got in trouble for something like that."},
			{type: "choices", choices : [{text: "1)	Oh yeah, no worries.", go: "#failed"}, {text : "2)	Yeah, you were right, it’s not worth the risk.  What happened to your roommate? ", relationship: {name: "priya", score: 1}, go : "#failed2"}]},
			{type: "dialog", speaker: "Priya", text: "She failed her course, and almost got kicked out of school.  She would have lost her visa.  Ever since then, I don’t ask for that stuff.", label: "failed2"},

			{type: "goto", page: "scene 6.a", label: "gonextscene"},
		];

		return o;
	}

	MPLAY.Page4_0 = Page4_0;
}());