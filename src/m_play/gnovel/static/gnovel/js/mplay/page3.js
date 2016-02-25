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

		this.setBackground("/static/gnovel/res/textures/backgrounds/library.png");

		this._yourphoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 140), 250, 458);
		this._closephoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 160), 519, 950);


		this._yourphoneImg.material.opacity = 0;
		this._closephoneImg.material.opacity = 0;

		this._yourphone = "yourphone";
		this._closephone = "closephone";

		// for images
		this._setObjectTag(this._yourphone, this._yourphoneImg);
		this._setObjectTag(this._closephone, this._closephoneImg);

		this._talked = 0;

		var z = this.getBackgroundLayer() + 50;
		var pageObj = this;
		var io1 = this.createInteractableObject(
			"/static/gnovel/res/textures/ryan-clickable-lib.png",
			{x: -215, y: -185, z: z, width : 250, height : 431, onClick: function() {
				pageObj._talked = 1;
				pageObj._runFlow();
			}});

		var io2 = this.createInteractableObject(
			"/static/gnovel/res/textures/priya-clickable-lib.png",
			{x: 400, y: -220, z: z, width : 280, height : 414, onClick: function() {
				pageObj._talked = 2;
				pageObj._runFlow();
			}});
	};

	Page3.prototype._createFlowElements = function() {
		// var professor = "%professor";
		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var cat = "%" + this._cat;
		var closephone = "%" + this._closephone;
		var yourphone = "%" + this._yourphone;
		var player = "Honey";
		var o = null;

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

				{type: "dialog", speaker: "Ryan", text: "Well, I actually do need to study, it's just more fun hanging with Priya.  She's keeping me from working hard on my Computer Graphics take home test.", label: "study-r"},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},

				{type: "dialog", speaker: "Ryan", text: "I'm not avoiding it, so much as choosing to do something else.  But speaking of CG, that does remind me of my take home test.", label: "sayhi-r"},
				
				{type: "show", img: yourphone, position: "center", label: "email"},
				{type: "dialog", speaker: "", text: "Your phone pings with an email."},
				{type: "hide", img: yourphone, waitUntilHidden: false},
				{type: "show", img: closephone, waitUntilShown: false},
				{type: "dialog", speaker: "", text: "Programmers & Society goers - I wanted to send off a quick note, wishing you all good luck on your respective midterms.  Also, as a gentle reminder, please make sure to email me with any questions you have.  Your group project deadline is coming up.  Don't let it sneak up on you.  I’ve attached the syllabus to this message.  Make sure you read it, and reach out with any questions. Attch: PROG_SOC_SYLLABUS.PDF - Prof. Sweeney"},
				{type: "hide", img: closephone, waitUntilHidden: false},

				{type: "dialog", speaker: "Ryan", text: player + ", you took CG last semester.  Could you send me some of your stuff from the class?  Like notes and old assignments?"},
				{type: "show", img: priya, position: "right", waitUntilShown: false},
				{type: "dialog", speaker: "Priya", text: "Ryan, I don’t know if you can look at " + player + "’s graded assignments."},
				{type: "dialog", speaker: "Ryan", text: "Shoot, why not?  Is it against the rules or something?"},
				{type: "hide", img: priya, waitUntilHidden: false},
				{type: "show", img: priya, expression: "thoughtful", position: "right", waitUntilShown: false},
				{type: "dialog", speaker: "Priya", text: "I think so… but I don’t know."},
				{type: "dialog", speaker: "Ryan", text: "Aw man, that totally sucks.  I’m so behind in my work, and I was counting on looking at some old homeworks to help me out.  Do you think it’s a big deal?"},
				{type: "choices", 
					choices :
						[{text: "You decide to give all your materials to Ryan.",
							go: "#materials", integrityScore: -1, relationship: {name: "priya", score: -1}},
						{text: "You hesitate… Hopefully he gets the message.",
							go: "#hesitate", integrityScore: 0, relationship: {name: "ryan", score: -1}},
						{text: "Hey Ry, sounds like old assignments aren’t allowed, but I’m happy to give you my notes.",
							go: "#notes", integrityScore: 1}]},

				{type: "hide", img: ryan, waitUntilHidden: false, label: "materials"},
				{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "Thanks!  Priya, it’s no biggie.  It’ll be fine."},
				{type: "hide", img: ryan, waitUntilHidden: false},
				{type: "show", img: ryan, expression: "neutral", position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "I'm just going to use it to catch up."},
				{type: "hide", img: priya, waitUntilHidden: false},
				{type: "show", img: priya, expression: "neutral", position: "right", waitUntilShown: false},					
				{type: "dialog", speaker: "Priya", text: "Ok... Hey guys I'll see you later.  I forgot, I have a thing…"},
				{type: "dialog", speaker: "Ryan", text: "Oh.  Uh, ok, well see you."},
				{type: "hide", img: priya, waitUntilHidden: false},
				{type: "dialog", speaker: "", text: "Priya leaves."},
				{type: "dialog", speaker: "Ryan", text: "I guess she’s upset with me.  Maybe I should talk to her later."},
				{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},

				{type: "dialog", speaker: "Ryan", text: "Hey, if you don't want to help me out, just say so.  Sorry, didn’t mean for it to come out that… I actually have to get going, I'll see you both later.", label: "hesitate"},
				{type: "hide", img: ryan, waitUntilHidden: false},
				{type: "dialog", speaker: "", text: "Ryan leaves."},
				{type: "hide", img: priya, waitUntilHidden: false},
				{type: "show", img: priya, expression: "neutral", position: "right", waitUntilShown: false},
				{type: "dialog", speaker: "Priya", text: "I hope he’s not too upset."},
				{type: "choices",
					choices :
						[{text: "I’m sure he just needs to cool off.",
							go: "#lastflow-p"},
						{text: "He’s just pissed at me, don’t worry about it.",
							go: "#lastflow-p", relationship: {name: "priya", score: 1}}]},
				{type: "dialog", speaker: "Priya", text: "I’ll try to talk to him later.", label: "lastflow-p"},
				{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},

				{type: "dialog", speaker: "Priya", text: "Yeah, don’t risk it.", label: "notes"},
				{type: "dialog", speaker: "Ryan", text: "Thanks, I’ll take what I can get."},

			];
		}

		if(this._talked == 2) {
			o = [
				{type: "show", img: priya, position: "right"},
				{type: "dialog", speaker: "Priya", text: "Hi!  What’s going on?"},
				{type: "choices",
					choices :
						[{text: "I need to study, but wanted to say hi first.",
							go: "#study-p"},
						{text: "I’m coming to say hi.  What are you two doing?",
							go: "#sayhi-p"}]},

				{type: "hide", img: priya, waitUntilHidden: false},
				{type: "show", img: priya, expression: "thoughtful", position: "right", waitUntilShown: false},
				{type: "dialog", speaker: "Priya", text: "We're studying too! Well I'm trying to study."},
				{type: "hide", img: priya, waitUntilHidden: false},
				{type: "show", img: priya, expression: "neutral", waitUntilShown: false},
				{type: "dialog", speaker: "Priya", text: "Your friend here keeps distracting me."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},

				{type: "hide", img: priya, waitUntilHidden: false, label: "sayhi-p"},
				{type: "show", img: priya, expression: "thoughtful", position: "right", waitUntilShown: false},
				{type: "dialog", speaker: "Priya", text: "I’m trying to study."},
				{type: "hide", img: priya, waitUntilHidden: false},
				{type: "show", img: priya, expression: "neutral", position: "right", waitUntilShown: false},
				{type: "dialog", speaker: "Priya", text: "Ryan is avoiding his Computer Graphics work."},

				
				{type: "show", img: yourphone, position: "center", label: "email"},
				{type: "dialog", speaker: "", text: "Your phone pings with an email."},
				{type: "hide", img: yourphone, waitUntilHidden: false},
				{type: "show", img: closephone, waitUntilShown: false},
				{type: "dialog", speaker: "", text: "Programmers & Society goers - I wanted to send off a quick note, wishing you all good luck on your respective midterms.  Also, as a gentle reminder, please make sure to email me with any questions you have.  Your group project deadline is coming up.  Don't let it sneak up on you.  I’ve attached the syllabus to this message.  Make sure you read it, and reach out with any questions. Attch: PROG_SOC_SYLLABUS.PDF - Prof. Sweeney"},
				{type: "hide", img: closephone, waitUntilHidden: false},

				{type: "show", img: ryan, position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: player + ", you took CG last semester.  Could you send me some of your stuff from the class?  Like notes and old assignments?"},
				{type: "dialog", speaker: "Priya", text: "Ryan, I don’t know if you can look at " + player + "’s graded assignments."},
				{type: "dialog", speaker: "Ryan", text: "Shoot, why not?  Is it against the rules or something?"},
				{type: "hide", img: priya, waitUntilHidden: false},
				{type: "show", img: priya, expression: "thoughtful", position: "right", waitUntilShown: false},
				{type: "dialog", speaker: "Priya", text: "I think so… but I don’t know."},
				{type: "dialog", speaker: "Ryan", text: "Aw man, that totally sucks.  I’m so behind in my work, and I was counting on looking at some old homeworks to help me out.  Do you think it’s a big deal?"},
				{type: "choices", 
					choices :
						[{text: "You decide to give all your materials to Ryan.",
							go: "#materials", integrityScore: -1, relationship: {name: "priya", score: -1}},
						{text: "You hesitate… Hopefully he gets the message.",
							go: "#hesitate", integrityScore: 0, relationship: {name: "ryan", score: -1}},
						{text: "Hey Ry, sounds like old assignments aren’t allowed, but I’m happy to give you my notes.",
							go: "#notes", integrityScore: 1}]},

				{type: "hide", img: ryan, waitUntilHidden: false, label: "materials"},
				{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "Thanks!  Priya, it’s no biggie.  It’ll be fine."},
				{type: "hide", img: ryan, waitUntilHidden: false},
				{type: "show", img: ryan, expression: "neutral", position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "I'm just going to use it to catch up."},
				{type: "hide", img: priya, waitUntilHidden: false},
				{type: "show", img: priya, expression: "neutral", position: "right", waitUntilShown: false},				
				{type: "dialog", speaker: "Priya", text: "Ok... Hey guys I'll see you later.  I forgot, I have a thing…"},
				{type: "dialog", speaker: "Ryan", text: "Oh.  Uh, ok, well see you."},
				{type: "hide", img: priya, waitUntilHidden: false},
				{type: "dialog", speaker: "", text: "Priya leaves."},
				{type: "dialog", speaker: "Ryan", text: "I guess she’s upset with me.  Maybe I should talk to her later."},
				{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},

				{type: "dialog", speaker: "Ryan", text: "Hey, if you don't want to help me out, just say so.  Sorry, didn’t mean for it to come out that… I actually have to get going, I'll see you both later.", label: "hesitate"},
				{type: "hide", img: ryan, waitUntilHidden: false},
				{type: "dialog", speaker: "", text: "Ryan leaves."},
				{type: "hide", img: priya, waitUntilHidden: false},
				{type: "show", img: priya, expression: "neutral", position: "right", waitUntilShown: false},
				{type: "dialog", speaker: "Priya", text: "I hope he’s not too upset."},
				{type: "choices",
					choices :
						[{text: "I’m sure he just needs to cool off.",
							go: "#lastflow-p"},
						{text: "He’s just pissed at me, don’t worry about it.",
							go: "#lastflow-p", relationship: {name: "priya", score: 1}}]},
				{type: "dialog", speaker: "Priya", text: "I’ll try to talk to him later.", label: "lastflow-p"},
				{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},

				{type: "dialog", speaker: "Priya", text: "Yeah, don’t risk it.", label: "notes"},
				{type: "dialog", speaker: "Ryan", text: "Thanks, I’ll take what I can get."},
			];
		}

		return o;
	};


	MPLAY.Page3 = Page3;
}());