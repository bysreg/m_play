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
		this._parentPosX = 0;

		this.setBackground("/static/gnovel/res/textures/steven_universeXworlds8.jpg");

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

	Page2.prototype._jump = function(index) {
		this._state = index - 1;
		this._onNext();
	};

	Page2.prototype._runAnim = function() {
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
			case 9:
				this._showDialog("Wait, so yes we can collaborate with the group",this._parentPosX,-220, 220);
				break;
			case 10:
				this._showDialog(" but only on the project?  What about for homework?",this._parentPosX,-220, 220);
				break;
			case 11:
				this._timHide(this._juli);
				this._parentPosX = this._ryan.position.x;
				this._show(this._ryan);
				this._timHide(this._cat);
				break;
			case 12:
				this._showDialog("He doesn't say much about that... should be ok.",this._parentPosX,-220, 220);
				break;
			case 13:
				this._showDialog("In my other classes we could work with anyone in the class.",this._parentPosX,-220, 220);
				break;
			case 14:
				this._timHide(this._ryan);
				this._parentPosX = this._cat.position.x;
				this._show(this._cat);
				break;
			case 15:
				this._showDialog("Yes, but not all classes are the same, Ryan.",this._parentPosX,-220, 220);
				break;
			case 16:
				this._showChoices(["Let's just email TA!", "Maybe we should ask our classmate.",
				"It probably means we only collaborate in groups"], {x: -200, z: 130}, [17, 21,25]);
				break;
			// branch 1
			case 17:
				this._showDialog("Agreed! I'm sending an email as we speak. ", this._parentPosX, -220, 220);
				break;
			case 18:
				this._timHide(this._cat);
				this._parentPosX = this._ryan.position.x;
				this._show(this._ryan);
				break;
			case 19:
				this._showDialog("Fine, but seems like a waste of time.", this._parentPosX, -220, 220);
				break;
			case 20:
				// finish
				break;
			//end of branch 1
			//branch 2
			case 21:
				this._showDialog("Ok you can ask someone else.",this._parentPosX,-220, 220);
				break;
			case 22:
				this._showDialog("I'm just going to shoot the TA a note anyway.",this._parentPosX,-220, 220);
				break;
			case 23:
				this._timHide(this._ryan);
				this._parentPosX = this._juli.position.x;
				this._show(this._juli);
				break;
			case 24:
				this._showDialog("Thank you, CAT.",this._parentPosX,-220, 220);
				break;
			case 25:
				this._showDialog("Maybe.  I just emailed the TA just to be sure.",this._parentPosX,-220, 220);
				break;
			case 26:
				this._timHide(this._cat);
				this._parentPosX = this._ryan.position.x;
				this._show(this._ryan);
				break;
			case 27:
				this._showDialog("It better be soon.  Don’t know if I’ll be able to sleep!",this._parentPosX,-220, 220)
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
