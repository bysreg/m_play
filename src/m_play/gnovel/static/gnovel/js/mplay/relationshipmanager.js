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

	RelationshipManager.prototype.getRelationship = function(name) {
		if(typeof this._relationDict[name] === 'undefined') {
			return 0;
		}

		return this._relationDict[name];
	};

	MPLAY.RelationshipManager = RelationshipManager;

}());