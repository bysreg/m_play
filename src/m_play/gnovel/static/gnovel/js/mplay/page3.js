// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page3
	 * @augments GNOVEL.Page
	 */
	var Page3 = function() {
		GNOVEL.Page.call(this);
	};

	Page3.prototype = Object.create(GNOVEL.Page.prototype);
	Page3.prototype.constructor = Page3;

	/**
	 * @override
	 */
	Page3.prototype._onLoad = function() {
		GNOVEL.Page.prototype._onLoad.call(this);
		this._state = 0
		this._curTextBox = null;
		this._parentPosX = 0;

		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");

		//create images
		this._professor = this.createImage("/static/gnovel/res/textures/char/prof sweeney- thoughtful.png", new THREE.Vector3(75, -130, 180), 600, 750);
		this._juli = this.createImage("/static/gnovel/res/textures/char/thoughtful-julia.png", new THREE.Vector3(-300, -140, 120), 600, 750);
		this._ryan = this.createImage("/static/gnovel/res/textures/char/ryan-happy.png", new THREE.Vector3(0, -80, 140), 600, 750);
		this._cat = this.createImage("/static/gnovel/res/textures/char/cat-annoyed.png", new THREE.Vector3(450, -130, 100), 600, 750);

		this._professor.material.opacity = 0;
		this._juli.material.opacity = 0;
		this._ryan.material.opacity = 0;
		this._cat.material.opacity = 0;

		this._addToScene(this._professor);
		this._addToScene(this._ryan);
		this._addToScene(this._juli);
		this._addToScene(this._cat);
	};

	Page3.prototype._onNext = function() {
		this._state++;
		this._runAnim();
	};

	Page3.prototype._jump = function(index) {
		this._state = index - 1;
		this._onNext();
	};

	Page3.prototype._createFlowElements = function() {
		var o = [
			{type : "dialog", text : "... And as we wrap up today's class"}, 
			{type : "choices", choices : [{text: "Not at all!", go: "#choice_number_1"}, {text : " Oh, what did you do before deciding to get your MBA?", go : "#choice_number_2"}]},
			{type : "dialog", text : "you picked choice number 1", label : "choice_number_1"}, 
			{type : "dialog", text : "you picked choice number 2", label : "choice_number_2"}, 
		];

		return o;
	};

	/**
	 * @override
	 */
	Page3.prototype._onMouseDown = function(event) {
		if (this._curTextBox != null) {
			this._removeFromScene(this._curTextBox);
			this._removeFromScene(this._textBg);
			this._curTextBox = null;
			this._onNext();
		}
	};

	MPLAY.Page3 = Page3;
}());