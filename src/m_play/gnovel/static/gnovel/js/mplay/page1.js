// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page1
	 * @augments GNOVEL.Page
	 */
	var Page1 = function() {
		GNOVEL.Page.call(this);
	};

	Page1.prototype = Object.create(GNOVEL.Page.prototype);
	Page1.prototype.constructor = Page1;

	/**
	 * @override
	 */
	Page1.prototype._onLoad = function() {
		GNOVEL.Page.prototype._onLoad.call(this);
		this._state = 0;

		this._parentPosX = 0;

		this.setBackground("/static/gnovel/res/textures/steven_universeXworlds8.jpg");

		//create images
		this._professorImg = this.createImage("/static/gnovel/res/textures/char/prof sweeney- thoughtful.png", new THREE.Vector3(75, -130, 180), 600, 750);
		this._priyaImg = this.createImage("/static/gnovel/res/textures/char/thoughtful-julia.png", new THREE.Vector3(-300, -140, 120), 600, 750);
		this._ryanImg = this.createImage("/static/gnovel/res/textures/char/ryan-happy.png", new THREE.Vector3(0, -80, 140), 600, 750);
		this._catImg = this.createImage("/static/gnovel/res/textures/char/cat-annoyed.png", new THREE.Vector3(450, -130, 100), 600, 750);

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
				{type: "show", img: professor, position: "center"},
				{type: "dialog", speaker: "professor", text: "My aim in Programming and Society is to help you become a better programmer. Technology impacts how society operates. I will challenge you to look deeper into the programs, apps, and technologies that you use."},
				{type: "dialog", speaker: "professor", text: "The second half of each lesson will break into your assigned study groups. Please use this time wisely, you’ll have a group project later in the semester."}, 
				{type: "hide", img: professor},
				{type: "show", img: ryan, position: "center"},
				{type: "dialog", speaker: "ryan", text: "Awesome! Both you and Priya are in my group. This is Priya. She’s super smart, speaks like a bajillion languages. Too cool for me."},
				{type: "hide", img: ryan},
				{type: "show", img: priya, position: "left"},
				{type: "dialog", speaker: "priya", text: "RYAN here helped me with some of my writing last semester. Always willing to be my study partner. I think I annoyed him most of the time. Anyway, nice to meet you"},
				{type: "show", img: cat, position: "right"},
				{type: "dialog", speaker: "cat", text: "Hey I’m Cat. I’m in Tepper. I think I’m going to be in over my head a little here in a CS class It’s been an adjustment coming back to school."},
				{type: "show", img: ryan, position: "center"},
				{type: "dialog", speaker: "ryan", text: "Oh, don’t sweat it, Cat. We’ll help you out if you get stuck."},
				{type: "dialog", speaker: "cat", text: "Sorry - I’m a little all over the place. I lost my phone yesterday."},
				{type: "compare", leftop: isPhonePickedUp, operator: "equal", rightop: 1, goTrue: "#phone_picked", goFalse: "#phone_notpicked"},
				{type: "dialog", speaker: "ryan", text: "Were you at Scottie’s Bar yesterday? " + player +" found a phone there.", label: "phone_picked"},
				{type: "dialog", speaker: "cat", text: "Oh my God, do you guys have it with you?"},
				{type: "compare", leftop: isPhoneWithYou, operator: "equal", rightop: 1, goTrue: "#phone_withyou", goFalse: "#phone_notwithyou"},
				{type: "dialog", speaker: "ryan", text: "Yeah, " + player + " has it, right?", label: "phone_withyou"},
				{type: "dialog", speaker: "cat", text: "Oh my God - you charged it too? You’ve totally restored my faith in humanity."},
				{type: "jump", condition: true, goTrue: "#choices", goFalse: 1000},
				{type: "dialog", speaker: "ryan", text: "We left it with the bartender.", label: "phone_notwithyou"},
				{type: "dialog", speaker: "cat", text: "Thank you! I’ll run over there after this. Lifesaver!"},
				{type: "choices", choices : [{text: "No Problem.", go: "#choice_number_1", integrityScore: 1}, {text : "Happy to help.", go : "#choice_number_2", integrityScore: -1}], label: "choices"},
				{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},
				{type: "dialog", speaker: "ryan", text: "I think we saw a phone on the bar at Scotties, right? Maybe it’s yours.", label: "phone_notpicked"},
				{type: "dialog", speaker: "cat", text: "Oh, uh thanks. I’ll call them."},
			];
		}
		else if(this._talked == 1) {
			o = [
				{type: "dialog", speaker: "ryan", text: "What did I tell you, that karma!"},
				{type: "dialog", speaker: "ryan", text: "test"},
			];
		}
		else if(this._talked == 2) {
			o = [
				{type: "dialog", speaker: "priya", text: "What are the chances!"},
			];
		}
		return o;
	}

	MPLAY.Page1 = Page1;
}());
