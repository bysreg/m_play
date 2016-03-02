// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page4_1
	 * @augments MPLAY.MPlayPage
	 */
	var Page4_1 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page4_1.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page4_1.prototype.constructor = Page4_1;

	/**
	 * @override
	 */
	Page4_1.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");

	};

	Page4_1.prototype._createFlowElements = function() {
		var cat = "%" + this._cat;

		var o = null;

		o = [
			{type: "show", img: cat, expression: "happy", position: "center"},
			{type: "dialog", speaker: "Cat", text: "Oh hey!  I'm just finishing up here, but what's new with you?"},
			{type: "choices", choices : [{text: "Not much. How are you doing?", go: "#hrudoing"}, {text : "Nothing much.", go : "#nothingmuch"}]},

			{type: "nothing", label: "hrudoing"},
			// should be a sad cat here.
			{type: "dialog", speaker: "Cat", text: "I’m trying to wind down a little. The job hunt is stressful, and I’m worried about my GPA."},
			
			{type: "choices", choices : [{text: "You’ll be fine.", go: "#beok"}, {text : "I understand how you’re feeling.", relationship: {name: "cat", score: "1"}, go : "#beok"}]},
			{type: "dialog", speaker: "Cat", text: "Yeah, I think it will be ok.  But then again, I’m saying this after a glass of wine. Ask me again in May.", label: "beok"},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},

			{type: "nothing", label: "nothingmuch"},
			{type: "show", img: cat, expression: "thoughtful"},
			{type: "dialog", speaker: "Cat", text: "Stuff... sounds serious.  Can I help?"},
			{type: "choices", choices : [{text: "Ah no it was just this thing with Ryan… It’s ok.", go: "#itsok"}, {text : "Oh it’s nothing.", go : "#itsok"}]},
			{type: "dialog", speaker: "Cat", text: "I know I’m usually running around like a crazy person, but if you need to talk, I’m happy to listen."},

			{type: "goto", page: "scene 6.a", label: "gonextscene"},
		];

		return o;
	}

	MPLAY.Page4_1 = Page4_1;
}());
