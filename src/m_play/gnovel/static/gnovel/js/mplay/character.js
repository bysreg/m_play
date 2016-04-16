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
		this._anims = [];
		this._img = img; // default image

		var self = this;

		// make the default image to be transparent
		this.setImageOpacity(this._img, 0);

		// make the texture double sided, so that we can flip it
		if (! (this._img instanceof MPLAY.SpineAnimation)) {
			this._img.material.side = THREE.DoubleSide;
		} else {
			self._anims.push(img);
		}

		this._img._expression = "default";

		// we always make sure the image is always transparent first
		this.setImageOpacity(img, 0);

		this._charPosition = "center";
	};

	Character.prototype.getImage = function(expression) {
		if (!expression) {
			return this._img;
		}

		var ret = this._expression[expression];
		if (ret)
			return ret;

		return this._img;
	};

	Character.prototype.getName = function() {
		return this._name;
	};

	Character.prototype.checkImageOpacity = function(img) {
		if (img instanceof MPLAY.SpineAnimation) {
			for (var i = 0; i < img.meshes.length; i++) {
				return img.meshes[i].material.opacity;
			}
		} else {
			return img.material.opacity;
		}
	};

	Character.prototype.setImageOpacity = function(img, val) {
		if (img instanceof MPLAY.SpineAnimation) {
			for (var i = 0; i < img.meshes.length; i++) {
				img.meshes[i].material.opacity = val;
			}
		} else {
			img.material.opacity = val;
		}
	};

	// expression can be anything except "default"
	Character.prototype.setExpression = function(expression, img) {
		if (img instanceof MPLAY.SpineAnimation) {
			var self = this;

			self._expression[expression] = img;
			self._anims.push(img);
		} else {
			this._expression[expression] = img;
			img.material.side = THREE.DoubleSide;
		}

		//put expression information on the image itself (HACK)
		img._expression = expression;

		// we always make sure the image is always transparent first
		this.setImageOpacity(img, 0);
	};

	// wont affect real position on the screen, this just record the position
	// that was set from the flow whether it is left, right or center
	Character.prototype.setCharPosition = function(value) {
		this._charPosition = value;
	};

	Character.prototype.getCharPosition = function() {
		return this._charPosition;
	}

	Character.prototype.getVisibleImage = function() {
		if (this.checkImageOpacity(this._img) > 0) return this._img;

		for (var expression in this._expression) {
			if (this.checkImageOpacity(this._expression[expression]) > 0) {
				return this._expression[expression];
			}
		}

		return null;
	};

	// hide instantly all images of this character
	Character.prototype.hideAllImages = function() {
		this.setImageOpacity(this._img, 0);

		for (var expression in this._expression) {
			this.setImageOpacity(this._expression[expression], 0);
		}
	};

	// fade all visible images of this character
	Character.prototype.fadeVisibleImages = function(page, params) {
		var onCompleteCalled = false;

		var oneFadeComplete = function() {
			if(!onCompleteCalled) {
				params.onComplete();

				onCompleteCalled = true;
			}
		};

		if (this.checkImageOpacity(this._img) == 1 && this._img._expression !== params.exception) {
			var img = this._img;

			if (img instanceof MPLAY.SpineAnimation) {
				page.tweenMat(this._img, {
					opacity: 0,
					easing: TWEEN.Easing.Quadratic.In,
					arr: img.meshes,
					onComplete: function() {
						page._removeFromScene(img);
						oneFadeComplete();
					},
					duration: params.duration || 800,
				});
			} else {
				page.tweenMat(this._img, {
					opacity: 0,
					easing: TWEEN.Easing.Quadratic.In,
					onComplete: function() {
						page._removeFromScene(img);
						oneFadeComplete();
					},
					duration: params.duration || 800,
				});
			}
		}

		for (var expression in this._expression) {
			if (this.checkImageOpacity(this._expression[expression]) == 1  && this._expression[expression] !== params.exception) {
				var img = this._expression[expression]

				if (img instanceof MPLAY.SpineAnimation) {
					page.tweenMat(this._expression[expression], {
						opacity: 0,
						easing: TWEEN.Easing.Quadratic.In,
						arr: img.meshes,
						onComplete: function() {
							page._removeFromScene(img);
							oneFadeComplete();
						},
						duration: params.duration || 800,
					});
				} else {
					page.tweenMat(this._expression[expression], {
						opacity: 0,
						easing: TWEEN.Easing.Quadratic.In,
						onComplete: function() {
							page._removeFromScene(img);
							oneFadeComplete();
						},
						duration: params.duration || 800,
					});
				}
			}
		}
	};

	Character.prototype.update = function() {
		for (var i = 0; i < this._anims.length; i++) {

			if (this._anims[i].isLoaded()) {
				this._anims[i].update();
			}
		}
	};

	MPLAY.Character = Character;

}());
