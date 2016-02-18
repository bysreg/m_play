// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page0
	 * @augments MPlay.MPlayPage
	 */
	var Page0 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page0.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page0.prototype.constructor = Page0;

	/**
	 * @override
	 */
	Page0.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);
		this._state = 0
		this._parentPosX = 0;

		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");

		//create images
		this._professorImg = this.createImage("/static/gnovel/res/textures/char/prof sweeney- thoughtful.png", new THREE.Vector3(75, -130, 180), 600, 750);
		this._juliImg = this.createImage("/static/gnovel/res/textures/char/thoughtful-julia.png", new THREE.Vector3(-300, -140, 120), 600, 750);
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
		this._juliImg.material.opacity = 0;
		this._ryanImg.material.opacity = 0;
		this._catImg.material.opacity = 0;

		this._professor = "professor";
		this._juli = "juli";
		this._ryan = "ryan";
		this._cat = "cat";		

		// add object tags
		this._setObjectTag(this._professor, this._professorImg);
		this._setObjectTag(this._juli, this._juliImg);
		this._setObjectTag(this._ryan, this._ryanImg);
		this._setObjectTag(this._cat, this._catImg);
	};

	Page0.prototype._createFlowElements = function() {
		var professor = "%professor";
		var juli = "%juli";
		var ryan = "%ryan";
		var cat = "%cat";
		var o = null;

		if(this._talked == 1) {
			o = [
				{type: "show", img: ryan}, 
				{type: "dialog", speaker: "ryan", text: "hi, i'm ryan"}, 
				{type: "dialog", speaker: "ryan", text: "bla bla blasba"},
				{type: "hide", img: ryan},
				{type: "choices", choices : [{text: "good decision", go: "#integrityScore"}, {text : "bad decision", go : "#integrityScore", integrityScore: -1}], label: "choices"},
				{type: "custom", label: "integrityScore", func: function(page) {
					return page._integrityManager.getIntegrity();
				}},
				{type: "dialog", speaker: "ryan", relationshipThreshold: 0, 
					text: "you have a good relationship",
					expression: "",  
					text2: "you have a bad relationship", 
					expression2: ""},

				{type: "compare", leftop: "$integrityScore", operator: "greater equal", rightop: 0, goTrue: "#good", goFalse: "#bad"},
				{type: "dialog", speaker: "ryan", text: "you have good ending", label: "good"}, 
				{type: "jump", condition: true, goTrue: 1000, goFalse: 1000}, 
				{type: "dialog", speaker: "ryan", text: "you have bad ending", label: "bad"}, 
				{type: "goto", page: 1},
			];
		}		
		else if(this._talked == 2) {
			o = [
				{type: "show", img: cat},
				{type: "dialog", speaker: "cat", text: "hi, i'm cat", label : "choice_number_1"}, 
				{type: "hide", img: cat},				
			];
		}
		
		return o;
	};

	MPLAY.Page0 = Page0;
}());