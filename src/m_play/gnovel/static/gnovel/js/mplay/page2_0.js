// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page2_0
	 * @augments MPLAY.MPlayPage
	 */
	var Page2_0 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page2_0.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page2_0.prototype.constructor = Page2_0;

	/**
	 * @override
	 */
	Page2_0.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupCafeBackground();
	};

	Page2_0.prototype._createFlowElements = function() {
		var priya = "%" + this._priya;
		var player = this._player;

		var o = null;

		o = [
			{type:"show_context", text:"You join Priya at the cafe."},
			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Priya");
			}, label: "priyaRelationshipScore1"},
			{type: "compare", leftop: "$priyaRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#happy", goFalse: "#neutural"},
			{type: "show", img: priya, expression: "happy", position: "center", label: "happy"},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Heyfriend-Priya");
			// }},
			{type: "play", audio: "Heyfriend-Priya"},
			{type: "dialog", speaker: "Priya", text: "Oh, "+ player +"! Good to see you. Ryan told me you got a job lined up. That’s so great.  Congrats!"},
			{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

			{type: "show", img: priya, position: "center", label: "neutural"},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Hey-Priya");
			// }},
			{type: "play", audio: "Hey-Priya"},
			{type: "dialog", speaker: "Priya", text: "Hey. Ryan told me you got a job lined up."},
			{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

			{type: "choices", choices : [{text: "Yeah! Ryan referred me.", go: "#sweet"}, {text : "Thanks!", go : "#sweet"}], label: "choices1"},

			{type: "nothing", label: "sweet"},
			{type: "show", img: priya, expression: "happy", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "He’s sweet.  Last semester, Ryan was my date to the Indian Association’s banquet."},
			{type: "dialog", speaker: "Priya", text: "Really goes out of his way for his friends."},
			{type: "choices",
			choices :
				[{text: "That was nice of him.", go: "#nice"},
				{text : "You guys seem close.", relationship: [{name: this._priya, score: "1"}], go : "#close"}]
			},

			{type: "nothing", label: "nice"},
			{type: "show", img: priya, expression: "happy", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Priya", text: "Yeah!  Well it was good talking with you.  See you in class."},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},

			{type: "nothing", label: "close"},
			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Priya");
			}, label: "priyaRelationshipScore2"},
			{type: "compare", leftop: "$priyaRelationshipScore2", operator: "greater", rightop: 0, goTrue: "#happy2", goFalse: "#neutural2"},

			{type: "show", img: priya, expression:"happy", position:"center", waitUntilShown: false, label: "happy2"},
			{type: "dialog", speaker: "Priya", text: "We’re good friends… like you two!  See you in class."},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: 1000},

			{type: "show", img: priya, expression: "neutural", position: "center", waitUntilShown: false, label: "neutural2"},
			{type: "dialog", speaker: "Priya", text: "Yeah… anyway, see you later."},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: 1000},

			{type: "goto", page: "scene 4", label: "gonextscene"},
		];

		return o;
	};

	/**
	 * @override
	 */
	Page2_0.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page2_0.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		this._owner._ambient = this._owner.getSoundManager().play("Cafe-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});

		this._tweenVolumeIn();
	};

	MPLAY.Page2_0 = Page2_0;
}());
