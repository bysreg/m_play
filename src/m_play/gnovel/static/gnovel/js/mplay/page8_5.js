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
		var closephone = "%" + this._closephone;

		var o = null;

		o = [
			{type: "show_context", text: "A few days after the test..."},
			{type: "show_context", text:"you run into Ryan at the Café"},
			{type: "show", img: ryan, expression: "sad"},
			{type: "dialog", speaker: this._ryan, text: "Hey, do you have a sec?"},
			{type: "dialog", speaker: this._ryan, text: "You know that test I showed you?  Priya was right – we couldn’t use it."},
			{type: "dialog", speaker: this._ryan, text: "He asked me if anyone else had access to it.  Sweeney called me in, asked me point blank, and I panicked…"},
			{type: "dialog", speaker: this._ryan, text: "I told him I had shown it to you.  I’m so sorry… I didn’t know what else to say.  He wants to see you and have a conversation."},
			{type: "hide", img: ryan},

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
				text: "After our conversation, I’ve decided not to pursue any action from your violation. As we discussed in our meeting, I am disappointed that you did not take an active stand in reporting the violation prior to my administration of the final exam.  In the future, these should be reported.  That being said, since I believe you did not consciously act in bad faith, I will not be moving forward with proceedings for this violation (indeed, it is a violation). "},
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
				text: player + "- how did it go?  Sweeney is giving me a 0 on the final.  I’m waiting to hear if he will report it to the dean… I’m sorry I dragged you into this."},
			{type: "hide_phone_textbox", dialog: "$text1"},
			{type: "hide", img: closephone},
			{type: "goto", page: "scene ending"},

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
				text: "Sweeney is giving me a 0 on the final – u?  I’m waiting to hear if he will report it to the dean…"},
			{type: "hide_phone_textbox", dialog: "$text1"},
			{type: "hide", img: closephone},
			{type: "goto", page: "scene ending"},

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
				text: "Sweeney is giving me a 0 on the final.  I’m waiting to hear if he will report it to the dean.  I can’t believe we were so stupid."},
			{type: "hide_phone_textbox", dialog: "$text1"},
			{type: "hide", img: closephone},
			{type: "goto", page: "scene ending"},
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
		this._owner._ambient = this._owner.getSoundManager().play("Classroom-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page8_5 = Page8_5;
}());
