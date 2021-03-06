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

		var foregroundImg = "/static/gnovel/res/textures/backgrounds/lib foreground with ryan and priya.png";
		//specify which foreground with the characters
		this.setupLibraryBackground(foregroundImg);
		this.nextPageMaterialPath = "/static/gnovel/res/textures/backgrounds/library redux_wR&P_V2.png"

		this._yourphone = "yourphone";

		var geometry = new THREE.PlaneBufferGeometry(1920, 1080);
		var material = new THREE.MeshBasicMaterial( {color: 0x000000, transparent:true } );
		this._transitionBgImg = new THREE.Mesh(geometry,material);
		this._transitionBgImg.position.z = 150;

		this._transitionBg = "transitionbg";

		// for images
		this._setObjectTag(this._transitionBg,this._transitionBgImg);

		this._talked = 0;

		var z = this._background3Layer + 50;
		var pageObj = this;
		var background_ryan = pageObj.createImage("/static/gnovel/res/textures/backgrounds/lib foreground with ryan solo.png", new THREE.Vector3(-0, 10, pageObj._background3Layer - 105), 1920, 1080);
		background_ryan.scale.set(.90,.85,1);
		background_ryan.material.opacity = 0;
		pageObj._addToSceneBg(background_ryan);

		var background_priya = pageObj.createImage("/static/gnovel/res/textures/backgrounds/lib foreground with priya solo.png", new THREE.Vector3(-0, 10, pageObj._background3Layer - 105), 1920, 1080);
		background_priya.scale.set(.90,.85,1);
		background_priya.material.opacity = 0;
		pageObj._addToSceneBg(background_priya);

		this._background_empty = pageObj.createImage("/static/gnovel/res/textures/backgrounds/library foreground.png", new THREE.Vector3(0, 10, this._background3Layer-100), 1920, 1080);
		this._background_empty.scale.set(.90,.85,1);
		this._background_empty.material.opacity = 0;
		pageObj._addToSceneBg(this._background_empty);

		this._background_noBooks = pageObj.createImage("/static/gnovel/res/textures/backgrounds/lib foreground_empty.png", new THREE.Vector3(-55, -45, this._background3Layer-105), 1920, 1080);
		this._background_noBooks.scale.set(.90,.85,1);
		this._background_noBooks.material.opacity = 0;
		pageObj._addToSceneBg(this._background_noBooks);

		var onInteractableObjectClicked = function(io) {
			// disable interactable object
			pageObj._io1.setEnable(false);
			pageObj._io2.setEnable(false);
		};

		//create fake non-visible object areas that are clickable.  These represents the character position that are in the scene
		this._io1 = this.createInteractableObject(
			"/static/gnovel/res/textures/panel.png",
			{type: "character", x: -280, y: -35, z: z, width : 280, height : 631, opacity: 0, onClick: function(io) {
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
				//remove previous background with character and change
				background_priya.material.opacity = 1;
				pageObj.tweenMat(pageObj._background3, {
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800,
					onComplete: function() {
						pageObj._removeFromSceneBg(pageObj._background3);
						//background_priya.material.opacity = 1;
						pageObj._background3 = background_priya;
					},
				});
			}});
			//this._io1.getImage().opacity = 0;
			//create fake non-visible object areas that are clickable.  These represents the character position that are in the scene
		this._io2 = this.createInteractableObject(
			"/static/gnovel/res/textures/char/scene char/priya-clickable-lib.png",
			{type: "character", x: 280, y: -60, z: z, width : 380, height : 620, opacity: 0, onClick: function(io) {
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
				//remove previous background with character and change
				background_ryan.material.opacity = 1;
				pageObj.tweenMat(pageObj._background3, {
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800,
					onComplete: function() {
						pageObj._removeFromSceneBg(pageObj._background3);
						//background_ryan.material.opacity = 1;
						pageObj._background3 = background_ryan;
					},
				});

				/*pageObj.move(background, {
					z:pageObj._background3Layer - 100,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 200,
					onComplete: function() {
						pageObj._background3 = background;
					},
				});*/

			}});

			//deactivate interactable objects at first
		pageObj._io1.setEnable(false);
		pageObj._io2.setEnable(false);
		this._cgAssignmentStatus = 0;

		// 0 means you didnt give your assignment, but you offered help
		// 1 means you didnt give your assignment, but you didn't help him
		// 2 means you gave ryan your old assignment
		this._unauthorizedAsstChoice = 0;

		this._unauthorizedAsstData = {};
		this._unauthorizedAsstData.relationship = {};
		this._unauthorizedAsstData.relationship.ryan = 0;
		this._unauthorizedAsstData.relationship.priya = 0;
		this._unauthorizedAsstData.relationship.cat = 0;
	};

	Page3.prototype._createFlowElements = function() {
		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var cat = "%" + this._cat;
		var yourphone = "%" + this._yourphone;
		var player = this._player;
		var transitionBg = "%" + this._transitionBg;
		var background = this._background_empty;
		var backgroundNoBooks = this._background_noBooks;
		var p_posRel = 3;
		var p_neuRel = 1;
		var r_posRel = 4;
		var r_neuRel = 1;

		var o = null;

		o = [
				{type: "show_context", text: "A few weeks pass, and work starts piling up. You head to the library to study, and you run into Ryan and Priya together."},
				{type: "show_phone_notif"},

				// phone email exchange begins
				{type: "open_phone", layout:"email", subject: "Programmers and Society", from: "Prof. Sweeney", email: "sweeney@andrew.cmu.edu",
					text: "Good luck on midterms! Please make sure to email me with any questions you have.  Your group project deadline is coming up.  Don't let it sneak up on you.  Make sure you read the syllabus, and reach out with any questions. // - Prof. Sweeney"},
				{type: "close_phone"},
				//phone email exchange ends

				{type: "custom", func: function(pageObj){
					//disable the characters from being clickable while context showing
					pageObj._io1.setEnable(true);
					pageObj._io2.setEnable(true);
				}}
		];

		var common = [

			{type: "nothing", label: "email"},
			{type: "show", img: ryan, expression: "thoughtful", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: player + ", you took Comp Systems last semester."},
			{type: "dialog", speaker: "Ryan", text: "Could you send me some of your stuff from the class? Like your old problem sets?"},
			{type: "show", img: priya, expression:"thoughtful", position: "right", waitUntilShown: false, flip: true},
			{type: "dialog", speaker: "Priya", text: "Ryan, are you sure you can look at "+ player +"’s old problem sets? My friend got in trouble for doing that, before."},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I’m just stuck on some problems.  I’m only going to use it to check my work."},
			{type: "dialog", speaker: "Priya", text: "If you do, you probably won’t get caught, but why risk it?"},
			{type: "show", img: ryan, position: "left", expression: "sad", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I won’t get caught, Priya. I’m so behind in my work, I just need something to help me catch up."},

			{type: "choices",
				choices :
					[{text: "No problem, Ryan.  You’d do the same for me.",
						go: "#materials", integrityScore: -1,
						relationship:[{name: this._priya, score: -1}, {name: this._ryan, score: 2}],
						onChoose: function(page){
							console.log("you give ryan cg assignments");
							page._cgAssignmentStatus = 1;
							page._unauthorizedAsstChoice = 2;

							page._unauthorizedAsstData.relationship.priya = -1;
							page._unauthorizedAsstData.relationship.ryan = 2;
						}},
					{text: "Ry, I don’t know…",
						go: "#dontknow", integrityScore: 0, relationship: [{name: this._ryan, score: -1}],
						onChoose: function(page){
							console.log("You didn’t give Ryan your assignments, but you didn’t help him");
							page._unauthorizedAsstChoice = 1;

							page._unauthorizedAsstData.relationship.ryan = -1;
						}},
					{text: "I’m happy to give you a hand where you’re stuck, but can you check with the TA to make sure it’s ok?",
						go: "#notes", integrityScore: 1, relationship: [{name: this._priya, score: 2}],
						onChoose: function(page) {
							console.log("You didn’t give Ryan your assignments, but you offered to help");
							page._unauthorizedAsstChoice = 0;

							page._unauthorizedAsstData.relationship.priya = 2;
						}},
					],
				seconds: 10,
				responses: [{text: player + ", help me out."}, {text:"did you hear me?"}],
				speaker: this.ryan},

			{type: "nothing", label: "materials"},
			{type: "custom", func: function(page) {
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore4"},
			{type: "compare", leftop: "$ryanRelationshipScore4", operator: "greater equal", rightop: r_posRel, goTrue: "#pos", goFalse: "#compare3"},

			{type: "nothing", label: "pos"},
			{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Thanks, "+ player +"! This is such a huge help."},
			{type: "show", img: priya, expression: "sad", position: "right", waitUntilShown: false, flip: true},
			{type: "dialog", speaker: "Priya", text: "I just think you guys should be more careful.  I'll see you both in class later."},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Oh.  OK. See you."},
			{type: "hide", img: priya, waitUntilHidden: false},
			{type: "show", img: ryan, position: "left", expression:"thoughtful", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I guess she’s upset with me. I should talk to her later."},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},

			{type: "nothing", label: "compare3"},
			{type: "compare", leftop: "$ryanRelationshipScore4", operator: "greater equal", rightop: r_neuRel, goTrue: "#zero", goFalse: "#neg" },

			{type: "nothing", label: "zero"},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "This is going to be a huge help. Thanks."},
			{type: "show", img: priya, expression: "sad", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "Listen, I’m late for a meeting.  See you later."},
			{type: "dialog", speaker: "Ryan", text: "Oh.  See you."},
			{type: "hide", img: priya, waitUntilHidden: false},
			{type: "show", img: ryan, position: "left", expression:"thoughtful", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I guess she’s upset with me. Maybe I should talk to her later."},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},

			{type: "nothing", label: "neg"},
			{type: "show", img: priya, expression: "sad", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "If you both won't listen that's fine.  See you in class."},
			{type: "dialog", speaker: "Ryan", text: "Oh.  Uh, ok, well, see you."},
			{type: "hide", img: priya, waitUntilHidden: false},
			{type: "show", img: ryan, position: "left", expression:"thoughtful", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I guess she’s upset with me. Maybe I should talk to her later."},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},


			{type: "nothing", label: "dontknow"},
			{type: "custom", func: function(page) {
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore5"},
			{type: "compare", leftop: "$ryanRelationshipScore5", operator: "greater equal", rightop: r_posRel, goTrue: "#pos1", goFalse: "#compare4"},

			{type: "nothing", label: "pos1"},
			{type: "show", img: ryan, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Hey "+ player +", if you don't want to help me out, just say so."},
			{type: "show", img: ryan, expression: "sad", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Sorry, didn’t mean for it to come out that. I actually have to get going..."},
			{type: "dialog", speaker: "Ryan", text: "I'll see you both later."},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: priya, position: "right", expression:"sad", flip: true, waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "I hope he’s not too upset."},
			{type: "show", img: priya, expression: "thoughtful", position: "right", flip: true, waitUntilShown: false, label: "priyanext1"},
			{type: "dialog", speaker: "Priya", text: "I’ll try to talk to him later."},
			{type: "hide", img: priya},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},

			{type: "nothing", label: "compare4"},
			{type: "compare", leftop: "$ryanRelationshipScore5", operator: "greater equal", rightop: r_neuRel, goTrue: "#zero1", goFalse: "#neg1" },

			{type: "nothing", label: "zero1"},
			{type: "show", img: ryan, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I get it, it’s fine."},
			{type: "dialog", speaker: "Ryan", text: "I actually have to get going, I'll see you both later."},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: priya, position: "right", expression:"sad", waitUntilShown: false, flip: true},
			{type: "dialog", speaker: "Priya", text: "I hope he’s not too upset."},
			{type: "hide", img: priya},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},

			{type: "nothing", label: "neg1"},
			{type: "show", img: ryan, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Wow, way to be passive aggressive about it."},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I actually have to get going, I'll see you both later."},
			{type: "hide", img: ryan, waitUntilHidden: false},
			{type: "show", img: priya, position: "right", expression:"sad", waitUntilShown: false, flip: true},
			{type: "hide", img: priya},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},


			{type: "nothing", label: "notes"},
			{type: "custom", func: function(page) {
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore6"},
			{type: "compare", leftop: "$ryanRelationshipScore6", operator: "greater equal", rightop: r_posRel, goTrue: "#pos2", goFalse: "#compare5"},

			{type: "nothing", label: "pos2"},
			{type: "show", img: ryan, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Seems like overkill, but I guess I can do that."},
			{type: "dialog", speaker: "Ryan", text: "Thanks " + player +". I'll see you guys later!"},
			{type: "hide", img: priya, waitUntilHidden: false},
			{type: "hide", img: ryan},

			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},

			{type: "nothing", label: "compare5"},
			{type: "compare", leftop: "$ryanRelationshipScore6", operator: "greater equal", rightop: r_neuRel, goTrue: "#zero2", goFalse: "#neg2" },

			{type: "nothing", label: "zero2"},
			{type: "show", img: ryan, expression: "thoughtful", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Seriously?  I mean, I'll do it.  But still..."},
			{type: "hide", img: priya, waitUntilHidden: false},
			{type: "hide", img: ryan},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},

			{type: "nothing", label: "neg2"},
			{type: "show", img: ryan, expression: "sad", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Forget it, I’ll just work it through myself."},
			{type: "hide", img: priya, waitUntilHidden: false},
			{type: "hide", img: ryan},
			{type: "jump", condition: true, goTrue: "#aside2", goFalse: "#aside2"},



			{type: "nothing", label: "aside2"},
			{type: "custom", func: function(page){
				page.tweenMat(backgroundNoBooks,{
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
						page._background3 = backgroundNoBooks;
					},
				});
			}},
			{type: "show_context", text: "Ryan and Priya leave. Some time passes."},
			{type: "open_phone", layout:"text", people: [this._priya, this._ryan, this._cat]},
			{type: "add_phone_textbox",
				speaker: this._priya,
				text: "I’m at the café, anyone nearby want to join?"},
			{type: "add_phone_textbox",
				speaker: this._cat,
				text: "Oh shoot!  I’m already across campus at Scottie’s grabbing a bite."},
			{type: "add_phone_textbox",
				speaker: this._ryan,
				text: "Studying T^T"},


			{type: "choices", choices :
			[{text: "Grab a coffee at the café with Priya.", go: "#gocafe", relationship: [{name:this._priya, score:1}]},
			{text : "Join Cat for a bite at Scottie's.", go : "#gobar", relationship: [{name:this._cat, score:1}]},
			{text: "Go home and take a nap.", go: "#gohome"}]},

			{type: "nothing", label: "gocafe"},
			{type: "close_phone"},
			//{type: "show", img: transitionBg, waitUntilShown:false},
			// after transition
			//{type: "show_context", text:"You head to the cafe", waitUntilShown:false},
			{type: "goto", page: "scene 5.a"},

			{type: "nothing", label: "gobar"},
			{type: "close_phone"},
			//{type: "show", img: transitionBg, waitUntilShown:false},
			// after transition
			//{type: "show_context", text:"You head to the bar", waitUntilShown:false},
			{type: "goto", page: "scene 5.b"},

			{type: "nothing", label: "gohome"},
			{type: "close_phone"},
				/*{type: "custom", func: function(page) {
						page.getRelationshipManager().addRelationship("Priya", -1);
						page.getRelationshipManager().addRelationship("Cat", -1);
					}},*/
				//{type: "show", img: transitionBg, waitUntilShown:false},
				{type: "goto", page: "scene 6.a"},

		];

		if(this._talked == 1) {
			o = [
				{type: "custom", func: function(page){
					return page.getRelationshipManager().getRelationship("Ryan");
				}, label: "ryanRelationshipScore1"},
				{type: "compare", leftop: "$ryanRelationshipScore1", operator: "greater equal", rightop: r_posRel, goTrue: "#happy", goFalse: "#compare2"},

				{type: "nothing", label: "happy"},
				{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
				// {type: "custom", func: function(page) {
				// 	page.getOwner().getSoundManager().play("Hey-Ryan-e");
				// }},
				// {type: "play", audio: "Hey-Ryan-e"},
				{type: "dialog", speaker: "Ryan", text: "Hey " + player + ", nice to see you. Coming to join us?"},
				{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

				{type: "compare", leftop: "$ryanRelationshipScore1", operator: "greater equal", rightop: r_neuRel, goTrue: "#neutural", goFalse: "#thoughtful", label: "compare2"},

				{type: "nothing", label: "neutural"},
				{type: "show", img: ryan, position: "left", waitUntilShown: false},
				// {type: "custom", func: function(page) {
				// 	page.getOwner().getSoundManager().play("Hey-Ryan-p");
				// }},
				// {type: "play", audio: "Hey-Ryan-p"},
				{type: "dialog", speaker: "Ryan", text: "Oh hey. Coming to join us?"},
				{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

				{type: "nothing", label: "thoughtful"},
				// {type: "custom", func: function(page) {
				// 	page.getOwner().getSoundManager().play("Hey-Ryan-n");
				// }},
				// {type: "play", audio: "Hey-Ryan-n"},
				{type: "show", img: ryan, expression: "thoughtful", position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "Hey.  What’s up?"},
				{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

				{type: "choices",
					choices :
						[{text: "Came over to say hi.",
						relationship:[{name: this._priya, score: 1},{name: this._ryan, score: 1}],
							go: "#study-r"},
						{text: "I'm here to study.",
							go: "#sayhi-r"}], label: "choices1"},

				{type: "nothing", label: "study-r"},
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
				//remove priya bg and replace
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
							page._background3 = background;
						},
					});
				}},
				{type: "compare", leftop: "$priyaRelationshipScore2", operator: "greater equal", rightop: p_neuRel, goTrue: "#pos-priya", goFalse: "#neg-priya"},

				{type: "nothing", label: "pos-priya"},
				{type: "show", img: priya, expression:"happy", position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Priya", text: "Well I'm trying to study. Your friend here keeps distracting me."},
				{type: "jump", condition: true, goTrue: "#compareryan", goFalse: "#compareryan"},

				{type: "nothing", label: "neg-priya"},
				{type: "show", img: priya, position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Priya", text: "Well I'm trying to study. Ryan keeps distracting me."},
				{type: "jump", condition: true, goTrue: "#compareryan", goFalse: "#compareryan"},

				{type: "nothing", label: "compareryan"},
				{type: "custom", func: function(page) {
					return page.getRelationshipManager().getRelationship("Ryan");
				}, label: "ryanRelationshipScore2"},
				{type: "compare", leftop: "$ryanRelationshipScore2", operator: "greater equal", rightop: r_neuRel, goTrue: "#pos-ryan", goFalse: "#neg-ryan"},
				{type: "nothing", label: "pos-ryan"},
				{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "Well, I actually do need to study, it's just more fun hanging with Priya."},
				{type: "dialog", speaker: "Ryan", text: "I don’t want to work on my Computational Systems problem set."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},

				{type: "nothing", label: "neg-ryan"},
				{type: "show", img: ryan, position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "What can I say?  Talking is more fun than my Computational Systems problem set."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},



				{type: "nothing", label: "sayhi-r"},
				//relationship should stay neutral
				/*{type: "custom", func: function(page) {
					page.getRelationshipManager().addRelationship("Priya", -1);
					page.getRelationshipManager().addRelationship("Ryan", -1);
				}},*/
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
				//remove ryan bg and replace
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
							page._background3 = background;
						},
					});
				}},
				{type: "compare", leftop: "$priyaRelationshipScore3", operator: "greater equal", rightop: p_neuRel, goTrue: "#pos-priya2", goFalse: "#neg-priya2"},

				{type: "nothing", label: "pos-priya2"},
				{type: "show", img: priya, position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Priya", text: "Yeah, me too.  Ryan is avoiding his Computational Systems work."},
				{type: "jump", condition: true, goTrue: "#compareryan2", goFalse: "#compareryan2"},

				{type: "nothing", label: "neg-priya2"},
				{type: "show", img: priya, position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Priya", text: "Yeah.  I’m trying to study."},
				{type: "jump", condition: true, goTrue: "#compareryan", goFalse: "#compareryan"},

				{type: "nothing", label: "compareryan2"},
				{type: "custom", func: function(page) {
					return page.getRelationshipManager().getRelationship("Ryan");
				}, label: "ryanRelationshipScore3"},
				{type: "compare", leftop: "$ryanRelationshipScore3", operator: "greater equal", rightop: r_neuRel, goTrue: "#pos-ryan2", goFalse: "#neg-ryan2"},

				{type: "nothing", label: "pos-ryan2"},
				{type: "show", img: ryan, position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "Speaking of Computational Systems, that reminds me of my problem set."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},

				{type: "nothing", label: "neg-ryan2"},
				{type: "show", img: ryan, position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "I’m working on my Computational Systems problem set."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},
			];
			o = o.concat(common);

		}else if(this._talked == 2) {
			o = [
				{type: "custom", func: function(page){
					return page.getRelationshipManager().getRelationship("Priya");
				}, label: "priyaRelationshipScore1"},
				{type: "compare", leftop: "$priyaRelationshipScore1", operator: "greater equal", rightop: p_posRel, goTrue: "#happy", goFalse: "#compare2"},

				{type: "nothing", label: "happy"},
				{type: "show", img: priya, expression: "happy", position: "right", waitUntilShown: false},
				// {type: "custom", func: function(page) {
				// 	page.getOwner().getSoundManager().play("Ohhi-Priya");
				// }},
				// {type: "play", audio: "Ohhi-Priya"},
				{type: "dialog", speaker: "Priya", text: "Hi "+ player +"!  Join us?"},
				{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

				{type: "nothing", label: "compare2"},
				{type: "compare", leftop: "$priyaRelationshipScore1", operator: "greater equal", rightop: p_neuRel, goTrue: "#neutural1", goFalse: "#neutural2"},

				{type: "nothing", label: "neutural1"},
				{type: "show", img: priya, position: "right", waitUntilShown: false},
				// {type: "custom", func: function(page) {
				// 	page.getOwner().getSoundManager().play("Hey-Priya");
				// }},
				// {type: "play", audio: "Hey-Priya"},
				{type: "dialog", speaker: "Priya", text: "Hi " + player +"! Join us?"},
				{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

				{type: "nothing", label: "neutural2"},
				// {type: "custom", func: function(page) {
				// 	page.getOwner().getSoundManager().play("Wtsnew-Priya");
				// }},
				// {type: "play", audio: "Wtsnew-Priya"},
				{type: "show", img: priya, position: "right", waitUntilShown: false},
				{type: "dialog", speaker: "Priya", text: "Hi.  What are you doing?"},
				{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

				{type: "choices",
					choices :
						[{text: "Came over to say hi.",
							go: "#study-p"},
						{text: "I'm here to study.",
							go: "#sayhi-p"}], label: "choices1"},

				{type: "nothing", label: "study-p"},
				//relationship should stay neutral
				/*
				{type: "custom", func: function(page) {
					page.getRelationshipManager().addRelationship("Priya", 1);
					page.getRelationshipManager().addRelationship("Ryan", 1);
				}},*/

				{type: "custom", func: function(page) {
					return page.getRelationshipManager().getRelationship("Priya");
				}, label: "priyaRelationshipScore2"},
				{type: "compare", leftop: "$priyaRelationshipScore2", operator: "greater", rightop: p_neuRel, goTrue: "#pos-priya", goFalse: "#neg-priya"},

				{type: "nothing", label: "pos-priya"},
				{type: "show", img: priya, expression:"happy", position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Priya", text: "Well I'm trying to study. Your friend here keeps distracting me."},
				{type: "jump", condition: true, goTrue: "#compareryan", goFalse: "#compareryan"},

				{type: "nothing", label: "neg-priya"},
				{type: "show", img: priya, position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Priya", text: "Well I'm trying to study. Ryan keeps distracting me."},
				{type: "jump", condition: true, goTrue: "#compareryan", goFalse: "#compareryan"},

				{type: "nothing", label: "compareryan"},
				{type: "custom", func: function(page) {
					var pageObj = page;
					pageObj.tweenMat(pageObj._io1.getImage(), {
						opacity: 0,
						easing: TWEEN.Easing.Cubic.Out,
						duration: 800,
						onComplete: function() {
							// remove this io
							pageObj._io1.remove();
						},
					});

					return page.getRelationshipManager().getRelationship("Ryan");
				}, label: "ryanRelationshipScore2"},
				{type: "custom", func: function(pageObj){
					background.material.opacity = 1;
					pageObj._removeFromSceneBg(pageObj._background3);
				}},
				{type: "compare", leftop: "$ryanRelationshipScore2", operator: "greater equal", rightop: r_neuRel, goTrue: "#pos-ryan", goFalse: "#neg-ryan"},

				{type: "nothing", label: "pos-ryan"},
				{type: "show", img: ryan, expression: "happy", position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "Well, I actually do need to study, it's just more fun hanging with Priya."},
				{type: "dialog", speaker: "Ryan", text: "I don’t want to work on my Computational Systems problem set."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},

				{type: "nothing", label: "neg-ryan"},
				{type: "show", img: ryan, position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "What can I say?  Talking is more fun than my Computational Systems problem set."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},

				{type: "nothing", label: "sayhi-p"},
				/*
				{type: "custom", func: function(page) {
					page.getRelationshipManager().addRelationship("Priya", -1);
					page.getRelationshipManager().addRelationship("Ryan", -1);
				}},*/
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
				{type: "compare", leftop: "$priyaRelationshipScore3", operator: "greater equal", rightop: p_neuRel, goTrue: "#pos-priya2", goFalse: "#neg-priya2"},

				{type: "nothing", label: "pos-priya2"},
				{type: "show", img: priya, position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Priya", text: "Yeah, me too. Ryan is avoiding his Computational Systems work."},
				{type: "jump", condition: true, goTrue: "#compareryan2", goFalse: "#compareryan2"},

				{type: "nothing", label: "neg-priya2"},
				{type: "show", img: priya, position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Priya", text: "Yeah.  I’m trying to study."},
				{type: "jump", condition: true, goTrue: "#compareryan", goFalse: "#compareryan"},

				{type: "nothing", label: "compareryan2"},
				{type: "custom", func: function(page) {
					return page.getRelationshipManager().getRelationship("Ryan");
				}, label: "ryanRelationshipScore3"},
				{type: "custom", func: function(pageObj){
					background.material.opacity = 1;
					pageObj._removeFromSceneBg(pageObj._background3);
				}},
				{type: "compare", leftop: "$ryanRelationshipScore3", operator: "greater equal", rightop: r_neuRel, goTrue: "#pos-ryan2", goFalse: "#neg-ryan2"},

				{type: "nothing", label: "pos-ryan2"},
				{type: "show", img: ryan, position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "Speaking of Comp Systems, that does remind me of my problem set."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},

				{type: "nothing", label: "neg-ryan2"},
				{type: "show", img: ryan, position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "I’m working on my Computational Systems problem set."},
				{type: "jump", condition: true, goTrue: "#email", goFalse: 1000},
			];
			o = o.concat(common);
		}

		return o;
	};

	// Page3.prototype._createRandomPlaylist = function() {
	// 	var playlist = null;
	// 	playlist = [
	// 			    {audio:"Lib-beeping", playrate: 0.03},
	// 				// {audio:"Lib-chairs2", playrate: 0.1},
	// 				{audio:"Lib-chairs3", playrate: 0.1},
	// 				{audio:"Lib-chairs1", playrate: 0.1},
	// 				{audio:"Lib-distantchairs", playrate: 0.3},
	// 				{audio:"Lib-pia", playrate: 0.05}
	// 				];
	// 	return playlist;
	// };

	/**
	 * @override
	 */
	Page3.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);

		this._owner.saveData("cgAssignmentStatus", this._cgAssignmentStatus);
		this._owner.saveData("unauthorizedAsstChoice", this._unauthorizedAsstChoice);
		this._owner.saveData("unauthorizedAsstData", this._unauthorizedAsstData);
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page3.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		this._owner._ambient = this._owner.getSoundManager().play("Library-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});
		this._tweenVolumeIn();
	};

	// Page3.prototype._update = function() {
	// 	MPLAY.MPlayPage.prototype._update.call(this);

	// 	this._multiTracksPlayer.shuffle();
	// };

	MPLAY.Page3 = Page3;
}());
