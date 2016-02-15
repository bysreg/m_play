// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page0
	 * @augments GNOVEL.Page
	 */
	var Page0 = function() {
		GNOVEL.Page.call(this);
	};

	Page0.prototype = Object.create(GNOVEL.Page.prototype);
	Page0.prototype.constructor = Page0;

	/**
	 * @override
	 */
	Page0.prototype._onLoad = function() {
		GNOVEL.Page.prototype._onLoad.call(this);
		this._state = 0
		this._parentPosX = 0;

		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");

		//create images
		this._professorImg = this.createImage("/static/gnovel/res/textures/char/prof sweeney- thoughtful.png", new THREE.Vector3(75, -130, 180), 600, 750);
		this._juliImg = this.createImage("/static/gnovel/res/textures/char/thoughtful-julia.png", new THREE.Vector3(-300, -140, 120), 600, 750);
		this._ryanImg = this.createImage("/static/gnovel/res/textures/char/ryan-happy.png", new THREE.Vector3(0, -80, 140), 600, 750);
		this._catImg = this.createImage("/static/gnovel/res/textures/char/cat-annoyed.png", new THREE.Vector3(450, -130, 100), 600, 750);		

		this._talked = 0;

		var pageObj = this;
		var io1 = this.createInteractableObject(
			"/static/gnovel/res/textures/Perspective-Button-Stop-icon.png", 
			{x: -100, y: 200, width : 64, height : 64, onClick: function() {
				pageObj._talked = 1;
				pageObj._runFlow();
			}});		

		var io2 = this.createInteractableObject(
			"/static/gnovel/res/textures/Perspective-Button-Stop-icon.png", 
			{x: 100, y: 200, width : 64, height : 64, onClick: function() {
				pageObj._talked = 2;
				pageObj._runFlow();
			}});		

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

	Page0.prototype._createFlowElements = function() {
		var professor = "%professor";
		var juli = "%juli";
		var ryan = "%ryan";
		var cat = "%cat";
		var o = null;

		if(this._talked == 1) {
			o = [
				{type: "show", img: ryan}, 
				{type: "dialog", text: "hi, i'm ryan"}, 
				{type: "hide", img: ryan},				
			];
		}		
		else if(this._talked == 2) {
			o = [
				{type: "show", img: cat},
				{type: "dialog", text: "hi, i'm cat", label : "choice_number_1"}, 
				{type: "hide", img: cat},				
			];
		}
		
		return o;
	};


	// Page0.prototype._runAnim = function() {
	// 	switch (this._state) {
	// 		case 0:
	// 			this._show(this._professor);
	// 			break;
	// 		case 1:				
	// 			this._showDialog("And as we wrap up today's class, please be on the look out for the syllabus in your e-mail. It will outline the objectives for the course as well as the graded assignments.", 0, -220, 200);
	// 			break;
	// 		case 2:				
	// 			this._showChoices(["library", "class"], {
	// 				x: -200,
	// 				z: 220,
	// 				type: "location",
	// 			}, [33, 34]);
	// 			//	this._showDialog("... And as we wrap up today's class", 0, -220, 200);
	// 			break;
	// 		case 3:
	// 			this._showDialog("It will outline the objectives for the course..", 0, -220, 200);
	// 			break;
	// 		case 4:
	// 			this._showDialog("..as well as the graded assignments.", 0, -220, 200);
	// 			break;
	// 		case 5:
	// 			this._showDialog("Please reach out to the TAs if you have any questions. ", 0, -220, 200);
	// 			break;
	// 		case 6:
	// 			this._showDialog("Now since we're ending early today ", 0, -220, 200);
	// 			break;
	// 		case 7:
	// 			this._showDialog("..I would like for you to break up into your assigned study groups", 0, -220, 200);
	// 			break;
	// 		case 8:
	// 			this._showDialog("..and spend the remaining half hour, meeting together.", 0, -220, 200);
	// 			break;
	// 		case 9:
	// 			this._showDialog("Remember, you'll be responsible for a group project midway through the semester.", 0, -220, 200);
	// 			break;
	// 		case 10:
	// 			this._hide(this._professor, {
	// 				waitUntilHidden: false
	// 			});
	// 			this._parentPosX = this._cat.position.x;
	// 			this._show(this._cat);
	// 			break;
	// 		case 11:
	// 			this._showDialog("Hey, nice to meet you", this._parentPosX, -220, 200);
	// 			break;
	// 		case 12:
	// 			this._showDialog("You can call me Cat.", this._parentPosX, -220, 200);
	// 			break;
	// 		case 13:
	// 			this._showDialog("I worked a few years before coming back to school.  ", this._parentPosX, -220, 200);
	// 			break;
	// 		case 14:
	// 			this._showDialog("Feels so strange... I'm like so much older than you guys.", this._parentPosX, -220, 200);
	// 			break;
	// 		case 15:
	// 			this._showChoices(["Not at all!", "Oh, what did you do before deciding to get your MBA?"], {
	// 				x: -200,
	// 				z: 220
	// 			}, [16, 16]);
	// 			break;
	// 		case 16:
	// 			this._showDialog("Yeah... I worked as a consultant in DC.", this._parentPosX, -220, 200);
	// 			break;
	// 		case 17:
	// 			this._showDialog("For seven years.  It's going to be an adjustment being here!", this._parentPosX, -220, 200);
	// 			break;
	// 		case 18:
	// 			this._hide(this._cat, {
	// 				waitUntilHidden: false
	// 			});
	// 			this._parentPosX = this._juli.position.x;
	// 			this._show(this._juli);
	// 			break;
	// 		case 19:
	// 			this._showDialog("Sorry!  Was just texting my friends. ", this._parentPosX, -220, 200);
	// 			break;
	// 		case 20:
	// 			this._showDialog("I'm Juli.  This is my first winter here, and I was NOT prepared.", this._parentPosX, -220, 200);
	// 			break;
	// 		case 21:
	// 			//the second choice is too long.
	// 			this._showChoices(["I totally understand. I hate the cold.", "Just wait until you see some snow. We've been lucky so far with this mild weather."], {
	// 				x: -200,
	// 				z: 220
	// 			}, [22, 22]);
	// 			break;
	// 		case 22:
	// 			this._showDialog("If you had told me before I got here that it would get below 0°C for months at a time...", this._parentPosX, -220, 200);
	// 			break;
	// 		case 23:
	// 			this._showDialog("..I wouldn't have come on the plane!", this._parentPosX, -220, 200);
	// 			break;
	// 		case 24:
	// 			this._hide(this._juli, {
	// 				waitUntilHidden: false
	// 			});
	// 			this._parentPosX = this._ryan.position.x;
	// 			this._show(this._ryan);
	// 			break;
	// 		case 25:
	// 			this._showDialog("Hey, what's up! ", this._parentPosX, -220, 200);
	// 			break;
	// 		case 26:
	// 			this._showDialog("I'm Ryan. You know what the deal is with this course?", this._parentPosX, -220, 200);
	// 			break;
	// 		case 27:
	// 			this._showDialog("I was looking for something a little low key.", this._parentPosX, -220, 200);
	// 			break;
	// 		case 28:
	// 			this._showDialog("After last semester, I'm beat up.", this._parentPosX, -220, 200);
	// 			break;
	// 		case 29:
	// 			this._showChoices(["Oh yeah?  What program are you in?", "You seem like you're recovering."], {
	// 				x: -200,
	// 				z: 220
	// 			}, [30, 30]);
	// 			break;
	// 		case 30:
	// 			this._showDialog("Yeah!  I mean, CS has been kicking my ass.", this._parentPosX, -220, 200);
	// 			break;
	// 		case 31:
	// 			this._showDialog("Plus I work, so it's been a struggle. ", this._parentPosX, -220, 200);
	// 			break;
	// 		case 32:
	// 			this._showDialog("This semester should be better though - I know what's coming.", this._parentPosX, -220, 200);
	// 			break;
	// 		case 33:
	// 			// finish				
	// 			this.goToPage(1, GNOVEL.TransitionType.FADE);
	// 			break;
	// 		case 34:
	// 			// finish				
	// 			this.goToPage(2, GNOVEL.TransitionType.FADE);
	// 			break;
	// 	}
	// };


	MPLAY.Page0 = Page0;
}());