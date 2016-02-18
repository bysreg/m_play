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

	MPlayPage.prototype._showDialog = function(message, x, y, params) {
		params = params || {};
		var flowElement = params.flowElement;

		var speaker = flowElement.speaker;
		var relationshipScore = this._relationshipManager.getRelationship(speaker);
		var relationshipThreshold = flowElement.relationshipThreshold || 0;
		var expression = null;

		int textId = 0;

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

	MPLAY.MPlayPage = MPlayPage;
}());