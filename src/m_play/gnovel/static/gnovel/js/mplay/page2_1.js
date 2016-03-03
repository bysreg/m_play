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

		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");

	};

	Page2_1.prototype._createFlowElements = function() {
		var cat = "%" + this._cat;

		var o = null;

		o = [
			{type: "show", img: cat, position: "center"},
			{type: "dialog", speaker: "Cat", text: "Oh, hey. I just finished up my workout. I'm trying to train for a 10K."},
			{type: "choices", choices : [{text: "That's cool... Yeah, I'll hit some of the cardio machines too.", go: "#catnext"}, {text : "Wow!  10K… seems intense", go : "#catnext"}]},
			{type: "dialog", speaker: "Cat", text: "Yeah, the training is hard to keep up on. But, I think it's important to keep working hard for a goal, you know? By the way, thanks again for the phone thing.", label: "catnext"},
			{type: "choices", choices : [{text: "No problem!  How are you otherwise?", relationship: {name: "cat", score: 1}, go: "#howru"}, {text : "No problem!  I don’t want to keep you.  See you later.", go : "#cu"}]},
			{type: "dialog", speaker: "Cat", expression: "happy", text: "The transition's been tough. Everyone here is so young!  Like, Priya's straight from undergrad.  Oh well.  Gotta run.  See you later.", label: "howru"},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},
			{type: "dialog", speaker: "Cat", text: "See you later.", label: "cu"},
			{type: "goto", page: "scene 4", label: "gonextscene"},
		];

		return o;
	}

	MPLAY.Page2_1 = Page2_1;
}());
