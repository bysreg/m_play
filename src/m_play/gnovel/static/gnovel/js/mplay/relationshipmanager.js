// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	var RelationshipManager = function() {
		this._relationDict = {};
	};

	RelationshipManager.prototype.addRelationship = function(name, val) {
		if(typeof this._relationDict[name] === 'undefined') {
			this._relationDict[name] = val;
		} else {
			this._relationDict[name] += val;
		}

		console.log("add relationship : " + name + " " + val);
	};

/**
*@function when called, resets relationship to 1 or -1 if last relationship # is positive or negative
*
*/
	RelationshipManager.prototype.resetRelationship = function(name) {
			//if last value is positive, reset to 1
			if(this._relationDict[name] <= 1)
			{
					this._relationDict[name] = 1;
			}
			//if last value is negative, reset to -1
			else if(this._relationDict[name] <= 0)
			{
					this._relationDict[name] = -1;
			}
		};

	RelationshipManager.prototype.getRelationship = function(name) {
		if(typeof this._relationDict[name] === 'undefined') {
			return 0;
		}

		return this._relationDict[name];
	};

	MPLAY.RelationshipManager = RelationshipManager;

}());
