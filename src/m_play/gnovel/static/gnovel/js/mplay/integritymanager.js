// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 * @class  IntegrityManager
	 */
	var IntegrityManager = function() {
		this._score = 0;		
	};

	IntegrityManager.prototype.addIntegrity = function(val) {
		this._score += val;		

		console.log("add integrity score : " + val + " now score is " + this._score);		
	};

	IntegrityManager.prototype.getIntegrity = function() {
		return this._score;
	};

	MPLAY.IntegrityManager = IntegrityManager;

}());
