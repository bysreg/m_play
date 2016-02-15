// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page1
	 * @augments GNOVEL.Page
	 */
	var Page1 = function() {
		GNOVEL.Page.call(this);
	};

	Page1.prototype = Object.create(GNOVEL.Page.prototype);
	Page1.prototype.constructor = Page1;

	/**
	 * @override
	 */
	Page1.prototype._onLoad = function() {
		GNOVEL.Page.prototype._onLoad.call(this);
		this._state = 0;

		this._parentPosX = 0;

		this.setBackground("/static/gnovel/res/textures/steven_universeXworlds8.jpg");

		//create images
		this._professorImg = this.createImage("/static/gnovel/res/textures/char/prof sweeney- thoughtful.png", new THREE.Vector3(75, -130, 180), 600, 750);
		this._juliImg = this.createImage("/static/gnovel/res/textures/char/thoughtful-julia.png", new THREE.Vector3(-300, -140, 120), 600, 750);
		this._ryanImg = this.createImage("/static/gnovel/res/textures/char/ryan-happy.png", new THREE.Vector3(0, -80, 140), 600, 750);
		this._catImg = this.createImage("/static/gnovel/res/textures/char/cat-annoyed.png", new THREE.Vector3(450, -130, 100), 600, 750);

		this._professorImg.material.opacity = 0;
		this._juliImg.material.opacity = 0;
		this._ryanImg.material.opacity = 0;
		this._catImg.material.opacity = 0;

		this._professor = "professor";
		this._juli = "juli";
		this._ryan = "ryan";
		this._cat = "cat";

		// add object tags
		this._setObjectTag(this._professor, this._professorImg);
		this._setObjectTag(this._juli, this._juliImg);
		this._setObjectTag(this._ryan, this._ryanImg);
		this._setObjectTag(this._cat, this._catImg);
	};

	MPLAY.Page1 = Page1;
}());
