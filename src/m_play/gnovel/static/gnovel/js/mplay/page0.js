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

		this.setupBarBackground();

		//create images
		this._yourphoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 20), 250, 458);
		this._closephoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 160), 519, 950);
		this._catsphoneImg = this.createImage("/static/gnovel/res/textures/cat's phone.png", new THREE.Vector3(480, -100, this.getBackgroundLayer()+10), 70, 133);
		var geometry = new THREE.PlaneBufferGeometry(1920, 1080);
		var material = new THREE.MeshBasicMaterial( {color: 0x000000, transparent:true } );
		this._transitionBgImg = new THREE.Mesh(geometry,material);
		//this._transitionBgImg = this.createImage("/static/gnovel/res/textures/test1.jpg", new THREE.Vector3(480, 0, 40), 100, 183);
		this._transitionBgImg.position.z = 0;

		this._yourphoneImg.material.opacity = 0;
		this._catsphoneImg.material.opacity = 1;
		this._closephoneImg.material.opacity = 0;
		this._transitionBgImg.material.opacity = 0;
		//this._catsphoneImg.rotation.x = -1;

		this._yourphone = "yourphone";
		this._catsphone = "catsphone";
		this._closephone = "closephone";
		this._transitionBg = "transitionbg";

		// for images
		this._setObjectTag(this._yourphone, this._yourphoneImg);
		this._setObjectTag(this._catsphone, this._catsphoneImg);
		this._setObjectTag(this._closephone, this._closephoneImg);
		this._setObjectTag(this._transitionBg,this._transitionBgImg);

		// 0 means player does not pick up cat's phone
		// 1 means player picks up cat's phone but it is not with him
		// 2 means player picks up cat's phone and it is with him
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
			{type: "show", img: catsphone, waitUntilShown:false},
			{type: "show", img: yourphone},
			{type: "choices",
				choices :
					[{text: "Look at your Phone ",
						go: "#lookatphone"},
					{text: "Talk to Ryan First",
						go: "#talktoryan",
					relationship: {name: this._ryan, score: 1}}]},
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

			{type: "show", img: ryan, expression: "happy", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Congratulations! I am so happy you got the job - referring you was a good call.  You’ll love it – my internship there last summer was a blast."},
			{type: "choices",
				choices :
					[{text: "Yeah!  Thanks again for forwarding my resume.",
						go: "#cheers"},
					{text : "Psyched to be working with you after graduation, Ryan!",
						relationship: {name: this._ryan, score: 1},
						go: "#cheers"}]},
			{type: "dialog", speaker: this._ryan, text: "Cheers!  Congratulations!", label: "cheers"},
			{type: "hide", img: ryan},
			{type: "jump", condition: true, goTrue: "#timefade", goFalse: 1000},

			{type: "hide", img: yourphone, waitUntilHiden: false, label: "talktoryan"},
			{type: "show", img: ryan, expression: "happy", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Check your phone, check your phone!"},
			{type: "choices",
				choices :
					[{text: "What?! Just tell me!",
						go: "#gotjob"},
					{text : "Good news?!",
						relationship: {name: this._ryan, score: 1},
						go: "#gotjob"}]},
			{type: "dialog", speaker: this._ryan, text: "You got the job!  We’re going to be working together after graduation! You’ll love our boss.  He was so great during the internship.  I just know it’ll be great.", label: "gotjob"},

			//during transition
			{type:"nothing", label: "timefade"},
			{type: "hide", img: ryan},
			{type: "show", img: transitionBg, waitUntilShown:false},
			// after transition
			{type: "dialog", speaker: "", text: "A few drinks later"},
			{type: "hide", img: transitionBg},
			{type: "show", img: catsphone, waitUntilShown: false},
			{type: "show", img: ryan, expression: "thoughtful", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Oh man, this semester is gonna be tough.  I think our class - Programming and Society should be good though.  My brother took it last year."},
			{type: "choices",
				choices :
					[{text: "Should be good.",
						go: "#mentionpriya"},
					{text : "Glad we’re in it together.",
						relationship: {name: this._ryan, score: 1},
						go: "#mentionpriya"}]},
			{type: "show", img: ryan, expression: "thoughtful", position: "center", waitUntilShown: false, label: "mentionpriya"},
			{type: "dialog", speaker: this._ryan, text: "I think it's cross listed CS and psych or something.  My friend Priya is in it too.  She's really nice, I’ll introduce you guys." },
			// see a phone on the table.
			/**
			* FIXME angle camera towards phone
			*/
			{type: "show", img: ryan, position: "center"},
			{type: "dialog", speaker: this._ryan, text: "Looks like someone left their phone."},
			// this choice affects scene 2
			{type: "choices",
				choices :
					[{text: "That sucks for them.",
						integrityScore:0,
						go: "#sucks"},
					{text: "Let's give it to the bartender.",
						integrityScore:1,
						go: "#pickupphone"},
					{text: "Let’s sell it on Ebay!",
						integrityScore:-1,
						go: "#sellit"}]},

			{type: "dialog", speaker: this._ryan, text: "Let’s give it to the bartender.  So anyway, congrats again.  Better keep up that GPA – our boss warned me before I left last summer to keep it above a 3.5.", label: "sucks"},
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

			{type:"nothing", label: "pickupphone"},
			{type: "show", img: ryan, expression: "happy", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "That should score you some Karma points! Anyway, congrats again on the job!"},
			{type: "jump", condition: true, goTrue: "#nextscene", goFalse: 1000},

			// if phone is not picked up
			{type: "dialog", speaker: this._ryan, expression: "thoughtful", text: "Ha!  I didn’t know you were so mean.  Let's just give it to the bartender.", label: "sellit"},

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
	};

	MPLAY.Page0 = Page0;
}());
