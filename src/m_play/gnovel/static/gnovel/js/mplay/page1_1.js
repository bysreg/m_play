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

		this.setupUcBackground();
	};

	Page1_1.prototype._createFlowElements = function() {
		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var cat = "%" + this._cat;

		var o = null;

		var catsPhoneStatus = this._owner.getSavedData("catsPhoneStatus");

		// variables from scene 1
		var isPhonePickedUp = (catsPhoneStatus > 0);
		var isPhoneWithYou = (catsPhoneStatus == 2);
		var player = this._player;

			o = [
				// transition of this flow doesn't work
				{type: "show", img: ryan, expression: "happy", position: "center", waitUntilShown: false},
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
				
				// if you picked up the phone
				{type: "show", img: ryan, label: "phone_picked", waitUntilShown: false},
				{type: "compare", leftop: isPhoneWithYou, operator: "equal", rightop: 1, goTrue: "#phone_withyou", goFalse: "#phone_notwithyou"},
				// and you left it with the bartender
				{type: "dialog", speaker: "Ryan", text: "Were you at Scottie's Bar yesterday?  We found a phone there.", label: "phone_notwithyou"},
				{type: "hide", img: ryan, waitUntilHidden: false},
				{type: "show", img: cat, waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Cat", text: "Oh my God, do you guys have it with you?"},
				{type: "hide", img: cat, waitUntilHidden: false, flip: true},
				{type: "show", img: ryan, waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "We left it with the bartender."},
				{type: "hide", img: ryan},
				{type: "dialog", speaker: "Priya", text: "What are the chances!"},
				{type: "jump", condition: true, goTrue: "#aside1", goFalse: "#aside1"},
				{type: "show", img: priya, expression: "happy", waitUntilShown: false},
				{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},

				// if you have the phone with you
				{type: "dialog", speaker: "Ryan", text: "We found a phone yesterday – " + player + ", do you have it with you?", label: "phone_withyou"},
				{type: "hide", img: ryan, waitUntilHidden: false},
				{type: "show", img: cat, expression: "happy",waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Cat", text: "Oh my God, you guys have it with you?!  You both are lifesavers!"},
				{type: "choices", choices : [{text: "No Problem.", go: "#hidecat", relationship: {name:"cat", score:0}}, {text : "Happy to help.", go : "#hidecat", integrityScore: 0, relationship: {name:"cat", score:0}}], label: "choices"},
				{type: "hide", img: cat, label: "hidecat", waitUntilHidden: false, flip: true},
				{type: "show", img: ryan, waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: player + " here is the lifesaver, I'm just the messenger"},
				{type: "jump", condition: true, goTrue: "#aside1", goFalse: "#aside1"},

				// if you left the phone at the bar
				{type: "show", img: ryan, label: "phone_notpicked"},
				{type: "dialog", speaker: "Ryan", text: "I think there was a phone at Scottie's yesterday? We found a phone there."},
				{type: "hide", img: ryan, waitUntilHidden: false},
				{type: "show", img: cat, flip: true},
				{type: "dialog", speaker: "Cat", text: "Hopefully it’s still there.  I’ll call them."},
				{type: "hide", img: cat, waitUntilHidden: false},

				{type: "choices", choices : [{text: "Grab a coffee at the café – you run into Priya.", go: "#gocafe", relationship: {name:"priya", score:1}}, {text : "Go to the gym – you run into Cat.", go : "#gogym", relationship: {name:"cat", score:1}}, {text: "Head home and study.", go: "#gohome"}], label: "aside1"},
				{type: "goto", page: "scene 3.a", label: "gocafe"},
				{type: "goto", page: "scene 3.b", label: "gogym"},
				{type: "goto", page: "scene 4", label: "gohome"},
			];
		
		return o;
	}

	MPLAY.Page1_1 = Page1_1;
}());
