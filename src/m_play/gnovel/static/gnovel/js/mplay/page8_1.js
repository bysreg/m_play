// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page8_1
	 * @augments MPlay.MPlayPage
	 */
	var Page8_1 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page8_1.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page8_1.prototype.constructor = Page8_1;

	/**
	 * @override
	 */
	Page8_1.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupUcBackground();
	};

	Page8_1.prototype._createFlowElements = function() {

		var cat = "%" + this._cat;
		var ryan = "%" + this._ryan;
		var professor = "%" + this._professor;
		var player = this._player;

		var o = null;

		o = [
			{type: "show_context", text: "A few days after the test... "},
			{type: "show_context", text: "you run into Ryan at the UC"},
			{type: "show_context", text: "on your way to meet up with Cat to work out together."},

			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#pos-ryan1", goFalse: "#compareryan1"},

			{type: "nothing", label: "pos-ryan1"},
			{type: "show", img: ryan},
			{type: "custom", func: function(page) {
				page.getOwner().getSoundManager().play("Heyfriend-Ryan");
			}},
			{type: "dialog", speaker: this._ryan, text: "Hi "+ player +".  I'm on my way to meet with Sweeney.  Apparently they do cycle some of the questions.  I think it will end up ok though.  I just have to face the music.  Thanks for trying to convince me not to use it though."},
			{type: "jump", condition: true, goTrue: "#hideryan", goFalse: "#hideryan"},
			
			{type: "nothing", label: "compareryan1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "equal", rightop: 0, goTrue: "#zero-ryan1", goFalse: "#neg-ryan1"},			

			{type: "nothing", label: "zero-ryan1"},
			{type: "show", img: ryan, expression: "sad"},
			{type: "custom", func: function(page) {
				page.getOwner().getSoundManager().play("Hey-Ryan-p");
			}},
			{type: "dialog", speaker: this._ryan, text: "Hey.  I'm on my way to meet Sweeney.  Apparently they do cycle some of the questions... whatever.  I think it will end up ok.  I just have to get chewed out."},
			{type: "jump", condition: true, goTrue: "#hideryan", goFalse: "#hideryan"},

			{type: "nothing", label: "neg-ryan1"},
			{type: "show", img: ryan, expression: "angry"},
			{type: "dialog", speaker: this._ryan, text: "So apparently they do cycle some of the questions... I’m on my way to talk to Sweeney.  See you around."},
			{type: "jump", condition: true, goTrue: "#hideryan", goFalse: "#hideryan"},

			{type: "nothing", label: "hideryan"},
			{type: "hide", img: ryan},

			{type: "show_context", text: "Ryan leaves, and you see Cat."},

			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Cat");
			}, label: "catRelationshipScore1"},
			{type: "compare", leftop: "$catRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#pos-cat1", goFalse: "#comparecat1"},

			{type: "nothing", label: "pos-cat1"},
			{type: "show", img: cat, expression: "thoughtful"},
			{type: "custom", func: function(page) {
				page.getOwner().getSoundManager().play("Heyfriend-Cat");
			}},
			{type: "dialog", speaker: this._cat, text: "Was that Ryan?  Jeez, heard about what happened.  You're lucky Ryan didn't tell them he showed you the test.  That's enough to get you in trouble too.  Well I hope it works out ok for him, that's going to be an awkward conversation with his job if he fails the class."},
			{type: "goto", page: "scene ending"},

			{type: "nothing", label: "comparecat1"},
			{type: "compare", leftop: "$catRelationshipScore1", operator: "equal", rightop: 0, goTrue: "#zero-cat1", goFalse: "#neg-cat1"},			

			{type: "nothing", label: "zero-cat1"},
			{type: "show", img: cat, expression: "thoughtful"},
			{type: "custom", func: function(page) {
				page.getOwner().getSoundManager().play("Hey-Cat");
			}},
			{type: "dialog", speaker: this._cat, text: "You're lucky Ryan didn't tell them he showed you the test.  That's enough to get you in trouble too.  It’s going to be an awkward conversation with his job if he fails the class.  I hope it works out."},
			{type: "goto", page: "scene ending"},

			{type: "nothing", label: "neg-cat1"},
			{type: "show", img: cat, expression: "thoughtful"},
			{type: "custom", func: function(page) {
				page.getOwner().getSoundManager().play("Hey-Cat");
			}},
			{type: "dialog", speaker: this._cat, text: "You're lucky Ryan didn't tell them he showed you the test.  That's enough to get you in trouble too.  He was an idiot."},
			{type: "goto", page: "scene ending"},
		];

		return o;
	};

	Page8_1.prototype._onUnload = function() {
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page8_1.prototype._onStart = function() {
		this._owner._ambient = this._owner.getSoundManager().play("UC-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, offset: 1000, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page8_1 = Page8_1;
}());
