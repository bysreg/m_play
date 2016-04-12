// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page5_0
	 * @augments MPLAY.MPlayPage
	 */
	var Page5_0 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page5_0.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page5_0.prototype.constructor = Page5_0;

	/**
	 * @override
	 */
	Page5_0.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupClassBackground();
		var geometry = new THREE.PlaneBufferGeometry(1920, 1080);
		var material = new THREE.MeshBasicMaterial( {color: 0x000000, transparent:true } );
		this._transitionBgImg = new THREE.Mesh(geometry,material);
		this._transitionBgImg.position.z = 150;

		this._transitionBg = "transitionbg";

		this._setObjectTag(this._transitionBg,this._transitionBgImg);


	};

	Page5_0.prototype._createFlowElements = function() {
		var professor = "%" + this._professor;
		var transitionBg = "%" + this._transitionBg;

		var o = null;

		o = [
			{type: "show_context", text:"A few more weeks pass..."},
			{type: "show_context", text:"...and your group project is due tomorrow…"},
			{type: "show", img: professor, expression: "happy", position: "center"},
			{type: "dialog", speaker: "Prof. Sweeney", text: "I hope you're making good progress on the projects!"},
			{type: "dialog", speaker: "Prof. Sweeney", text: "Please make sure you get plenty of rest and build in lots of time to complete it."},
			{type: "dialog", speaker: "Prof. Sweeney", text: "It will probably take longer than you think it will.  Dismissed."},

			//{type: "show", img: transitionBg, waitUntilShown:false},
			// after transition
			//{type: "dialog", speaker: "", text: "A few weeks later, you and the group are finishing the group project..."},
			{type: "goto", page: "scene 6.b"},
		];

		return o;
	};

	Page5_0.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);
		
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page5_0.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);
		
		this._owner._ambient = this._owner.getSoundManager().play("Classroom-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page5_0 = Page5_0;
}());
