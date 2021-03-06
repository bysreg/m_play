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

		var foregroundImg = "/static/gnovel/res/textures/backgrounds/lib with ryan and cat.png";
		this.setupLibraryBackground(foregroundImg);
		this.nextPageMaterialPath = "/static/gnovel/res/textures/backgrounds/library redux_wR&C.png";

		this._talked = 0;

		var z = this.getBackgroundLayer() + 50;
		var pageObj = this;

		var background_ryan = pageObj.createImage("/static/gnovel/res/textures/backgrounds/lib foreground with ryan solo.png", new THREE.Vector3(-0, 10, pageObj._background3Layer - 105), 1920, 1080);
		background_ryan.scale.set(.90,.85,1);
		background_ryan.material.opacity = 0;
		pageObj._addToSceneBg(background_ryan);

		this._background_empty = pageObj.createImage("/static/gnovel/res/textures/backgrounds/library foreground.png", new THREE.Vector3(0, 10, this._background3Layer-100), 1920, 1080);
		this._background_empty.scale.set(.90,.85,1);
		this._background_empty.material.opacity = 0;
		pageObj._addToSceneBg(this._background_empty);

		//@FIXME not needed anymore since the scene already has ryan in it
		//this._sitryan = this.createImage("/static/gnovel/res/textures/ryan-clickable-lib.png", new THREE.Vector3(-215, -185, z), 250, 431);
		//this._addToScene(this._sitryan);

		//create fake non-visible object areas that are clickable.  These represents the character position that are in the scene
		this._io1 = this.createInteractableObject(
			"/static/gnovel/res/textures/char/scene char/cat-lib.png",
			{type: "character", x: 45, y: -60, z: z, width : 300, height : 656, opacity: 0, onClick: function(io) {
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


				//tween in new bg
				pageObj.tweenMat(background_ryan, {
					opacity: 1,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 200,
				});
				//remove previous background with character and change
				pageObj.tweenMat(pageObj._background3, {
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800,
					onComplete: function() {
						pageObj._removeFromSceneBg(pageObj._background3);
						//background_priya.material.opacity = 1;
						pageObj._background3 = background_ryan;
					},
				});

				pageObj._removePhoneNotification();

				//@FIXME not needed since no longer using This
				/*pageObj.tweenMat(pageObj._sitryan, {
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800,
					onComplete: function() {
						pageObj._removeFromScene(pageObj._sitryan);
					},
				});*/
			}});

		this._yourphoneImg = this.createImage("/static/gnovel/res/textures/ui/phone.png", new THREE.Vector3(0, 60, 140), 250, 458);

		this._yourphone = "yourphone";

		pageObj._io1.setEnable(false);
		// for images
		this._setObjectTag(this._yourphone, this._yourphoneImg);


		// 0 means you tell priya to redo her work
		// 1 means you redid priya's work
		// 2 means you wanted to just turn it in, but your team redid it instead
		this._priyaWorkChoice = 0;

		this._plagiarismData = {};
		this._plagiarismData.relationship = {};
		this._plagiarismData.relationship.ryan = 0;
		this._plagiarismData.relationship.priya = 0;
		this._plagiarismData.relationship.cat = 0;
	};

	Page5_1.prototype._createFlowElements = function() {
		var ryan = "%" + this._ryan;
		var cat = "%" + this._cat;
		var priya = "%" + this._priya;
		var yourphone = "%" + this._yourphone;
		var player = this._player;
		var background = this._background_empty;
		var c_posRel = 3;
		var c_neuRel = 1

		var cgAssignmentStatus = this._owner.getSavedData("cgAssignmentStatus");

		// variables from scene 2
		var isAssignmentGiven = (cgAssignmentStatus > 0);

		var o = null;

			o = [
				{type:"show_context", text:"The day before the project is due, you head to the library to join Cat and Ryan."},
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
			//switch out background with no scene characters
			{type: "custom", func: function(pageObj){
				pageObj.tweenMat(background,{
					opacity: 1,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 200,
				});
				pageObj.tweenMat(pageObj._background3,{
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800,
					onComplete: function() {
						pageObj._removeFromSceneBg(pageObj._background3);
					},
				});
			}},
			{type: "show", img: ryan, position: "right"},
			{type: "dialog", speaker: "Ryan", text: "We all set, Cat?"},
			{type: "show", img: cat, expression: "sad", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Uh oh… I think we have a problem."},
			{type: "show", img: ryan, expression: "thoughtful", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "What’s wrong?"},
			{type: "show", img: cat, position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "It looks like Priya took her code from another source. I found it on a codeHub forum online."},
			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "I’m sure Priya didn’t realize. It's common practice to use codeHub.  Did she cite it?"},
			{type: "dialog", speaker: "Cat", text: "No, and even if she did cite it, we can't use it."},
			{type: "show", img: cat, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "No outside sources on this assignment, remember?"},
			{type: "show", img: cat, expression: "sad", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "What should we do, we have to submit the project in 2 hours!"},
			{type: "choices",
					choices :
						[{text: "Well, let's just ask her about it.",
							integrityScore: 1,
							relationship: [{name: this._ryan, score: -1}, {name: this._cat, score:1}],
							go: "#ask",
							onChoose: function(page) {
								page._priyaWorkChoice = 0;

								//ryan doesn't like you not taking his word for Priya
								page._plagiarismData.relationship.ryan = -1;
								page._plagiarismData.relationship.cat = 1;
							}},
						{text: "We only have a few hours. Let’s divide and conquer. Redo her work.",
							integrityScore: 0,
							relationship: [{name: this._priya, score: 1, text:"Priya will feel good about that"}],
							go: "#redo",
							onChoose: function(page) {
								page._priyaWorkChoice = 1;

								page._plagiarismData.relationship.priya = 1;
							}},
						{text: "Let’s just submit it, I’m sure it’s fine.",
							integrityScore: -1,
							relationship: [{name:this._cat, score:-1},{name:this._ryan, score: 1}],
							go: "#submit",
							onChoose: function(page) {
								page._priyaWorkChoice = 2;

								page._plagiarismData.relationship.ryan = 1;
								page._plagiarismData.relationship.cat = -1;
							}}],
					seconds: 10,
					responses: [{text:"What do you think?"},{text: "We don't have much time."}],
					speaker: this._cat},

			{type: "nothing", label: "ask"},
			// {type: "compare", leftop: isAssignmentGiven, operator: "equal", rightop: 1, goTrue: "#asst_given", goFalse: "#asst_not_given"},

			// {type: "nothing", label: "asst_not_given"},
			{type: "show", img: ryan, expression: "thoughtful", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "Let’s text her."},
			{type: "hide", img: cat, waitUntilHiden: false},
			{type: "show", img: ryan, position: "right", waitUntilShown: false},
			{type: "jump", condition: true, goTrue: "#txtxchange", goFalse: "#txtxchange"},

			// {type: "nothing", label: "asst_given"},
			// {type: "show", img: ryan, expression: "sad", position: "right", waitUntilShown: false, flip: true},
			// {type: "dialog", speaker: "Ryan", text: "She might still be mad at me about me using your old problem sets"},
			// {type: "dialog", speaker: "Ryan", text: "Why don’t you text her, "+ player +"."},
			// {type: "hide", img: cat, waitUntilHiden: false},
			// {type: "hide", img: ryan, waitUntilHiden: false},
			// {type: "jump", condition: true, goTrue: "#txtxchange", goFalse: "#txtxchange"},

			{type: "nothing", label: "txtxchange"},
			// phone exchange begins
			{type: "open_phone", layout:"text", people: [this._ryan, this._priya]},
			{type: "add_phone_textbox",
				speaker: this._ryan,
				text: "P – there’s a problem with your part of the project."},
			{type: "add_phone_textbox",
				speaker: this._priya,
				text: "What? A problem?"},
			{type: "add_phone_textbox",
				speaker: this._ryan,
				text: "Did u use codeHub for ur code?"},
			{type: "add_phone_textbox",
				speaker: this._priya,
				text: "Yes – I used c-h to work thru the problem."},
			{type: "add_phone_textbox",
				speaker: this._priya,
				text: "It’s common for programmers... Thought that was allowed?"},
			{type: "close_phone"},

			{type: "show", img: cat, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "We’re wasting time texting her. Tell her she has to redo it."},
			{type:"hide", img: cat, waitUntilHiden: false},
			{type:"hide", img: ryan},
			{type: "nothing", label: "finish_project_Priya"},
			{type: "show_context", text: "Priya struggles to work through an answer with original code. Luckily, She ends up finishing it in time, but the work isn't her best, and everyone's frustrated."},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},


			{type: "nothing", label: "redo"},
			{type: "show", img: ryan, expression: "sad", position: "right", waitUntilShown: false, flip: true, label: "redo"},
			{type: "dialog", speaker: "Ryan", text: "Seems like we should tell Priya,"},
			{type: "show", img: cat, expression: "sad", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Ugh, it’s going to be a stressful night."},
			{type: "hide", img: ryan, waitUntilHiden: false},
			{type: "hide", img: cat},
			{type: "show_context", text: "You, Ryan and Cat end up redoing Priya’s work. You barely finish the assignment in time to submit it, and everyone ends the night feeling frustrated."},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},


			{type: "nothing", label: "submit"},
			{type: "show", img: cat, expression: "angry", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "I’m not comfortable doing that."},
			{type: "show", img: ryan, expression: "thoughtful", position: "right", waitUntilShown: false, flip: true},
			{type: "dialog", speaker: "Ryan", text: "Yeah. On second thought, if Cat caught it, Sweeney will definitely catch it."},
			{type: "show", img: cat, expression: "thoughtful", position: "left", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Maybe we can tweak her work enough to make it ok?"},
			{type: "show", img: ryan, expression: "sad", position: "right", waitUntilShown: false},
			{type: "dialog", speaker: "Ryan", text: "That might not be enough. Do we need to redo it?"},
			{type: "hide", img: ryan, waitUntilHiden: false},
			{type: "hide", img: cat},
			{type: "show_context", text: "You, Ryan and Cat end up redoing Priya’s work. You barely finish the assignment in time to submit it, and everyone ends the night feeling frustrated."},

			{type: "nothing", label: "gonextscene"},
			{type: "open_phone", layout:"text", people: [this._ryan]},
			{type: "add_phone_textbox",
				speaker: this._ryan,
				text: "Hey "+ player +" – do you have time to meet up today?"},
			{type: "choices", choices : [
				{text: "I’m heading to the gym, do u want to join me?",
					go: "#gogym"},
				{text : "Let’s go grab a bite at Scottie’s.",
					go : "#gobar"},
				{text: "Raincheck?  I have to head home to study.",
					go: "#gohome"}]},
			{type: "close_phone"},


			{type: "close_phone", label: "gogym"},
			{type: "goto", page: "scene 7.a" },
			{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},
			{type: "close_phone", label: "gobar"},
			{type: "goto", page: "scene 7.b"},
			{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},
			{type: "close_phone", label: "gohome"},
			{type: "goto", page: "scene 7.c"},
			{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},
		];

		if (this._talked == 1) {
			o = [
				{type: "custom", func: function(page){
					return page.getRelationshipManager().getRelationship("Cat");
				}, label: "catRelationshipScore1"},
				{type: "compare", leftop: "$catRelationshipScore1", operator: "greater equal", rightop: c_posRel, goTrue: "#pos-cat1", goFalse: "#comparecat1"},

				{type: "nothing", label: "pos-cat1"},
				{type: "show", img: cat, expression: "happy", position: "left"},
				// {type: "custom", func: function(page) {
				// 	page.getOwner().getSoundManager().play("Sup-Cat");
				// }},
				// {type: "play", audio: "Sup-Cat"},
				{type: "dialog", speaker: "Cat", text: "Thanks for sending your part of the project. I’m compiling everything right now."},
				{type: "jump", condition: true, goTrue: "#gocommon", goFalse: "#gocommon"},

				{type: "nothing", label: "comparecat1"},
				{type: "compare", leftop: "$catRelationshipScore1", operator: "greater equal", rightop: c_neuRel, goTrue: "#zero-cat1", goFalse: "#neg-cat1"},

				{type: "nothing", label: "zero-cat1"},
				{type: "show", img: cat, position: "left"},
				// {type: "custom", func: function(page) {
				// 	page.getOwner().getSoundManager().play("Hey-Cat");
				// }},
				// {type: "play", audio: "Hey-Cat"},
				{type: "dialog", speaker: "Cat", text: "I’m compiling our project now. Should only take a sec."},
				{type: "jump", condition: true, goTrue: "#gocommon", goFalse: "#gocommon"},

				{type: "nothing", label: "neg-cat1"},
				{type: "show", img: cat, expression: "sad", position: "left"},
				{type: "dialog", speaker: "Cat", text: "Almost done compiling the project."},
				{type: "jump", condition: true, goTrue: "#gocommon", goFalse: "#gocommon"},

				{type: "nothing", label: "gocommon"},

			];

			o = o.concat(common);
		};
		if (this._talked == 2) {
			o = [

				// phone text exchange begins
				{type: "open_phone", layout:"text", people: ["Mom"]},
				{type: "add_phone_textbox",
					speaker: "Mom",
					text: "Hey hon!  Study hard, go to the gym, keep good habits, do your best!!!!!!! MOM"},
				{type: "close_phone"},
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

	// Page5_1.prototype._createRandomPlaylist = function() {
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

	Page5_1.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);

		this._owner.saveData("priyaWorkChoice", this._priyaWorkChoice);
		this._owner.saveData("plagiarismData", this._plagiarismData);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page5_1.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		this._owner._ambient = this._owner.getSoundManager().play("Library-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});
		this._tweenVolumeIn();
	};

	// Page5_1.prototype._update = function() {
	// 	MPLAY.MPlayPage.prototype._update.call(this);

	// 	this._multiTracksPlayer.shuffle();
	// };

	MPLAY.Page5_1 = Page5_1;
}());
