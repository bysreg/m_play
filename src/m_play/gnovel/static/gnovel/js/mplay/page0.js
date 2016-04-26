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
			{type: "open_phone", layout:"email", subject: "FWD: Welcome to team techFast!", from: "Ryan", email: "rtang@andrew.cmu.edu",
				text: "Woo! Congrats on the techFast gig.  Looks like we'll be on the advanced tech team together.  As my fellow future junior software developer, let's celebrate at Scotties.  Burgers on me! - Ryan"},
			{type: "close_phone"},
			// phone email exchange ends

			{type: "show_context", text:"You head to Scottie's to celebrate with Ryan.", waitUntilShown:false},
			{type: "goto", page: "scene 1.b", label: "nextscene"},
		];

		return o;
	};

	Page0.prototype._createRandomPlaylist = function() {
		var playlist = null;
		playlist = [
					{audio:"Uc-girllaughing", playrate: 0.02},
					{audio:"Uc-mantalking", playrate: 0.02},
					{audio:"Uc-womantalking", playrate: 0.03},
					{audio:"Uc-steps", playrate: 0.1}
					];
		return playlist;
	};

	/**
	 * @override
	 */
	Page0.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	/**
	 * @override
	 */
	Page0.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		this._owner._ambient = this._owner.getSoundManager().play("UC-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});
		this._tweenVolumeIn();
	};

	/**
	 * @override
	 */
	Page0.prototype._update = function() {
		MPLAY.MPlayPage.prototype._update.call(this);
		
		this._multiTracksPlayer.shuffle();
	};

	MPLAY.Page0 = Page0;
}());
