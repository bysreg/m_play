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

		this.setupUcBackground();

		//create images
		this._yourphoneImg = this.createImage("/static/gnovel/res/textures/ui/phone.png", new THREE.Vector3(0, 60, 150), 250, 458);
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
			//NEW INTRO FOR PLAYTEST

			// OLD INTRO PRE-PLAYTEST
			/*{type: "show_context", text:"You go to meet your friend Ryan for a bite at Scottie’s.", waitUntilShown:false},
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
			// need a flow here to show the phone screen before next flow, and this flow should be labeled "lookatphone"*/

			// phone email exchange begins
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

			{type: "show_context", text:"You go to meet your friend Ryan to celebrate at Scottie’s.", waitUntilShown:false},
			{type: "hide", img: transitionBg},
			{type: "goto", page: "scene 1.b", label: "nextscene"},
		];

		return o;
	};

	/**
	 * @override
	 */
	Page0.prototype._onUnload = function() {

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
