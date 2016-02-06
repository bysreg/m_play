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
		this._choiceJumpArr = {};
		this._choices = null;
		this._choicesBg = null;
		this._textBg = null;

		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");

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
		this._curTextBox.position.set(x - 100, y, z + 20);

		// add background textbox	
		var textBg = this.createImage("/static/gnovel/res/textures/blue_box.png", new THREE.Vector3(x - 100, y, z), 900, 145.5);
		textBg.material.opacity = 0;		
		this._addToScene(textBg);
		this._textBg = textBg;

		// alpha
		this.tweenMat(this._curTextBox, {duration : 1000, opacity : 0.7, easing : TWEEN.Easing.Cubic.Out});
		this.tweenMat(textBg, {duration : 1000, opacity : 0.7, easing : TWEEN.Easing.Cubic.Out});

		// move 
		this.move(this._curTextBox, {duration : 1000, x : x, easing : TWEEN.Easing.Cubic.Out});
		this.move(textBg, {duration : 1000, x : x, easing : TWEEN.Easing.Cubic.Out});
	
		this._addToScene(this._curTextBox);
	};

	Page2.prototype._jump = function(index) {
		this._state = index - 1;		
		this._onNext();
	}

	Page2.prototype._show = function(obj) {
		var pageObj = this;
		this.tweenMat(obj, {opacity : 1, easing : TWEEN.Easing.Cubic.Out, onComplete : function() {
			pageObj._onNext();
		}});
	};

	Page2.prototype._hide = function(obj) {
		var pageObj = this;
		this.tweenMat(obj, {opacity : 0, easing : TWEEN.Easing.Cubic.Out, onComplete : function() {
			pageObj._onNext();
		}});
	};

/**
* @function temporary hide function for quarters
*/
	Page2.prototype._timHide = function(obj) {
		var pageObj = this;
		this.tweenMat(obj, {opacity : 0, easing : TWEEN.Easing.Cubic.Out, onComplete : function() {
			//pageObj._onNext();
		}});
	};

	Page2.prototype._showChoices = function(choicesArr, params, jumpArr) {
		params = params || {};
		this._choiceJumpArr = jumpArr;
		var pageObj = this;
		params.onChoiceComplete = function() {
			pageObj._removeFromScene(pageObj._choicesBg);
			var jumpIndex = pageObj._choiceJumpArr[pageObj._result.choiceId];
			pageObj._jump(jumpIndex);			
		};

		this._choices = new GNOVEL.Choices(this, choicesArr, this._result, params);	

		var choicesBg = this.createImage("/static/gnovel/res/textures/blue_box.png", new THREE.Vector3(params.x + 200, -250, params.z - 20), 900, 145.5);
		choicesBg.material.opacity = 0.7;		
		this._addToScene(choicesBg);
		this._choicesBg = choicesBg;
	};

	Page2.prototype._runAnim = function() {
		switch(this._state) {
			case 0:
				this._show(this._juli);
				break;
			case 1:				
				this._showDialog("Hey guys, I'm still sort of confused..", 0, -220, 220);
				break;
			case 2:
				this._showDialog("..about the collaboration in class.", 0, -220, 220);
				break;			
			case 3:
				this._timHide(this._juli);
				this._show(this._cat);
				break;
			case 4:
				this._showDialog("Shoot - I didn't get a chance to print it!", 0, -220, 220);
				break;
			case 5:
				this._showDialog("Sorry.  Let me find it in my email.", 0, -220, 220);
				break;
			case 6:
				this._show(this._syllabus);
				break;
			case 7:
				this._showDialog("Syllabus",0, -220, 220); //showing this only for quarters!!
				break;
			case 8:
				this._timHide(this._syllabus);
				this._show(this._juli);
				break;
			case 9:
				this._showDialog("Wait, so yes we can collaborate with the group",0,-220, 220);
				break;
			case 10:
				this._showDialog(" but only on the project?  What about for homework?",0,-220, 220);
				break;
			case 11:
				this._timHide(this._juli);
				this._show(this._ryan);
				this._timHide(this._cat);
				break;
			case 12:
				this._showDialog("He doesn't say much about that... should be ok.",0,-220, 220);
				break;
			case 13:
				this._showDialog("In my other classes we could work with anyone in the class.",0,-220, 220);
				break;
			case 14:
				this._timHide(this._ryan);
				this._show(this._cat);
				break;
			case 15:
				this._showDialog("Yes, but not all classes are the same, Ryan.",0,-220, 220);
				break;
			case 16:
				this._showChoices(["Let's just email TA!", "Maybe we should ask our classmate!"], {x: -200, z: 130}, [17, 21]);
				break;
			// branch 1 
			case 17:
				this._showDialog("Agreed! I'm sending an email as we speak. ", 0, -220, 220);				
				break;
			case 18:
				this._timHide(this._cat);
				this._show(this._ryan);
				break;
			case 19:
				this._showDialog("Fine, but seems like a waste of time.", 0, -220, 220);
				break;
			case 20:
				// finish
				break;
			//end of branch 1
			//branch 2
			case 21:
				this._showDialog("Ok you can ask someone else.",0,-220, 220);
				break;
			case 22:
				this._showDialog("I'm just going to shoot the TA a note anyway.",0,-220, 220);
				break;
			case 23:
				this._timHide(this._ryan);
				this._show(this._juli);
				break;
			case 24:
				this._showDialog("Thank you, CAT.",0,-220, 220);
				break;
			//end of brnach 2
		}
	};

	Page2.prototype._onMouseDown = function(event) {
		if(this._curTextBox != null) {
			this._removeFromScene(this._curTextBox);
			this._removeFromScene(this._textBg);
			this._curTextBox = null;
			this._onNext();
		}
	};

	MPLAY.Page2 = Page2;
}());
