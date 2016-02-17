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

		// we will only have one instance of IntegrityManager
		if(MPlayPage._integrityManager == null) {
			this._integrityManager = new MPLAY.IntegrityManager();
		}
	};

	MPlayPage.prototype = Object.create(GNOVEL.Page.prototype);
	MPlayPage.prototype.constructor = MPlayPage;	
	
	// class static variable
	MPlayPage._integrityManager = null;

	/**
	 * @override
	 */
	MPlayPage.prototype._showChoices = function(choicesArr, params, jumpArr) {
		params = params || {};
		var flowElement = params.flowElement;
		var integrityManager = this._integrityManager;

		params.onChoiceComplete = function(resultId) {
			// if flowElement is not defined and not null (not falsy)
			if(flowElement != null) {
				if(typeof flowElement.choices[resultId].integrityScore !== 'undefined' && 
					flowElement.choices[resultId].integrityScore != null) {

					integrityManager.addIntegrity(flowElement.choices[resultId].integrityScore);
				}					
			}
		};

		GNOVEL.Page.prototype._showChoices.call(this, choicesArr, params, jumpArr);
	};

	MPLAY.MPlayPage = MPlayPage;
}());