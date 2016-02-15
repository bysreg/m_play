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

		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");

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

	Page3.prototype._createFlowElements = function() {
		var professor = "%professor";
		var juli = "%juli";
		var ryan = "%ryan";
		var cat = "%cat";

		var o = [
			{type: "dialog", text: "... And as we wrap up today's class. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu ornare enim. Praesent lectus diam, ornare iaculis purus aliquam, euismod mollis odio. Integer sed congue sapien. Vestibulum eget molestie lorem"}, 
			{type: "choices", choices : [{text: "Not at all!", go: "#choice_number_1"}, {text : " Oh, what did you do before deciding to get your MBA?", go : "#choice_number_2"}]},
			{type: "dialog", text: "you picked choice number 1", label : "choice_number_1"}, 
			{type: "dialog", text: "you picked choice number 2", label : "choice_number_2"},			
			{type: "show", img: professor},			
			{type: "show", img: cat},
			{type: "hide", img: professor, waitUntilHidden: false},
			{type: "show", img: ryan}, 
			{type: "hide", img: ryan},
			{type: "hide", img: cat},

			{type: "goto", page: 0, transition: "fade"},
		];

		return o;
	};


	MPLAY.Page3 = Page3;
}());