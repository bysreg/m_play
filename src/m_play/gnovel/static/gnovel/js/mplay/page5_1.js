// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page5_1
	 * @augments MPLAY.MPlayPage
	 */
	var Page5_1 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page5_1.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page5_1.prototype.constructor = Page5_1;

	/**
	 * @override
	 */
	Page5_1.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupLibraryBackground();

		var z = this.getBackgroundLayer() + 50;
		var pageObj = this;
		var io1 = this.createInteractableObject(
			"/static/gnovel/res/textures/ryan-clickable-lib.png",
			{x: -215, y: -185, z: z, width : 250, height : 431, onClick: function() {
				pageObj._talked = 1;
				// pageObj._runFlow();
			}});

		var io2 = this.createInteractableObject(
			"/static/gnovel/res/textures/cat-lib.png",
			{x: 65, y: -160, z: z, width : 280, height : 526, onClick: function() {
				pageObj._talked = 2;
				// pageObj._runFlow();
			}});

		this._yourphoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 140), 250, 458);


		this._yourphone = "yourphone";

		// for images
		this._setObjectTag(this._yourphone, this._yourphoneImg);

	};

	Page5_1.prototype._createFlowElements = function() {
		var ryan = "%" + this._ryan;
		var cat = "%" + this._cat;
		var priya = "%" + this._priya;
		var yourphone = "%" + this._yourphone;

		var o = null;

		o = [
			{type: "choices",
					choices :
						[{text: "Read a text on your phone",
							go: "#text"},
						{text: "Talk to Cat and Ryan",
							go: "#talk"}]},

			{type: "show", img: yourphone, position: "center"},
			{type: "dialog", speaker: "Mom", text: "Hey hon!  Study hard, go to the gym, keep good habits, do your best!!!!!!!"},
			{type: "hide", img: yourphone, waitUntilHidden: false},
			{type: "jump", condition: true, goTrue: "#ryantalk", goFalse: "#ryantalk"},

			{type: "show", img: cat, position: "left", waitUntilShown: false, label: "talk"},
			{type: "dialog", speaker: "Cat", text: "Thanks for sending your part of the project, I’m compiling everything right now."},
			{type: "hide", img: cat, waitUntilHidden: false},
			
			{type: "show", img: ryan, position: "right", waitUntilShown: false, label: "ryantalk"},
			{type: "dialog", speaker: "Ryan", text: "We all set, Cat? Priya texted me saying she got her stuff to you this morning."},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: cat, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Uh oh… I think we have a problem."},
			{type: "hide", img: cat, waitUntilHidden: false},
			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "What’s wrong?"},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: cat, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "It looks like Priya took her code from another source… I found it on a codeHub forum online."},
			{type: "hide", img: cat, waitUntilHidden: false},
			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I’m sure Priya didn’t realize. She would never cheat."},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: cat, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Technically it’s plagiarism. What should we do, we have to submit the project it 2 hours!"},
			{type: "hide", img: cat, waitUntilHidden: false},
			{type: "choices",
					choices :
						[{text: "Well, let's just ask her about it.",
							integrityScore: 1, 
							relationship: {name: "priya", score: 1},  // how to add two relationship scores
							go: "#ask"},
						{text: "We only have a few hours. Let’s divide and conquer. Redo her work.",
							integrityScore: 0, 
							go: "#redo"},
						{text: "Let’s just submit it, I’m sure it’s fine.",
							integrityScore: -1,
							go: "#submit" }]},

			{type: "show", img: ryan, position: "right", waitUntilShown: false, label: "ask"},
			{type: "dialog", speaker: "Ryan", text: "Well, Priya is on her way anyway.  We can talk to her when she –"},
			{type: "hide", img: ryan, waitUntilHidden: false},
			// shit when did priya come
			{type: "show", img: priya, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "Hey guys. What's going on?"},
			{type: "hide", img: priya, waitUntilHidden: false},
			{type: "show", img: cat, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Priya, there's a problem with your part of the project."},
			{type: "hide", img: cat, waitUntilHidden: false},
			{type: "show", img: priya, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "Ok..."},
			{type: "hide", img: priya, waitUntilHidden: false},
			{type: "show", img: cat, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Did you use codeHub at all when you were working on your part of the code?"},
			{type: "hide", img: cat, waitUntilHidden: false},
			{type: "show", img: priya, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "Yes, I used codeHub to help me work through the problem. It's a fairly common practice for programmers. I did it in undergrad all the time."},
			{type: "choices",
					choices :
						[{text: "I think you need to redo it.  We can’t submit plagiarized work.",
							go: "#gonextscene"},
						{text: "Since we only have a few hours, let’s get started.  We’ll help you finish it in time.",
							relationship: {name: "priya", score: 1},
							go: "#gonextscene"}]},

			{type: "show", img: ryan, position: "right", waitUntilShown: false, label: "redo"},
			{type: "dialog", speaker: "Ryan", text: "Seems like we should tell Priya,"},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: cat, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Ugh, it’s going to be a stressful night."},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},

			{type: "show", img: cat, position: "left", waitUntilShown: false, label: "submit"},
			{type: "dialog", speaker: "Cat", text: "I’m not comfortable doing that."},
			{type: "hide", img: cat, waitUntilHidden: false},
			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Yeah, seems like if Cat caught it, Sweeney will definitely catch it."},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: cat, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Maybe we can adjust her work enough to make it work?"},
			{type: "hide", img: cat, waitUntilHidden: false},
			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Worth a try."},

			// {type: "goto", page: "scene 7", label: "gonextscene"},
			{type: "jump", condition: true, goTrue: 1000, goFalse: 1000, label: "gonextscene"},
		];

		return o;
	}

	MPLAY.Page5_1 = Page5_1;
}());
