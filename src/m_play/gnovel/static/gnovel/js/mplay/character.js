//namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 * @class Character
	 */
	var Character = function(img, name) {
		this._name = name;
		this._expression = {};
		this._img = img; // default image

		// make the default image to be transparent
		this._img.material.opacity = 0;
	};

	Character.prototype.getImage = function(expression) {
		if(!expression) {
			return this._img;
		}

		var ret = this._expression[expression];
		if(ret)
			return ret;

		return this._img;
	};

	Character.prototype.getName = function() {
		return this._name;
	};

	Character.prototype.setExpression = function(expression, img) {
		// we always make sure the image is always transparent first
		img.material.opacity = 0;

		this._expression[expression] = img;
	};

	Character.prototype.getVisibleImage = function() {
		if(this._img.material.opacity > 0) return this._img;

		for(var img in this._expression){
			if(img.material.opacity > 0) {
				return img;
			}
		}

		return null;
	};

	MPLAY.Character = Character;

}());
