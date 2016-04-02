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

		this._yourphoneImg = this.createImage("/static/gnovel/res/textures/ui/phone.png", new THREE.Vector3(0, 60, 140), 250, 458);

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
		var player = this._player;

		var cgAssignmentStatus = this._owner.getSavedData("cgAssignmentStatus");

		// variables from scene 2
		var isAssignmentGiven = (cgAssignmentStatus > 0);

		var o = null;

			o = [
				{type:"show_context", text:"Later that day, you head to the library to join Cat and Ryan."},
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
			{type: "show", img: cat, expression: "sad", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Uh oh… I think we have a problem."},
			{type: "show", img: ryan, expression: "thoughtful", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "What’s wrong?"},
			{type: "show", img: cat, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "It looks like Priya took her code from another source… I found it on a codeHub forum online."},
			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I’m sure Priya didn’t realize. She would never cheat."},
			{type: "show", img: cat, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "I think it’s plagiarism.  What should we do, we have to submit the project in 2 hours!"},
			{type: "choices",
					choices :
						[{text: "Well, let's just ask her about it.",
							integrityScore: 1,
							go: "#ask"},
						{text: "We only have a few hours. Let’s divide and conquer. Redo her work.",
							integrityScore: 0,
							relationship: {name: "priya", score: 1},
							go: "#redo"},
						{text: "Let’s just submit it, I’m sure it’s fine.",
							integrityScore: -1,
							go: "#submit" }],
					seconds: 10,
					responses: [{text:"Hello?"},{text: "Don't just leave me hanging."}],
					speaker: this._ryan},

			{type: "nothing", label: "ask"},
			{type: "custom", func: function(page) {
				page.getRelationshipManager().addRelationship("Cat", 1);
				page.getRelationshipManager().addRelationship("Ryan", -1);
			}},
			{type: "compare", leftop: isAssignmentGiven, operator: "equal", rightop: 1, goTrue: "#asst_given", goFalse: "#asst_not_given"},

			{type: "nothing", label: "asst_not_given"},
			{type: "show", img: ryan, expression: "thoughtful", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Let’s text her."},
			{type: "hide", img: cat, waitUntilHiden: false},
			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "jump", condition: true, goTrue: "#txtxchange", goFalse: "#txtxchange"},

			{type: "nothing", label: "asst_given"},
			{type: "show", img: ryan, expression: "sad", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "She might still be mad at me about me using your CG assignment."},
			{type: "dialog", seconds: "Ryan", text: "Why don’t you text her, "+ player +"."},
			{type: "hide", img: cat, waitUntilHiden: false},
			{type: "hide", img: ryan, waitUntilHiden: false},
			{type: "jump", condition: true, goTrue: "#txtxchange", goFalse: "#txtxchange"},

			{type: "nothing", label: "txtxchange"},
			// phone exchange begins
			{type: "show", img: closephone},
			{type: "phone_textbox",
				label: "text1",
				bgOffsetY: 20,
				bgHeight: 60,
				bgWidth: 330,
				y: 220,
				charLine: 37,
				text: "P – there’s a violation with your part of the project."},
			{type: "phone_textbox",
				label: "text2",
				bgOffsetY: 20,
				bgHeight: 60,
				bgWidth: 330,
				y: 160,
				charLine: 37,
				text: "k…"},
			{type: "phone_textbox",
				label: "text3",
				bgOffsetY: 20,
				bgHeight: 60,
				bgWidth: 330,
				y: 90,
				charLine: 37,
				text: "Did u use codeHub for ur code?"},
			{type: "phone_textbox",
				label: "text4",
				bgOffsetY: 20,
				bgHeight: 60,
				bgWidth: 330,
				y: 10,
				charLine: 37,
				text: "Yes – I used c-h to work thru the problem."},
			// {type: "phone_textbox",
			// 	label: "text5",
			// 	bgOffsetY: 10,
			// 	bgHeight: 60,
			// 	bgWidth: 330,
			// 	y: -30,
			// 	charLine: 37,
			// 	text: "srsly?"},
			{type: "phone_textbox",
				label: "text6",
				bgOffsetY: 10,
				bgHeight: 60,
				bgWidth: 330,
				y: -60,
				charLine: 37,
				text: "It’s common for programmers… did it @ undergrad."},
			// {type: "phone_textbox",
			// 	label: "text7",
			// 	bgOffsetY: 10,
			// 	bgHeight: 60,
			// 	bgWidth: 330,
			// 	y: -170,
			// 	charLine: 37,
			// 	text: "k..."},
			{type: "hide_phone_textbox", dialog: "$text1"},
			{type: "hide_phone_textbox", dialog: "$text2"},
			{type: "hide_phone_textbox", dialog: "$text3"},
			{type: "hide_phone_textbox", dialog: "$text4"},
			// {type: "hide_phone_textbox", dialog: "$text5"},
			{type: "hide_phone_textbox", dialog: "$text6"},
			// {type: "hide_phone_textbox", dialog: "$text7"},
			{type: "hide", img: closephone},

			{type: "show", img: cat, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "We don’t have much time – she needs to come back and work on it asap. We’re wasting time texting her."},
			{type:"hide", img: cat, waitUntilHiden: false},
			{type:"hide", img: ryan},
			{type: "choices",
					choices :
						[{text: "I agree, she needs to redo it.  We can’t submit plagiarized work.",
							go: "#finish_project_Priya"},
						{text: "Let’s text her to come over and fix it. Let’s pitch all pitch in to help.",
							go: "#finish_project_Priya"}]},
			{type: "nothing", label: "finish_project_Priya"},
			{type: "show_context", text: "Priya struggles to work through an answer with original code to replace her old work before the deadline."},
			{type: "show_context", text: "She ends up finishing it in time, but the work is not her best, and she’s frustrated."},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},


			{type: "nothing", label: "redo"},
			{type: "show", img: ryan, expression: "sad", position: "right", waitUntilShown: false, flip: true, label: "redo"},
			{type: "dialog", speaker: "Ryan", text: "Seems like we should tell Priya,"},
			{type: "show", img: cat, expression: "sad", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Ugh, it’s going to be a stressful night."},
			{type: "hide", img: ryan, waitUntilHiden: false},
			{type: "hide", img: cat},
			{type: "show_context", text: "You, Ryan and Cat end up redoing Priya’s work."},
			{type: "show_context", text: "You barely finish the assignment in time to submit it"},
			{type: "show_context", text: "and everyone ends the night feeling frustrated."},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},


			{type: "nothing", label: "submit"},
			{type: "custom", func: function(page) {
				page.getRelationshipManager().addRelationship("Cat", -1);
				page.getRelationshipManager().addRelationship("Ryan", 1);
			}},
			{type: "show", img: cat, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "I’m not comfortable doing that."},
			{type: "show", img: ryan, expression: "sad", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Yeah, seems like if Cat caught it, Sweeney will definitely catch it."},
			{type: "show", img: cat, expression: "thoughtful", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Maybe we can tweak her work enough to make it ok?"},
			{type: "show", img: ryan, expression: "thoughtful", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Worth a try."},
			{type: "hide", img: ryan, waitUntilHiden: false},
			{type: "hide", img: cat},
			{type: "show_context", text: "You, Ryan and Cat end up redoing Priya’s work."},
			{type: "show_context", text: "You barely finish the assignment in time to submit it"},
			{type: "show_context", text: "and everyone ends the night feeling frustrated."},

			{type: "nothing", label: "gonextscene"},
			{type: "choices", choices : [
				{text: "Go to the gym",
					go: "#gogym"},
				{text : "Go get a drink at Scottie’s Bar.",
					go : "#gobar"},
				{text: "Go home and study for the finals.",
					go: "#gohome"}]},

			{type: "goto", page: "scene 7.a", label: "gogym"},
			{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},
			{type: "goto", page: "scene 7.b", label: "gobar"},
			{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},
			{type: "goto", page: "scene 7.c", label: "gohome"},
			{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},
		];

		if (this._talked == 1) {
			o = [
				{type: "custom", func: function(page){
					return page.getRelationshipManager().getRelationship("Cat");
				}, label: "catRelationshipScore1"},
				{type: "compare", leftop: "$catRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#pos-cat1", goFalse: "#comparecat1"},

				{type: "nothing", label: "pos-cat1"},
				{type: "show", img: cat, expression: "happy", position: "left"},
				{type: "custom", func: function(page) {
					page.getOwner().getSoundManager().play("Sup-Cat");
				}},
				{type: "dialog", speaker: "Cat", text: "Thanks for sending your part of the project, I’m compiling everything right now."},
				{type: "jump", condition: true, goTrue: "#gocommon", goFalse: "#gocommon"},

				{type: "nothing", label: "comparecat1"},
				{type: "compare", leftop: "$catRelationshipScore1", operator: "equal", rightop: 0, goTrue: "#zero-cat1", goFalse: "#neg-cat1"},

				{type: "nothing", label: "zero-cat1"},
				{type: "show", img: cat, position: "left"},
				{type: "custom", func: function(page) {
					page.getOwner().getSoundManager().play("Hey-Cat");
				}},
				{type: "dialog", speaker: "Cat", text: "I’m compiling our project now. Should only take a sec."},
				{type: "jump", condition: true, goTrue: "#gocommon", goFalse: "#gocommon"},

				{type: "nothing", label: "neg-cat1"},
				{type: "show", img: cat, expression: "sad", position: "left"},
				{type: "dialog", speaker: "Cat", text: "Almost done compiling the project!"},
				{type: "jump", condition: true, goTrue: "#gocommon", goFalse: "#gocommon"},

				{type: "nothing", label: "gocommon"},

			];

			o = o.concat(common);
		};
		if (this._talked == 2) {
			o = [

				// phone text exchange begins
				{type: "show", img: closephone, position: "center"},
				{type: "phone_textbox",
					label: "mom_text",
					text: "Hey hon!  Study hard, go to the gym, keep good habits, do your best!!!!!!! MOM"},
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
