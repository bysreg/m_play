// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class PageTest
	 * @augments MPlay.MPlayPage
	 */
	var PageTest = function() {
		MPLAY.MPlayPage.call(this);
	};

	PageTest.prototype = Object.create(MPLAY.MPlayPage.prototype);
	PageTest.prototype.constructor = PageTest;

	/**
	 * @override
	 */
	PageTest.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupUcBackground();

		this._yourphoneImg = this.createImage("/static/gnovel/res/textures/ui/phone.png", new THREE.Vector3(0, 60, 140), 250, 458);
		this._yourphone = "yourphone";
		this._setObjectTag(this._yourphone, this._yourphoneImg);
	};

	PageTest.prototype._createFlowElements = function() {
		var professor = "%" + this._professor;
		var ryan = "%" + this._ryan;
		var cat = "%" + this._cat;
		var player = this._player;
		var priya = "%" + this._priya;

		var o = null;

		o = [

			// ryan - center
			// {type: "show",  position:"center", img: ryan, waitUntilShown: false},
			// {type: "show",  position:"center", img: ryan, expression: "happy", waitUntilShown: false},
			// {type: "show",  position:"center", img: ryan, expression: "sad", waitUntilShown: false},
			// {type: "show",  position:"center", img: ryan, expression: "thoughtful", waitUntilShown: false},
			// {type: "show",  position:"center", img: ryan, expression: "angry", waitUntilShown: false},

			// ryan - left
			// {type: "show",  position:"left", img: ryan, waitUntilShown: false},
			// {type: "show",  position:"left", img: ryan, expression: "happy", waitUntilShown: false},
			// {type: "show",  position:"left", img: ryan, expression: "sad", waitUntilShown: false},
			// {type: "show",  position:"left", img: ryan, expression: "thoughtful", waitUntilShown: false},
			// {type: "show",  position:"left", img: ryan, expression: "angry", waitUntilShown: false},

			// ryan - right
			// {type: "show",  position:"right", img: ryan, waitUntilShown: false},
			// {type: "show",  position:"right", img: ryan, expression: "happy", waitUntilShown: false},
			// {type: "show",  position:"right", img: ryan, expression: "sad", waitUntilShown: false},
			// {type: "show",  position:"right", img: ryan, expression: "thoughtful", waitUntilShown: false},
			// {type: "show",  position:"right", img: ryan, expression: "angry", waitUntilShown: false},

			// cat - right
			// {type: "show",  position:"right", img: cat, waitUntilShown: false, flip: true},
			// {type: "show",  position:"right", img: cat, expression: "sad", waitUntilShown: false, flip: true},
			// {type: "show",  position:"right", img: cat, expression: "angry", waitUntilShown: false},
			// {type: "show",  position:"right", img: cat, expression: "happy", waitUntilShown: false, flip: true},
			//{type: "show",  position:"right", img: cat, expression: "thoughtful", waitUntilShown: false, flip: true},

			// cat - left
			// {type: "show",  position:"left", img: cat, waitUntilShown: false, flip: true},
			// {type: "show",  position:"left", img: cat, expression: "sad", waitUntilShown: false, flip: true},
			// {type: "show",  position:"left", img: cat, expression: "angry", waitUntilShown: false},
			// {type: "show",  position:"left", img: cat, expression: "happy", waitUntilShown: false, flip: true},
			// {type: "show",  position:"left", img: cat, expression: "thoughtful", waitUntilShown: false, flip: true},
			
			// cat - center
			// {type: "show",  position:"center", img: cat, waitUntilShown: false, flip: true},
			// {type: "show",  position:"center", img: cat, expression: "sad", waitUntilShown: false, flip: true},
			// {type: "show",  position:"center", img: cat, expression: "angry", waitUntilShown: false},
			// {type: "show",  position:"center", img: cat, expression: "happy", waitUntilShown: false, flip: true},
			//{type: "show",  position:"center", img: cat, expression: "thoughtful", waitUntilShown: false, flip: true},

			// priya - left
			// {type: "show",  position:"left", img: priya, waitUntilShown: false},
			// {type: "show",  position:"left", img: priya, expression: "sad", waitUntilShown: false},
			// {type: "show",  position:"left", img: priya, expression: "angry", waitUntilShown: false},
			// {type: "show",  position:"left", img: priya, expression: "happy", waitUntilShown: false},
			//{type: "show",  position:"left", img: priya, expression: "thoughtful", waitUntilShown: false},

			// priya - center
			// {type: "show",  position:"center", img: priya, waitUntilShown: false},
			// {type: "show",  position:"center", img: priya, expression: "sad", waitUntilShown: false},
			// {type: "show",  position:"center", img: priya, expression: "angry", waitUntilShown: false},
			// {type: "show",  position:"center", img: priya, expression: "happy", waitUntilShown: false},
			// {type: "show",  position:"center", img: priya, expression: "thoughtful", waitUntilShown: false},

			// priya - right
			// {type: "show",  position:"right", img: priya, waitUntilShown: false},
			// {type: "show",  position:"right", img: priya, expression: "sad", waitUntilShown: false},
			// {type: "show",  position:"right", img: priya, expression: "angry", waitUntilShown: false},
			// {type: "show",  position:"right", img: priya, expression: "happy", waitUntilShown: false},
			//{type: "show",  position:"right", img: priya, expression: "thoughtful", waitUntilShown: false},

			// sweeney - center
			// {type: "show",  position:"center", img: professor, waitUntilShown: false},
			// {type: "show",  position:"center", img: professor, expression: "happy", waitUntilShown: false},
			{type: "show",  position:"center", img: professor, expression: "sad", waitUntilShown: false},

			// sweeney - right
			// {type: "show",  position:"right", img: professor, waitUntilShown: false},
			{type: "show",  position:"right", img: professor, expression: "happy", waitUntilShown: false},
			// {type: "show",  position:"right", img: professor, expression: "sad", waitUntilShown: false},

			{type: "dialog", speaker: this._ryan, text: "Congratulations! Referring you was a good call.  We’ll be working together after graduation."},

			{type: "hide", img: ryan},

			{type: "dialog", speaker: this._ryan, text: "Congratulations! Referring you was a good call.  We’ll be working together after graduation."},

			{type: "show", img: ryan, position:"center"},			
			// {type: "choices",
			// 	choices :
			// 		[{text: "Yeah!  Thanks again for forwarding my resume.",
			// 			go: "#cheers"},
			// 		{text : "Psyched to be working with you, Ryan!",
			// 			relationship: [{name: this._ryan, score: 1}],
			// 			go: "#cheers"}]},
		];

		return o;
	};

	MPLAY.PageTest = PageTest;
}());
