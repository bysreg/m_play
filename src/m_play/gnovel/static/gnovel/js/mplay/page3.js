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
		this._state = 0;
		this._curTextBox = null;
		this._result = {};
		this._choiceJumpArr = {};
		this._choices = null;
		this._choicesBg = null;
		this._textBg = null;
		this._parentPosX = 0;

		this.setBackground("/static/gnovel/res/textures/steven_universeXworlds11.jpg");

		//create images
		this._juli = this.createImage("/static/gnovel/res/textures/char/thoughtful-julia.png", new THREE.Vector3(-300, -140, 60), 600, 750);
		this._ryan = this.createImage("/static/gnovel/res/textures/char/ryan-happy.png", new THREE.Vector3(350, -130, 60), 600, 750);
		this._cat = this.createImage("/static/gnovel/res/textures/char/cat-annoyed.png", new THREE.Vector3(450, -130, 100), 600, 750);
		this._syllabus = this.createImage("/static/gnovel/res/textures/syllabus.png",new THREE.Vector3(0,0,200),500,600);

		this._juli.material.opacity = 0;
		this._ryan.material.opacity = 0;
		this._cat.material.opacity = 0;
		this._syllabus.material.opacity = 0;

		this._addToScene(this._ryan);
		this._addToScene(this._juli);
		this._addToScene(this._cat);
		this._addToScene(this._syllabus);
	};

	Page3.prototype._onStart = function() {
		GNOVEL.Page.prototype._onStart.call(this);

		this._runAnim();
	};

	Page3.prototype._onNext = function() {
		this._state++;
		this._runAnim();
	};

	Page3.prototype._jump = function(index) {
		this._state = index - 1;
		this._onNext();
	};

	Page3.prototype._runAnim = function() {
		switch(this._state) {
			case 0:
				this._parentPosX = this._juli.position.x;
				this._show(this._juli);
				break;
			case 1:
				this._showDialog("Hey guys, I'm still sort of confused..", this._parentPosX, -220, 220);
				break;
			case 2:
				this._showDialog("..about the collaboration in class.", this._parentPosX, -220, 220);
				break;
			case 3:
				this._timHide(this._juli);
				this._parentPosX = this._cat.position.x;
				this._show(this._cat);
				break;
			case 4:
				this._showDialog("Shoot - I didn't get a chance to print it!", this._parentPosX, -220, 220);
				break;
			case 5:
				this._showDialog("Sorry.  Let me find it in my email.", this._parentPosX, -220, 220);
				break;
			case 6:
				this._show(this._syllabus);
				break;
			case 7:
				this._showDialog("Here's the syllabus",0, -220, 220); //showing this only for quarters!!
				break;
			case 8:
				this._timHide(this._syllabus);
				this._parentPosX = this._juli.position.x;
				this._show(this._juli);
				break;
		}
	};

	Page3.prototype._onMouseDown = function(event) {
		if(this._curTextBox != null) {
			this._removeFromScene(this._curTextBox);
			this._removeFromScene(this._textBg);
			this._curTextBox = null;
			this._onNext();
		}
	};

	MPLAY.Page3 = Page3;
}());
