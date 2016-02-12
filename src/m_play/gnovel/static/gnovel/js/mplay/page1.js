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
		//this._curTextBox.position.set(x - 100, y, z + 20);

		/**
		 *@function temporary tween decision on left & right.  should ultimately be based upon parent character's position
		 */
		//tween from the left
		if (x < 0) {
			x = 0;
			this._curTextBox.position.set(x - 100, y + 20, z + 20);
		}
		//tween from the right
		else if (x > 0) {
			x = 0;
			this._curTextBox.position.set(x + 100, y + 20, z + 20);
		} else {
			this._curTextBox.position.set(x, y + 20, z + 20);
		}

		// add background textbox
		var textBg = this.createImage("/static/gnovel/res/textures/blue_box.png", new THREE.Vector3(this._curTextBox.position.x, y, z), 900, 145.5);
		textBg.material.opacity = 0;
		this._addToScene(textBg);
		this._textBg = textBg;

		// alpha
		this.tweenMat(this._curTextBox, {
			duration: 1000,
			opacity: 0.7,
			easing: TWEEN.Easing.Cubic.Out
		});
		this.tweenMat(textBg, {
			duration: 1000,
			opacity: 0.7,
			easing: TWEEN.Easing.Cubic.Out
		});

		// move
		this.move(this._curTextBox, {
			duration: 1000,
			x: x,
			easing: TWEEN.Easing.Cubic.Out
		});
		this.move(textBg, {
			duration: 1000,
			x: x,
			easing: TWEEN.Easing.Cubic.Out
		});

		this._addToScene(this._curTextBox);
	};

	Page1.prototype._jump = function(index) {
		this._state = index - 1;
		this._onNext();
	}

	//go to new page & location based upon page ID from showChoices
	//custom code can be put here to specify what this move to location thing should be like
	Page1.prototype._moveLocation = function(index) {
		//this._state = index-1;
		this._owner.goToPage(index, GNOVEL.TransitionType.FADE);
	}

	Page1.prototype._runAnim = function() {
		switch (this._state) {
			case 0:
				this._show(this._professor);
				break;
			case 1:
				this._showDialog("And as we wrap up today's class, please be on the look out for the syllabus in your e-mail. It will outline the objectives for the course as well as the graded assignments.", 0, -220, 200);
				break;
			case 2:
				this._showChoices(["library", "class"], {
					x: -200,
					z: 220,
					type: "location",
				}, [33, 34]);
				//	this._showDialog("... And as we wrap up today's class", 0, -220, 200);
				break;
			case 3:
				this._showDialog("It will outline the objectives for the course..", 0, -220, 200);
				break;
			case 4:
				this._showDialog("..as well as the graded assignments.", 0, -220, 200);
				break;
			case 5:
				this._showDialog("Please reach out to the TAs if you have any questions. ", 0, -220, 200);
				break;
			case 6:
				this._showDialog("Now since we're ending early today ", 0, -220, 200);
				break;
			case 7:
				this._showDialog("..I would like for you to break up into your assigned study groups", 0, -220, 200);
				break;
			case 8:
				this._showDialog("..and spend the remaining half hour, meeting together.", 0, -220, 200);
				break;
			case 9:
				this._showDialog("Remember, you'll be responsible for a group project midway through the semester.", 0, -220, 200);
				break;
			case 10:
				this._hide(this._professor, {
					waitUntilHidden: false
				});
				this._parentPosX = this._cat.position.x;
				this._show(this._cat);
				break;
			case 11:
				this._showDialog("Hey, nice to meet you", this._parentPosX, -220, 200);
				break;
			case 12:
				this._showDialog("You can call me Cat.", this._parentPosX, -220, 200);
				break;
			case 13:
				this._showDialog("I worked a few years before coming back to school.  ", this._parentPosX, -220, 200);
				break;
			case 14:
				this._showDialog("Feels so strange... I'm like so much older than you guys.", this._parentPosX, -220, 200);
				break;
			case 15:
				this._showChoices(["Not at all!", "Oh, what did you do before deciding to get your MBA?"], {
					x: -200,
					z: 220
				}, [16, 16]);
				break;
			case 16:
				this._showDialog("Yeah... I worked as a consultant in DC.", this._parentPosX, -220, 200);
				break;
			case 17:
				this._showDialog("For seven years.  It's going to be an adjustment being here!", this._parentPosX, -220, 200);
				break;
			case 18:
				this._hide(this._cat, {
					waitUntilHidden: false
				});
				this._parentPosX = this._juli.position.x;
				this._show(this._juli);
				break;
			case 19:
				this._showDialog("Sorry!  Was just texting my friends. ", this._parentPosX, -220, 200);
				break;
			case 20:
				this._showDialog("I'm Juli.  This is my first winter here, and I was NOT prepared.", this._parentPosX, -220, 200);
				break;
			case 21:
				//the second choice is too long.
				this._showChoices(["I totally understand. I hate the cold.", "Just wait until you see some snow. We've been lucky so far with this mild weather."], {
					x: -200,
					z: 220
				}, [22, 22]);
				break;
			case 22:
				this._showDialog("If you had told me before I got here that it would get below 0°C for months at a time...", this._parentPosX, -220, 200);
				break;
			case 23:
				this._showDialog("..I wouldn't have come on the plane!", this._parentPosX, -220, 200);
				break;
			case 24:
				this._hide(this._juli, {
					waitUntilHidden: false
				});
				this._parentPosX = this._ryan.position.x;
				this._show(this._ryan);
				break;
			case 25:
				this._showDialog("Hey, what's up! ", this._parentPosX, -220, 200);
				break;
			case 26:
				this._showDialog("I'm Ryan. You know what the deal is with this course?", this._parentPosX, -220, 200);
				break;
			case 27:
				this._showDialog("I was looking for something a little low key.", this._parentPosX, -220, 200);
				break;
			case 28:
				this._showDialog("After last semester, I'm beat up.", this._parentPosX, -220, 200);
				break;
			case 29:
				this._showChoices(["Oh yeah?  What program are you in?", "You seem like you're recovering."], {
					x: -200,
					z: 220
				}, [30, 30]);
				break;
			case 30:
				this._showDialog("Yeah!  I mean, CS has been kicking my ass.", this._parentPosX, -220, 200);
				break;
			case 31:
				this._showDialog("Plus I work, so it's been a struggle. ", this._parentPosX, -220, 200);
				break;
			case 32:
				this._showDialog("This semester should be better though - I know what's coming.", this._parentPosX, -220, 200);
				break;
			case 33:
				// finish				
				this._owner.goToPage(1, GNOVEL.TransitionType.FADE);
				break;
			case 34:
				// finish				
				this._owner.goToPage(2, GNOVEL.TransitionType.FADE);
				break;
		}
	};

	/**
	 * @override
	 */
	Page1.prototype._onMouseDown = function(event) {
		if (this._curTextBox != null) {
			this._removeFromScene(this._curTextBox);
			this._removeFromScene(this._textBg);
			this._curTextBox = null;
			this._onNext();
		}
	};

	Page1.prototype._onUnload = function() {
		GNOVEL.Page.prototype._onUnload.call(this);
	};

	MPLAY.Page1 = Page1;
}());