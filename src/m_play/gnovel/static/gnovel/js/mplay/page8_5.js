// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page8_5
	 * @augments MPlay.MPlayPage
	 */
	var Page8_5 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page8_5.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page8_5.prototype.constructor = Page8_5;

	/**
	 * @override
	 */
	Page8_5.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupCafeBackground();
	};

	Page8_5.prototype._createFlowElements = function() {

		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var professor = "%" + this._professor;
		var player = this._player;
		var r_posRel = 4;
		var r_neuRel = 1;

		var o = null;

		o = [
			{type: "show_context", text: "A few days after the test, you run into Ryan at the Café"},
			{type: "show", img: ryan, expression: "sad"},
			{type: "dialog", speaker: this._ryan, text: "Hey, do you have a sec?"},
			{type: "dialog", speaker: this._ryan, text: "You know that test I showed you?  Priya was right – we couldn’t use it."},
			{type: "dialog", speaker: this._ryan, text: "He asked me if anyone else had access to it.  Sweeney called me in, asked me point blank, and I panicked…"},
			{type: "dialog", speaker: this._ryan, text: "I told him I had shown it to you.  I’m so sorry… I didn’t know what else to say.  He wants to see you and have a conversation."},
			{type: "hide", img: ryan},

			{type: "show_phone_notif"},

			// phone email exchange begins
			{type: "open_phone", layout:"email", subject: "Academic Violation", from: "Prof. Sweeney", email: "sweeney@andrew.cmu.edu",
					text: "Dear "+player+", // After much deliberation, I will address your violation of the University Policy on Academic Integrity with the following: // As a consequence of unauthorized use of last year’s exam, you will need to retake the take home final.  I will cut you some slack.  I will be formally advancing this violation to the Division of Student Affairs for additional follow up.  If I discover an additional violation in this course, I will be reporting that as well.  There is no statute of limitations in reporting a violation. // Please take this as a learning experience to reflect on your choices. // -Prof. Sweeney"},
			{type: "close_phone"},

			{type: "show_context", text: "You receive a text from Ryan"},

			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "greater equal", rightop: r_posRel, goTrue: "#pos-ryan1", goFalse: "#compareryan1"},

			{type: "nothing", label: "pos-ryan1"},
			// phone exchange begins
			{type: "open_phone", layout:"text", people: [this._ryan]},
			{type: "add_phone_textbox",
				speaker: this._ryan,
				text: player + "- how did it go?  Sweeney is giving me a 0 on the final.  I’m sorry I dragged you into this."},
			{type: "close_phone"},
			{type: "goto", page: "scene 10.a"},

			{type: "nothing", label: "compareryan1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "greater equal", rightop: r_neuRel, goTrue: "#zero-ryan1", goFalse: "#neg-ryan1"},

			{type: "nothing", label: "zero-ryan1"},
			// phone exchange begins
			{type: "open_phone", layout:"text", people: [this._ryan]},
			{type: "add_phone_textbox",
				speaker: this._ryan,
				text: "Sweeney is giving me a 0 on the final – u?  I’m waiting to hear back from Student Affairs"},
			{type: "close_phone"},
			{type: "goto", page: "scene 10.a"},

			{type: "nothing", label: "neg-ryan1"},
			// phone exchange begins
			{type: "open_phone", layout:"text", people: [this._ryan]},
			{type: "add_phone_textbox",
				speaker: this._ryan,
				text: "Got a 0.  Waiting to hear back from Student Affairs…"},
			{type: "close_phone"},
			{type: "goto", page: "scene 10.a"},
		];

		return o;
	};

	Page8_5.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page8_5.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		this._owner._ambient = this._owner.getSoundManager().play("Cafe-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page8_5 = Page8_5;
}());
