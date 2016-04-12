// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page7_0
	 * @augments MPlay.MPlayPage
	 */
	var Page7_0 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page7_0.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page7_0.prototype.constructor = Page7_0;

	/**
	 * @override
	 */
	Page7_0.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupClassBackground();
		var geometry = new THREE.PlaneBufferGeometry(1920, 1080);
		var material = new THREE.MeshBasicMaterial( {color: 0x000000, transparent:true } );
		this._transitionBgImg = new THREE.Mesh(geometry,material);
		this._transitionBgImg.position.z = 150;

		this._transitionBg = "transitionbg";
		this._setObjectTag(this._transitionBg,this._transitionBgImg);
	};

	Page7_0.prototype._createFlowElements = function() {

		var professor = "%" + this._professor;
		var player = this._player;
		var transitionBg = "%" + this._transitionBg;

		var o = null;

		o = [
			{type:"show_context", text:"A few more weeks pass"},
			{type:"show_context", text:"and it’s the end of the semester!"},
			{type:"show_context", text:"You prepare for your final in Programming & Society…"},
			//{type: "show", img: professor, position: "center", waitUntilShown: false},
			//{type: "dialog", speaker: "Your phone", text: "I want to remind everyone about our final coming up next week. Please visit me during office hours, I am here to help..."},
			// {type: "show_phone_notif"},

			// phone email exchange begins
			{type: "show", img: professor, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Prof. Sweeney", text: "I want to remind everyone about our final coming up next week.  Please visit me during office hours, I am here to help..."},
			
			// phone email exchange ends
			//{type: "show", img: transitionBg, waitUntilShown:false},
			// after transition
			//{type: "dialog", speaker: "", text: "A few weeks pass, and it’s the end of the semester!  The group preparing for the final in the library."},
			{type: "goto", page: "scene 8.b"},
		];

		return o;
	};

	Page7_0.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);
		
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page7_0.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);
		
		this._owner._ambient = this._owner.getSoundManager().play("Classroom-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page7_0 = Page7_0;
}());
