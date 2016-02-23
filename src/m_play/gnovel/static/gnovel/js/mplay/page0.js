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

		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");

		//create images
		this._ryanImg = this.createImage("/static/gnovel/res/textures/char/ryan-happy.png", new THREE.Vector3(0, -80, 140), 600, 750);
		this._yourphoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 20), 250, 458);
		this._closephoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 160), 519, 950);
		this._catsphoneImg = this.createImage("/static/gnovel/res/textures/cat's phone.png", new THREE.Vector3(480, 0, 40), 100, 183);

		this._ryanImg.material.opacity = 0;
		this._yourphoneImg.material.opacity = 0;
		this._catsphoneImg.material.opacity = 0;
		this._closephoneImg.material.opacity = 0;

		var phone = this.createInteractableObject(
			"/static/gnovel/res/textures/phone.png",
			{x: -100, y: 200, width : 64, height : 64, onClick: function() {
			}});

		this._ryan = "ryan";
		this._yourphone = "yourphone";
		this._catsphone = "catsphone";
		this._closephone = "closephone";

		// add object tags
		this._setObjectTag(this._ryan, this._ryanImg);
		this._setObjectTag(this._yourphone, this._yourphoneImg);
		this._setObjectTag(this._catsphone, this._catsphoneImg);
		this._setObjectTag(this._closephone, this._closephoneImg);
	};

	Page0.prototype._createFlowElements = function() {
		var ryan = "%ryan";
		var yourphone = "%yourphone";
		var catsphone = "%catsphone";
		var closephone = "%closephone";
		var player = "yourname";
		var o = null;

		o = [
			// need a flow here to show a buzzing phone before choices
			{type: "show", img: yourphone},
			{type: "choices",
				choices :
					[{text: "Look at your Phone ",
						go: "#lookatphone"},
					{text: "Talk to Ryan First",
						go: "#talktoryan"}]},
			// need a flow here to show the phone screen before next flow, and this flow should be labeled "lookatphone"
			{type: "hide", img: yourphone, waitUntilHiden: false, label: "lookatphone"},
			{type: "show", img: closephone},
			{type: "dialog", speaker: "Your phone", text: "Dear " + player + ", Glad you'll be joining us at the company.  Ryan was right - you'll make a great addition to the team.  We'll be in touch. -J. WANG"},
			{type: "hide", img: closephone, waitUntilHiden: false},
			{type: "show", img: ryan, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "ryan", text: "Congratulations! I am so happy you got the job - referring you was a good call.  We can continue the magic as cubicle neighbors after graduation."},
			{type: "choices",
				choices :
					[{text: "Yeah!  Thanks again for forwarding my resume.",
						go: "#cheers"},
					{text : "Psyched to be working with you after graduation, Ryan!",
						go: "#cheers"}]},
			{type: "dialog", speaker: "ryan", text: "Cheers!  Congratulations!", label: "cheers"},
			{type: "jump", condition: true, goTrue: "#timefade", goFalse: 1000},

			{type: "hide", img: yourphone, waitUntilHiden: false, label: "talktoryan"},
			{type: "show", img: ryan, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "ryan", text: "Check your phone, check your phone!"},
			{type: "choices",
				choices :
					[{text: "What?! Just tell me!",
						go: "#gotjob"},
					{text : "Good news?!",
						go: "#gotjob"}]},
			{type: "dialog", speaker: "ryan", text: "You got the job!  We’re going to be working together after graduation! You’ll love our boss.  He was so great during the internship.  I just know it’ll be great.", label: "gotjob"},
			{type: "hide", img: ryan},

			// after transition
			{type: "show", img: ryan, position: "center", waitUntilShown: false, label: "timefade"},
			{type: "dialog", speaker: "ryan", text: "Oh man, this semester is gonna be tough.  I think our class - Programming and Society should be good though.  My brother took it last year."},
			{type: "choices",
				choices :
					[{text: "Should be good.",
						go: "#mentionpriya"},
					{text : "Glad we’re in it together.",
						go: "#mentionpriya"}]},
			{type: "dialog", speaker: "ryan", text: "I think it's cross listed CS and psych or something.  My friend Priya is in it too.  She's really nice, I’ll introduce you guys.", label: "mentionpriya"},
			// see a phone on the table.
			{type: "show", img: catsphone},

			{type: "dialog", speaker: "ryan", text: "Looks like someone left their phone."},
			// this choice affects scene 2
			{type: "choices",
				choices :
					[{text: "That sucks for them.",
						go: "#sucks"},
					{text: "Pick up the phone to see if there’s any contact information.",
						go: "#pickupphone"},
					{text: "Let’s sell it on Ebay!",
						go: "#sellit"}]},

			{type: "dialog", speaker: "ryan", text: "So anyway, congrats again.  Better keep up that GPA – our boss warned me before I left last summer to keep it above a 3.5.", label: "sucks"},
			{type: "jump", condition: true, goTrue: "#hidephone", goFalse: 1000},

			{type: "dialog", speaker: "ryan", text: "Oh no.  Looks like it’s dead.  Sucks to be that guy.", label: "pickupphone"},
			{type: "choices",
				choices :
					[{text: "Let’s give it to the bartender to hold on to."},
					{text : "I’ll bring it home to charge.  Maybe the owner will contact it."}]},
			{type: "dialog", speaker: "ryan", text: "That should score you some Karma points"},
			{type: "jump", condition: true, goTrue: "#hidephone", goFalse: 1000},

			{type: "dialog", speaker: "ryan", text: "Ha!  I didn’t know you were so mean.  Leave it, I guess.", label: "sellit"},
			{type: "hide", img: catsphone, label: "hidephone"},

		];

		return o;
	};

	MPLAY.Page0 = Page0;
}());
