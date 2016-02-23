// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 * @class MPlayPage
	 * @augments GNOVEL.Page
	 */
	var MPlayPage = function() {
		GNOVEL.Page.call(this);

		this._integrityManager = null;
		this._relationshipManager = null;

		// we will only have one instance of IntegrityManager
		if(MPlayPage._integrityManager == null) {
			this._integrityManager = new MPLAY.IntegrityManager();
		}

		// we will also have only one instance of RelationshipManager
		if(MPlayPage._relationshipManager == null) {
			this._relationshipManager = new MPLAY.RelationshipManager();
		}

		// instantiate characters, if it is not instantiated yet
		if(!MPlayPage._isCharInit) {
			this._initChars();
		}
		
		// set object tags for the characters, so that we can refer it in the flow
		this._setObjectTag(MPlayPage._ryan.getName(), MPlayPage._ryan);
		this._setObjectTag(MPlayPage._cat.getName(), MPlayPage._cat);
		this._setObjectTag(MPlayPage._professor.getName(), MPlayPage._professor);
		this._setObjectTag(MPlayPage._priya.getName(), MPlayPage._priya);

		this._professor = MPlayPage._professor.getName();
		this._ryan = MPlayPage._ryan.getName();
		this._cat = MPlayPage._cat.getName();
		this._priya = MPlayPage._priya.getName();		
	};

	MPlayPage.prototype = Object.create(GNOVEL.Page.prototype);
	MPlayPage.prototype.constructor = MPlayPage;	
	
	// class static variable
	MPlayPage._integrityManager = null;
	MPlayPage._relationshipManager = null;

	// characters stored as class static variable
	// so that we can reuse it throughout the pages
	MPlayPage._ryan = null;
	MPlayPage._cat = null;
	MPlayPage._professor = null;
	MPlayPage._priya = null;	
	MPlayPage._isCharInit = false;

	MPlayPage.prototype._initChars = function() {
		MPlayPage._ryan = new MPLAY.Character(this.createImage("/static/gnovel/res/textures/char/neutral ryan png.png", new THREE.Vector3(0, -310, 140), 600, 1256), "Ryan");
		MPlayPage._ryan.setExpression("happy", this.createImage("/static/gnovel/res/textures/char/ryan-happy.png", new THREE.Vector3(0, -210, 140), 600, 924.7), "Ryan");		

		MPlayPage._cat = new MPLAY.Character(this.createImage("/static/gnovel/res/textures/char/cat-neutral.png", new THREE.Vector3(0, -310, 140), 600, 1256), "Cat");		
		MPlayPage._cat.setExpression("annoyed", this.createImage("/static/gnovel/res/textures/char/cat-annoyed.png", new THREE.Vector3(0, -310, 140), 600, 1256), "Cat");		

		MPlayPage._priya = new MPLAY.Character(this.createImage("/static/gnovel/res/textures/char/thoughtful-julia.png", new THREE.Vector3(0, -310, 140), 600, 1256), "Priya");
		MPlayPage._priya.setExpression("happy", this.createImage("/static/gnovel/res/textures/char/julia-happy-colored trim.png", new THREE.Vector3(0, -310, 140), 600, 1256), "Priya");

		MPlayPage._professor = new MPLAY.Character(this.createImage("/static/gnovel/res/textures/char/sweeney-neutral.png", new THREE.Vector3(0, -310, 140), 600, 1256), "Prof. Sweeney");
		MPlayPage._professor.setExpression("happy", this.createImage("/static/gnovel/res/textures/char/Sweeney-Happy.png", new THREE.Vector3(0, -310, 140), 600, 1256), "Prof. Sweeney");
		MPlayPage._professor.setExpression("disappointed", this.createImage("/static/gnovel/res/textures/char/sweeney-dissapointed.png", new THREE.Vector3(0, -310, 140), 600, 1256), "Prof. Sweeney");

		MPlayPage._isCharInit = true;
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._showChoices = function(choicesArr, params, jumpArr) {
		params = params || {};
		var flowElement = params.flowElement;
		var integrityManager = this._integrityManager;
		var relationshipManager = this._relationshipManager;

		params.onChoiceComplete = function(resultId) {
			// if flowElement is not defined and not null (not falsy)
			if(flowElement != null) {
				if(typeof flowElement.choices[resultId].integrityScore !== 'undefined' && 
					flowElement.choices[resultId].integrityScore != null) {

					integrityManager.addIntegrity(flowElement.choices[resultId].integrityScore);
				}
				
				if(typeof flowElement.choices[resultId].relationship !== 'undefined' && 
					flowElement.choices[resultId].relationship != null) {

					var name = flowElement.choices[resultId].relationship.name;
					var score = flowElement.choices[resultId].relationship.score;
					relationshipManager.addRelationship(name, score);
				}
			}
		};

		GNOVEL.Page.prototype._showChoices.call(this, choicesArr, params, jumpArr);
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._showDialog = function(message, x, y, params) {
		params = params || {};
		var flowElement = params.flowElement;

		var speaker = flowElement.speaker;
		var relationshipScore = this._relationshipManager.getRelationship(speaker);
		var relationshipThreshold = flowElement.relationshipThreshold;
		var expression = null;

		var textId = 0;

		// threshold values
		if(typeof relationshipThreshold !== 'undefined') {
			if(relationshipScore >= relationshipThreshold) {
				message = flowElement.text;
			}else{
				message = flowElement.text2;
				textId = 1;
			}
		}

		GNOVEL.Page.prototype._showDialog.call(this, message, x, y, params);
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._show = function(obj, params) {
		params = params || {};
		var flowElement = params.flowElement;
		var img = obj;

		// position is specific to MPLAY, it is not part of GNOVEL
		var position = params.flowElement.position; 

		// check if the object is character
		if(obj instanceof MPLAY.Character) {			
			img = obj.getImage(flowElement.expression);
		}

		if(position === "left") {
			img.position.x = -300;
		} else if(position === "center") {
			img.position.x = 0;
		} else if(position === "right") {
			img.position.x = 450;
		}

		if(params.flowElement.flip === true) {
			img.material.map.wrapS = THREE.RepeatWrapping;
			img.material.map.repeat.x = - 1;
		}else{
			img.material.map.wrapS = THREE.ClampToEdgeWrapping;
			img.material.map.repeat.x = 1;
		}

		GNOVEL.Page.prototype._show.call(this, img, params);
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._hide = function(obj, params) {
		params = params || {};

		var img = obj;

		// check if the object is character
		if(obj instanceof MPLAY.Character) {
			// search for texture that has opacity not zero
			img = obj.getVisibleImage();

			// if null, then we are just going to hide the default image
			if(img === null) {
				img = obj.getImage(null);
			}
		}

		GNOVEL.Page.prototype._hide.call(this, img, params);
	};

	MPLAY.MPlayPage = MPlayPage;
}());