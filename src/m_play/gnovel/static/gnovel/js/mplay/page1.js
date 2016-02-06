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
		this._state = 0
		this._curTextBox = null;
		this._result = {};
		this._choices = null;

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

		//=============================

		// var position = new THREE.Vector3(1,1,25);
		// var obj = this.createImage("/static/gnovel/res/textures/char/ryan-happy.png",position, 1200, 1500);
		// this._addToScene(obj);
		// this.addCharacter("ryan",obj);

		// //this.showHUD();

		// var textBox = this.createTextBox("Hi nice to meet you!", 
		// 	{fontsize: 6, 
		// 	  borderColor: {r:255, g:0, b:0, a:1.0}, 
		// 	  backgroundColor: {r:255, g:100, b:100, a:0.8} 
		// 	});
		
		// textBox.position.set(-200, 200, 75);
		// this._addToScene(textBox);

		var result = {};
		//var choices = new GNOVEL.Choices(this, ['Not at all', 'Oh, what did you do before deciding to get your MBA?'], result, {x: -200});	
	};

	Page1.prototype._onStart = function() {
		GNOVEL.Page.prototype._onStart.call(this);	

		this._runAnim();	
	};

	Page1.prototype._onNext = function() {
		this._state++;
		this._runAnim();
	};	

	Page1.prototype._showDialog = function(message, x, y, z, params) {
		this._curTextBox = this.createTextBox(message, params || {});
		this._curTextBox.position.set(x, y, z);
		this._addToScene(this._curTextBox);
	};

	Page1.prototype._show = function(obj) {
		var pageObj = this;
		this.tweenMat(obj, {opacity : 1, easing : TWEEN.Easing.Cubic.Out, onComplete : function() {
			pageObj._onNext();
		}});
	};

	Page1.prototype._hide = function(obj) {
		var pageObj = this;
		this.tweenMat(obj, {opacity : 0, easing : TWEEN.Easing.Cubic.Out, onComplete : function() {
			pageObj._onNext();
		}});
	};	

	Page1.prototype._showChoices = function(choicesArr, params) {
		params = params || {};
		var pageObj = this;
		params.onChoiceComplete = function() {
			pageObj._onNext();
		};

		this._choices = new GNOVEL.Choices(this, choicesArr, this._result, params);	
	};		

	Page1.prototype._runAnim = function() {
		switch(this._state) {
			case 0:
				this._show(this._professor);
				break;
			case 1:				
				this._showDialog("... And as we wrap up today's class", -200, 300, 100);
				break;
			case 2:
				this._showDialog("..please be on the look out for the syllabus in your e-mail. ", -150, 300, 100);
				break;			
			case 3:
				this._showDialog("It will outline the objectives for the course..", -200, 300, 100);
				break;
			case 4:
				this._showDialog("..as well as the graded assignments.", -200, 300, 100);
				break;
			case 5:
				this._showDialog("Please reach out to the TAs if you have any questions. ", -150, 300, 100);
				break;
			case 6:								
				this._showDialog("Now since we're ending early today ", -200, 300, 100);				
				break;
			case 7:
				this._showDialog("..I would like for you to break up into your assigned study groups", -120, 300, 100);
				break;
			case 8:
				this._showDialog("..and spend the remaining half hour, meeting together.", -150, 300, 100);
				break;
			case 9:
				this._showDialog("Remember, you'll be responsible for a group project midway through the semester.", -40, 300, 100);
				break;
			case 10:
				this._hide(this._professor);
				break;
			case 11:
				this._show(this._cat);
				break;
			case 12:
				this._showDialog("Hey, nice to meet you", 280, 220, 160);
				break;
			case 13:
				this._showDialog("You can call me Cat.", 280, 220, 160);
				break;
			case 14:
				this._showDialog("I worked a few years before coming back to school.  ", 150, 220, 160);
				break;
			case 15:
				this._showDialog("Feels so strange... I'm like so much older than you guys.", 120, 220, 160);
				break;
			case 16:
				this._showChoices(["Not at all!", "Oh, what did you do before deciding to get your MBA?"], {x: -200, z: 220}, [6, 9]);
				break;
			case 17:
				this._showDialog("Yeah... I worked as a consultant in DC.", 180, 220, 160);
				break;
			case 18:
				this._showDialog("For seven years.  It's going to be an adjustment being here!", 120, 220, 160);
				break;
			case 19:
				this._show(this._juli);
				break;
			case 20:
				this._showDialog("Sorry!  Was just texting my friends. ", -100, 250, 160);
				break;
			case 21:
				this._showDialog("I'm Juli.  This is my first winter here, and I was NOT prepared.",-40, 250, 160);
				break;
			case 22:
			//the second choice is too long.
				this._showChoices(["I totally understand. I hate the cold.", "Just wait until you see some snow. "], {x: -200, z: 220}, [6, 9]);
				break;
			case 23:
				this._showDialog("If you had told me before I got here that it would get below 0°C for months at a time...", 0, 250, 160);
				break;
			case 24:
				this._showDialog("..I wouldn't have come on the plane!", -100, 250, 160);
				break;
			case 25:
				this._show(this._ryan);
				break;
			case 26:
				this._showDialog("Hey, what's up! ", 100, 290, 160);
				break;
			case 27:
				this._showDialog("I'm Ryan. You know what the deal is with this course?", 100, 290, 160);
				break;
			case 28:
				this._showDialog("I was looking for something a little low key.", 100, 290, 160);
				break;
			case 29:
				this._showDialog("After last semester, I'm beat up.", 100, 290, 160);
				break;
			case 30:
				this._showChoices(["Oh yeah?  What program are you in?","You seem like you're recovering."], {x: -200, z: 220}, [6, 9]);
				break;
			case 31:
				this._showDialog("Yeah!  I mean, CS has been kicking my ass.", 100, 290, 160);
				break;
			case 32:
				this._showDialog("Plus I work, so it's been a struggle. ", 100, 290, 160);
				break;
			case 33:
				this._showDialog("This semester should be better though - I know what's coming.", 0, 290, 160);
				break;
			}
	};	

	/**
	 * @override	 
	 */
	Page1.prototype._onMouseDown = function(event) {
		if(this._curTextBox != null) {
			this._removeFromScene(this._curTextBox);
			this._curTextBox = null;
			this._onNext();
		}
	};

	Page1.prototype._onUnload = function() {
		GNOVEL.Page.prototype._onUnload.call(this);
	};

	MPLAY.Page1 = Page1;
}());
