// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page2_1
	 * @augments MPLAY.MPlayPage
	 */
	var Page2_1 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page2_1.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page2_1.prototype.constructor = Page2_1;

	/**
	 * @override
	 */
	Page2_1.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupGymBackground();

	};

	Page2_1.prototype._createFlowElements = function() {
		var cat = "%" + this._cat;
		var player = this._player;

		var o = null;

		o = [
			{type:"show_context", text:"Go to the gym with Cat."},
			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Cat");
			}, label: "catRelationshipScore"},
			{type: "compare", leftop: "$catRelationshipScore", operator: "greater", rightop: 0, goTrue: "#happy", goFalse: "#neutural"},

			{type: "nothing", label: "happy"},
			{type: "show", img: cat, expression: "happy", position: "center"},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Heyfriend-Cat");
			// }},
			{type: "play", audio: "Heyfriend-Cat"},
			{type: "dialog", speaker: "Cat", text: "Hey "+ player +"!  I’m here trying to train for a 10K."},
			{type: "jump", condition: true, goTrue: "#choices1", goFalse: 1000},

			{type: "nothing", label: "neutural"},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Ohhi-Cat");
			// }},
			{type: "play", audio: "Ohhi-Cat"},
			{type: "show", img: cat, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Oh hey.  I just finished up my workout.  Training for a 10K."},
			{type: "jump", condition: true, goTrue: "#choices1", goFalse: 1000},

			{type: "choices", choices : [{text: "That's cool... Yeah, I'll hit some of the cardio machines too.", go: "#catnext"}, {text : "Wow!  10K… seems intense", go : "#catnext"}], label: "choices1"},
			{type: "show", img: cat, expression: "thoughtful", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Yeah, the training is hard to keep up on. Thanks for finding my wallet you helped me avoid a major headache.", label: "catnext"},
			{type: "choices", choices : [{text: "No problem!  How are you otherwise?", relationship: {name: this._cat, score: 1}, go: "#howru"}, {text : "No problem!  I won’t keep you, good luck with your training.", go : "#cu"}]},

			{type: "nothing", label: "howru"},
			{type: "show", img: cat, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "I’m in some tough classes, but that’s why we’re here, right? Oh well, see you in class..."},
			{type: "dialog", speaker: "Cat", text: "Oh wait that reminds me.  If you see Ryan, can you tell him thanks for me?"},
			{type: "dialog", speaker: "Cat", text: "I mentioned to him that I've been interested in the business side of startups,"},
			{type: "dialog", speaker: "Cat", text: "And he put me in touch with his friends in the Business and Technology club."},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},

			{type: "nothing", label: "cu"},
			{type: "dialog", speaker: "Cat", text: "See you later."},
			{type: "dialog", speaker: "Cat", text: "Oh wait, that reminds me.  If you see Ryan, can you tell him thanks for me?"},
			{type: "dialog", speaker: "Cat", text: "He put me in touch with some of his friends from the Business and Technology club."},
			{type: "dialog", speaker: "Cat", text: "It was such a big help."},

			{type: "goto", page: "scene 4", label: "gonextscene"},
		];

		return o;
	};

	/**
	 * @override
	 */
	Page2_1.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page2_1.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		this._owner._ambient = this._owner.getSoundManager().play("Gym-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page2_1 = Page2_1;
}());
