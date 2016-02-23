// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page1_1
	 * @augments MPLAY.MPlayPage
	 */
	var Page1_1 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page1_1.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page1_1.prototype.constructor = Page1_1;

	/**
	 * @override
	 */
	Page1_1.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);		

		this.setBackground("/static/gnovel/res/textures/backgrounds/uc final layers png.png");

		this._talked = 0;

		var pageObj = this;
		// var io1 = this.createInteractableObject(
		// 	"/static/gnovel/res/textures/Perspective-Button-Stop-icon.png", 
		// 	{x: -100, y: 200, width : 64, height : 64, onClick: function() {
		// 		pageObj._talked = 1;
		// 		pageObj._runFlow();
		// 	}});		

		// var io2 = this.createInteractableObject(
		// 	"/static/gnovel/res/textures/Perspective-Button-Stop-icon.png", 
		// 	{x: 100, y: 200, width : 64, height : 64, onClick: function() {
		// 		pageObj._talked = 2;
		// 		pageObj._runFlow();
		// 	}});
	};

	Page1_1.prototype._createFlowElements = function() {
		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var cat = "%" + this._cat;
		
		var o = null;
		// variables from scene 1
		var isPhonePickedUp = 1;
		var isPhoneWithYou = 0;
		// player name which the player entered at the beginning of the game
		var player = "Lindsey";
		// this._talked = 1;

		if(this._talked == 0) {
			o = [
				// transition of this flow doesn't work
				{type: "show", img: ryan, position: "center", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "Awesome!  Both you and Priya are in my group.  This is Priya.  She’s here from India,and an excellent study buddy."},
				// transition of this flow doesn't work
				{type: "hide", img: ryan, waitUntilHidden: false},
				// transition of this flow doesn't work
				{type: "show", img: priya, position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "Priya", text: "Ryan here helped me so much last semester.  Always goes out of his way.  Nice to meet you."},
				// transition of this flow doesn't work
				{type: "hide", img: priya, waitUntilHidden: false},
				// transition of this flow doesn't work
				{type: "show", img: cat, position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Cat", text: "Hey, my name is Cat.  Uhh… I’m in the business school.  Nice to meet you guys… sorry I’m a little all over the place.  I lost my phone yesterday –"},
				{type: "hide", img: cat, waitUntilHidden: false, flip: true},
				{type: "compare", leftop: isPhonePickedUp, operator: "equal", rightop: 1, goTrue: "#phone_picked", goFalse: "#phone_notpicked"},
				{type: "show", img: ryan, label: "phone_picked", waitUntilShown: false},
				{type: "compare", leftop: isPhoneWithYou, operator: "equal", rightop: 1, goTrue: "#phone_withyou", goFalse: "#phone_notwithyou"},
				{type: "dialog", speaker: "Ryan", text: "Were you at Scottie's Bar yesterday?  We found a phone there.", label: "phone_notwithyou"},
				{type: "hide", img: ryan, waitUntilHidden: false},
				{type: "show", img: cat, waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Cat", text: "Oh my God, do you guys have it with you?"},
				{type: "hide", img: cat, waitUntilHidden: false, flip: true},
				{type: "show", img: ryan, waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "We left it with the bartender."},
				{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},
				{type: "dialog", speaker: "Ryan", text: "We found a phone yesterday – " + player + ", do you have it with you?", label: "phone_withyou"},
				{type: "hide", img: ryan, waitUntilHidden: false},
				{type: "show", img: cat, waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Cat", text: "Oh my God, you guys have it with you?!  You both are lifesavers!"},
				{type: "choices", choices : [{text: "No Problem.", go: "#hidecat", relationship: {name:"cat", score:0}}, {text : "Happy to help.", go : "#hidecat", integrityScore: 0, relationship: {name:"cat", score:0}}], label: "choices"},
				{type: "hide", img: cat, label: "hidecat", waitUntilHidden: false, flip: true},
				{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},
				{type: "show", img: ryan, label: "phone_notpicked", flip: true},
				{type: "dialog", speaker: "Ryan", text: "Were you at Scottie's Bar yesterday?  We found a phone there"},
				{type: "dialog", speaker: "Cat", text: "Hopefully it’s still there.  I’ll call them."},
				{type: "hide", img: cat, waitUntilHidden: false, flip: true},
			];
		}
		else if(this._talked == 1) {
			o = [
				{type: "show", img: ryan, waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "What did I tell you, that karma!"},
			];
		}
		else if(this._talked == 2) {
			o = [
				{type: "show", img: priya, waitUntilShown: false},
				{type: "dialog", speaker: "Priya", text: "What are the chances!"},
			];
		}
		return o;
	}

	MPLAY.Page1_1 = Page1_1;
}());
