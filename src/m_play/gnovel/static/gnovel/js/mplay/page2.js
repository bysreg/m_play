// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page2
	 * @augments GNOVEL.Page
	 */
	var Page2 = function() {
		GNOVEL.Page.call(this);
	};

	Page2.prototype = Object.create(GNOVEL.Page.prototype);
	Page2.prototype.constructor = Page2;

	/**
	 * @override	 
	 */
	Page2.prototype._onLoad = function() {
		GNOVEL.Page.prototype._onLoad.call(this);
		this._state = 0;
		this._curTextBox = null;
		this._result = {};
		this._choices = null;

		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");

		//create images
		this._juli = this.createImage("/static/gnovel/res/textures/char/thoughtful-julia.png", new THREE.Vector3(-300, -140, 60), 600, 750);
		this._ryan = this.createImage("/static/gnovel/res/textures/char/ryan-happy.png", new THREE.Vector3(350, -130, 60), 600, 750);
		this._cat = this.createImage("/static/gnovel/res/textures/char/cat-annoyed.png", new THREE.Vector3(450, -130, 100), 600, 750);

		this._juli.material.opacity = 0;
		this._ryan.material.opacity = 0;
		this._cat.material.opacity = 0;

		this._addToScene(this._ryan);
		this._addToScene(this._juli);
		this._addToScene(this._cat);					
		//this.move(juli.material, {z : 100});		
	};

	Page2.prototype._onStart = function() {
		GNOVEL.Page.prototype._onStart.call(this);	

		this._runAnim();	
	};

	Page2.prototype._onNext = function() {
		this._state++;
		this._runAnim();
	};

	Page2.prototype._showDialog = function(message, x, y, z, params) {
		this._curTextBox = this.createTextBox(message, params || {});
		this._curTextBox.position.set(x, y, z);
		this._addToScene(this._curTextBox);
	};

	Page2.prototype._show = function(obj) {
		var pageObj = this;
		this.tweenMat(obj, {opacity : 1, easing : TWEEN.Easing.Cubic.Out, onComplete : function() {
			pageObj._onNext();
		}});
	};

	Page2.prototype._showChoices = function(choicesArr, params) {
		params = params || {};
		var pageObj = this;
		params.onChoiceComplete = function() {
			pageObj._onNext();
		};

		this._choices = new GNOVEL.Choices(this, choicesArr, this._result, params);	
	};

	Page2.prototype._runAnim = function() {
		switch(this._state) {
			case 0:
				this._show(this._juli);
				break;
			case 1:				
				this._showDialog("Hey guys, I'm still sort of confused..", 0, 200, 200);
				break;
			case 2:
				this._showDialog("..about the collaboration in class.", 0, 200, 200);
				break;			
			case 3:
				this._show(this._cat);
				break;
			case 4:
				this._showDialog("Shoot - I didn't get a chance to print it!", 0, 200, 200);
				break;
			case 5:
				this._showChoices(["Let's just email TA!", "Maybe we should ask our classmate!"], {x: -200, z: 130});
				break;
			case 6:								
				this._showDialog("Agreed! I'm sending an email as we speak. ", 0, 200, 200);				
				break;
		}
	};

	Page2.prototype._onMouseDown = function(event) {
		if(this._curTextBox != null) {
			this._removeFromScene(this._curTextBox);
			this._curTextBox = null;
			this._onNext();
		}
	};

	MPLAY.Page2 = Page2;
}());
