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
			{type: "show_context", text: "A few days after the test, you run into Ryan at the CUC, while you're on your way to meet up with Cat to grab lunch."},

			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#pos-ryan1", goFalse: "#compareryan1"},

			{type: "nothing", label: "pos-ryan1"},
			{type: "show", img: ryan, position: "left"},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Heyfriend-Ryan");
			// }},
			// {type: "play", audio: "Heyfriend-Ryan"},
			{type: "dialog", speaker: this._ryan, text: "Hi "+ player +".  I'm on my way to meet with Sweeney.  Apparently they do cycle some of the questions."},
			{type: "dialog", speaker: this._ryan, text: "I think it will end up ok though.  I just have to face the music.  Thanks for trying to convince me not to use it though."},
			{type: "dialog", speaker: this._ryan, text: "I feel like an idiot.  It was not worth using it."},
			{type: "jump", condition: true, goTrue: "#hideryan", goFalse: "#hideryan"},
			
			{type: "nothing", label: "compareryan1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "equal", rightop: 0, goTrue: "#zero-ryan1", goFalse: "#neg-ryan1"},			

			{type: "nothing", label: "zero-ryan1"},
			{type: "show", img: ryan, expression: "sad", position: "left"},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Hey-Ryan-p");
			// }},
			// {type: "play", audio: "Hey-Ryan-p"},
			{type: "dialog", speaker: this._ryan, text: "Hey.  I'm on my way to meet Sweeney.  Apparently they do cycle some of the questions..."},
			{type: "dialog", speaker: this._ryan, text: "whatever.  I think it will end up ok.  I just have to get chewed out."},	
			{type: "dialog", speaker: this._ryan, text: "I feel stupid for using it.  It was not worth it."},
			{type: "jump", condition: true, goTrue: "#hideryan", goFalse: "#hideryan"},

			{type: "nothing", label: "neg-ryan1"},
			{type: "show", img: ryan, expression: "angry", position: "left"},
			{type: "dialog", speaker: this._ryan, text: "So apparently they do cycle some of the questions..."},
			{type: "dialog", speaker: this._ryan, text: "I’m on my way to talk to Sweeney.  See you around."},
			{type: "jump", condition: true, goTrue: "#hideryan", goFalse: "#hideryan"},

			{type: "nothing", label: "hideryan"},
			{type: "hide", img: ryan},

			{type: "show_context", text: "Ryan leaves, and you see Cat."},

			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Cat");
			}, label: "catRelationshipScore1"},
			{type: "compare", leftop: "$catRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#pos-cat1", goFalse: "#comparecat1"},

			{type: "nothing", label: "pos-cat1"},
			{type: "show", img: cat, expression: "thoughtful", position: "center"},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Heyfriend-Cat");
			// }},
			// {type: "play", audio: "Heyfriend-Cat"},
			{type: "dialog", speaker: this._cat, text: "Was that Ryan?  Jeez, heard about what happened."},
			{type: "dialog", speaker: this._cat, text: "Well I hope it works out ok for him, that's going to be an awkward conversation with his job if he fails the class."},
			{type: "dialog", speaker: this._cat, text: "I’m surprised he used it, I thought he was smarter than that.  It was smart of you not to look at it."},
			{type: "dialog", speaker: this._cat, text: "Even seeing something like that can get you in trouble."},
			{type: "show", img: cat, position: "center"},						
			{type: "dialog", speaker: this._cat, text: "There’s this quote I like,"},
			{type: "dialog", speaker: this._cat, text: "‘As I get older, I don’t pay attention to what people say.  Only what they do.’"},
			{type: "dialog", speaker: this._cat, text: "Anyway, I think it went something like that. OK, now on to important matters... where to for lunch?"},
			{type: "goto", page: "scene 10.a"},

			{type: "nothing", label: "comparecat1"},
			{type: "compare", leftop: "$catRelationshipScore1", operator: "equal", rightop: 0, goTrue: "#zero-cat1", goFalse: "#neg-cat1"},			

			{type: "nothing", label: "zero-cat1"},
			{type: "show", img: cat, expression: "thoughtful", position: "center"},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Hey-Cat");
			// }},
			// {type: "play", audio: "Hey-Cat"},
			{type: "dialog", speaker: this._cat, text: "Oh boy, was that Ryan?  I heard what happened.  It’s going to be an awkward conversation with his job"},
			{type: "dialog", speaker: this._cat, text: "if he fails the class.  I hope it works out.  I’m surprised he used it, I thought he was smarter than that."},
			{type: "dialog", speaker: this._cat, text: "You’re lucky you didn’t look at it– you would have been in trouble too."},
			{type: "show", img: cat, position: "center"},						
			{type: "dialog", speaker: this._cat, text: "There’s this quote I like,"},
			{type: "dialog", speaker: this._cat, text: "'As I get older, I don’t pay attention to what people say.  Only what they do.'"},
			{type: "dialog", speaker: this._cat, text: "Anyway, I think it went something like that. OK, now on to important matters... where to for lunch?"},
			{type: "goto", page: "scene 10.a"},

			{type: "nothing", label: "neg-cat1"},
			{type: "show", img: cat, position: "center"},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Hey-Cat");
			// }},
			// {type: "play", audio: "Hey-Cat"},
			{type: "dialog", speaker: this._cat, text: "Was that Ryan?  I heard what happened.  If you had looked at the exam,"},
			{type: "dialog", speaker: this._cat, text: "you’d have been in trouble too.  Lucky break."},
			{type: "show", img: cat, expression: "angry", position: "center"},						
			{type: "dialog", speaker: this._cat, text: "There’s this quote I like,"},
			{type: "dialog", speaker: this._cat, text: "'As I get older, I don’t pay attention to what people say.  Only what they do.'"},
			{type: "dialog", speaker: this._cat, text: "Anyway, I think it went something like that."},
			{type: "goto", page: "scene 10.a"},
		];

		return o;
	};

	Page8_1.prototype._createRandomPlaylist = function() {
		var playlist = null;
		playlist = [
					{audio:"Uc-girllaughing", playrate: 0.02, noreplay: true},
					{audio:"Uc-mantalking", playrate: 0.02, noreplay: true},
					{audio:"Uc-womantalking", playrate: 0.03, noreplay: true},
					{audio:"Uc-steps", playrate: 0.1}
					];
		return playlist;
	};	

	Page8_1.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);
		
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page8_1.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);
		
		this._owner._ambient = this._owner.getSoundManager().play("UC-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});
		this._tweenVolumeIn();
	};

	/**
	 * @override
	 */
	Page8_1.prototype._update = function() {
		MPLAY.MPlayPage.prototype._update.call(this);

		this._multiTracksPlayer.shuffle();
	};		

	MPLAY.Page8_1 = Page8_1;
}());
