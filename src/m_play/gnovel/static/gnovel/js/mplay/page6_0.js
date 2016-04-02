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
		var closephone = "%" + this._closephone;

		var o = null;

		o = [
			{type:"show_context", text:"at the gym..."},
			{type: "dialog", speaker: "Your phone", text: "Your cell phone pings with an email. You open it."},

			// phone email exchange begins
			{type: "show", img: closephone, waitUntilShown: false},
			{type: "phone_textbox",
				label: "email",
				text: "Dear "+ player +", Priya, Ryan & Cat, Your group project grade: B- . I will hand back your comments in greater detail in class. -Prof Sweeney"},
			{type: "hide_phone_textbox", dialog: "$email"},
			{type: "hide", img: closephone},
			// phone email exchange ends

			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#pos-ryan1", goFalse: "#neg-ryan1"},

			{type: "nothing", label: "pos-ryan1"},
			{type: "show", img: ryan, position: "center", expression: "sad", waitUntilShown: false},
			{type: "custom", func: function(page) {
				page.getOwner().getSoundManager().play("Hey-Ryan-n");
			}},
			{type: "dialog", speaker: this._ryan, text: "Hey "+ player +".  You got the email right? About our grade?"},
			{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

			{type: "nothing", label: "neg-ryan1"},
			{type: "show", img: ryan, position: "center", expression: "sad", waitUntilShown: false},
			{type: "custom", func: function(page) {
				page.getOwner().getSoundManager().play("Ohhi-Ryan");
			}},
			{type: "dialog", speaker: this._ryan, text: "Oh hey. You got the email right? About our grade?"},
			{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

			{type: "nothing", label: "choices1"},
			{type: "choices",
				choices :
					[{text: "Yeah. I'm with you. Feeling bad about our grade on that project."},
					{text : "Are you ok?"}]},

			{type: "show", img: ryan, position: "center", expression: "angry", waitUntilShown: false},
			{type: "dialog", speaker: this._ryan, text: "Eh, yeah. I'm still sort of pissed. We had to rush Priya’s part of the project, and I feel like that's why we got that crappy grade. We both need to do well in this class… "},
			{type: "show", img: ryan, position: "center", expression: "neutral"},
			{type: "dialog", speaker: this._ryan, text: "You know what? It’ll be ok, we just need to make it through the final, and we’ll be starting our jobs in no time."},

			{type: "goto", page: "scene 8.a"},
		];

		return o;
	};

	Page6_0.prototype._onUnload = function() {
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page6_0.prototype._onStart = function() {
		this._owner._ambient = this._owner.getSoundManager().play("Gym-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page6_0 = Page6_0;
}());
