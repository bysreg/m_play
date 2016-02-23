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

		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");

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
	};

	Page0.prototype._createFlowElements = function() {
		var professor = "%" + this._professor;		
		var ryan = "%" + this._ryan;
		var cat = "%" + this._cat;
		var o = null;

		if(this._talked == 1) {
			o = [
				{type: "show", img: ryan, expression: "happy", waitUntilShown: false}, 
				{type: "dialog", speaker: "ryan", text: "hi, i'm ryan"}, 				
				
				{type: "choices", choices : 
					[{text: "good decision (+1 relationship)", 
						go: "#relationshipDialogue", 
						relationship: {name:"ryan", score:1}}, 
					{text : "bad decision(-1 relationship)", 
						go : "#relationshipDialogue", 
						relationship: {name:"ryan", score:-1}}]},

				{type: "dialog", speaker: "ryan", 
					label: "relationshipDialogue",
					relationshipThreshold: 0, 
					text: "you have a good relationship",
					expression: "",  
					
					text2: "you have a bad relationship", 
					expression2: ""},

				{type: "choices", 
					choices : 
						[{text: "good decision (+1 integrity)", 
							go: "#integrityScore", 
						integrityScore: 1}, 
						
						{text : "bad decision(-1 integrity)", 
							go : "#integrityScore", 
							integrityScore: -1}]},

				{type: "custom", label: "integrityScore", func: function(page) {
					return page._integrityManager.getIntegrity();
				}},

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
				{type: "hide", img: cat},
				{type: "show", img: cat, expression: "annoyed"},
				{type: "dialog", speaker: "cat", text: "hi, i'm cat", label : "choice_number_1"}, 
				{type: "hide", img: cat},				
			];
		}
		
		return o;
	};

	MPLAY.Page0 = Page0;
}());