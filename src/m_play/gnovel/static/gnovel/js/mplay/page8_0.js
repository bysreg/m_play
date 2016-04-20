// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page8_0
	 * @augments MPlay.MPlayPage
	 */
	var Page8_0 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page8_0.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page8_0.prototype.constructor = Page8_0;

	/**
	 * @override
	 */
	Page8_0.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupUcBackground();
		var geometry = new THREE.PlaneBufferGeometry(1920, 1080);
		var material = new THREE.MeshBasicMaterial( {color: 0x000000, transparent:true } );
		this._transitionBgImg = new THREE.Mesh(geometry,material);
		this._transitionBgImg.position.z = 150;

		this._transitionBg = "transitionbg";
		this._setObjectTag(this._transitionBg,this._transitionBgImg);
	};

	Page8_0.prototype._createFlowElements = function() {

		var cat = "%" + this._cat;
		var ryan = "%" + this._ryan;
		var professor = "%" + this._professor;
		var player = this._player;
		var transitionBg = "%" + this._transitionBg;

		var o = null;

		o = [
			{type: "show_context", text: "A few days after the test, you run into Ryan at the CUC, while you are on your way to meet up with Cat to grab lunch"},

			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Ryan");
			}, label: "ryanRelationshipScore1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "greater", rightop: 0, goTrue: "#pos-ryan1", goFalse: "#compareryan1"},

			{type: "nothing", label: "pos-ryan1"},
			{type: "show", img: ryan, expression: "very happy", position: "left"},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Yo-Ryan");
			// }},
			{type: "play", audio: "Yo-Ryan"},
			{type: "dialog", speaker: this._ryan, text: player + "! Glad I caught you.   I ended up doing OK on that test."},
			{type: "dialog", speaker: this._ryan, text: "Probably not my best work, but what can you do.  I’m glad we held off on using it."},
			{type: "dialog", speaker: this._ryan, text: "Better safe than sorry.  At least Priya won't be mad anymore."},
			{type: "show", img: ryan, expression: "thoughtful", position: "left"},
			{type: "dialog", speaker: this._ryan, text: "I'm on my way to meet her for lunch.  I have to go apologize to her - maybe grovel a little.  I’ll see you tonight – we should celebrate!"},
			{type: "jump", condition: true, goTrue: "#hideryan", goFalse: "#hideryan"},
			
			{type: "nothing", label: "compareryan1"},
			{type: "compare", leftop: "$ryanRelationshipScore1", operator: "equal", rightop: 0, goTrue: "#zero-ryan1", goFalse: "#neg-ryan1"},			

			{type: "nothing", label: "zero-ryan1"},
			{type: "show", img: ryan, position: "left"},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Hey-Ryan-e");
			// }},
			{type: "play", audio: "Hey-Ryan-e"},
			{type: "dialog", speaker: this._ryan, text: "Hey!  You know, I ended up doing OK on that test.  Probably not my best work though."},
			{type: "dialog", speaker: this._ryan, text: "I guess it's better to be safe than sorry.  At least Priya won't be mad anymore."},
			{type: "show", img: ryan, expression: "sad", position: "left"},
			{type: "dialog", speaker: this._ryan, text: "I'm on my way to meet her for lunch.  I have to patch things up with her.  See you."},
			{type: "jump", condition: true, goTrue: "#hideryan", goFalse: "#hideryan"},

			{type: "nothing", label: "neg-ryan1"},
			{type: "show", img: ryan, expression: "happy", position: "left"},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Hey-Ryan-p");
			// }},
			{type: "play", audio: "Hey-Ryan-p"},
			{type: "dialog", speaker: this._ryan, text: "I wanted to let you know that I ended up doing OK on that test."},
			{type: "dialog", speaker: this._ryan, text: "Probably not my best work, but what can you do.  I’ll see you around."},
			{type: "jump", condition: true, goTrue: "#hideryan", goFalse: "#hideryan"},

			{type: "nothing", label: "hideryan"},
			{type: "hide", img: ryan, waitUntilHidden: false},

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
			{type: "play", audio: "Heyfriend-Cat"},
			{type: "dialog", speaker: this._cat, text: player + "!  Was that Ryan?  I heard about his fight with Priya.  This class has been insane!"},
			{type: "dialog", speaker: this._cat, text: "At least he listened to you about not using that test.  Good thing you were thinking straight."},
			{type: "show", img: cat, expression: "happy", position: "center"},			
			{type: "dialog", speaker: this._cat, text: "There’s this quote I like,"},
			{type: "dialog", speaker: this._cat, text: "'I don’t pay attention to what people say.  Only what they do.'"},
			{type: "dialog", speaker: this._cat, text: "Anyway, I think it went something like that. OK, now on to important matters... where to for lunch!"},
			{type: "goto", page: "scene 10.a"},

			{type: "nothing", label: "comparecat1"},
			{type: "compare", leftop: "$catRelationshipScore1", operator: "equal", rightop: 0, goTrue: "#zero-cat1", goFalse: "#neg-cat1"},			

			{type: "nothing", label: "zero-cat1"},
			{type: "show", img: cat, position: "center"},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Hey-Cat");
			// }},
			{type: "play", audio: "Hey-Cat"},
			{type: "dialog", speaker: this._cat, text: "Was that Ryan?  I heard about what happened with that test."},
			{type: "dialog", speaker: this._cat, text: "Good thing you were thinking straight, and made a good call on that test."},
			{type: "show", img: cat, expression: "happy", position: "center"},			
			{type: "dialog", speaker: this._cat, text: "There’s this quote I like,"},
			{type: "dialog", speaker: this._cat, text: "'As I get older, I don’t pay attention to what people say. Only what they do.'"},
			{type: "dialog", speaker: this._cat, text: "Anyway, I think it went something like that. OK, now on to important matters... where to for lunch?"},
			{type: "goto", page: "scene 10.a"},

			{type: "nothing", label: "neg-cat1"},
			{type: "show", img: cat, expression: "thoughtful", position: "center"},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Hey-Cat");
			// }},
			{type: "play", audio: "Hey-Cat"},
			{type: "dialog", speaker: this._cat, text: "Was that Ryan?  I heard about what happened with that test."},
			{type: "dialog", speaker: this._cat, text: "He’s lucky you were thinking straight."},
			{type: "show", img: cat, expression: "happy", position: "center"},						
			{type: "dialog", speaker: this._cat, text: "There’s this quote I like,"},
			{type: "dialog", speaker: this._cat, text: "'As I get older, I don’t pay attention to what people say. Only what they do.'"},
			{type: "dialog", speaker: this._cat, text: "Anyway, I think it went something like that. OK, now on to important matters... where to for lunch?"},
			{type: "goto", page: "scene 10.a"},
		];

		return o;
	};

	Page8_0.prototype._createRandomPlaylist = function() {
		var playlist = null;
		playlist = [
					{audio:"Uc-girllaughing", playrate: 0.02},
					{audio:"Uc-mantalking", playrate: 0.05},
					{audio:"Uc-womantalking", playrate: 0.03},
					{audio:"Uc-steps", playrate: 0.1}
					];
		return playlist;
	};	

	Page8_0.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);
		
		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page8_0.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);
		
		this._owner._ambient = this._owner.getSoundManager().play("UC-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});
		this._tweenVolumeIn();
	};

	/**
	 * @override
	 */
	Page8_0.prototype._update = function() {
		MPLAY.MPlayPage.prototype._update.call(this);

		this._multiTracksPlayer.shuffle();
	};		

	MPLAY.Page8_0 = Page8_0;
}());
