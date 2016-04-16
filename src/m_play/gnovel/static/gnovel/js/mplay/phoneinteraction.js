//namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 * @class PhoneInteraction
	 */
	var PhoneInteraction = function(page) {
		// never save the page as this._page, because phone interaction will be usec across pages

		this._z = 160;
		this._emailbg = page.createImage("/static/gnovel/res/textures/ui/email-bg.jpg", new THREE.Vector3(-1, 11, 1), 375, 600);
		this._textbg = page.createImage("/static/gnovel/res/textures/ui/texts.jpg", new THREE.Vector3(-1, 11, 1), 375, 600);
		this._phonecase = page.createImage("/static/gnovel/res/textures/ui/phone.png", new THREE.Vector3(0, 0, this._z), 419, 770);

		this._container = new THREE.Object3D();
		this._container.name = "container";
		this._mouseDownListener = null;
		this._onCompleteF = null;
		this._layout = null;

		this._texts = [];

		this._phonecase.add(this._container);

		var self = this;
		this._mouseDownListener = function(event) {
			self._onMouseDown(event);
		};
	};

	PhoneInteraction.prototype.show = function(page, layout, params) {
		this._layout = layout;

		if (layout == "email") {
			this._showEmail(page, params.subject, params.from, params.email, params.text, params.onComplete);
		} else if (layout == "text") {
			this._showText(page, params.people, params.onComplete);
		}

		page.getOwner().addMouseDownListener(this._mouseDownListener);
	};

	PhoneInteraction.prototype._showEmail = function(page, subject, from, email, text, onCompleteF) {
		this._onCompleteF = onCompleteF;

		var messageText = page.createTextBox(text, {
			align: "left",
			charLine: 45,
			font: "15px Arial",
		});
		messageText.position.set(-150, 80, 10);

		var fromText = page.createTextBox(from, {
			align: "left",
			font: "bold 20px Arial",
		});
		fromText.position.set(-40, 180, 10);

		var emailText = page.createTextBox(email, {
			align: "left",
			font: "15px Arial",
		});
		emailText.position.set(-40, 160, 10);

		var subjectText = page.createTextBox(subject, {
			align: "left",
			font: "bold 20px Arial",
		});
		subjectText.position.set(-180, 260, 10);

		// change this to the sender's picture
		var speakerPic = page.createImage(this._getPicPath(from), new THREE.Vector3(-110, 160, 7), 100, 100);

		this._container.add(this._emailbg);
		this._container.add(messageText);
		this._container.add(emailText);
		this._container.add(subjectText);
		this._container.add(fromText);
		this._container.add(speakerPic);

		this._phonecase.position.setY(-900);
		page._addToScene(this._phonecase);
		page.move(this._phonecase, {
			y: 0,
			easing: TWEEN.Easing.Back.Out
		});
	};

	PhoneInteraction.prototype._showText = function(page, people, onCompleteF) {
		this._onCompleteF = onCompleteF;

		this._container.add(this._textbg); // layout bg

		var peopleStr = null;
		if (people.length == 2) {
			peopleStr = people[0] + " and " + people[1];
		} else if (people.length > 2) {
			peopleStr = "";
			for (var i = 0; i < people.length - 1; i++) {
				peopleStr += people[i] + ", ";
			}
			peopleStr += "and " + people[people.length - 1];
		} else if(people.length == 1) {
			peopleStr = people[0];
		}

		var peopleText = page.createTextBox(peopleStr, {
			align: "center",
			font: "20px Arial"
		});
		peopleText.position.set(0, 270, 10);
		this._container.add(peopleText);

		this._phonecase.position.setY(-900);
		page._addToScene(this._phonecase);
		page.move(this._phonecase, {
			y: 0,
			easing: TWEEN.Easing.Back.Out
		});
	};

	PhoneInteraction.prototype.hide = function(page, params) {
		page.getOwner().removeMouseDownListener(this._mouseDownListener);

		if (this._layout == "email") {
			this._hideEmail(page, params.onComplete);
		} else if (this._layout == "text") {
			// this._hideText(page, params.onComplete);	
			this._hideEmail(page, params.onComplete);
		}
	};

	PhoneInteraction.prototype._hideEmail = function(page, onCompleteF) {
		var self = this;

		page.move(this._phonecase, {
			y: -900,
			easing: TWEEN.Easing.Back.In,
			onComplete: function() {
				// remove all the insides of the container
				for (var i = self._container.children.length - 1; i >= 0; i--) {
					var obj = self._container.children[i];
					self._container.remove(obj);
				}

				onCompleteF();
				page._removeFromScene(this._phonecase);
			}
		});

		this._layout = null;
	};

	PhoneInteraction.prototype._hideText = function(page, onCompleteF) {
		var self = this;

		page.move(this._phonecase, {
			y: -900,
			easing: TWEEN.Easing.Back.In,
			onComplete: function() {
				// remove all the insides of the container
				for (var i = self._container.children.length - 1; i >= 0; i--) {
					var obj = self._container.children[i];
					self._container.remove(obj);
				}

				onCompleteF();
				page._removeFromScene(this._phonecase);
			}
		});

		//reset texts array
		this._texts = [];

		this._layout = null;
	}

	PhoneInteraction.prototype._onMouseDown = function(event) {
		event.preventDefault();

		if (this._onCompleteF !== null) {
			this._onCompleteF();
			this._onCompleteF = null;
		}
	};

	PhoneInteraction.prototype._getPicPath = function(name) {
		if (name === "Ryan") {
			return "/static/gnovel/res/textures/ui/ryan phone icon.png";
		} else if (name === "Priya") {
			return "/static/gnovel/res/textures/ui/priya phone icon.png";
		} else if (name === "Cat") {
			return "/static/gnovel/res/textures/ui/cat phone icon.png";
		} else if (name === "Prof. Sweeney") {
			return "/static/gnovel/res/textures/ui/prof phone icon.png";
		} else if (name === "Mom") {
			return null;
		}
	};

	PhoneInteraction.prototype.addText = function(page, speaker, text, params) {
		var messageBgWidth = 250;
		var messageBgHeight = 93;
		var self = this;

		var messageBg = page.createImage("/static/gnovel/res/textures/ui/phone_textbox_blue.png", new THREE.Vector3(30, -150, 7), messageBgWidth, messageBgHeight);
		messageBg.material.opacity = 0;

		var messageText = page.createTextBox(text, {
			align: "left",
			charLine: 32,
			font: "12px Arial",
			fillstyle: "#ECECEC"
		});
		// var textHeight = messageText.canvas.textHeight;		
		messageText.position.set(-messageBgWidth/2 + 20, (messageBgHeight / 2) - 20, 3);
		messageText.material.opacity = 0;

		// create profile pic of sender
		var speakerPicPath = this._getPicPath(speaker);
		var speakerPic = null;
		if (speakerPicPath) {
			speakerPic = page.createImage(speakerPicPath, new THREE.Vector3(-messageBgWidth / 2 - 40, (messageBgHeight / 2) - 30, 7), 59, 59);
			speakerPic.material.opacity = 0;
		}

		// set text and picture as a child of the background
		messageBg.add(messageText);

		if (speakerPic !== null) {
			messageBg.add(speakerPic);
		}

		this._container.add(messageBg);

		page.tweenMatRecursive(messageBg, {
			duration: 300,
			opacity: 1,
			easing: TWEEN.Easing.Cubic.Out,
			onComplete: function() {
				self._onCompleteF = params.onComplete;
			}
		});

		// if there is already texts, move all texts up 		
		for (var i = 0; i < this._texts.length; i++) {
			var cury = this._texts[i].position.y;
			var desty = cury + messageBgHeight + 20;
			page.move(this._texts[i], {
				duration: 300,
				y: desty,
				easing: TWEEN.Easing.Cubic.Out,
			});

			if (desty > 180) {
				var idx = i;
				page.tweenMatRecursive(this._texts[i], {
					duration: 300,
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					onComplete: function() {
						self._container.remove(self._texts[idx]);
					}
				});
			}
		}

		this._texts.push(messageBg);
	};

	MPLAY.PhoneInteraction = PhoneInteraction;

}());