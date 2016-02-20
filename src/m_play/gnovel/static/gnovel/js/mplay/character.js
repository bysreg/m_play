//namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 * @class Character
	 */
	var Character = function(img) {
		this._name = "";
		this._expression = {};
		this._img = img;
	};

	Character.prototype.getImage = function(expression) {
		if(!expression) {
			return this._img;
		}

		var ret = this._expression[expression];
		if(!ret)
			return ret;

		return this._img;
	};

	Character.prototype.getName = function() {
		return this._name;
	};

	Character.prototype.setExpression = function(expression, img) {
		this._expression[expression] = img;
	};

	MPLAY.Character = Character;

}());
