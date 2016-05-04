// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page0_1
	 * @augments MPlay.MPlayPage
	 */
	var Page0_1 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page0_1.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page0_1.prototype.constructor = Page0_1;

	/**
	 * @override
	 */
	Page0_1.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		// this._owner._ambient = this._owner.getSoundManager().play("Bar-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		// this._tweenVolumeIn();

		// var background_ryan = "/static/gnovel/res/textures/backgrounds/restaurant scene with ryan.png"
		this.setupBarBackground();

		var z = this.getBackgroundLayer() + 50;
		this._background_ryan = this.createImage("/static/gnovel/res/textures/backgrounds/restaurant scene with ryan.png", new THREE.Vector3(0, 0, this._backgroundLayer-1), 1920, 1080);
		//this._background_empty.scale.set(.90,.85,1);
		this._background_ryan.material.opacity = 0;
		this._addToSceneBg(this._background_ryan);
		this._background_empty = this.createImage("/static/gnovel/res/textures/backgrounds/restaurant.png", new THREE.Vector3(0, 0, this._backgroundLayer-2), 1920, 1080);
		this._background_empty.material.opacity = 0;
		this._addToSceneBg(this._background_empty);

		this._catsphoneImg = this.createImage("/static/gnovel/res/textures/wallet for bar.png", new THREE.Vector3(480, -60, this.getBackgroundLayer()+10), 100, 25);
		this._addToScene(this._catsphoneImg);
		this._catsphoneImg.material.opacity = 0;

		var geometry = new THREE.PlaneBufferGeometry(1920, 1080);
		var material = new THREE.MeshBasicMaterial( {color: 0x000000, transparent:true } );
		this._transitionBgImg = new THREE.Mesh(geometry,material);
		this._transitionBgImg.position.z = 0;

		this._transitionBgImg.material.opacity = 0;

		this._catsphone = "catsphone";
		this._transitionBg = "transitionbg";

		this._setObjectTag(this._transitionBg,this._transitionBgImg);
		var pageObj = this;

		this._io1 = this.createInteractableObject(
			"/static/gnovel/res/textures/char/sad ryan.png",
			{type: "character", x: 180, y: -60, z: z, width : 360, height : 713, opacity: 0, onClick: function(io) {

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

				//remove previous background with character and change
				pageObj.tweenMat(pageObj._background_empty, {
					opacity: 1,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 200,
				});
				pageObj.tweenMat(pageObj._bg, {
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800,
					onComplete: function() {
						pageObj._removeFromSceneBg(pageObj._bg);
						//background_priya.material.opacity = 1;
						pageObj._bg = pageObj._background_empty;
					},
				});
			}});
		this._io1.setEnable(false);

		// 0 means player gives the wallet to the waiter
		// 1 means player picks up wallet and gives it to campus police
		// 2 means player ask for is there a cash in there, but ryan give it to the waiter
		this._catsPhoneStatus = 0;

		this._phoneData = {};
		this._phoneData.relationship = {};
		this._phoneData.relationship.ryan = 0;
		this._phoneData.relationship.priya = 0;
		this._phoneData.relationship.cat = 0;
	};

	Page0_1.prototype._createFlowElements = function() {

		var ryan = "%" + this._ryan;
		var catsphone = "%" + this._catsphone;
		var transitionBg = "%" + this._transitionBg;
		var player = this._player;

		var o = null;

		o = [
			// need a flow here to show a buzzing phone before choices
			// {type: "show_context", text:"You head to Scottie's to celebrate with Ryan.", waitUntilShown:false},
			{type: "show_phone_notif"},

			// phone email exchange begins
			{type: "open_phone", layout:"email", subject: "FWD: Welcome to team techFast!", from: "Ryan", email: "rtang@andrew.cmu.edu",
			text: "Woo! Congrats on the techFast gig.  Looks like we'll be on the advanced tech team together. // As my fellow future junior software developer, let's celebrate at Scotties.  Burgers on me! // - Ryan"},
			{type: "close_phone"},

			{type: "show_context", text:"Ryan arrives 5 minutes later", waitUntilShown:false},
			{type: "custom", func: function(page){
					var pageObj = page;
					page.tweenMat(page._background_ryan,{
						opacity: 1,
						easing: TWEEN.Easing.Cubic.Out,
						duration: 200,
					});
					page.tweenMat(pageObj._bg, {
						opacity: 0,
						easing: TWEEN.Easing.Cubic.Out,
						duration: 800,
						onComplete: function() {
							pageObj._removeFromSceneBg(pageObj._bg);
							//background_priya.material.opacity = 1;
							pageObj._bg = pageObj._background_ryan;
							page._io1.setEnable(true);
						},
					});
				}},
		];

		if(this._talked == 1) {
			o = [
				{type: "show", img: ryan, expression: "very happy", position: "center", waitUntilShown: false},
				// {type: "custom", func: function(page) {
				// 	page.getOwner().getSoundManager().play("Hey-Ryan-p");
				// }},
			// {type: "play", audio: "Hey-Ryan-p"},
			{type: "dialog", speaker: this._ryan, text: "Congratulations! Referring you was a good call.  We’ll be working together after graduation."},
			{type: "choices",
				choices :
					[{text: "Yeah!  Thanks again for forwarding my resume.",
						go: "#cheers"},
					{text : "Psyched to be working with you, Ryan!",
						relationship: [{name: this._ryan, score: 1}],
						go: "#cheers"}]},

			// {type: "show", img: ryan, expression: "very happy", position: "center", label: "cheers"},
			// {type: "dialog", speaker: this._ryan, text: "Congrats!"},
			// {type: "hide", img: ryan},
			{type: "jump", condition: true, goTrue: "#timefade", goFalse: 1000},

			{type: "show", img: ryan, expression: "happy", position: "center", waitUntilShown: false, label: "talktoryan"},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Hey-Ryan-p");
			// }},
			// {type: "play", audio: "Hey-Ryan-p"},
			{type: "dialog", speaker: this._ryan, text: "Check your phone, check your phone!"},
			{type: "choices",
				choices :
					[{text: "Do I even want to know?",
						go: "#gotjob"},
					{text : "Good news?!",
						go: "#gotjob"}]},
			{type: "dialog", speaker: this._ryan, text: "You got the job!  We’re going to be working together after graduation! I just know it’s going to be awesome.", label: "gotjob"},

			//during transition
			{type:"nothing", label: "timefade"},
			// {type: "hide", img: ryan},
			// {type: "show", img: transitionBg, waitUntilShown:false},

			// // after transition
			// {type: "show_context", text: "Later on at Scottie’s…"},
			// {type: "hide", img: transitionBg},
			// {type: "show", img: catsphone, waitUntilShown: false},
			{type: "show", img: ryan, expression: "thoughtful", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "I'm so happy we'll be working together after graduation!  You're going to love being at techFast."},
			{type: "dialog", speaker: this._ryan, text: "We just have to get through this last semester.  I think our class - Programming and Society should be good though."},
			{type: "dialog", speaker: this._ryan, text: "My brother took it last year.  He said it was tough, but he learned a ton."},
			{type: "choices",
				choices :
					[{text: "Tough, huh?",
						go: "#RelationshipScore"},
					{text : "Glad we’re in it together.",
						relationship: [{name: this._ryan, score: 1}],
						go: "#RelationshipScore"}]},

			{type: "custom", func: function(page) {
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "RelationshipScore"},

			{type: "compare", leftop: "$RelationshipScore", operator: "greater", rightop: 0, goTrue: "#intro_priya", goFalse: "#not_intro_priya"},

			// relationship score > 0
			{type: "dialog", speaker: this._ryan, text: "Gotta love that Computer Science!  My friend Priya is in it too.  I’ll introduce you guys.", label: "intro_priya"},
			{type: "jump", condition: true, goTrue: "#seeaphone", goFalse: 1000},

			// relationship score <= 0
			{type: "dialog", speaker: this._ryan, text: "Computer Science... Good stuff.  My friend Priya is in the class too.", label: "not_intro_priya"},
			{type: "jump", condition: true, goTrue: "#seeaphone", goFalse: 1000},

			// see a phone on the table.
			/**
			* FIXME angle camera towards phone
			*/
			{type: "show", img: ryan, position: "center", waitUntilShown: false, label: "seeaphone"},
			{type: "dialog", speaker: this._ryan, text: "Oh hey, looks like someone left their wallet."},
			// this choice affects scene 2
			{type: "choices",
				choices :
					[{text: "Let’s give it to the waiter.",
						integrityScore:0,
						go: "#waiter"},
					{text: "Let’s take a look.  Maybe we can contact the owner.",
						onChoose: function(page) {
							page._catsPhoneStatus = 1;

							page._phoneData.relationship.ryan = 1;
						},
						integrityScore:1,
						relationship: [{name: this._ryan, score: 1}],
						go: "#pickup"},
					{text: "Does it have any cash in there?",
						onChoose: function(page) {
							page._catsPhoneStatus = 2;

							page._phoneData.relationship.ryan = -1;
						},
						integrityScore:-1,
						relationship: [{name: this._ryan, score: -1}],
						go: "#cash"}]},

			{type: "dialog", speaker: this._ryan, text: "Good idea.  Anyways, enough celebrating.  We have to keep up that QPA for techFast.  Our boss is a stickler for good grades.", label: "waiter"},
			{type: "jump", condition: true, goTrue: "#nextscene", goFalse: 1000},

				// if phone is picked up
				//{type: "dialog", speaker: this._ryan, text: "That should score you some Karma points!  Anyway, congrats again on the job.", label: "pickupphone"},
				/*{type: "choices",
					choices :
						[{text: "Let’s give it to the bartender to hold on to.",
							onChoose: function(page) {
								console.log("bartender");
								page._catsPhoneStatus = 1;
							}},
						{text : "I’ll bring it home to charge.  Maybe the owner will contact it.",
							onChoose: function(page) {
								console.log("you have the phone");
								page._catsPhoneStatus = 2;
							}}]},*/

			{type:"nothing", label: "pickup"},
			{type: "dialog", speaker: this._ryan, text: "No number, but it looks like it belongs to a student –"},
			{type: "dialog", speaker: this._ryan, text: "Cat Davis.  Her CMU ID card is in here."},
			{type: "dialog", speaker: this._ryan, text: "Let’s turn it into campus police."},
			{type: "dialog", speaker: this._ryan, text: "Anyways, enough celebrating.  We have to keep up that QPA for techFast.  Our boss is a stickler for good grades."},
			{type: "jump", condition: true, goTrue: "#nextscene", goFalse: 1000},

			{type: "nothing", label: "cash"},
			{type: "show", img: ryan, expression: "thoughtful", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Ha!  I didn’t know you were so mean. Let’s just give it to the waiter."},
			{type: "dialog", speaker: this._ryan, text: "Anyways, enough celebrating.  We have to keep up that QPA for techFast.  Our boss is a stickler for good grades."},

			// ending
			//{type: "hide", img: catsphone, label: "hidephone"},
			{type: "nothing", label:"nextscene"},

			{type: "goto", page: "scene 2.a"},
		];
		}

		return o;
	};

	Page0_1.prototype._createRandomPlaylist = function() {
		var playlist = null;
		playlist = [
					{audio:"Bar-glasses1", playrate: 0.1},
					{audio:"Bar-glasses2", playrate: 0.1},
					{audio:"Bar-glasses3", playrate: 0.1},
					{audio:"Bar-distantglasses", playrate: 0.4},
					{audio:"Bar-girltalking", playrate: 0.05, noreplay: true},
					{audio:"Bar-liquid", playrate: 0.05},
					{audio:"Bar-mantalking", playrate: 0.05, noreplay: true},
					{audio:"Bar-pia", playrate: 0.05, noreplay: true},
					];

		return playlist;
	};

	/**
	 * @override
	 */
	Page0_1.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);

		this._owner.saveData("catsPhoneStatus", this._catsPhoneStatus);
		this._owner.saveData("phoneData", this._phoneData);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
		//this._showRelationshipInfo("Ryan");
	};

	/**
	 * @override
	 */
	Page0_1.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		this._owner._ambient = this._owner.getSoundManager().play("Bar-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});
		this._tweenVolumeIn();

		this._catsphoneImg.material.opacity = 1;

		this._setObjectTag(this._catsphone, this._catsphoneImg);
	};

	/**
	 * @override
	 */
	Page0_1.prototype._update = function() {
		MPLAY.MPlayPage.prototype._update.call(this);

		this._multiTracksPlayer.shuffle();
	};

	MPLAY.Page0_1 = Page0_1;
}());
