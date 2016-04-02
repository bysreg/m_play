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

		this.setupCafeBackground();
	};

	Page4_0.prototype._createFlowElements = function() {
		var priya = "%" + this._priya;
		var player = this._player;

		var cgAssignmentStatus = this._owner.getSavedData("cgAssignmentStatus");

		// variables from scene 2
		var isAssignmentGiven = (cgAssignmentStatus > 0);

		var o = null;

		o = [
			{type: "show_context", text:"At the library..."},			
			{type: "compare", leftop: isAssignmentGiven, operator: "equal", rightop: 1, goTrue: "#assignment_given", goFalse: "#assignment_notgiven"},

			{type: "nothing", label: "assignment_given"},
			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Priya");
			}, label: "priyaRelationshipScore1"},
			{type: "compare", leftop: "$priyaRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#thoughtful", goFalse: "#neutural"},
			
			{type: "nothing", label: "thoughtful"},
			{type: "show", img: priya, expression: "thoughtful", position: "center", waitUntilShown: false},
			{type: "custom", func: function(page) {
				page.getOwner().getSoundManager().play("Hey-Priya");
			}},
			{type: "dialog", speaker: "Priya", text: "Hey, "+ player +".  About the other day with Ryan.  My roommate got in big trouble for sharing old assignments in a class.  That’s why I got upset."},
			{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

			{type: "nothing", label: "neutural"},
			{type: "show", img: priya, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "About the other day with Ryan. Be careful about what you share with classmates. My roommate got in big trouble for sharing old assignments in a class."},
			{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

			{type: "nothing", label: "choices1"},
			{type: "choices", choices : [{text: "I’m sorry to hear about your roommate.", go: "#failed"}, {text : "Don’t worry about that.  What ended up happening to your roommate?", go : "#failed"}]},
			{type: "show", img: priya, expression: "sad", position: "center", waitUntilShown: false, label: "failed"},
			{type: "dialog", speaker: "Priya", text: "She failed her course, and almost got kicked out of school.  She was an idiot, did something stupid."},
			{type: "dialog", speaker: "Priya", text: "You know, it’s tough if you’re an international student. The stakes are higher."},			
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},

			{type: "nothing", label: "assignment_notgiven"},
			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Priya");
			}, label: "priyaRelationshipScore2"},
			{type: "compare", leftop: "$priyaRelationshipScore2", operator: "greater", rightop: 0, goTrue: "#happy", goFalse: "#thoughtful2"},

			{type: "nothing", label: "happy"},
			{type: "show", img: priya, expression: "happy", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "I was so relieved when you didn’t give Ryan the old CG homeworks. My roommate got in trouble for something like that."},
			{type: "jump", condition: true, goTrue: "#choices2", goFalse: "#choices2"},

			{type: "nothing", label: "thoughtful2"},
			{type: "show", img: priya, expression: "thoughtful", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "It’s good you didn’t give Ryan the old CG homeworks.  My roommate got in trouble for something like that."},
			{type: "jump", condition: true, goTrue: "#choices2", goFalse: "#choices2"},

			{type: "nothing", label: "choices2"},
			{type: "choices", choices : [{text: "Oh yeah, no worries.", go: "#failed2"}, {text : "Yeah, you were right, it’s not worth the risk.  What happened to your roommate? ", go : "#failed2"}]},
			
			{type: "nothing", label: "failed2"},
			{type: "show", img: priya, expression: "sad", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "She failed her course, and almost got kicked out of school.  She was an idiot, did something stupid."},
			{type: "dialog", speaker: "Priya", text: "You know, it’s tough if you’re an international student. The stakes are higher."},			

			{type: "goto", page: "scene 6.a", label: "gonextscene"},
		];

		return o;
	};

	Page4_0.prototype._onStart = function() {
		this._owner._ambient = this._owner.getSoundManager().play("Cafe-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	Page4_0.prototype._onUnload = function() {
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	}

	MPLAY.Page4_0 = Page4_0;
}());
