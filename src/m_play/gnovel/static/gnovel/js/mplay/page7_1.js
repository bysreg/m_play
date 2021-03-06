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

		var foregroundImg = "/static/gnovel/res/textures/backgrounds/lib foreground with ryan solo.png";
		this.setupLibraryBackground(foregroundImg);
		this.nextPageMaterialPath = "/static/gnovel/res/textures/backgrounds/library redux_wR.png";

		this._background_empty = this.createImage("/static/gnovel/res/textures/backgrounds/library foreground.png", new THREE.Vector3(0, 10, this._background3Layer-100), 1920, 1080);
		this._background_empty.scale.set(.90,.85,1);
		this._background_empty.material.opacity = 0;
		this._addToSceneBg(this._background_empty);

		// 0 means You told Ryan not to use the test and Ryan didn’t use it either.
		// 1 means You told Ryan not to use the test and Ryan used it anyway.
		// 2 means You did use the test and you got caught. Professor Sweeny did not pursue academic integrity violations  (integrity > 0)
		// 3 means You did use the test and You got caught. you both receive a 0 on the final and fail the class.
		// 4 means You didn’t use the test and Ryan used the test even though you didn’t. He got caught and failed the final and the class.
		// 5 means You didn’t use the test and Ryan used the test even though you didn’t.
		// 		When Ryan was questioned, he revealed that you had had access to the test too and didn’t report it.
		this._usingTestStatus = 0;

		this._usingTestData = {};
		this._usingTestData.relationship = {};
		this._usingTestData.relationship.ryan = 0;
		this._usingTestData.relationship.priya = 0;
		this._usingTestData.relationship.cat = 0;
	};

	Page7_1.prototype._createFlowElements = function() {

		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var player = this._player; // player's name
		var background = this._background_empty;
		var r_posRel = 4;
		var r_neuRel = 1;

		var integrityThreshold = 0;

		var o = null;

		o = [
			{type:"show_context", text:"Later that day, you head to the library to study for your final with Ryan."},

			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore1"},
			{type: "custom", func: function(page){
				page.tweenMat(background,{
					opacity: 1,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 200,
				});
				page.tweenMat(page._background3,{
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800,
					onComplete: function() {
						page._removeFromSceneBg(page._background3);
					},
				});
			}},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "greater equal", rightop: r_posRel, goTrue: "#pos-ryan1", goFalse: "#compareryan1"},

			{type: "nothing", label: "pos-ryan1"},
			{type: "show", img: ryan, expression: "thoughtful", position: "center", waitUntilShown: false},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Hey-Ryan-n");
			// }},
			// {type: "play", audio: "Hey-Ryan-n"},
			{type: "dialog", speaker: this._ryan, text: player +", remember I told you my brother took this class last year?  He gave me some of his stuff from the class, nothing graded."},
			{type: "dialog", speaker: this._ryan, text: "I have a blank copy of the actual take home exam from last year.  Might help, huh?"},
			{type: "jump", condition: true, goTrue: "#showpriya", goFalse: "#showpriya"},

			{type: "nothing", label: "compareryan1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "greater equal", rightop: r_neuRel, goTrue: "#zero-ryan1", goFalse: "#neg-ryan1"},

			{type: "nothing", label: "zero-ryan1"},
			{type: "show", img: ryan, expression: "thoughtful", position: "center", waitUntilShown: false},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Hey-Ryan-n");
			// }},
			// {type: "play", audio: "Hey-Ryan-n"},
			{type: "dialog", speaker: this._ryan, text: "Hey, my brother took this class last semester, and he gave me some of his stuff from the class, nothing graded."},
			{type: "dialog", speaker: this._ryan, text: "I have a blank copy of the actual exam from last year.  Want to take a look?"},
			{type: "jump", condition: true, goTrue: "#showpriya", goFalse: "#showpriya"},

			{type: "nothing", label: "neg-ryan1"},
			{type: "show", img: ryan, expression: "thoughtful", position: "center", waitUntilShown: false},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Hey-Ryan-n");
			// }},
			// {type: "play", audio: "Hey-Ryan-n"},
			{type: "dialog", speaker: this._ryan, text: "So my brother took this course last year, and gave me his stuff from the class.  "},
			{type: "dialog", speaker: this._ryan, text: "Anyway, here's last year's exam.  It's not graded, but it's a blank copy of the actual exam.  I think we should study with it."},
			{type: "jump", condition: true, goTrue: "#showpriya", goFalse: "#showpriya"},

			{type: "nothing", label: "showpriya"},
			{type: "show_context", text:"Priya sees you and Ryan together, and comes over to say hi."},
			{type: "hide", img: ryan},

			{type: "show", img: ryan, expression: "thoughtful", position: "right", waitUntilShown: false},
			{type: "show", img: priya, expression: "happy", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Hey you two. Studying for our favorite class? What are you looking at there?"},

			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Oh, it's a practice test for the final."},

			{type: "show", img: priya, expression: "thoughtful", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Really? I don't remember Sweeney sending one out. I just went to his office hours too."},

			{type: "dialog", speaker: this._ryan, text: "It's not from Sweeney.  It's from last year."},

			{type: "show", img: priya, position: "left", expression: "thoughtful", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Sweeney didn't send it out, right? I don’t think -"},

			{type: "show", img: ryan, position: "right", expression: "angry", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Yeah you don’t.  I need to use this, thanks to your work on our group project."},

			{type: "show", img: priya, position: "left", expression: "sad", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "I’m sorry.  I told you guys I didn't realize I couldn't use codeHub."},

			{type: "show", img: ryan, expression: "sad", position: "right", waitUntilShown: false, flip: true},
			{type: "dialog", speaker: this._ryan, text: "Look, I didn’t mean that.  It’s just, we’re only using this one time."},
			{type: "dialog", speaker: this._ryan, text: "That B- really tanked my average, and I need to do well in the class."},
			{type: "show", img: priya, expression: "sad", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Look, I know I’m the last person you want to hear this from, but Sweeney was pretty clear in how we should study.  It’s not fair of you to use this test."},
			{type: "custom", label: "integrityScore", func: function(page) {
				return page.getIntegrityManager().getIntegrity();
			}},

			{type: "choices", choices : [
				{text: "Hey, maybe we should both hold off on using this test.",
					go: "#holdoff",
					integrityScore: 1,
					onChoose: function(page) {
						page._usingTestData.relationship.priya = 2;
					},
					relationship: [{name: this._priya, score: 2}]},
				{text : "I think it's OK to use, Priya.  It's not even graded.",
					integrityScore: -1,
					onChoose: function(page) {
						page._usingTestData.relationship.priya = -1;
						page._usingTestData.relationship.ryan = 2;
					},
					relationship:[{name: this._ryan, score: 2}, {name: this._priya, score: -1}],
					go : "#dontsay"},
				{text: "You know what? I'm good Ryan. I’m not going to use the test.",
					integrityScore: 0,
					onChoose: function(page) {
						page._usingTestData.relationship.ryan = -1;
					},
					relationship: [{name: this._ryan, score: -1}],
					go: "#decline"} ],
				seconds: 10,
				responses: [{text: player + ", what do you think?"},{text:"It was fine in my last class."},{text: "She's worrying too much."}],
				speaker: this._ryan},

			// holdoff jump
			{type: "nothing", label: "holdoff"},
			{type: "compare", leftop: "$integrityScore", operator: "greater equal", rightop: integrityThreshold, goTrue: "#good_integrity", goFalse: "#poor_integrity"},

			// holdoff & good integrity
			{type: "nothing", label: "good_integrity"},
			{type: "custom", func: function(page) {
				page._usingTestStatus = 0;
			}},
			{type: "dialog", speaker: this._ryan, text: "I mean, if you're going to get panicky over this, I guess we don't really need to use it."},
			{type: "dialog", speaker: this._ryan, text: "I really don't see how it's a big deal though."},
			{type: "show", img: priya, position: "left", expression: "thoughtful", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Yeah, better safe than sorry."},
			{type: "goto", page: "scene 9.a"},

			// holdoff & bad integrity
			{type: "nothing", label: "poor_integrity"},
			{type: "custom", func: function(page) {
				page._usingTestStatus = 1;
			}},
			{type: "show", img: ryan, position: "right", expression: "angry", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Don't be stupid, it's not a thing! Whatever, I'm going to use it."},
			{type: "dialog", speaker: this._ryan, text: "I think it's a little hypocritical of both of you to get on my back about this."},
			{type: "goto", page: "scene 9.b"},

			// dontsay
			{type: "nothing", label: "dontsay"},
			{type: "show", img: priya, position: "left", expression: "angry", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "I can't keep arguing with you both. Do what you want."},
			{type: "show", img: ryan, position: "right", expression: "angry", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "She'll get over it. This whole thing has been blown so out of proportion."},
			{type: "compare", leftop: "$integrityScore", operator: "greater equal", rightop: integrityThreshold, goTrue: "#go9c", goFalse: "#go9d"},

			// dontsay and good integrity
			{type: "nothing", label: "go9c"},
			{type: "custom", func: function(page) {
				page._usingTestStatus = 2;
			}},
			{type: "goto", page: "scene 9.c"},

			// dont say and bad integrity
			{type: "nothing", label: "go9d"},
			{type: "custom", func: function(page) {
				page._usingTestStatus = 3;
			}},
			{type: "goto", page: "scene 9.d"},

			// decline
			{type: "nothing", label: "decline"},
			{type: "show", img: priya, position: "left", expression: "sad", waitUntilShown: false},
			{type: "dialog", speaker: this._priya, text: "Please try to talk him out of it."},
			{type: "show", img: ryan, expression: "angry", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Priya, lay off."},
			{type: "compare", leftop: "$integrityScore", operator: "greater equal", rightop: integrityThreshold, goTrue: "#go9e", goFalse: "#go9f"},

			// decline and good integrity
			{type: "nothing", label: "go9e"},
			{type: "custom", func: function(page) {
				page._usingTestStatus = 4;
			}},
			{type: "goto", page: "scene 9.e"},

			// decline and bad integrity
			{type: "nothing", label: "go9f"},
			{type: "custom", func: function(page) {
				page._usingTestStatus = 5;
			}},
			{type: "goto", page: "scene 9.f"},
		];

		return o;
	};


	// Page7_1.prototype._createRandomPlaylist = function() {
	// 	var playlist = null;
	// 	playlist = [
	// 			    {audio:"Lib-beeping", playrate: 0.03},
	// 				// {audio:"Lib-chairs2", playrate: 0.1},
	// 				{audio:"Lib-chairs3", playrate: 0.1},
	// 				{audio:"Lib-chairs1", playrate: 0.1},
	// 				{audio:"Lib-distantchairs", playrate: 0.3},
	// 				{audio:"Lib-pia", playrate: 0.05, noreplay: true}
	// 				];
	// 	return playlist;
	// };

	Page7_1.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);
		this._owner.saveData("usingTestStatus", this._usingTestStatus);
		this._owner.saveData("usingTestData", this._usingTestData);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page7_1.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		this._owner._ambient = this._owner.getSoundManager().play("Library-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});
		this._tweenVolumeIn();
	};

	// Page7_1.prototype._update = function() {
	// 	MPLAY.MPlayPage.prototype._update.call(this);

	// 	this._multiTracksPlayer.shuffle();
	// };

	MPLAY.Page7_1 = Page7_1;
}());
