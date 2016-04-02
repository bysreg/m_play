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
			{type:"show_context", text:"Later that day, you head to the library to study for your final with Ryan"},

			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#pos-ryan1", goFalse: "#compareryan1"},

			{type: "nothing", label: "pos-ryan1"},
			{type: "show", img: ryan, expression: "thoughtful", position: "center", waitUntilShown: false},
			{type: "custom", func: function(page) {
				page.getOwner().getSoundManager().play("Hey-Ryan-n");
			}},
			{type: "dialog", speaker: this._ryan, text: player +", remember I told you my brother took this class last year?  He gave me some of his stuff from the class, nothing graded."},
			{type: "dialog", speaker: this._ryan, text: "I have the actual exam from last year.  Might help, what do you think?"},
			{type: "jump", condition: true, goTrue: "#hideryan", goFalse: "#hideryan"},

			{type: "nothing", label: "compareryan1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "equal", rightop: 0, goTrue: "#zero-ryan1", goFalse: "#neg-ryan1"},			

			{type: "nothing", label: "zero-ryan1"},
			{type: "show", img: ryan, expression: "thoughtful", position: "center", waitUntilShown: false},
			{type: "custom", func: function(page) {
				page.getOwner().getSoundManager().play("Hey-Ryan-n");
			}},
			{type: "dialog", speaker: this._ryan, text: "By the way, my brother took this class last semester, and he gave me some of his stuff from the class, nothing graded."},
			{type: "dialog", speaker: this._ryan, text: "I have the actual exam from last year.  Want to take a look?"},
			{type: "jump", condition: true, goTrue: "#hideryan", goFalse: "#hideryan"},

			{type: "nothing", label: "neg-ryan1"},
			{type: "show", img: ryan, expression: "thoughtful", position: "center", waitUntilShown: false},
			{type: "custom", func: function(page) {
				page.getOwner().getSoundManager().play("Hey-Ryan-n");
			}},
			{type: "dialog", speaker: this._ryan, text: "So I got my hands on last year’s Programming & Society exam.  It’s not graded, but it’s the actual exam."},
			{type: "dialog", speaker: this._ryan, text: "I think we should study with it.  My brother took this class last year.  I think I told you."},
			{type: "jump", condition: true, goTrue: "#hideryan", goFalse: "#hideryan"},

			{type: "nothing", label: "hideryan"},
			{type: "hide", img: ryan, waitUntilHidden: false},

			{type:"show_context", text:"Priya sees you and Ryan together, and comes over to say hi."},

			{type: "show", img: priya, expression: "happy", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Hey you two. Studying for our favorite class? What are you looking at there?"},

			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Oh it's a practice test for the final."},

			{type: "show", img: priya, expression: "thoughtful", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Really? I don't remember Sweeney sending one out. I just went to his office hours too."},

			{type: "dialog", speaker: this._ryan, text: "It's not from Sweeney - it's from last year."},

			{type: "show", img: priya, position: "left", expression: "thoughtful", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Sweeney didn't send it out, right? I don’t think -"},

			{type: "show", img: ryan, position: "right", expression: "angry", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Yeah you don’t.  I need to use this, thanks to your work on our group project."},

			{type: "show", img: priya, position: "left", expression: "sad", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "I’m sorry… I told you guys I didn't realize..."},

			{type: "show", img: ryan, expression: "sad", position: "right", waitUntilShown: false, flip: true},
			{type: "dialog", speaker: this._ryan, text: "Look, I didn’t mean that.  It’s just, we’re only using this one time."},
			{type: "dialog", speaker: this._ryan, text: "That B- really tanked my average, and I need to do well in the class."},
			{type: "custom", label: "integrityScore", func: function(page) {
				return page.getIntegrityManager().getIntegrity();
			}},

			{type: "choices", choices : [
				{text: "Hey, maybe we should both hold off on using this test.",
					go: "#holdoff",
					integrityScore: 1,
					relationship: {name: this._priya, score: 2}},
				{text : "Don't say anything - you need all the help on this exam you can get.",
					integrityScore: -1,
					go : "#dontsay"},
				{text: "You know what? I'm good Ryan. I’m not going to use the test.",
					integrityScore: 0,
					relationship: {name: this._ryan, score: 1},
					go: "#decline"} ],
				seconds: 10,
				responses: [{text:"well?"},{text: "Don't just leave me hanging."}],
				speaker: this._ryan},

			// holdoff jump
			{type: "nothing", label: "holdoff"},
			{type: "compare", leftop: "$integrityScore", operator: "greater equal", rightop: integrityThreshold, goTrue: "#good_integrity", goFalse: "#poor_integrity"},

			// holdoff & good integrity
			{type: "nothing", label: "good_integrity"},
			{type: "dialog", speaker: this._ryan, text: "I mean, if you're going to get panicky over this, I guess we don't really need to use it."},
			{type: "dialog", speaker: this._ryan, text: "I really don't see how it's a big deal though."},
			{type: "show", img: priya, position: "left", expression: "thoughtful", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Yeah, better safe than sorry."},
			{type: "goto", page: "scene 9.a"},

			// holdoff & bad integrity
			{type: "nothing", label: "poor_integrity"},
			{type: "show", img: ryan, position: "right", expression: "angry", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Don't be stupid, it's not a thing! Whatever, I'm going to use it."},
			{type: "dialog", speaker: this._priya, text: "I think it's a little hypocritical of both of you to get on my back about this."},
			{type: "goto", page: "scene 9.b"},

			// dontsay
			{type: "nothing", label: "dontsay"},
			{type: "custom", func: function(page) {
				page.getRelationshipManager().addRelationship("Priya", -1);
				page.getRelationshipManager().addRelationship("Ryan", 2);
			}},
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

	Page7_1.prototype._onUnload = function() {
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page7_1.prototype._onStart = function() {
		this._owner._ambient = this._owner.getSoundManager().play("Library-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page7_1 = Page7_1;
}());
