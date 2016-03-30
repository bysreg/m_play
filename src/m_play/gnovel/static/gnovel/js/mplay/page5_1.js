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
			{type: "character", x: 65, y: -160, z: z, width : 280, height : 526, onClick: function(io) {
				pageObj._talked = 1;
				pageObj._runFlow();

				pageObj._io1.setEnable(false);

				pageObj.tweenMat(pageObj._io1.getImage(), {
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800,
					onComplete: function() {
						pageObj._io1.remove();
					},
				});

				pageObj._removePhoneNotification();
				pageObj.tweenMat(pageObj._sitryan, {
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800,
					onComplete: function() {
						pageObj._removeFromScene(pageObj._sitryan);
					},
				});
			}});

		this._yourphoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 140), 250, 458);

		this._yourphone = "yourphone";

		pageObj._io1.setEnable(false);
		// for images
		this._setObjectTag(this._yourphone, this._yourphoneImg);

	};

	Page5_1.prototype._onStart = function() {
		var pageObj = this;
		this._owner._ambient = this._owner.getSoundManager().play("Library-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	Page5_1.prototype._createFlowElements = function() {
		var ryan = "%" + this._ryan;
		var cat = "%" + this._cat;
		var priya = "%" + this._priya;
		var yourphone = "%" + this._yourphone;
		var closephone = "%" + this._closephone;

		var o = null;

			o = [
				{type:"show_context", text:"After class, the group meets at the library"},
				{type:"show_context", text:"the deadline for the project is tonight"},
				{type: "custom", func: function(pageObj){
					//disable the characters from being clickable while context showing
					pageObj._io1.setEnable(true);
					pageObj._showPhoneNotification({onClick: function() {
						pageObj._io1.setEnable(false);
						pageObj._talked = 2;
						pageObj._runFlow();

					}});
				}}
			];
		var common = [

			{type: "show", img: ryan, position: "right"},
			{type: "dialog", speaker: "Ryan", text: "We all set, Cat?"},
			{type: "show", img: cat, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Uh oh… I think we have a problem."},
			{type: "show", img: ryan, expression: "thoughtful", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "What’s wrong?"},
			{type: "show", img: cat, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "It looks like Priya took her code from another source… I found it on a codeHub forum online."},
			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I’m sure Priya didn’t realize. She would never cheat."},
			{type: "show", img: cat, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Technically it’s plagiarism. What should we do, we have to submit the project in 2 hours!"},
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
							go: "#submit" }],
					seconds: 10,
					responses: [{text:"well?"},{text: "Don't just leave me hanging."}],
					speaker: this._ryan},

			{type: "show", img: ryan, expression: "thoughtful", position: "right", waitUntilShown: false, label: "ask"},
			{type: "custom", func: function(page) {
				page.getRelationshipManager().addRelationship("cat", 1);
			}},
			{type: "hide", img: cat, waitUntilHiden: false},
			{type: "dialog", speaker: "Ryan", text: "I'll text her."},
			{type: "show", img: ryan, position: "right", waitUntilShown: false},

			// phone exchange begins
			{type: "show", img: closephone},
			{type: "phone_textbox",
				label: "text1",
				bgOffsetY: 10,
				bgHeight: 60,
				bgWidth: 330,
				y: 250,
				charLine: 37,
				text: "P – there’s a violation with your part of the project."},
			{type: "phone_textbox",
				label: "text2",
				bgOffsetY: 10,
				bgHeight: 60,
				bgWidth: 330,
				y: 180,
				charLine: 37,
				text: "k…"},
			{type: "phone_textbox",
				label: "text3",
				bgOffsetY: 10,
				bgHeight: 60,
				bgWidth: 330,
				y: 110,
				charLine: 37,
				text: "Did u use codeHub for ur code?"},
			{type: "phone_textbox",
				label: "text4",
				bgOffsetY: 10,
				bgHeight: 60,
				bgWidth: 330,
				y: 40,
				charLine: 37,
				text: "Yes – I used c-h to work thru the problem."},
			{type: "phone_textbox",
				label: "text5",
				bgOffsetY: 10,
				bgHeight: 60,
				bgWidth: 330,
				y: -30,
				charLine: 37,
				text: "srsly?"},
			{type: "phone_textbox",
				label: "text6",
				bgOffsetY: 10,
				bgHeight: 60,
				bgWidth: 330,
				y: -100,
				charLine: 37,
				text: "It’s common for programmers… did it @ undergrad."},
			{type: "phone_textbox",
				label: "text7",
				bgOffsetY: 10,
				bgHeight: 60,
				bgWidth: 330,
				y: -170,
				charLine: 37,
				text: "k..."},
			{type: "hide_phone_textbox", dialog: "$text1"},
			{type: "hide_phone_textbox", dialog: "$text2"},
			{type: "hide_phone_textbox", dialog: "$text3"},
			{type: "hide_phone_textbox", dialog: "$text4"},
			{type: "hide_phone_textbox", dialog: "$text5"},
			{type: "hide_phone_textbox", dialog: "$text6"},
			{type: "hide_phone_textbox", dialog: "$text7"},
			{type: "hide", img: closephone},

			{type: "show", img: cat, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "We don’t have much time – she needs to come back and work on it asap. We’re wasting time texting her."},
			{type:"hide", img: cat, waitUntilHiden: false},
			{type:"hide", img: ryan},
			{type: "choices",
					choices :
						[{text: "I agree, she needs to redo it.  We can’t submit plagiarized work.",
							go: "#finish_project_Priya"},
						{text: "You text Priya “P, this is " + this._player + ".  U need to meet us @ lib.  We need to fix ur part b/c we can’t use c-h to submit.  We’ll help u.” –",
							relationship: {name: "priya", score: 1},
							go: "#finish_project_Priya"}]},
			{type: "nothing", label: "finish_project_Priya"},
			{type: "show_context", text: "Priya joins you all shortly and you work late to finish the project."},
			{type: "show", img: cat, expression: "happy", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Finally done.  Where are you headed off to now " + this._player + " ?"},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},


			{type: "show", img: ryan, expression: "sad", position: "right", waitUntilShown: false, flip: true, label: "redo"},
			{type: "dialog", speaker: "Ryan", text: "Seems like we should tell Priya,"},
			{type: "show", img: cat, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Ugh, it’s going to be a stressful night."},
			{type: "hide", img: ryan, waitUntilHiden: false},
			{type: "hide", img: cat},
			{type: "dialog", speaker: "", text: "You all work together to finish the project."},
			{type: "show", img: cat, expression: "happy", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Finally done.  Where are you headed off to now " + this._player + " ?"},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},

			// FIXME should be a sad cat here.
			{type: "show", img: cat, position: "left", waitUntilShown: false, label: "submit"},
			{type: "dialog", speaker: "Cat", text: "I’m not comfortable doing that."},
			{type: "show", img: ryan, expression: "sad", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Yeah, seems like if Cat caught it, Sweeney will definitely catch it."},
			{type: "show", img: cat, expression: "thoughtful", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Maybe we can adjust her work enough to make it work?"},
			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Worth a try."},
			{type: "hide", img: ryan, waitUntilHiden: false},
			{type: "hide", img: cat},
			{type: "dialog", speaker: "", text: "You all work together to finish the project."},
			{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Finally done.  Where are you headed off to now " + this._player + " ?"},

			{type: "choices", choices : [
				{text: "Go to the gym",
					go: "#gogym"},
				{text : "Go get a drink at Scottie’s Bar.",
					go : "#gobar"},
				{text: "Go home and study for the finals.",
					go: "#gohome"}], label: "gonextscene"},

			{type: "goto", page: "scene 7.a", label: "gogym"},
			{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},
			{type: "goto", page: "scene 7.b", label: "gobar"},
			{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},
			{type: "goto", page: "scene 7.c", label: "gohome"},
			{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},
		];

		if (this._talked == 1) {
			o = [
				{type: "show", img: cat, expression: "happy", position: "left"},
				{type: "dialog", speaker: "Cat", text: "Thanks for sending your part of the project, I’m compiling everything right now."},
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
					pageObj._io1.setEnable(false);
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
	};

	Page5_1.prototype._onUnload = function() {
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	MPLAY.Page5_1 = Page5_1;
}());
