// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page6_0
	 * @augments MPlay.MPlayPage
	 */
	var Page6_0 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page6_0.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page6_0.prototype.constructor = Page6_0;

	/**
	 * @override
	 */
	Page6_0.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupGymBackground();
	};

	Page6_0.prototype._createFlowElements = function() {

		var ryan = "%" + this._ryan;
		var player = this._player;

		var o = null;

		o = [
			{type:"show_context", text:"At the gym, you get an email on your phone. You open it."},

			{type: "open_phone", layout:"email", subject: "Group Project Grade", from: "Prof. Sweeney", email: "sweeney@andrew.cmu.edu",
				text: "Dear "+ player +", Priya, Ryan & Cat, // Your group project grade: B-. // I will hand back your comments in greater detail in class. // -Prof Sweeney"},
			{type: "close_phone"},

			// phone email exchange ends

			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#pos-ryan1", goFalse: "#neg-ryan1"},

			{type: "nothing", label: "pos-ryan1"},
			{type: "show", img: ryan, position: "center", expression: "sad", waitUntilShown: false},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Hey-Ryan-n");
			// }},
			// {type: "play", audio: "Hey-Ryan-n"},
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
			{type: "dialog", speaker: this._ryan, text: "I'm angry! We had to rush Priya’s part of the project"},
			{type: "dialog", speaker: this._ryan, text: "I feel like that’s why we got that crappy grade.  We both need to do really well on the final now."},
			{type: "show", img: ryan, position: "center", expression: "neutral"},
			{type: "dialog", speaker: this._ryan, text: "You know what? It’s going to be fine.  We’ll get through the final together, and start our jobs in no time."},

			{type: "goto", page: "scene 8.a"},
		];

		return o;
	};

	Page6_0.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);
		
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page6_0.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);
		
		this._owner._ambient = this._owner.getSoundManager().play("Gym-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page6_0 = Page6_0;
}());
