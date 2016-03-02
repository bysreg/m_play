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

		// make the texture double sided, so that we can flip it
		this._img.material.side = THREE.DoubleSide;
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

		for(var expression in this._expression){
			if(this._expression[expression].material.opacity > 0) {
				return this._expression[expression];
			}
		}

		return null;
	};

	// hide instantly all images of this character
	Character.prototype.hideAllImages = function() {
		this._img.material.opacity = 0;

		for(var expression in this._expression){
			this._expression[expression].material.opacity = 0;			
		}
	};

	// fade all visible images of this character
	Character.prototype.fadeVisibleImages = function(page, params) {
		if(this._img.material.opacity == 1) {
			var img = this._img;
			page.tweenMat(this._img, {
				opacity: 0,
				easing: TWEEN.Easing.Cubic.Out,
				onComplete: function() {					
					page._removeFromScene(img);
					params.onComplete();
				},
				duration: params.duration || 800,
			});
		}

		for(var expression in this._expression){
			if(this._expression[expression].material.opacity == 1) {
				var img = this._expression[expression]
				page.tweenMat(this._expression[expression], {
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					onComplete: function() {
						page._removeFromScene(img);
						params.onComplete();
					},
					duration: params.duration || 800,
				});
			}
		}
	};

	MPLAY.Character = Character;

}());
