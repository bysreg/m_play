// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page0
	 * @augments MPlay.MPlayPage
	 */
	var Page0 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page0.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page0.prototype.constructor = Page0;

	/**
	 * @override
	 */
	Page0.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		// this._owner._ambient = this._owner.getSoundManager().play("Bar-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		// this._tweenVolumeIn();

		this.setupBarBackground();

		//create images
		this._yourphoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 20), 250, 458);
		this._catsphoneImg = this.createImage("/static/gnovel/res/textures/phone for bar.png", new THREE.Vector3(480, -130, this.getBackgroundLayer()+10), 120, 35);
		var geometry = new THREE.PlaneBufferGeometry(1920, 1080);
		var material = new THREE.MeshBasicMaterial( {color: 0x000000, transparent:true } );
		this._transitionBgImg = new THREE.Mesh(geometry,material);
		this._transitionBgImg.position.z = 0;

		this._yourphoneImg.material.opacity = 0;
		this._catsphoneImg.material.opacity = 1;
		this._transitionBgImg.material.opacity = 0;

		this._yourphone = "yourphone";
		this._catsphone = "catsphone";
		this._transitionBg = "transitionbg";

		// for images
		this._setObjectTag(this._yourphone, this._yourphoneImg);
		this._setObjectTag(this._catsphone, this._catsphoneImg);
		this._setObjectTag(this._transitionBg,this._transitionBgImg);

		// 0 means player gives the wallet to the waiter
		// 1 means player picks up wallet and gives it to campus police
		this._catsPhoneStatus = 0;
	};

	Page0.prototype._createFlowElements = function() {

		var ryan = "%" + this._ryan;
		var catsphone = "%" + this._catsphone;
		var closephone = "%" + this._closephone;
		var yourphone = "%" + this._yourphone;
		var transitionBg = "%" + this._transitionBg;
		var player = this._player;

		var o = null;

		o = [
			// need a flow here to show a buzzing phone before choices
			{type: "show_context", text:"You go to meet your friend Ryan for a bite at Scottie’s.", waitUntilShown:false},
			{type: "show", img: catsphone, waitUntilShown:false},
			{type: "show", img: yourphone},
			{type: "custom", func: function(page) {
				page.getOwner().getSoundManager().play("Message");
			}},
			{type: "choices",
				choices :
					[{text: "Look at your Phone ",
						go: "#lookatphone",
					relationship: {name: this._ryan, score: -1}},
					{text: "Talk to Ryan First",
						go: "#talktoryan",
					relationship: {name: this._ryan, score: 1}}],
					seconds: 10},
			// need a flow here to show the phone screen before next flow, and this flow should be labeled "lookatphone"

			// phone email exchange begins
			{type: "hide", img: yourphone, waitUntilHiden: false, label: "lookatphone"},
			{type: "show", img: closephone},
			{type: "phone_textbox",
				label: "email",
				text: "Dear " + player + ", Glad you'll be joining us at the company.  Ryan was right - you'll make a great addition to the team.  We'll be in touch. -J. WANG",
				bgHeight: 200},
			{type: "hide_phone_textbox", dialog: "$email"},
			{type: "hide", img: closephone},
			// phone email exchange ends

			{type: "show", img: ryan, expression: "neutral", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Congratulations! Referring you was a good call.  We’ll be working together after graduation."},
			{type: "choices",
				choices :
					[{text: "Yeah!  Thanks again for forwarding my resume.",
						go: "#cheers"},
					{text : "Psyched to be working with you, Ryan!",
						relationship: {name: this._ryan, score: 1},
						go: "#cheers"}]},

			{type: "show", img: ryan, expression: "happy", position: "center", waitUntilShown: false, label: "cheers"},
			{type: "dialog", speaker: this._ryan, text: "Congrats!"},
			{type: "hide", img: ryan},
			{type: "jump", condition: true, goTrue: "#timefade", goFalse: 1000},

			{type: "hide", img: yourphone, waitUntilHiden: false, label: "talktoryan"},
			{type: "show", img: ryan, expression: "happy", position: "center", waitUntilShown: false},
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
			{type: "hide", img: ryan},
			{type: "show", img: transitionBg, waitUntilShown:false},
			// after transition
			{type: "show_context", text: "Later on at Scottie’s…"},
			{type: "hide", img: transitionBg},
			{type: "show", img: catsphone, waitUntilShown: false},
			{type: "show", img: ryan, expression: "thoughtful", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Oh man, this semester is gonna be tough.  I think our class - Programming and Society should be good though.  My brother took it last year."},
			{type: "choices",
				choices :
					[{text: "Should be good.",
						go: "#RelationshipScore"},
					{text : "Glad we’re in it together.",
						relationship: {name: this._ryan, score: 1},
						go: "#RelationshipScore"}]},

			{type: "custom", func: function(page) {
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "RelationshipScore"},

			{type: "compare", leftop: "$RelationshipScore", operator: "greater", rightop: 0, goTrue: "#intro_priya", goFalse: "#not_intro_priya"},
			
			// relationship score > 0
			{type: "dialog", speaker: this._ryan, text: "It's cross listed with CS and psych or something.  My friend Priya is in it too.  I’ll introduce you guys.", label: "intro_priya"},
			{type: "jump", condition: true, goTrue: "#seeaphone", goFalse: 1000},

			// relationship score <= 0
			{type: "dialog", speaker: this._ryan, text: "I think it's cross listed with CS and psych or something.  My friend Priya is in it too.", label: "not_intro_priya"},
			{type: "jump", condition: true, goTrue: "#seeaphone", goFalse: 1000},

			// see a phone on the table.
			/**
			* FIXME angle camera towards phone
			*/
			{type: "show", img: ryan, position: "center", waitUntilShown: false, label: "seeaphone"},
			{type: "dialog", speaker: this._ryan, text: "Looks like someone left their wallet."},
			// this choice affects scene 2
			{type: "choices",
				choices :
					[{text: "Let’s give it to the waiter.",
						integrityScore:0,
						go: "#waiter"},
					{text: "Let’s take a look – maybe we can contact the owner.",
						onChoose: function(page) {
							page._catsPhoneStatus = 1;
						},
						integrityScore:1,
						relationship: {name: this._ryan, score: 1},
						go: "#pickup"},
					{text: "Does it have any cash in there?",
						integrityScore:-1,
						relationship: {name: this._ryan, score: -1},
						go: "#cash"}]},

			{type: "dialog", speaker: this._ryan, text: "Good idea.  So anyway, congrats again.  Better keep up that GPA – our boss warned me before I left last summer to keep it above a 3.5.", label: "waiter"},
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
			{type: "show", img: ryan, expression: "happy", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "No number, but it looks like it belongs to a student – Cat Davis.  Her CMU ID card is in here.  Let’s turn it into campus police."},
			{type: "jump", condition: true, goTrue: "#nextscene", goFalse: 1000},

			{type: "nothing", label: "cash"},
			{type: "show", img: ryan, expression: "thoughtful", position: "center", waitUntilShown: false},			
			{type: "dialog", speaker: this._ryan, text: "Ha!  I didn’t know you were so mean. Let’s just give it to the waiter."},

			// ending
			//{type: "hide", img: catsphone, label: "hidephone"},
			{type: "goto", page: "scene 2.a", label: "nextscene"},
		];

		return o;
	};

	/**
	 * @override
	 */
	Page0.prototype._onUnload = function() {
		this._owner.saveData("catsPhoneStatus", this._catsPhoneStatus);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page0.prototype._onStart = function() {
		this._owner._ambient = this._owner.getSoundManager().play("Bar-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page0 = Page0;
}());
