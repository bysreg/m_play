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

		this.setupLibraryBackground();
	};

	Page7_1.prototype._createFlowElements = function() {

		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var player = this._player; // player's name

		var integrityThreshold = 0;

		var o = null;

		o = [
			{type: "show", img: ryan, expression: "thoughtful", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Hey, remember how my brother took this class last year? Well, he gave me some of his stuff from last year, nothing graded. Might help, what do you think?"},
			{type: "hide", img: ryan, waitUntilHidden: false},
			
			{type: "show", img: priya, expression: "happy", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Hey you two. Studying for our favorite class? What are you looking at there?"},

			{type: "show", img: ryan, position: "right", waitUntilShown: false},			
			{type: "dialog", speaker: this._ryan, text: "Oh it's a practice test for the final."},

			{type: "show", img: priya, expression: "neutral", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Really? I don't remember Sweeney sending one out. I just went to his office hours too."},
			
			{type: "dialog", speaker: this._ryan, text: "It's not from Sweeney - it's from last year."},
						
			{type: "show", img: priya, position: "left", expression: "thoughtful", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Sweeney didn't send it out, right?"},
			
			{type: "show", img: ryan, position: "right", expression: "angry", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Well, I need to do well, thanks to our grade on that group project.  I wouldn't think you'd care considering you plagiarized."},
		
			{type: "show", img: priya, position: "left", expression: "sad", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "I’m sorry… I told you guys I didn't realize..."},
			
			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Look, I didn’t mean that. It’s just, we’re only using this one time. It’s not even a graded copy, it’s just to practice on."},

			{type: "custom", label: "integrityScore", func: function(page) {				
				return page.getIntegrityManager().getIntegrity();
			}},

			{type: "choices", choices : [
				{text: "Hey, maybe we should both hold off on using this test.", 
					go: "#holdoff", 
					integrityScore: 1}, 
				{text : "Don't say anything - you need all the help on this exam you can get.",
					integrityScore: -1, 
					go : "#dontsay"}, 
				{text: "You know what? I'm good Ryan. I’m not going to use the test.", 
					integrityScore: 0, 
					go: "#decline"} ],
				seconds: 10},

			// holdoff jump			
			{type: "compare", label: "holdoff", leftop: "$integrityScore", operator: "greater equal", rightop: integrityThreshold, goTrue: "#good_integrity", goFalse: "#poor_integrity"},

			// holdoff & good integrity
			{type: "nothing", label: "good_integrity"},
			{type: "dialog", speaker: this._ryan, text: "I mean, if you're going to get panicky over this, I guess we don't really need to use it. I really don't see how it's a big deal though."},
			{type: "show", img: priya, position: "left", expression: "thoughtful", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Yeah, better safe than sorry."},
			{type: "goto", page: "scene 9.a"},

			// holdoff & bad integrity
			{type: "nothing", label: "poor_integrity"},
			{type: "show", img: ryan, position: "right", expression: "angry", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Don't be stupid, it's not a thing! Whatever, I'm going to use it. I think it's a little hypocritical of both of you to get on my back about this."},
			{type: "goto", page: "scene 9.b"},

			// dontsay
			{type: "nothing", label: "dontsay"},			
			{type: "show", img: priya, position: "left", expression: "angry", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "I can't keep arguing with you both. Do what you want."},
			{type: "show", img: ryan, position: "right", expression: "angry", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "She'll get over it. This whole thing has been blown so out of proportion."}, 
			{type: "compare", leftop: "$integrityScore", operator: "greater equal", rightop: integrityThreshold, goTrue: "#go9c", goFalse: "#go9d"},
			{type: "goto", page: "scene 9.c", label: "go9c"},
			{type: "goto", page: "scene 9.d", label: "go9d"},			

			// decline
			{type: "nothing", label: "decline"},						
			
			{type: "show", img: priya, position: "left", expression: "sad", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Please try to talk him out of it."},

			{type: "show", img: ryan, expression: "angry", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Priya, lay off."},
			
			{type: "compare", leftop: "$integrityScore", operator: "greater equal", rightop: integrityThreshold, goTrue: "#go9e", goFalse: "#go9f"},
			{type: "goto", page: "scene 9.e", label: "go9e"},
			{type: "goto", page: "scene 9.f", label: "go9f"},	
		];

		return o;
	};

	MPLAY.Page7_1 = Page7_1;
}());
