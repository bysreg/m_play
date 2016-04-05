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
		this._transitionBgImg.position.z = this._uiLayer - 30;;

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
			// phone email exchange begins
			{type: "show_phone_notif"},

			// phone email exchange begins
			{type: "open_phone", layout:"email", subject: "Welcome to the team!", from: "TechFast", email: "hr@techfast.io", 
				text: "We are pleased to extend an early offer to you as a junior software developer on our team here at TechFast!  Your work impressed us, and we know we can expect great things from you.  You’ll be part of our advanced technology team, starting straight after graduation in May.  Best of luck on your final semester, and we’ll be in touch."},
			{type: "close_phone"},	
			//{type: "show", img: closephone, waitUntilShown: false},
			// {type: "phone_textbox",
			// 	label: "phone_bg",
			// 	bgOffsetY: -230,
			// 	bgOffsetX: -15,
			// 	bgHeight: 790,
			// 	bgWidth: 1230,
			// 	y: 230,
			// 	charLine: 37,
			// 	bgPath: "/static/gnovel/res/textures/Email-graphic.png",
			// 	waitUntilShown: false,
			// 	text: ""},
			// {type: "phone_textbox",
			// 	label: "address_from",
			// 	bgHeight: 10,
			// 	bgWidth: 10,
			// 	x: -170,
			// 	y: 210,
			// 	dontShowBg: true,
			// 	text: "From: Ryan Tang",
			// 	messageAlign: "left",
			// 	waitUntilShown: false,
			// 	},
			// {type: "phone_textbox",
			// 	label: "address_to",
			// 	bgHeight: 10,
			// 	bgWidth: 10,
			// 	x: -170,
			// 	y: 180,
			// 	dontShowBg: true,
			// 	text: "To: " + player,
			// 	messageAlign: "left",
			// 	waitUntilShown: false,
			// 	},
			// {type: "phone_textbox",
			// 	label: "email_textbox1",
			// 	bgHeight: 10,
			// 	bgWidth: 10,
			// 	x: -170,
			// 	y: 150,
			// 	dontShowBg: true,
			// 	charLine: 50,
			// 	text: "Yeah!!! All you, buddy!  Scottie's tonight.",
			// 	messageAlign: "left",
			// 	waitUntilShown: false,
			// 	},
			// {type: "phone_textbox",
			// 	label: "forward",
			// 	bgHeight: 10,
			// 	bgWidth: 10,
			// 	x: -170,
			// 	y: 120,
			// 	dontShowBg: true,
			// 	charLine: 50,
			// 	text: "------------ Forwarded message ------------",
			// 	messageAlign: "left",
			// 	waitUntilShown: false,
			// },
			// {type: "phone_textbox",
			// 	label: "address_from2",
			// 	bgHeight: 10,
			// 	bgWidth: 10,
			// 	x: -170,
			// 	y: 100,
			// 	dontShowBg: true,
			// 	charLine: 40,
			// 	text: "From: TechFast",
			// 	messageAlign: "left",
			// 	waitUntilShown: false,
			// },
			// {type: "phone_textbox",
			// 	label: "address_to2",
			// 	bgHeight: 10,
			// 	bgWidth: 10,
			// 	x: -170,
			// 	y: 75,
			// 	dontShowBg: true,
			// 	charLine: 40,
			// 	text: "To: "+player,
			// 	messageAlign: "left",
			// 	waitUntilShown: false,
			// },
			// {type: "phone_textbox",
			// 	label: "email_subject",
			// 	bgHeight: 10,
			// 	bgWidth: 10,
			// 	x: -170,
			// 	y: 50,
			// 	dontShowBg: true,
			// 	charLine: 40,
			// 	text: "Subject: Welcome to the team!",
			// 	messageAlign: "left",
			// 	waitUntilShown: false,
			// 	},
			// {type: "phone_textbox",
			// 	label: "email_textbox2",
			// 	bgHeight: 10,
			// 	bgWidth: 10,
			// 	x: -170,
			// 	y: 10,
			// 	charLine: 37,
			// 	dontShowBg: true,
			// 	messageAlign: "left",
			// 	text: "Dear " + player + ",",
			// 	waitUntilShown: false,
			// },
			// {type: "phone_textbox",
			// 	label: "email_textbox3",
			// 	bgHeight: 10,
			// 	bgWidth: 10,
			// 	x: -170,
			// 	y: -30,
			// 	charLine: 39,
			// 	dontShowBg: true,
			// 	messageAlign: "left",
			// 	text: "We are pleased to extend an early offer to you as a junior software developer on our team here at TechFast!  Your work impressed us, and we know we can expect great things from you.  You’ll be part of our advanced technology team, starting straight after graduation in May.  Best of luck on your final semester, and we’ll be in touch.",
			// 	waitUntilShown: false,
			// 	},
			// {type: "phone_textbox",
			// 	label: "email_textbox4",
			// 	bgHeight: 10,
			// 	bgWidth: 10,
			// 	x: -170,
			// 	y: -260,
			// 	charLine: 37,
			// 	dontShowBg: true,
			// 	messageAlign: "left",
			// 	text: "-Regards, J. Wing",
			// },
			// {type: "hide_phone_textbox", dialog: "$phone_bg"},
			// {type: "hide_phone_textbox", dialog: "$address_from"},
			// {type: "hide_phone_textbox", dialog: "$address_from2"},
			// {type: "hide_phone_textbox", dialog: "$address_to"},
			// {type: "hide_phone_textbox", dialog: "$address_to2"},
			// {type: "hide_phone_textbox", dialog: "$email_subject"},
			// {type: "hide_phone_textbox", dialog: "$email_textbox1"},
			// {type: "hide_phone_textbox", dialog: "$email_textbox2"},
			// {type: "hide_phone_textbox", dialog: "$email_textbox3"},
			// {type: "hide_phone_textbox", dialog: "$email_textbox4"},
			// {type: "hide_phone_textbox", dialog: "$forward"},
			// {type: "hide", img: closephone},
			// // phone email exchange ends

			{type: "show_context", text:"You head to Scottie's", waitUntilShown:false},
			{type: "show", img: transitionBg},
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
		this._owner._ambient = this._owner.getSoundManager().play("UC-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page0 = Page0;
}());
