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

		this._talked = 0;

		var z = this.getBackgroundLayer() + 50;
		var pageObj = this;

		this._sitryan = this.createImage("/static/gnovel/res/textures/ryan-clickable-lib.png", new THREE.Vector3(-215, -185, z), 250, 431);
		this._addToScene(this._sitryan);

		this._io1 = this.createInteractableObject(
			"/static/gnovel/res/textures/cat-lib.png",
			{x: 65, y: -160, z: z, width : 280, height : 526, onClick: function(io) {
				pageObj._talked = 1;
				pageObj._runFlow();

				pageObj._io1.setEnable(false);
				pageObj._io2.setEnable(false);
				pageObj.tweenMat(pageObj._io1.getImage(), {
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800, 
					onComplete: function() {
						pageObj._io1.remove();
					},
				});
				pageObj.tweenMat(pageObj._io2.getImage(), {
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800,
					onComplete: function() {
						pageObj._io2.remove();
					},
				});
				pageObj.tweenMat(pageObj._sitryan, {
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800, 
					onComplete: function() {
						pageObj._removeFromScene(pageObj._sitryan);
					},
				});				
			}});

		this._io2 = this.createInteractableObject(
			"/static/gnovel/res/textures/phone.png",
			{x: -140, y: -320, z: z+150, width : 250, height : 458, onClick: function(io) {
				pageObj._talked = 2;
				pageObj._runFlow();

				pageObj._io1.setEnable(false);
				pageObj._io2.setEnable(false);
				pageObj.tweenMat(pageObj._io2.getImage(), {
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800, 
					onComplete: function() {
						pageObj._io2.remove();
					},
				});
			}});


		this._yourphoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 140), 250, 458);
		this._closephoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 160), 519, 950);				
		this._closephoneImg.material.opacity = 0;

		this._yourphone = "yourphone";

		// for images
		this._setObjectTag(this._yourphone, this._yourphoneImg);
		this._setObjectTag(this._closephone, this._closephoneImg);	
	};

	Page5_1.prototype._createFlowElements = function() {
		var ryan = "%" + this._ryan;
		var cat = "%" + this._cat;
		var priya = "%" + this._priya;
		var yourphone = "%" + this._yourphone;
		var closephone = "%" + this._closephone;

		var o = null;

		var common = [
			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "We all set, Cat?"},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: cat, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Uh oh… I think we have a problem."},
			{type: "hide", img: cat, waitUntilHidden: false},
			{type: "show", img: ryan, expression: "thoughtful", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "What’s wrong?"},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: cat, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "It looks like Priya took her code from another source… I found it on a codeHub forum online."},
			{type: "hide", img: cat, waitUntilHidden: false},
			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I’m sure Priya didn’t realize. She would never cheat."},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: cat, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Technically it’s plagiarism. What should we do, we have to submit the project in 2 hours!"},
			{type: "hide", img: cat, waitUntilHidden: false},
			{type: "choices",
					choices :
						[{text: "Well, let's just ask her about it.",
							integrityScore: 1, 
							relationship: {name: "ryan", score: 1},  // how to add two relationship scores
							go: "#ask"},
						{text: "We only have a few hours. Let’s divide and conquer. Redo her work.",
							integrityScore: 0, 
							go: "#redo"},
						{text: "Let’s just submit it, I’m sure it’s fine.",
							integrityScore: -1,
							go: "#submit" }]},

			{type: "show", img: ryan, expression: "thoughtful", position: "right", waitUntilShown: false, label: "ask"},
			{type: "custom", func: function(page) {
				page.getRelationshipManager().addRelationship("cat", 1);
			}},
			{type: "dialog", speaker: "Ryan", text: "Let’s text her."},
			{type: "hide", img: ryan, waitUntilHidden: false},
			
			// text exchange here
			{type: "dialog", speaker: "Phone - Ryan", text: "P – there’s a violation with your part of the project."},
			{type: "dialog", speaker: "Phone - Priya", text: "k…"},
			{type: "dialog", speaker: "Phone - Ryan", text: "Did u use codeHub for ur code?"},
			{type: "dialog", speaker: "Phone - Priya", text: "Yes – I used c-h to work thru the problem."},
			{type: "dialog", speaker: "Phone - Ryan", text: "srsly?"},
			{type: "dialog", speaker: "Phone - Priya", text: "It’s common for programmers… did it @ undergrad."},
			{type: "dialog", speaker: "Phone - Ryan", text: "k..."},

			{type: "show", img: cat, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "We don’t have much time – she needs to come back and work on it asap. We’re wasting time texting her."},
			{type: "hide", img: cat, waitUntilHidden: false},
			{type: "choices",
					choices :
						[{text: "I agree, she needs to redo it.  We can’t submit plagiarized work.",
							go: "#gonextscene"},
						{text: "You text Priya “P, this is [YOU].  U need to meet us @ lib.  We need to fix ur part b/c we can’t use c-h to submit.  We’ll help u.” –",
							relationship: {name: "priya", score: 1},
							go: "#gonextscene"}]},

			{type: "show", img: ryan, expression: "sad", position: "right", waitUntilShown: false, label: "redo"},
			{type: "dialog", speaker: "Ryan", text: "Seems like we should tell Priya,"},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: cat, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Ugh, it’s going to be a stressful night."},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},

			// should be a sad cat here.
			{type: "show", img: cat, position: "left", waitUntilShown: false, label: "submit"},
			{type: "dialog", speaker: "Cat", text: "I’m not comfortable doing that."},
			{type: "hide", img: cat, waitUntilHidden: false},
			{type: "show", img: ryan, expression: "sad", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Yeah, seems like if Cat caught it, Sweeney will definitely catch it."},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: cat, expression: "thoughtful", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Maybe we can adjust her work enough to make it work?"},
			{type: "hide", img: cat, waitUntilHidden: false},
			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Worth a try."},

			{type: "choices", choices : [
				{text: "Go to the gym", 
					go: "#gogym"}, 
				{text : "Go get a drink at Scottie’s Bar.", 
					go : "#gobar"}, 
				{text: "Go home and study for the finals.", 
					go: "#gohome"}], label: "gonextscene"},

			{type: "goto", page: "scene 7.a", label: "gogym"},
			{type: "goto", page: "scene 7.b", label: "gobar"},
			{type: "goto", page: "scene 7.c", label: "gohome"},
		];

		if (this._talked == 1) {
			o = [
				{type: "show", img: cat, expression: "happy", position: "left"},
				{type: "dialog", speaker: "Cat", text: "Thanks for sending your part of the project, I’m compiling everything right now."},
				{type: "hide", img: cat, waitUntilHidden: false},
			];

			o = o.concat(common);
		};
		if (this._talked == 2) {
			o = [

				// phone text exchange begins
				{type: "show", img: closephone, position: "center"},
				{type: "phone_textbox", 
					label: "mom_text",
					text: "Hey hon!  Study hard, go to the gym, keep good habits, do your best!!!!!!!"},
				{type: "hide_phone_textbox", dialog: "$mom_text"},
				{type: "hide", img: closephone},
				// phone text exchange ends

				{type: "custom", func: function(page) {
					var pageObj = page;
					pageObj.tweenMat(pageObj._io1.getImage(), {
						opacity: 0,
						easing: TWEEN.Easing.Cubic.Out,
						duration: 800
					});
					pageObj._removeFromScene(pageObj._sitryan);
				}},
			];

			o = o.concat(common);
		};


		return o;
	}

	MPLAY.Page5_1 = Page5_1;
}());
