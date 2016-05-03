// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page6_1
	 * @augments MPlay.MPlayPage
	 */
	var Page6_1 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page6_1.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page6_1.prototype.constructor = Page6_1;

	/**
	 * @override
	 */
	Page6_1.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		var background_ryan = "/static/gnovel/res/textures/backgrounds/restaurant scene with ryan.png"
		this.setupBarBackground(background_ryan);

		this._background_empty = this.createImage("/static/gnovel/res/textures/backgrounds/restaurant.png", new THREE.Vector3(0, 0, this._background3Layer - 105), 1920, 1080);
		//this._background_empty.scale.set(.90,.85,1);
		this._background_empty.material.opacity = 0;
		this._addToSceneBg(this._background_empty);

		var pageObj = this;
	};

	Page6_1.prototype._createFlowElements = function() {

		var ryan = "%" + this._ryan;
		var player = this._player;
		var background = this._background_empty;

		var o = null;


			o = [
				{type:"show_context", text:"at Scottie's..."},
				{type: "show_phone_notif"},

				{type: "open_phone", layout:"email", subject: "Group Project Grade", from: "Prof. Sweeney", email: "sweeney@andrew.cmu.edu",
					text: "Dear "+ player +", Priya, Ryan & Cat, Your group project grade: B- . I will hand back your comments in greater detail in class. -Prof Sweeney"},
				{type: "close_phone"},

				// phone email exchange ends

			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore1"},
			{type: "custom", func: function(page){
				page.tweenMat(background,{
					opacity: 1,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 200,
				});
				page.tweenMat(page._bg,{
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800,
					onComplete: function() {
						page._removeFromSceneBg(page._bg);
					},
				});
			}},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#pos-ryan1", goFalse: "#neg-ryan1"},

			{type: "nothing", label: "pos-ryan1"},
			{type: "show", img: ryan, position: "center", expression: "sad", waitUntilShown: false},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Hey-Ryan-p");
			// }},
			// {type: "play", audio: "Hey-Ryan-p"},
			{type: "dialog", speaker: this._ryan, text: "Hey "+ player +".  You got the email right? About our grade?"},
			{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

			{type: "nothing", label: "neg-ryan1"},
			{type: "show", img: ryan, position: "center", expression: "sad", waitUntilShown: false},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Ohhi-Ryan");
			// }},
			// {type: "play", audio: "Ohhi-Ryan"},
			{type: "dialog", speaker: this._ryan, text: "Oh hey. You got the email right? About our grade?"},
			{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

			{type: "nothing", label: "choices1"},
			{type: "choices",
				choices :
					[{text: "Yeah this sucks."},
					{text : "Are you ok?"}]},

			{type: "show", img: ryan, position: "center", expression: "angry", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "I’m angry!  We had to rush Priya’s part of the project."},
			{type: "dialog", speaker: this._ryan, text: "I feel like that’s why we got that crappy grade.  We both need to do really well on the final now."},
			{type: "show", img: ryan, position: "center", expression: "neutral"},
			{type: "dialog", speaker: this._ryan, text: "You know what? It’s going to be fine. We’ll get through the final together, and start our jobs in no time."},

			{type: "goto", page: "scene 8.a"},
		];


		return o;
	};

	Page6_1.prototype._createRandomPlaylist = function() {
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

	Page6_1.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page6_1.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		this._owner._ambient = this._owner.getSoundManager().play("Bar-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});
		this._tweenVolumeIn();
	};

	/**
	 * @override
	 */
	Page6_1.prototype._update = function() {
		MPLAY.MPlayPage.prototype._update.call(this);

		this._multiTracksPlayer.shuffle();
	};

	MPLAY.Page6_1 = Page6_1;
}());
