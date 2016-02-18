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
	};

	MPlayPage.prototype = Object.create(GNOVEL.Page.prototype);
	MPlayPage.prototype.constructor = MPlayPage;	
	
	// class static variable
	MPlayPage._integrityManager = null;
	MPlayPage._relationshipManager = null;

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
		var relationshipThreshold = flowElement.relationshipThreshold || 0;
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

		// position is specific to MPLAY, it is not part of GNOVEL
		var position = params.flowElement.position; 

		if(position === "left") {
			obj.position.x = -300;
		} else if(position === "center") {
			obj.position.x = 0;
		} else if(position === "right") {
			obj.position.x = 450;
		}

		if(params.flowElement.flip === true) {
			obj.material.map.wrapS = THREE.RepeatWrapping;
			obj.material.map.repeat.x = - 1;
		}else{
			obj.material.map.wrapS = THREE.ClampToEdgeWrapping;
			obj.material.map.repeat.x = 1;
		}

		// TODO : expression image thing here

		GNOVEL.Page.prototype._show.call(this, obj, params);
	};

	MPLAY.MPlayPage = MPlayPage;
}());