// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page3
	 * @augments MPLAY.MPlayPage
	 */
	var Page3 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page3.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page3.prototype.constructor = Page3;

	/**
	 * @override
	 */
	Page3.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupLibraryBackground();

		this._yourphoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 150), 250, 458);		

		this._yourphoneImg.material.opacity = 0;		

		this._yourphone = "yourphone";		

		// for images
		this._setObjectTag(this._yourphone, this._yourphoneImg);		

		this._talked = 0;

		var z = this.getBackgroundLayer() + 50;
		var pageObj = this;

		var onInteractableObjectClicked = function(io) {
			// disable interactable object
			pageObj._io1.setEnable(false);
			pageObj._io2.setEnable(false);

			// fade all interactable objects
			pageObj.tweenMat(pageObj._io1.getImage(), {
				opacity: 0,
				easing: TWEEN.Easing.Cubic.Out,
				duration: 800,
				onComplete: function() {
					// remove this io
					pageObj._io1.remove();
				},
			});
			pageObj.tweenMat(pageObj._io2.getImage(), {
				opacity: 0,
				easing: TWEEN.Easing.Cubic.Out,
				duration: 800,
				onComplete: function() {
					// remove this io
					pageObj._io2.remove();
				},
			});
		};

		this._io1 = this.createInteractableObject(
			"/static/gnovel/res/textures/ryan-clickable-lib.png",
			{x: -215, y: -185, z: z, width : 250, height : 431, onClick: function(io) {
				pageObj._talked = 1;
				pageObj._runFlow();

				onInteractableObjectClicked(io);
			}});

		this._io2 = this.createInteractableObject(
			"/static/gnovel/res/textures/priya-clickable-lib.png",
			{x: 400, y: -220, z: z, width : 280, height : 414, onClick: function(io) {
				pageObj._talked = 2;
				pageObj._runFlow();

				onInteractableObjectClicked(io);
			}});

		this._cgAssignmentStatus = 0;
	};

	Page3.prototype._createFlowElements = function() {
		// var professor = "%professor";
		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var cat = "%" + this._cat;
		var closephone = "%" + this._closephone;
		var yourphone = "%" + this._yourphone;
		var player = this._player;
		var o = null;

		var common = [
			{type: "nothing", label: "email"},
			//{type: "hide", img: ryan},
			{type: "show_phone_notif"},

			// phone email exchange begins
			{type: "show", img: closephone},
			{type: "phone_textbox",
				label: "email_textbox",
				bgOffsetY: -230,
				bgHeight: 600,
				bgWidth: 400,
				y: 250,
				charLine: 37,
				text: "Programmers & Society goers - I wanted to send off a quick note, wishing you all good luck on your respective midterms.  Also, as a gentle reminder, please make sure to email me with any questions you have.  Your group project deadline is coming up.  Don't let it sneak up on you.  I’ve attached the syllabus to this message.  Make sure you read it, and reach out with any questions. Attch: PROG_SOC_SYLLABUS.PDF - Prof. Sweeney"},
			{type: "hide_phone_textbox", dialog: "$email_textbox"},
			{type: "hide", img: closephone},
			// phone email exchange ends

			{type: "show", img: ryan, expression: "thoughtful", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: player + ", you took CG last semester.  Could you send me some of your stuff from the class?  Like notes and old assignments?"},
			{type: "show", img: priya, expression:"thoughtful", position: "right", waitUntilShown: false, flip: true},
			{type: "dialog", speaker: "Priya", text: "Ryan, I don’t know if you can look at " + player + "’s graded assignments."},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Shoot, why not?  Is it against the rules or something?"},
			{type: "show", img: priya, expression: "thoughtful", position: "right", waitUntilShown: false, flip: true},
			{type: "dialog", speaker: "Priya", text: "I think so… but I don’t know."},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Aw man, that totally sucks.  I’m so behind in my work, and I was counting on looking at some old homeworks to help me out.  Do you think it’s a big deal?"},
			//FIXME make this a TIMED choice
			{type: "choices",
				choices :
					[{text: "You decide to give all your materials to Ryan.",
						go: "#materials", integrityScore: -1, relationship: {name: "priya", score: -1},
						onChoose: function(page){
							console.log("you give ryan cg assignments");
							page._cgAssignmentStatus = 1;
						}},
					{text: "You hesitate… Hopefully he gets the message.",
						go: "#hesitate", integrityScore: 0, relationship: {name: "ryan", score: -1}},
					{text: "Hey Ry, sounds like old assignments aren’t allowed, but I’m happy to give you my notes.",
						go: "#notes", integrityScore: 1}],
				seconds: 10},

			{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false, label:"materials"},
			{type: "dialog", speaker: "Ryan", text: "Thanks!  Priya, it’s no biggie.  It’ll be fine."},
			{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I'm just going to use it to catch up."},
			{type: "show", img: priya, expression: "sad", position: "right", waitUntilShown: false, flip:true},
			{type: "dialog", speaker: "Priya", text: "Ok... Hey guys I'll see you later.  I forgot, I have a thing…"},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Oh.  Uh, ok, well see you."},
			{type: "hide", img: priya, waitUntilHidden: false},
			{type: "dialog", speaker: "", text: "Priya leaves."},
			{type: "dialog", speaker: "Ryan", expression: "thoughtful", text: "I guess she’s upset with me.  Maybe I should talk to her later."},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},

			{type: "dialog", speaker: "Ryan", expression: "angry", text: "Hey, if you don't want to help me out, just say so.  Sorry, didn’t mean for it to come out that… I actually have to get going, I'll see you both later.", label: "hesitate"},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "dialog", speaker: "", text: "Ryan leaves."},
			{type: "show", img: priya, expression: "sad", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "I hope he’s not too upset.", flip: true},
			{type: "choices",
				choices :
					[{text: "I’m sure he just needs to cool off.",
						go: "#lastflow-p"},
					{text: "He’s just pissed at me, don’t worry about it.",
						go: "#lastflow-p", relationship: {name: "priya", score: 1}}]},
			{type: "nothing", label: "lastflow-p"},
			{type: "show", img: priya, expression: "thoughtful", position: "right", waitUntilShown: false, flip: true},
			{type: "dialog", speaker: "Priya", text: "I’ll try to talk to him later." },
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},

			{type: "dialog", speaker: "Priya", text: "Yeah, don’t risk it.", label: "notes"},
			{type: "dialog", speaker: "Ryan", text: "Thanks, I’ll take what I can get."},

			{type: "choices", choices : [{text: "Grab some food at the café with Priya.", go: "#gocafe", relationship: {name:"priya", score:1}}, {text : "Go get a drink at Scottie’s Bar and run into Cat.", go : "#gobar", relationship: {name:"cat", score:1}}, {text: "Go home and take a nap.", go: "#gohome"}], label: "aside2"},
			{type: "goto", page: "scene 5.a", label: "gocafe"},
			{type: "goto", page: "scene 5.b", label: "gobar"},
			{type: "goto", page: "scene 6.a", label: "gohome"},

		];

		if(this._talked == 1) {
			o = [
				{type: "show", img: ryan, position: "left"},
				{type: "dialog", speaker: "Ryan", text: "Hey there!  Coming to join us?"},
				{type: "choices",
					choices :
						[{text: "I need to study, but wanted to say hi first.",
							go: "#study-r"},
						{text: "I’m coming to say hi.  What are you two doing?",
							go: "#sayhi-r"}]},

				{type: "show", img: priya, expression:"thoughtful", position: "right", waitUntilShown: false, flip: true, label:"study-r"},
				{type: "dialog", speaker: "Priya", text: "We're studying too!  Well I'm trying to study."},
				{type: "show", img: priya, expression: "neutral", position: "right", waitUntilShown: false},
				{type: "dialog", speaker: "Priya", text: "Your friend here keeps distracting me"},
				{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "Well, I actually do need to study, it's just more fun hanging with Priya.  She's keeping me from working hard on my Computer Graphics take home test."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},

				{type: "show", img: priya, position: "right", waitUntilShown: false, label: "sayhi-r"},
				{type: "dialog", speaker: "Priya", text: "I'm trying to study.  Ryan is avoiding his Computer Graphics work", },
				{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "I'm not avoiding it, so much as choosing to do something else.  But speaking of CG, that does remind me of my take home test."},


			];
			o = o.concat(common);
		}else if(this._talked == 2) {
			o = [
				{type: "show", img: priya, position: "right"},
				{type: "dialog", speaker: "Priya", text: "Hi!  What’s going on?"},
				{type: "choices",
					choices :
						[{text: "I need to study, but wanted to say hi first.",
							go: "#study-p"},
						{text: "I’m coming to say hi.  What are you two doing?",
							go: "#sayhi-p"}]},

							{type: "show", img: priya, expression:"thoughtful", position: "right", waitUntilShown: false, label:"study-p"},
							{type: "dialog", speaker: "Priya", text: "We're studying too!  Well I'm trying to study."},
							{type: "show", img: priya, expression: "neutral", position: "right", waitUntilShown: false},
							{type: "dialog", speaker: "Priya", text: "Your friend here keeps distracting me"},
							{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
							{type: "dialog", speaker: "Ryan", text: "Well, I actually do need to study, it's just more fun hanging with Priya.  She's keeping me from working hard on my Computer Graphics take home test."},
							{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},

							{type: "show", img: priya, position: "right", waitUntilShown: false, label: "sayhi-p"},
							{type: "dialog", speaker: "Priya", text: "I'm trying to study.  Ryan is avoiding his Computer Graphics work"},
							{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
							{type: "dialog", speaker: "Ryan", text: "I'm not avoiding it, so much as choosing to do something else.  But speaking of CG, that does remind me of my take home test."},
			];
			o = o.concat(common);
		}

		return o;
	};

	/**
	 * @override
	 */
	Page3.prototype._onUnload = function() {
		this._owner.saveData("cgAssignmentStatus", this._cgAssignmentStatus);
	};


	MPLAY.Page3 = Page3;
}());
