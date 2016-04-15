// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page8_2
	 * @augments MPlay.MPlayPage
	 */
	var Page8_2 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page8_2.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page8_2.prototype.constructor = Page8_2;

	/**
	 * @override
	 */
	Page8_2.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupOfficeBackground();
	};

	Page8_2.prototype._createFlowElements = function() {

		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var professor = "%" + this._professor;
		var player = this._player;
		var closephone = "%" + this._closephone;

		var o = null;

		o = [
			{type: "show_context", text: "A few days after the test,"},
			{type: "show_context", text: "Professor Sweeny calls you and Ryan to his office"},
			{type: "show", img: professor, expression: "sad", position: "center"},
			{type: "dialog", speaker: this._professor, text: "I noticed a very strange mistake that only you two made on the take home exam.  You see, last year there was an error on one of the prompts."},

			{type: "choices", choices : [
				{text: "I can explain-"},
				{text: "But Professor-"},
				],
			seconds: 5},


			{type: "dialog", speaker: this._professor, text: "Now, I know that wasn't the case on this year's exam.  Can you both explain how you made last year's mistake on this year's exam?"},

			{type: "choices", choices : [
				{text: "You see-"},
				{text: "We just-"},
				],
			seconds: 5},


			{type: "dialog", speaker: this._professor, text: "Potential consequences of an academic violation are failing the exam, the course and possible expulsion from your programs."},
			{type: "dialog", speaker: this._professor, text: "There is an appeals process as well, but before we go down that road, I'd like to hear from you."},
			{type: "dialog", speaker: this._professor, text: "There is a quote from Andrew Carnegie I always use."},
			{type: "dialog", speaker: this._professor, text: "'As I grow older, I pay less attention to what men say.  I just watch what they do.'"},
			{type: "dialog", speaker: this._professor, text: "RYAN, " + this._player + ", please explain what happened."},
			{type: "hide", img: this._professor},

			{type: "nothing", label: "email"},
			{type: "show_phone_notif"},

			// phone email exchange begins
			{type: "show", img: closephone, waitUntilShown: false},
			{type: "phone_textbox",
				label: "phone_bg",
				bgOffsetY: -230,
				bgOffsetX: -15,
				bgHeight: 790,
				bgWidth: 1230,
				y: 250,
				charLine: 37,
				bgPath: "/static/gnovel/res/textures/Email-graphic.png",
				waitUntilShown: false,
				text: ""},
			{type: "phone_textbox",
				label: "address_from",
				bgHeight: 10,
				bgWidth: 10,
				x: -170,
				y: 230,
				dontShowBg: true,
				text: "From: Prof. Sweeney",
				messageAlign: "left",
				waitUntilShown: false,
				},
			{type: "phone_textbox",
				label: "address_to",
				bgHeight: 10,
				bgWidth: 10,
				x: -170,
				y: 200,
				dontShowBg: true,
				text: "To: " + player,
				messageAlign: "left",
				waitUntilShown: false,
				},
			{type: "phone_textbox",
				label: "email_subject",
				bgHeight: 10,
				bgWidth: 10,
				x: -170,
				y: 100,
				dontShowBg: true,
				charLine: 40,
				text: "Subject: Academic Violation",
				messageAlign: "left",
				waitUntilShown: false,
				},
			{type: "phone_textbox",
				label: "email_textbox",
				bgHeight: 10,
				bgWidth: 10,
				y: 40,
				charLine: 37,
				dontShowBg: true,
				text: "After much deliberation, I have decided to address your violation of the University’s Policy on Academic Integrity with the following action: As a consequence of unauthorized possession and use of last year’s exam, you will need to retake the take home exam, which will be different from the exam previously provided this semester. As we discussed in our meeting, I will cut you some slack though I am extremely disappointed.  I will be formally advancing this violation to the Division of Student Affairs for additional follow up.  Know that if I am made aware of an additional violation in this course, I will be reporting that as well.  There is no statute of limitations in reporting a violation.  Please take this as a learning experience to reflect on your actions.  -Prof. Sweeney"},
			{type: "hide_phone_textbox", dialog: "$phone_bg"},
			{type: "hide_phone_textbox", dialog: "$address_from"},
			{type: "hide_phone_textbox", dialog: "$address_to"},
			{type: "hide_phone_textbox", dialog: "$email_subject"},
			{type: "hide_phone_textbox", dialog: "$email_textbox"},
			{type: "hide", img: closephone},

			{type: "show_context", text: "You receive a text from Ryan"},


			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#pos-ryan1", goFalse: "#compareryan1"},

			{type: "nothing", label: "pos-ryan1"},
			// phone exchange begins
			{type: "show", img: closephone},
			{type: "phone_textbox",
				label: "text1",
				bgOffsetY: 10,
				bgHeight: 60,
				bgWidth: 330,
				y: 250,
				charLine: 37,
				text: "Woo!!  I got a C, like you.  Happy it turned out ok for us, Sweeney definitely cut us a break on that final.  He could have failed us.  Sorry I dragged you into this. Sucks about that violation though."},
			{type: "hide_phone_textbox", dialog: "$text1"},
			{type: "hide", img: closephone},
			{type: "goto", page: "scene 10.a"},

			{type: "nothing", label: "compareryan1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "equal", rightop: 0, goTrue: "#zero-ryan1", goFalse: "#neg-ryan1"},			

			{type: "nothing", label: "zero-ryan1"},
			// phone exchange begins
			{type: "show", img: closephone},
			{type: "phone_textbox",
				label: "text1",
				bgOffsetY: 10,
				bgHeight: 60,
				bgWidth: 330,
				y: 250,
				charLine: 37,
				text: "Did you pass?  I got a C, like you.  Sweeney cut us a break… I found out that we could have failed for that.  Sucks about the violation."},
			{type: "hide_phone_textbox", dialog: "$text1"},
			{type: "hide", img: closephone},
			{type: "goto", page: "scene 10.a"},

			{type: "nothing", label: "neg-ryan1"},
			// phone exchange begins
			{type: "show", img: closephone},
			{type: "phone_textbox",
				label: "text1",
				bgOffsetY: 10,
				bgHeight: 60,
				bgWidth: 330,
				y: 250,
				charLine: 37,
				text: "Same as you – got a C.  Sucks about that violation."},
			{type: "hide_phone_textbox", dialog: "$text1"},
			{type: "hide", img: closephone},
			{type: "goto", page: "scene 10.a"},

			];

		return o;
	};

	Page8_2.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page8_2.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);
		
		this._owner._ambient = this._owner.getSoundManager().play("Office-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page8_2 = Page8_2;
}());
