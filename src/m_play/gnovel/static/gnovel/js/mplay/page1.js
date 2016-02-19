// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page1
	 * @augments MPLAY.MPlayPage
	 */
	var Page1 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page1.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page1.prototype.constructor = Page1;

	/**
	 * @override
	 */
	Page1.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);		

		this.setBackground("/static/gnovel/res/textures/backgrounds/uc final layers png.png");

		//create images
		this._professorImg = this.createImage("/static/gnovel/res/textures/char/sweeney-neutral.png", new THREE.Vector3(75, -160, 180), 500, 858);
		this._priyaImg = this.createImage("/static/gnovel/res/textures/char/thoughtful-julia.png", new THREE.Vector3(-300, -140, 120), 600, 825);
		this._ryanImg = this.createImage("/static/gnovel/res/textures/char/ryan-happy.png", new THREE.Vector3(0, -110, 140), 600, 923);
		this._catImg = this.createImage("/static/gnovel/res/textures/char/cat-neutral.png", new THREE.Vector3(450, -130, 100), 600, 799);

		this._talked = 0;

		var pageObj = this;
		var io1 = this.createInteractableObject(
			"/static/gnovel/res/textures/Perspective-Button-Stop-icon.png", 
			{x: -100, y: 200, width : 64, height : 64, onClick: function() {
				pageObj._talked = 1;
				pageObj._runFlow();
			}});		

		var io2 = this.createInteractableObject(
			"/static/gnovel/res/textures/Perspective-Button-Stop-icon.png", 
			{x: 100, y: 200, width : 64, height : 64, onClick: function() {
				pageObj._talked = 2;
				pageObj._runFlow();
			}});

		this._professorImg.material.opacity = 0;
		this._priyaImg.material.opacity = 0;
		this._ryanImg.material.opacity = 0;
		this._catImg.material.opacity = 0;

		this._professor = "professor";
		this._priya = "priya";
		this._ryan = "ryan";
		this._cat = "cat";

		// add object tags
		this._setObjectTag(this._professor, this._professorImg);
		this._setObjectTag(this._priya, this._priyaImg);
		this._setObjectTag(this._ryan, this._ryanImg);
		this._setObjectTag(this._cat, this._catImg);

	};

	Page1.prototype._createFlowElements = function() {
		var professor = "%professor";
		var priya = "%priya";
		var ryan = "%ryan";
		var cat = "%cat";
		var o = null;
		var isPhonePickedUp = 1;
		var isPhoneWithYou = 0;
		var player = "Lindsey";
		// this._talked = 1;

		if(this._talked == 0) {
			o = [
				// transition of this flow doesn't work
				{type: "show", img: professor, position: "center", waitUntilShown: false},
				{type: "dialog", speaker: "professor", text: "My aim in Programming and Society is to help you become a better programmer. Technology impacts how society operates. I will challenge you to look deeper into the programs, apps, and technologies that you use."},
				{type: "dialog", speaker: "professor", text: "The second half of each lesson will break into your assigned study groups. Please use this time wisely, you’ll have a group project later in the semester."}, 
				{type: "hide", img: professor, waitUntilHidden: false},
				{type: "show", img: ryan, position: "center", waitUntilShown: false},
				{type: "dialog", speaker: "ryan", text: "Awesome! Both you and Priya are in my group. This is Priya. She’s super smart, speaks like a bajillion languages. Too cool for me."},
				// transition of this flow doesn't work
				{type: "hide", img: ryan, waitUntilHidden: false},
				// transition of this flow doesn't work
				{type: "show", img: priya, position: "left", waitUntilShown: false},
				{type: "dialog", speaker: "priya", text: "RYAN here helped me with some of my writing last semester. Always willing to be my study partner. I think I annoyed him most of the time. Anyway, nice to meet you"},
				// transition of this flow doesn't work
				{type: "hide", img: priya, waitUntilHidden: false},
				// transition of this flow doesn't work
				{type: "show", img: cat, position: "right", waitUntilShown: false},
				{type: "dialog", speaker: "cat", text: "Hey I’m Cat. I’m in Tepper. I think I’m going to be in over my head a little here in a CS class It’s been an adjustment coming back to school."},
				{type: "hide", img: cat, waitUntilHidden: false},
				{type: "show", img: ryan, position: "center", waitUntilShown: false},
				{type: "dialog", speaker: "ryan", text: "Oh, don’t sweat it, Cat. We’ll help you out if you get stuck."},
				{type: "hide", img: ryan, waitUntilHidden: false},
				{type: "show", img: cat, waitUntilShown: false},
				{type: "dialog", speaker: "cat", text: "Sorry - I’m a little all over the place. I lost my phone yesterday."},
				{type: "hide", img: cat, waitUntilHidden: false},
				{type: "compare", leftop: isPhonePickedUp, operator: "equal", rightop: 1, goTrue: "#phone_picked", goFalse: "#phone_notpicked"},
				{type: "show", img: ryan, label: "phone_picked", waitUntilShown: false},
				{type: "dialog", speaker: "ryan", text: "Were you at Scottie’s Bar yesterday? " + player +" found a phone there."},
				{type: "hide", img: ryan, waitUntilHidden: false},
				{type: "show", img: cat, waitUntilShown: false},
				{type: "dialog", speaker: "cat", text: "Oh my God, do you guys have it with you?"},
				{type: "hide", img: cat, waitUntilHidden: false},
				{type: "show", img: ryan, waitUntilShown: false},
				{type: "compare", leftop: isPhoneWithYou, operator: "equal", rightop: 1, goTrue: "#phone_withyou", goFalse: "#phone_notwithyou"},
				{type: "dialog", speaker: "ryan", text: "Yeah, " + player + " has it, right?", label: "phone_withyou"},
				{type: "hide", img: ryan, waitUntilHidden: false},
				{type: "show", img: cat, waitUntilShown: false},
				{type: "dialog", speaker: "cat", text: "Oh my God - you charged it too? You’ve totally restored my faith in humanity."},
				{type: "jump", condition: true, goTrue: "#choices", goFalse: 1000},
				{type: "dialog", speaker: "ryan", text: "We left it with the bartender.", label: "phone_notwithyou"},
				{type: "hide", img: ryan, waitUntilHidden: false},
				{type: "show", img: cat, waitUntilShown: false},
				{type: "dialog", speaker: "cat", text: "Thank you! I’ll run over there after this. Lifesaver!"},
				{type: "choices", choices : [{text: "No Problem.", go: "#hidecat", relationship: {name:"cat", score:0}}, {text : "Happy to help.", go : "#hidecat", integrityScore: 0, relationship: {name:"cat", score:0}}], label: "choices"},
				{type: "hide", img: cat, label: "hidecat", waitUntilHidden: false},
				{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},
				{type: "dialog", speaker: "ryan", text: "I think we saw a phone on the bar at Scotties, right? Maybe it’s yours.", label: "phone_notpicked"},
				{type: "dialog", speaker: "cat", text: "Oh, uh thanks. I’ll call them."},
				{type: "hide", img: cat, waitUntilHidden: false},
			];
		}
		else if(this._talked == 1) {
			o = [
				{type: "show", img: ryan, waitUntilShown: false},
				{type: "dialog", speaker: "ryan", text: "What did I tell you, that karma!"},
			];
		}
		else if(this._talked == 2) {
			o = [
				{type: "show", img: priya, waitUntilShown: false},
				{type: "dialog", speaker: "priya", text: "What are the chances!"},
			];
		}
		return o;
	}

	MPLAY.Page1 = Page1;
}());
