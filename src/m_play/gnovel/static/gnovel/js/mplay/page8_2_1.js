// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page8_2_1
	 * @augments MPlay.MPlayPage
	 */
	var Page8_2_1 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page8_2_1.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page8_2_1.prototype.constructor = Page8_2_1;

	/**
	 * @override
	 */
	Page8_2_1.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupUcBackground();
	};

	Page8_2_1.prototype._createFlowElements = function() {

		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var professor = "%" + this._professor;
		var player = this._player;
		var closephone = "%" + this._closephone;

		var o = null;

		o = [
			{type: "show_context", text: "A few days later"},


			{type: "show_phone_notif"},

			// phone email exchange begins
			{type: "open_phone", layout:"email", subject: "Academic Violation", from: "Prof. Sweeney", email: "sweeney@andrew.cmu.edu",
				text: "After much deliberation, I have decided to address your violation of the University’s Policy on Academic Integrity with the following action: As a consequence of unauthorized possession and use of last year’s exam, you will need to retake the take home exam, which will be different from the exam previously provided this semester. As we discussed in our meeting, I will cut you some slack though I am extremely disappointed.  I will be formally advancing this violation to the Division of Student Affairs for additional follow up.  Know that if I am made aware of an additional violation in this course, I will be reporting that as well.  There is no statute of limitations in reporting a violation.  Please take this as a learning experience to reflect on your actions.  -Prof. Sweeney"},
			{type: "close_phone"},

			{type: "show_context", text: "You receive a text from Ryan"},

			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#pos-ryan1", goFalse: "#compareryan1"},

			{type: "nothing", label: "pos-ryan1"},
			// phone exchange begins
			{type: "open_phone", layout:"text", people: [this._ryan]},
			{type: "add_phone_textbox",
				speaker: this._ryan,
				text: "Woo!!  I got a C, like you. Happy it turned out ok for us, Sweeney definitely cut us a break on that final."},
			{type: "add_phone_textbox",
				speaker: this._ryan,
				text: "He could have failed us. Sorry I dragged you into this. Sucks about that violation though."},
			{type: "close_phone"},
			{type: "goto", page: "scene 10.a"},

			{type: "nothing", label: "compareryan1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "equal", rightop: 0, goTrue: "#zero-ryan1", goFalse: "#neg-ryan1"},

			{type: "nothing", label: "zero-ryan1"},
			// phone exchange begins
			{type: "open_phone", layout:"text", people: [this._ryan]},
			{type: "add_phone_textbox",
				speaker: this._ryan,
				text: "Did you pass?  I got a C, like you.  Sweeney cut us a break… I found out that we could have failed for that.  Sucks about the violation."},
			{type: "close_phone"},
			{type: "goto", page: "scene 10.a"},

			{type: "nothing", label: "neg-ryan1"},
			// phone exchange begins
			{type: "open_phone", layout:"text", people: [this._ryan]},
			{type: "add_phone_textbox",
				speaker: this._ryan,
				text: "Same as you – got a C.  Sucks about that violation."},
			{type: "close_phone"},
			{type: "goto", page: "scene 10.a"},
		];

		return o;
	};

	Page8_2_1.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page8_2_1.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		this._owner._ambient = this._owner.getSoundManager().play("Office-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page8_2_1 = Page8_2_1;
}());
