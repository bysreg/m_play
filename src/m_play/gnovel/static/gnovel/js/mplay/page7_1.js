// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page7_1
	 * @augments MPlay.MPlayPage
	 */
	var Page7_1 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page7_1.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page7_1.prototype.constructor = Page7_1;

	/**
	 * @override
	 */
	Page7_1.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupClassBackground();
	};

	Page7_1.prototype._createFlowElements = function() {

		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var player = this._player; // player's name

		var o = null;

		o = [
			{type: "show", img: ryan, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Your phone", text: "Hey, remember how my brother took this class last year? Well, he gave me some of his stuff from last year, nothing graded. Might help, what do you think?"},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: priya, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Hey you two. Studying for our favorite class? What are you looking at there?"},

			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Oh it's a practice test for the final."},


			{type: "dialog", speaker: this._priya, text: "Really? I don't remember Sweeney sending one out. I just went to his office hours too."},
			

			{type: "dialog", speaker: this._ryan, text: "It's not from Sweeney - it's from last year."},
			

			{type: "dialog", speaker: this._priya, text: "Are you sure you can use it? Sweeney didn't send it out, right?"},
			

			{type: "dialog", speaker: this._ryan, text: "Well, it's only the questions, not the answers. Lots of classes use old exams to study."},
			

			{type: "dialog", speaker: this._priya, text: "But if no one else is using it, it's not really fair. You'll mess with the curve."},
			

			{type: "dialog", speaker: this._ryan, text: "Well, I need to do well, thanks to our grade on that group project. I wouldn't think you'd care considering tried to plagiarize."},
			

			{type: "dialog", speaker: this._priya, text: "I already said I was sorry about that. I didn't realize..."},
			

			{type: "dialog", speaker: this._ryan, text: "Look, I didn’t mean that. It’s just, we’re only using this one time. It’s not even a graded copy, it’s just to practice on."},


			{type: "choices", choices : [
				{text: "Hey, maybe we should both hold off on using this test.", 
					go: "#holdoff", 
					integrityScore: 1}, 
				{text : "Don't say anything - you need all the help on this exam you can get.",
					integrityScore: -1, 
					go : "#dontsay"}, 
				{text: "You know what? I'm good Ryan. I’m not going to use the test.", 
					integrityScore: 0, 
					go: "#decline"} ]},

			// holdoff jump
			{type: "custom", label: "holdoff", func: function(page) {				
				return page.getIntegrityManager().getIntegrity();
			}},
			{type: "compare", leftop: "$holdoff", operator: "greater", rightop: 3, goTrue: "#good_integrity", goFalse: "#poor_integrity"},

			// holdoff & good integrity
			{type: "dialog", label: "good_integrity", speaker: this._ryan, text: "I mean, if you're going to get panicky over this, I guess we don't really need to use it. I really don't see how it's a big deal though."},
			{type: "dialog", speaker: this._priya, text: "Yeah, better safe than sorry."},
			{type: "jump", condition: true, goTrue:1000, goFalse:1000},

			// holdoff & bad integrity
			{type: "dialog", label: "poor_integrity", speaker: this._priya, text: "Don't be stupid, it's not a thing! Whatever, I'm going to use it. I think it's a little hypocritical of both of you to get on my back about this."},
			{type: "jump", condition: true, goTrue:1000, goFalse:1000},

			// dontsay
			{type: "dialog", label: "dontsay", speaker: this._priya, text: "I can't keep arguing with you both. Do what you want."},
			{type: "dialog", speaker: this._ryan, text: "She'll get over it. This whole thing has been blown so out of proportion."}, 
			{type: "jump", condition: true, goTrue: 1000, goFalse: 1000}, 


			// decline
			{type: "dialog", label: "decline", speaker: this._priya, text: "Please try to talk him out of it."},
			{type: "dialog", speaker: this._ryan, text: "Priya, lay off."},

		];

		return o;
	};

	MPLAY.Page7_1 = Page7_1;
}());
