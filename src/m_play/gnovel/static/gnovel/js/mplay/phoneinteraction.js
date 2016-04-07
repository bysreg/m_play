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
		this._emailbg = page.createImage("/static/gnovel/res/textures/ui/email-bg.jpg", new THREE.Vector3(-1, 11, this._z), 375, 600);
		this._emailbg.material.opacity = 1;
		//this._emailbg.scale.set(0.9, 0.9, 1);
		this._phonecase = page.createImage("/static/gnovel/res/textures/ui/phone.png", new THREE.Vector3(0, 0, this._z), 419, 770);
		this._phonecase.material.opacity = 0;
		this._container = new THREE.Object3D();
		this._mouseDownListener = null;
		this._onCompleteF = null;
		this._layout = null;	

		var self = this;
		this._mouseDownListener = function(event) {
			self._onMouseDown(event);
		};
	};

	PhoneInteraction.prototype.show = function(page, layout, params) {
		this._layout = layout;

		if(layout == "email") {
			this._showEmail(page, params.subject, params.from, params.email, params.text, params.onComplete);
		}

		page.getOwner().addMouseDownListener(this._mouseDownListener);
	};

	PhoneInteraction.prototype._showEmail = function(page, subject, from, email, text, onCompleteF) {
		this._emailbg.position.setZ(1);
		this._phonecase.material.opacity = 1;	
		this._onCompleteF = onCompleteF;	

		var messageText = page.createTextBox(text, {
			align: "left",
			charLine: 39,
		});		
		messageText.position.set(-150, 100, 10);

		var fromText = page.createTextBox(from, {
			align: "left", 
		});
		fromText.position.set(-40, 180, 10);

		var emailText = page.createTextBox(email, {
			align: "left",
		});
		emailText.position.set(-40, 160, 10);

		var subjectText = page.createTextBox(subject, {
			align: "left",
			font: "bold 20px Noteworthy",
		})
		subjectText.position.set(-180, 260, 10);

		this._container.add(this._emailbg);
		this._container.add(messageText);
		this._container.add(emailText);
		this._container.add(subjectText);
		this._container.add(fromText);
		this._phonecase.add(this._container);

		this._phonecase.position.setY(-900);

		page._addToScene(this._phonecase);

		page.move(this._phonecase, {y: 0, easing:TWEEN.Easing.Back.Out});		
	};

	PhoneInteraction.prototype.hide = function(page, params) {
		page.getOwner().removeMouseDownListener(this._mouseDownListener);

		if(this._layout == "email") {
			this._hideEmail(page, params.onComplete);
		}		
	};

	PhoneInteraction.prototype._hideEmail = function(page, onCompleteF) {
		var self = this;

		page.move(this._phonecase, {y: -900, easing:TWEEN.Easing.Back.In, onComplete: function() {
			// remove all the insides of the container
			for( var i = self._container.children.length - 1; i >= 0; i--) {
				var obj = self._container.children[i];
				self._container.remove(obj);
			}

			onCompleteF();			
		}});

		this._layout = null;
	};

	PhoneInteraction.prototype._onMouseDown = function(event) {
		event.preventDefault();

		if(this._onCompleteF!== null) {
			this._onCompleteF();
			this._onCompleteF = null;
		}
	};

	MPLAY.PhoneInteraction = PhoneInteraction;

}());