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

		// this._ambientInstance = this._owner.getSoundManager().play("Library-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1});

		this.setupLibraryBackground();

		this._yourphoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 150), 250, 458);

		this._yourphoneImg.material.opacity = 0;

		this._yourphone = "yourphone";

		var geometry = new THREE.PlaneBufferGeometry(1920, 1080);
		var material = new THREE.MeshBasicMaterial( {color: 0x000000, transparent:true } );
		this._transitionBgImg = new THREE.Mesh(geometry,material);
		this._transitionBgImg.position.z = 150;

		this._transitionBg = "transitionbg";

		// for images
		this._setObjectTag(this._yourphone, this._yourphoneImg);
		this._setObjectTag(this._transitionBg,this._transitionBgImg);

		this._talked = 0;

		var z = this.getBackgroundLayer() + 50;
		var pageObj = this;

		var onInteractableObjectClicked = function(io) {
			// disable interactable object
			pageObj._io1.setEnable(false);
			pageObj._io2.setEnable(false);
		};

		this._io1 = this.createInteractableObject(
			"/static/gnovel/res/textures/ryan-clickable-lib.png",
			{type: "character", x: -215, y: -185, z: z, width : 250, height : 431, onClick: function(io) {
				pageObj._talked = 1;
				pageObj._runFlow();

				onInteractableObjectClicked(io);

				pageObj.tweenMat(pageObj._io1.getImage(), {
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800,
					onComplete: function() {
						// remove this io
						pageObj._io1.remove();
					},
				});
			}});

		this._io2 = this.createInteractableObject(
			"/static/gnovel/res/textures/priya-clickable-lib.png",
			{type: "character", x: 400, y: -220, z: z, width : 280, height : 414, onClick: function(io) {
				pageObj._talked = 2;
				pageObj._runFlow();

				onInteractableObjectClicked(io);

				pageObj.tweenMat(pageObj._io2.getImage(), {
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800,
					onComplete: function() {
						// remove this io
						pageObj._io2.remove();
					},
				});
			}});

			//deactivate interactable objects at first
		pageObj._io1.setEnable(false);
		pageObj._io2.setEnable(false);
		this._cgAssignmentStatus = 0;
	};

	Page3.prototype._createFlowElements = function() {
		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var cat = "%" + this._cat;
		var closephone = "%" + this._closephone;
		var yourphone = "%" + this._yourphone;
		var player = this._player;
		var transitionBg = "%" + this._transitionBg;
		var o = null;

		o = [
				{type: "show_context", text: "A few weeks pass, and work starts piling up"},
				{type: "show_context", text: "You head to the library to study"},
				{type: "custom", func: function(pageObj){
					//disable the characters from being clickable while context showing
					pageObj._io1.setEnable(true);
					pageObj._io2.setEnable(true);
				}}
		];

		var common = [
			{type: "nothing", label: "email"},
			{type: "show_phone_notif"},

			// phone email exchange begins
			{type: "show", img: closephone, waitUntilShown: false},
			{type: "phone_textbox",
				label: "phone_bg",
				bgOffsetY: -230,
				bgOffsetX: -15,
				bgHeight: 800,
				bgWidth: 1460,
				y: 250,
				charLine: 37,
				bgPath: "/static/gnovel/res/textures/Email-graphic.png",
				waitUntilShown: false,
				text: ""},
			{type: "phone_textbox",
				label: "address_from",
				bgHeight: 10,
				bgWidth: 10,
				x: -200,
				y: 230,
				dontShowBg: true,
				text: "From: Prof. Sweeney",
				messageAlign: "left",
				waitUntilShown: false,
				},
			{type: "phone_textbox",
				label: "address_to",
				bgHeight: 10,
				bgWidth: 10,
				x: -200,
				y: 200,
				dontShowBg: true,
				text: "To: " + player,
				messageAlign: "left",
				waitUntilShown: false,
				},
			{type: "phone_textbox",
				label: "email_subject",
				bgHeight: 10,
				bgWidth: 10,
				x: -200,
				y: 100,
				dontShowBg: true,
				charLine: 40,
				text: "Subject: [ProgSoc] Class Update",
				messageAlign: "left",
				waitUntilShown: false,
				},
			{type: "phone_textbox",
				label: "email_textbox",
				bgHeight: 10,
				bgWidth: 10,
				y: 40,
				charLine: 37,
				dontShowBg: true,
				text: "Programmers & Society goers - I wanted to send off a quick note, wishing you all good luck on midterms.  Please make sure to email me with any questions you have.  Your group project deadline is coming up.  Don't let it sneak up on you.  Make sure you read the syllabus, and reach out with any questions. Attch: PROG_SOC_SYLLABUS.PDF - Prof. Sweeney"},
			{type: "hide_phone_textbox", dialog: "$phone_bg"},
			{type: "hide_phone_textbox", dialog: "$address_from"},
			{type: "hide_phone_textbox", dialog: "$address_to"},
			{type: "hide_phone_textbox", dialog: "$email_subject"},
			{type: "hide_phone_textbox", dialog: "$email_textbox"},
			{type: "hide", img: closephone},
			// phone email exchange ends

			{type: "show", img: ryan, expression: "thoughtful", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: player + ", you took CG last semester.  Could you send me some of your stuff from the class?  Like notes and old assignments?"},
			{type: "show", img: priya, expression:"thoughtful", position: "right", waitUntilShown: false, flip: true},
			{type: "dialog", speaker: "Priya", text: "Ryan, you can’t look at "+ player +"’s graded assignments from last year.  My friend got in trouble for doing that, it’s not worth it."},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I’m just stuck on some problems - I’m only going to use it to check my work."},
			{type: "dialog", speaker: "Priya", text: "If you do, you probably won’t get caught, but why risk it?"},
			{type: "show", img: ryan, position: "left", expression: "sad", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I won’t get caught, Priya. I’m so behind in my work, I just need something to help me catch up."},

			{type: "choices",
				choices :
					[{text: "No problem, Ryan.  You’d do the same for me.",
						go: "#materials", integrityScore: -1,
						onChoose: function(page){
							console.log("you give ryan cg assignments");
							page._cgAssignmentStatus = 1;
						}},
					{text: "Ry, I don’t know…",
						go: "#dontknow", integrityScore: 0, relationship: {name: this._ryan, score: -1}},
					{text: "I’m happy to give you a hand where you’re stuck, but can you check with the TA to make sure it’s ok?",
						go: "#notes", integrityScore: 1, relationship: {name: this._priya, score: 2}}],
				seconds: 10,
				responses: [{text: "hey!"}, {text:"did you hear me"}],
				speaker: this.ryan},

			{type: "nothing", label: "materials"},
			{type: "custom", func: function(page) {
					page.getRelationshipManager().addRelationship("Priya", -1);
					page.getRelationshipManager().addRelationship("Ryan", 2);
				}},
			{type: "custom", func: function(page) {
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore4"},
			{type: "compare", leftop: "$ryanRelationshipScore4", operator: "greater", rightop: 0, goTrue: "#pos", goFalse: "#compare3"},

			{type: "nothing", label: "pos"},
			{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Thanks, "+ player +"! This is such a huge help."},
			{type: "show", img: priya, expression: "sad", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "Ok... Listen, I’ll see you both in class later."},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Oh.  Uh, ok, well, see you."},
			{type: "hide", img: priya, waitUntilHidden: false},
			{type: "show", img: ryan, position: "left", expression:"thoughtful", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I guess she’s upset with me. I should talk to her later."},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},

			{type: "nothing", label: "compare3"},
			{type: "compare", leftop: "$ryanRelationshipScore4", operator: "equal", rightop: 0, goTrue: "#zero", goFalse: "#neg" },

			{type: "nothing", label: "zero"},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "This is going to be a huge help. Thanks."},
			{type: "show", img: priya, expression: "sad", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "Listen, I’m late for a meeting.  See you."},
			{type: "dialog", speaker: "Oh.  Uh, ok, well, see you."},
			{type: "hide", img: priya, waitUntilHidden: false},
			{type: "show", img: ryan, position: "left", expression:"thoughtful", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I guess she’s upset with me. Maybe I should talk to her later."},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},

			{type: "nothing", label: "neg"},
			{type: "show", img: priya, expression: "sad", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "Right, well.  See you in class."},
			{type: "dialog", speaker: "Oh.  Uh, ok, well, see you."},
			{type: "hide", img: priya, waitUntilHidden: false},
			{type: "show", img: ryan, position: "left", expression:"thoughtful", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I guess she’s upset with me. Maybe I should talk to her later."},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},


			{type: "nothing", label: "dontknow"},
			{type: "custom", func: function(page) {
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore5"},
			{type: "compare", leftop: "$ryanRelationshipScore5", operator: "greater", rightop: 0, goTrue: "#pos1", goFalse: "#compare4"},

			{type: "nothing", label: "pos1"},
			{type: "show", img: ryan, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Hey "+ player +", if you don't want to help me out, just say so."},
			{type: "show", img: ryan, expression: "sad", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Sorry, didn’t mean for it to come out that… I actually have to get going, I'll see you both later."},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: priya, position: "right", expression:"sad", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "I hope he’s not too upset."},
			{type: "choices", choices : [{text: "I’m sure he just needs to cool off.", go: "#priyanext1"}, {text : "He’s just pissed at me, don’t worry about it.", go : "#priyanext1"}]},
			{type: "show", img: priya, expression: "thoughtful", position: "right", waitUntilShown: false, label: "priyanext1"},			
			{type: "dialog", speaker: "Priya", text: "I’ll try to talk to him later."},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},

			{type: "nothing", label: "compare4"},
			{type: "compare", leftop: "$ryanRelationshipScore5", operator: "equal", rightop: 0, goTrue: "#zero1", goFalse: "neg1" },

			{type: "nothing", label: "zero1"},
			{type: "show", img: ryan, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I get it, it’s fine."},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Sorry, didn’t mean for it to come out that… I actually have to get going, I'll see you both later."},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: priya, position: "right", expression:"sad", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "I hope he’s not too upset."},
			{type: "choices", choices : [{text: "I’m sure he just needs to cool off.", go: "#priyanext2"}, {text : "He’s just pissed at me, don’t worry about it.", go : "#priyanext2"}]},
			{type: "show", img: priya, expression: "thoughtful", position: "right", waitUntilShown: false, label: "priyanext2"},			
			{type: "dialog", speaker: "Priya", text: "I’ll try to talk to him later."},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},

			{type: "nothing", label: "neg1"},
			{type: "show", img: ryan, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Wow, way to be passive aggressive about it."},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Look, didn’t mean for it to come out that… I actually have to get going, I'll see you both later."},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: priya, position: "right", expression:"sad", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "I hope he’s not too upset."},
			{type: "choices", choices : [{text: "I’m sure he just needs to cool off.", go: "#priyanext3"}, {text : "He’s just pissed at me, don’t worry about it.", go : "#priyanext3"}]},
			{type: "show", img: priya, expression: "thoughtful", position: "right", waitUntilShown: false, label: "priyanext3"},
			{type: "dialog", speaker: "Priya", text: "I’ll try to talk to him later."},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},


			{type: "nothing", label: "notes"},
			{type: "custom", func: function(page) {
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore6"},
			{type: "compare", leftop: "$ryanRelationshipScore6", operator: "greater", rightop: 0, goTrue: "#pos2", goFalse: "#compare5"},

			{type: "nothing", label: "pos2"},
			{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Seriously?  I’m sure it’s fine, but if it’ll make you feel better, I’ll email the TA."},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},

			{type: "nothing", label: "compare5"},
			{type: "compare", leftop: "$ryanRelationshipScore6", operator: "equal", rightop: 0, goTrue: "#zero2", goFalse: "neg2" },

			{type: "nothing", label: "zero2"},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I guess I can email the TA to check."},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},

			{type: "nothing", label: "neg2"},
			{type: "show", img: ryan, expression: "thoughtful", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Forget it, I’ll just work it through myself.  Thanks anyway."},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},

			{type: "choices", choices : [{text: "Grab some food at the café with Priya.", go: "#gocafe", relationship: {name:"priya", score:1}}, {text : "Go get a drink at Scottie’s Bar and run into Cat.", go : "#gobar", relationship: {name:"cat", score:1}}, {text: "Go home and take a nap.", go: "#gohome"}], label: "aside2"},

			{type: "nothing", label: "gocafe"},
			{type: "show", img: transitionBg, waitUntilShown:false},
			// after transition
			{type: "dialog", speaker: "", text: "You head to the cafe"},
			{type: "goto", page: "scene 5.a"},

			{type: "nothing", label: "gobar"},
			{type: "show", img: transitionBg, waitUntilShown:false},
			// after transition
			{type: "dialog", speaker: "", text: "You head to the bar"},
			{type: "goto", page: "scene 5.b"},

			{type: "nothing", label: "gohome"},
			{type: "custom", func: function(page) {
					page.getRelationshipManager().addRelationship("Priya", -1);
					page.getRelationshipManager().addRelationship("Cat", -1);
				}},
			{type: "show", img: transitionBg, waitUntilShown:false},
			// after transition
			{type: "dialog", speaker: "", text: "You head to the bar"},
			{type: "goto", page: "scene 6.a"},

		];

		if(this._talked == 1) {
			o = [
				{type: "custom", func: function(page){
					return page.getRelationshipManager().getRelationship("Ryan");
				}, label: "ryanRelationshipScore1"},
				{type: "compare", leftop: "$ryanRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#happy", goFalse: "#compare2"},
				
				{type: "nothing", label: "happy"},
				{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "Hey " + player + ", nice to see you. Coming to join us?"},
				{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

				{type: "compare", leftop: "$ryanRelationshipScore1", operator: "equal", rightop: 0, goTrue: "#neutural", goFalse: "#thoughtful", label: "compare2"},
				
				{type: "nothing", label: "neutural"},
				{type: "show", img: ryan, position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "Oh hey. Coming to join us?"},
				{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

				{type: "nothing", label: "thoughtful"},
				{type: "show", img: ryan, expression: "thoughtful", position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "Hey.  What’s up?"},
				{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

				{type: "choices",
					choices :
						[{text: "I need to study, but wanted to say hi first.",
							go: "#study-r"},
						{text: "Not much",
							go: "#sayhi-r"}], label: "choices1"},

				{type: "nothing", label: "study-r"},
				{type: "custom", func: function(page) {
					page.getRelationshipManager().addRelationship("Priya", 1);
					page.getRelationshipManager().addRelationship("Ryan", 1);
				}},
				{type: "custom", func: function(pageObj) {
					pageObj.tweenMat(pageObj._io2.getImage(), {
						opacity: 0,
						easing: TWEEN.Easing.Cubic.Out,
						duration: 800,
						onComplete: function() {
							// remove this io
							pageObj._io2.remove();
						},
					});
				}},

				{type: "custom", func: function(page) {
					return page.getRelationshipManager().getRelationship("Priya");
				}, label: "priyaRelationshipScore2"},
				{type: "compare", leftop: "$priyaRelationshipScore2", operator: "greater", rightop: 0, goTrue: "#pos-priya", goFalse: "#neg-priya"},

				{type: "nothing", label: "pos-priya"},
				{type: "show", img: priya, expression:"happy", position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Priya", text: "We're studying too! Well I'm trying to study.  Your friend here keeps distracting me."},
				{type: "jump", condition: true, goTrue: "#compareryan", goFalse: "#compareryan"},

				{type: "nothing", label: "neg-priya"},
				{type: "show", img: priya, position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Priya", text: "We're studying too! Well I'm trying to study.  Ryan keeps distracting me."},
				{type: "jump", condition: true, goTrue: "#compareryan", goFalse: "#compareryan"},

				{type: "nothing", label: "compareryan"},
				{type: "custom", func: function(page) {
					return page.getRelationshipManager().getRelationship("Ryan");
				}, label: "ryanRelationshipScore2"},
				{type: "compare", leftop: "$ryanRelationshipScore2", operator: "greater", rightop: 0, goTrue: "#pos-ryan", goFalse: "#neg-ryan"},

				{type: "nothing", label: "pos-ryan"},
				{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "Well, I actually do need to study, it's just more fun hanging with Priya.  I don’t want to work on my Computer Graphics take home test."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},

				{type: "nothing", label: "neg-ryan"},
				{type: "show", img: ryan, position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "What can I say?  Talking is more fun than my Computer Graphics take home test."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},
				
				

				{type: "nothing", label: "sayhi-r"},
				{type: "custom", func: function(page) {
					page.getRelationshipManager().addRelationship("Priya", -1);
					page.getRelationshipManager().addRelationship("Ryan", -1);
				}},
				{type: "custom", func: function(pageObj) {
					pageObj.tweenMat(pageObj._io2.getImage(), {
						opacity: 0,
						easing: TWEEN.Easing.Cubic.Out,
						duration: 800,
						onComplete: function() {
							// remove this io
							pageObj._io2.remove();
						},
					});
				}},

				{type: "custom", func: function(page) {
					return page.getRelationshipManager().getRelationship("Priya");
				}, label: "priyaRelationshipScore3"},
				{type: "compare", leftop: "$priyaRelationshipScore3", operator: "greater equal", rightop: 0, goTrue: "#pos-priya2", goFalse: "#neg-priya2"},

				{type: "nothing", label: "pos-priya2"},
				{type: "show", img: priya, position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Priya", text: "Yeah… I’m trying to study.  Ryan is avoiding his Computer Graphics work."},
				{type: "jump", condition: true, goTrue: "#compareryan2", goFalse: "#compareryan2"},

				{type: "nothing", label: "neg-priya2"},
				{type: "show", img: priya, position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Priya", text: "Yeah.  I’m trying to study."},
				{type: "jump", condition: true, goTrue: "#compareryan", goFalse: "#compareryan"},

				{type: "nothing", label: "compareryan2"},
				{type: "custom", func: function(page) {
					return page.getRelationshipManager().getRelationship("Ryan");
				}, label: "ryanRelationshipScore3"},
				{type: "compare", leftop: "$ryanRelationshipScore3", operator: "greater equal", rightop: 0, goTrue: "#pos-ryan2", goFalse: "#neg-ryan2"},

				{type: "nothing", label: "pos-ryan2"},
				{type: "show", img: ryan, position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "Speaking of CG, that does remind me of my take home test."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},

				{type: "nothing", label: "neg-ryan2"},
				{type: "show", img: ryan, position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "I’m working on my Computer Graphics take home test."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},
			];
			o = o.concat(common);

		}else if(this._talked == 2) {
			o = [
				{type: "custom", func: function(page){
					return page.getRelationshipManager().getRelationship("Priya");
				}, label: "priyaRelationshipScore1"},
				{type: "compare", leftop: "$priyaRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#happy", goFalse: "#compare2"},
				
				{type: "nothing", label: "happy"},
				{type: "show", img: priya, expression: "happy", position: "right", waitUntilShown: false},
				{type: "dialog", speaker: "Priya", text: "Hi "+ player +"!  Join us?"},
				{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

				{type: "nothing", label: "compare2"},
				{type: "compare", leftop: "$priyaRelationshipScore1", operator: "equal", rightop: 0, goTrue: "#neutural1", goFalse: "#neutural2"},

				{type: "nothing", label: "neutural1"},
				{type: "show", img: priya, position: "right", waitUntilShown: false},
				{type: "dialog", speaker: "Priya", text: "Oh hi. Coming to join us?"},
				{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

				{type: "nothing", label: "neutural2"},
				{type: "show", img: priya, position: "right", waitUntilShown: false},
				{type: "dialog", speaker: "Priya", text: "Hi.  What are you doing?"},
				{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

				{type: "choices",
					choices :
						[{text: "I need to study, but wanted to say hi first.",
							go: "#study-p"},
						{text: "Not much",
							go: "#sayhi-p"}], label: "choices1"},

				{type: "nothing", label: "study-p"},
				{type: "custom", func: function(page) {
					page.getRelationshipManager().addRelationship("Priya", 1);
					page.getRelationshipManager().addRelationship("Ryan", 1);
				}},
				{type: "custom", func: function(pageObj) {
					pageObj.tweenMat(pageObj._io2.getImage(), {
						opacity: 0,
						easing: TWEEN.Easing.Cubic.Out,
						duration: 800,
						onComplete: function() {
							// remove this io
							pageObj._io1.remove();
						},
					});
				}},

				{type: "custom", func: function(page) {
					return page.getRelationshipManager().getRelationship("Priya");
				}, label: "priyaRelationshipScore2"},
				{type: "compare", leftop: "$priyaRelationshipScore2", operator: "greater", rightop: 0, goTrue: "#pos-priya", goFalse: "#neg-priya"},

				{type: "nothing", label: "pos-priya"},
				{type: "show", img: priya, expression:"happy", position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Priya", text: "We're studying too! Well I'm trying to study.  Your friend here keeps distracting me."},
				{type: "jump", condition: true, goTrue: "#compareryan", goFalse: "#compareryan"},

				{type: "nothing", label: "neg-priya"},
				{type: "show", img: priya, position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Priya", text: "We're studying too! Well I'm trying to study.  Ryan keeps distracting me."},
				{type: "jump", condition: true, goTrue: "#compareryan", goFalse: "#compareryan"},

				{type: "nothing", label: "compareryan"},
				{type: "custom", func: function(page) {
					return page.getRelationshipManager().getRelationship("Ryan");
				}, label: "ryanRelationshipScore2"},
				{type: "compare", leftop: "$ryanRelationshipScore2", operator: "greater", rightop: 0, goTrue: "#pos-ryan", goFalse: "#neg-ryan"},

				{type: "nothing", label: "pos-ryan"},
				{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "Well, I actually do need to study, it's just more fun hanging with Priya.  I don’t want to work on my Computer Graphics take home test."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},

				{type: "nothing", label: "neg-ryan"},
				{type: "show", img: ryan, position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "What can I say?  Talking is more fun than my Computer Graphics take home test."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},

				{type: "nothing", label: "sayhi-p"},
				{type: "custom", func: function(page) {
					page.getRelationshipManager().addRelationship("Priya", -1);
					page.getRelationshipManager().addRelationship("Ryan", -1);
				}},
				{type: "custom", func: function(pageObj) {
					pageObj.tweenMat(pageObj._io2.getImage(), {
						opacity: 0,
						easing: TWEEN.Easing.Cubic.Out,
						duration: 800,
						onComplete: function() {
							// remove this io
							pageObj._io1.remove();
						},
					});
				}},
				{type: "custom", func: function(page) {
					return page.getRelationshipManager().getRelationship("Priya");
				}, label: "priyaRelationshipScore3"},
				{type: "compare", leftop: "$priyaRelationshipScore3", operator: "greater equal", rightop: 0, goTrue: "#pos-priya2", goFalse: "#neg-priya2"},

				{type: "nothing", label: "pos-priya2"},
				{type: "show", img: priya, position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Priya", text: "Yeah… I’m trying to study.  Ryan is avoiding his Computer Graphics work."},
				{type: "jump", condition: true, goTrue: "#compareryan2", goFalse: "#compareryan2"},

				{type: "nothing", label: "neg-priya2"},
				{type: "show", img: priya, position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Priya", text: "Yeah.  I’m trying to study."},
				{type: "jump", condition: true, goTrue: "#compareryan", goFalse: "#compareryan"},

				{type: "nothing", label: "compareryan2"},
				{type: "custom", func: function(page) {
					return page.getRelationshipManager().getRelationship("Ryan");
				}, label: "ryanRelationshipScore3"},
				{type: "compare", leftop: "$ryanRelationshipScore3", operator: "greater equal", rightop: 0, goTrue: "#pos-ryan2", goFalse: "#neg-ryan2"},

				{type: "nothing", label: "pos-ryan2"},
				{type: "show", img: ryan, position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "Speaking of CG, that does remind me of my take home test."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},

				{type: "nothing", label: "neg-ryan2"},
				{type: "show", img: ryan, position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "I’m working on my Computer Graphics take home test."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},
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
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page3.prototype._onStart = function() {
		this._owner._ambient = this._owner.getSoundManager().play("Library-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page3 = Page3;
}());
