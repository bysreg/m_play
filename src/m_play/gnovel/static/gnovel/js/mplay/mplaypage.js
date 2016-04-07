// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 * @class MPlayPage
	 * @augments GNOVEL.Page
	 */
	var MPlayPage = function() {
		GNOVEL.Page.call(this);

		this._integrityManager = null;
		this._relationshipManager = null;

		// we will only have one instance of IntegrityManager
		if (MPlayPage._integrityManager == null) {
			this._integrityManager = new MPLAY.IntegrityManager();
			MPlayPage._integrityManager = this._integrityManager;
		} else if (this._integrityManager == null) {
			this._integrityManager = MPlayPage._integrityManager;
		};

		// we will also have only one instance of RelationshipManager
		if (MPlayPage._relationshipManager == null) {
			this._relationshipManager = new MPLAY.RelationshipManager();
			MPlayPage._relationshipManager = this._relationshipManager;
		} else if (this._relationshipManager == null) {
			this._relationshipManager = MPlayPage._relationshipManager;
		};

		// override inherited variable
		this._backgroundLayer = -80;

		// z orders
		this._background2Layer = -40;
		this._background3Layer = 30;
		this._interactableObjectLayer = 150;
		this._characterLayer = 140;
		this._character2Layer = 250;
		this._character3Layer = 300;
		this._uiLayer = 250;

		// for logging
		this._choiceNumber = 0;
		this._ioNumber = 0; // io stands for interactable object

		this._choicesTextBg = [];

		// // instantiate characters, if it is not instantiated yet
		// if (!MPlayPage._isCharInit) {
		// 	this._initChars();
		// }

		if(MPlayPage._phoneInteraction == null) {
			this._initPhoneInteraction();
		}else{
			this._phoneInteraction = MPlayPage._phoneInteraction;
		}

		this._player = document.getElementById("username").innerHTML;

		// add custom flow handler
		this._flow._addCustomHandler("phone_textbox", this._handlePhoneTextBox);
		this._flow._addCustomHandler("add_phone_textbox", this._handleAddPhoneTextBox);
		this._flow._addCustomHandler("hide_phone_textbox", this._handleHidePhoneTextBox);
		this._flow._addCustomHandler("show_phone_notif", this._handleShowPhoneNotif);
		this._flow._addCustomHandler("hide_phone_notif", this._handleHidePhoneNotif);
		this._flow._addCustomHandler("open_phone", this._handleOpenPhone);
		this._flow._addCustomHandler("close_phone", this._handleClosePhone);
		this._flow._addCustomHandler("show_context", this._handleShowContext);
	};

	MPlayPage.prototype = Object.create(GNOVEL.Page.prototype);
	MPlayPage.prototype.constructor = MPlayPage;

	// class static variable
	MPlayPage._integrityManager = null;
	MPlayPage._relationshipManager = null;
	MPlayPage._phoneInteraction = null;

	// characters stored as class static variable
	// so that we can reuse it throughout the pages
	MPlayPage._ryan = null;
	MPlayPage._cat = null;
	MPlayPage._professor = null;
	MPlayPage._priya = null;
	MPlayPage._isCharInit = false;
	MPlayPage._isAnimInit = false;
	MPlayPage._animCount = 0;
	MPlayPage._loadedAnimCount = 0;
	MPlayPage._anims = {};

	MPlayPage.prototype._initChars = function() {

		MPlayPage._ryan = new MPLAY.Character(MPlayPage._anims["ryan neutral"], "Ryan");
		MPlayPage._ryan.setExpression("happy", this.createImage("/static/gnovel/res/textures/char/ryan-happy.png", new THREE.Vector3(0, -200, this._characterLayer), 600, 923), "Ryan");
		MPlayPage._ryan.setExpression("sad", this.createImage("/static/gnovel/res/textures/char/sad ryan.png", new THREE.Vector3(0, -210, this._characterLayer), 467, 923), "Ryan");
		MPlayPage._ryan.setExpression("thoughtful", this.createImage("/static/gnovel/res/textures/char/thoughtful ryan png.png", new THREE.Vector3(0, -200, this._characterLayer), 404, 923), "Ryan");
		MPlayPage._ryan.setExpression("angry", this.createImage("/static/gnovel/res/textures/char/ryan-angry.png", new THREE.Vector3(0, -200, this._characterLayer), 845, 920), "Ryan");
		// MPlayPage._ryan.setExpression("happy", this.createImage("/static/gnovel/res/textures/char/ryan-happy.png", new THREE.Vector3(0, -200, this._characterLayer), 600, 923), "Ryan");
		MPlayPage._ryan.setExpression("happy", MPlayPage._anims["ryan happy"], "Ryan");
		// MPlayPage._ryan.setExpression("sad", this.createImage("/static/gnovel/res/textures/char/sad ryan.png", new THREE.Vector3(0, -210, this._characterLayer), 467, 923), "Ryan");
		MPlayPage._ryan.setExpression("sad", MPlayPage._anims["ryan sad"], "Ryan");
		// MPlayPage._ryan.setExpression("thoughtful", this.createImage("/static/gnovel/res/textures/char/thoughtful ryan png.png", new THREE.Vector3(0, -200, this._characterLayer), 404, 923), "Ryan");
		MPlayPage._ryan.setExpression("thoughtful", MPlayPage._anims["ryan thoughtful"], "Ryan");
		// MPlayPage._ryan.setExpression("angry", this.createImage("/static/gnovel/res/textures/char/ryan-angry.png", new THREE.Vector3(0, -200, this._characterLayer), 845, 920), "Ryan");
		MPlayPage._ryan.setExpression("angry", MPlayPage._anims["ryan angry"], "Ryan");

		MPlayPage._cat = new MPLAY.Character(MPlayPage._anims["cat neutral"], "Cat");
		MPlayPage._cat.setExpression("happy", MPlayPage._anims["cat happy"], "Cat");
		MPlayPage._cat.setExpression("angry", MPlayPage._anims["cat annoyed"], "Cat");
		MPlayPage._cat.setExpression("sad", MPlayPage._anims["cat sad"], "Cat");
		// MPlayPage._cat.setExpression("sad", this.createImage("/static/gnovel/res/textures/char/good sad cat.png", new THREE.Vector3(0, -160, this._characterLayer), 241, 785), "Cat");
		MPlayPage._cat.setExpression("thoughtful", MPlayPage._anims["cat thoughtful"], "Cat");

		MPlayPage._priya = new MPLAY.Character(MPlayPage._anims["priya neutral"], "Priya");
		MPlayPage._priya.setExpression("happy", MPlayPage._anims["priya happy"], "Priya");
		MPlayPage._priya.setExpression("thoughtful", MPlayPage._anims["priya thoughtful"], "Priya");
		// MPlayPage._priya.setExpression("thoughtful", this.createImage("/static/gnovel/res/textures/char/thoughtful-priya.png", new THREE.Vector3(0, -180, this._characterLayer), 500, 745), "Priya");
		MPlayPage._priya.setExpression("sad", MPlayPage._anims["priya sad"], "Priya");
		MPlayPage._priya.setExpression("angry", MPlayPage._anims["priya angry"], "Priya");

		// MPlayPage._professor = new MPLAY.Character(this.createImage("/static/gnovel/res/textures/char/sweeney-neutral.png", new THREE.Vector3(0, -230, this._characterLayer), 600, 1030), "Prof. Sweeney");
		MPlayPage._professor = new MPLAY.Character(MPlayPage._anims["sweeney neutral"], "Prof. Sweeney");
		// MPlayPage._professor.setExpression("happy", this.createImage("/static/gnovel/res/textures/char/Sweeney-Happy.png", new THREE.Vector3(0, -270, this._characterLayer), 469, 1030), "Prof. Sweeney");
		MPlayPage._professor.setExpression("happy", MPlayPage._anims["sweeney happy"], "Prof. Sweeney");
		// MPlayPage._professor.setExpression("sad", this.createImage("/static/gnovel/res/textures/char/sweeney-dissapointed.png", new THREE.Vector3(0, -270, this._characterLayer), 426, 1030), "Prof. Sweeney");
		MPlayPage._professor.setExpression("sad", MPlayPage._anims["sweeney angry"], "Prof. Sweeney");

		// hide all characters
		MPlayPage._professor.hideAllImages();
		MPlayPage._ryan.hideAllImages();
		MPlayPage._cat.hideAllImages();
		MPlayPage._priya.hideAllImages();

		MPlayPage._isCharInit = true;

		// run the first flow
		this._runFlow();
	};

	MPlayPage.prototype._initAnim = function() {
		this._createAnim("ryan neutral", "/static/gnovel/res/animation/", 0.8, new THREE.Vector3(0, -260, this._characterLayer));
		this._createAnim("ryan angry", "/static/gnovel/res/animation/", 0.8, new THREE.Vector3(0, -130, this._characterLayer));
		this._createAnim("ryan happy", "/static/gnovel/res/animation/", 0.8, new THREE.Vector3(0, -130, this._characterLayer)).oriScale = {x: -1, y: 1};
		this._createAnim("ryan sad", "/static/gnovel/res/animation/", 0.7, new THREE.Vector3(0, -130, this._characterLayer));
		this._createAnim("ryan thoughtful", "/static/gnovel/res/animation/", 0.8, new THREE.Vector3(0, -50, this._characterLayer));

		this._createAnim("cat neutral", "/static/gnovel/res/animation/", 0.8, new THREE.Vector3(0, -50, this._characterLayer));
		this._createAnim("cat annoyed", "/static/gnovel/res/animation/", 0.8, new THREE.Vector3(0, -150, this._characterLayer)); // angry
		this._createAnim("cat happy", "/static/gnovel/res/animation/", 1, new THREE.Vector3(0, -20, this._characterLayer));
		this._createAnim("cat sad", "/static/gnovel/res/animation/", 0.57, new THREE.Vector3(0, -150, this._characterLayer));
		this._createAnim("cat thoughtful", "/static/gnovel/res/animation/", 0.55, new THREE.Vector3(0, -75, this._characterLayer));

		this._createAnim("priya neutral", "/static/gnovel/res/animation/", 0.7, new THREE.Vector3(0, -100, this._characterLayer));
		this._createAnim("priya happy", "/static/gnovel/res/animation/", 0.9, new THREE.Vector3(0, -130, this._characterLayer));
		this._createAnim("priya angry", "/static/gnovel/res/animation/", 0.7, new THREE.Vector3(0, -110, this._characterLayer));
		this._createAnim("priya sad", "/static/gnovel/res/animation/", 0.8, new THREE.Vector3(0, -150, this._characterLayer));
		this._createAnim("priya thoughtful", "/static/gnovel/res/animation/", 0.75, new THREE.Vector3(0, -70, this._characterLayer));

		this._createAnim("sweeney neutral", "/static/gnovel/res/animation/", 0.8, new THREE.Vector3(0, -120, this._characterLayer));
		this._createAnim("sweeney angry", "/static/gnovel/res/animation/", 0.8, new THREE.Vector3(0, -160, this._characterLayer));
		this._createAnim("sweeney happy", "/static/gnovel/res/animation/", 0.7, new THREE.Vector3(0, -160, this._characterLayer));


		for (var i in MPlayPage._anims) {
			var anim = MPlayPage._anims[i];
			var self = this;
			anim.addEventListener(MPLAY.SpineAnimation.SKELETON_DATA_LOADED, function(event) {
				//console.log("call back " + i + event.target);
				event.target.state.setAnimationByName(0, "idle", true);

				// update it once, so that the mesh is created
				event.target.update();

				MPlayPage._loadedAnimCount++;

				// if all anims have been loaded, then we can proceed
				if (MPlayPage._loadedAnimCount == MPlayPage._animCount) {
					self._initChars();
				}
			});
		}

		MPlayPage._isAnimInit = true;
	};

	MPlayPage.prototype._createAnim = function(animName, path, scale, position) {
		var anim = new MPLAY.SpineAnimation(animName, path, scale);
		var self = this;

		anim.position.set(position.x, position.y, position.z);

		MPlayPage._anims[animName] = anim;

		MPlayPage._animCount++;
		return anim;
	};

	MPlayPage.prototype._initPhoneNotification = function() {
		this._phoneNotifImg = this.createImage("/static/gnovel/res/textures/ui/phone_notify.png", new THREE.Vector3(0, 0, 0), 150, 155);

		this._closephoneImg = this.createImage("/static/gnovel/res/textures/ui/phone.png", new THREE.Vector3(0, 0, 160), 419, 770);
		this._closephoneImg.material.opacity = 0;
		this._closephone = "closephone";
		this._setObjectTag(this._closephone, this._closephoneImg);		
	};

	MPlayPage.prototype._initPhoneInteraction = function() {	
	 	// the page is only used to initialize some of the variables in phone interaction, the page itself	
	 	// won't be referred inside phone interaction
		this._phoneInteraction = new MPLAY.PhoneInteraction(this);
		MPlayPage._phoneInteraction = this._phoneInteraction;
	};

	MPlayPage.prototype._showRelationshipInfo = function(char, params) {
		var pageObj = this;
		var relationshipManager = MPlayPage._relationshipManager;
		/*for(var i=0;i<char.length,i++)
		{
			relationshipManager.getRelationship("Ryan");
			this._ryan = this.createImage("/static/gnovel/res/textures/char/ryan-happy.png", new THREE.Vector3(0, 260, this._dialogLayer), 150, 150);
			pageObj._addToScene(this._ryan);
		}*/
		//temp implementation
		var score = relationshipManager.getRelationship("Ryan");
		if (score >= 0)
			this._ryan = this.createImage("/static/gnovel/res/textures/char/ryan_happy_box.png", new THREE.Vector3(-300, 260, this._dialogLayer), 100, 100);
		else if (score < 0)
			this._ryan = this.createImage("/static/gnovel/res/textures/char/ryan_angry_box.png", new THREE.Vector3(-300, 260, this._dialogLayer), 100, 100);

		score = relationshipManager.getRelationship("Priya");
		if (score >= 0)
			this._priya = this.createImage("/static/gnovel/res/textures/char/priya_happy_box.png", new THREE.Vector3(-150, 260, this._dialogLayer), 100, 100);
		else if (score < 0)
			this._priya = this.createImage("/static/gnovel/res/textures/char/priya_sad_box.png", new THREE.Vector3(-150, 260, this._dialogLayer), 100, 100);

		pageObj._addToScene(this._priya);
		pageObj._addToScene(this._ryan);
	};

	MPlayPage.prototype._showPhoneNotification = function(params) {
		var pageObj = this;

		this._notifIo = this.createInteractableObject(
			this._phoneNotifImg,
			//"/static/gnovel/res/textures/ui/phone_notification.png",
			{
				x: -440,
				y: -220,
				z: -this.getOwner().getCamera().position.z + this._uiLayer,
				width: 150,
				height: 155,
				onClick: function(io) {
					if (params.onClick) {
						params.onClick();
						pageObj._removePhoneNotification();
					}
				}
			});

		this._notifIo.getImage().material.opacity = 1;

		this._owner.getCamera().add(this._notifIo.getImage());

		//phone rotation animation
		var duration = 100;
		var rotDest = .3;
		this._notifIo._img.rotation.z = -.05;
		this._notifIo._img.rotation.y = -.05;
		var rotTween = new TWEEN.Tween(this._notifIo._img.rotation)
			.to({y:.05,z:.05},duration)
			.easing(TWEEN.Easing.Linear.None)
			.yoyo(true)
			.repeat(Infinity)
			.onComplete(function(){
			});

			rotTween.start();
		/*
		this.tweenFlash(this._notifIo.getImage(), {
			//opacity: 1,
			easing: TWEEN.Easing.Cubic.Out,
			duration: 800,
		}); */

		this.getOwner().getSoundManager().play("Message");
	};

	MPlayPage.prototype._removePhoneNotification = function() {
		var pageObj = this;

		// disable interactable object
		pageObj._notifIo.setEnable(false);

		// fade this phone notification
		pageObj.tweenMat(pageObj._notifIo.getImage(), {
			opacity: 0,
			easing: TWEEN.Easing.Cubic.Out,
			duration: 800,
			onComplete: function() {
				pageObj._notifIo.remove();
				// remove from camera
				pageObj._owner.getCamera().remove(pageObj._notifIo.getImage());
			},
		});
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._onLoad = function() {
		this._initPhoneNotification();

		GNOVEL.Page.prototype._onLoad.call(this);
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._onStart = function() {

		GNOVEL.Page.prototype._onStart.call(this);
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._runFlow = function() {

		// dont init char, init anim first for now!
		if (!MPlayPage._isAnimInit) {
			this._initAnim();
		}else if(MPlayPage._isCharInit && MPlayPage._isAnimInit) {

			// FIXME: Not the best place to put the code here, fix it some time later
			// set object tags for the characters, so that we can refer it in the flow
			this._setObjectTag(MPlayPage._ryan.getName(), MPlayPage._ryan);
			this._setObjectTag(MPlayPage._cat.getName(), MPlayPage._cat);
			this._setObjectTag(MPlayPage._professor.getName(), MPlayPage._professor);
			this._setObjectTag(MPlayPage._priya.getName(), MPlayPage._priya);

			this._professor = MPlayPage._professor.getName();
			this._ryan = MPlayPage._ryan.getName();
			this._cat = MPlayPage._cat.getName();
			this._priya = MPlayPage._priya.getName();


			GNOVEL.Page.prototype._runFlow.call(this);	
		}

	};

	MPlayPage.prototype.log = function(type, action_number, action_value) {
		$.post("/gnovel/log/", {
				name: this._player,
				scene: this.getPageLabel(),
				type: type,
				action_number: action_number,
				action_value: action_value,
			})
			// .done(function(data) {
			// 	console.log(data);
			// })
		;
	};

	/**
	 * @override
	 */
	MPlayPage.prototype.createInteractableObject = function(obj, params) {
		var pageObj = this;
		var type = params.type;
		if (type == "character") {
			var tripledot = this.createImage("/static/gnovel/res/textures/ui/speech bubble-indicator_wDots.png", new THREE.Vector3(params.x, 20 + params.y + params.height / 2, params.z + 10), 81.25, 54);
			this._addToScene(tripledot)
			pageObj.tweenPulse(tripledot, {
				x: 1.2,
				y: 1.2,
				z: 1,
				duration: 650,
				repeat: true
			});
		}

		var onClick = function(io) {
			if (typeof obj === 'object') {
				pageObj.log("interactable", pageObj._ioNumber, "phone notification");
			} else {
				pageObj.log("interactable", pageObj._ioNumber, obj);
			}

			pageObj._ioNumber++;
		};

		var onEnableChange = function(io) {
			if (!io.isEnabled()) {
				pageObj._removeFromScene(tripledot);
			}
			if (io.isEnabled()) {
				pageObj._addToScene(tripledot);
			}
		};
		params.onEnableChange = onEnableChange;

		if (params.onClick) {
			var oriClick = params.onClick;
			params.onClick = function(io) {
				onClick(io);
				oriClick(io);
			};
		} else {
			params.onClick = onClick;
		}

		return GNOVEL.Page.prototype.createInteractableObject.call(this, obj, params);
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._showChoices = function(choicesArr, responsesArr, params, jumpArr) {
		params.jumpArr = jumpArr;

		var choices = new MPLAY.MPlayChoices(this, choicesArr, responsesArr, this._result, params);
	};

	//function for temporary dialog that should not cause flow to progress
	MPlayPage.prototype._showTempDialog = function(message, x, y, params) {
		params = params || {};
		var flowElement = params.flowElement;

		var speaker = flowElement.speaker;
		var expression = null;

		var textId = 0;


		params.bgPath = "/static/gnovel/res/textures/ui/Left Bubble.png";
		params.bgOffsetY = 10;
		params.bgOffsetX = 0;
		y = -100;
		params.speakerOffsetX = -30;
		params.speakerOffsetY = 10;
		params.bgWidth = 325;
		params.bgHeight = 221;
		params.showSpeaker = false;
		params.charLine = 30;
		params.unclickable = true;

		var chara = null;

		if (speaker === this._ryan) {
			chara = MPlayPage._ryan;
		} else if (speaker === this._priya) {
			chara = MPlayPage._priya;
		} else if (speaker === this._cat) {
			chara = MPlayPage._cat;
		} else if (speaker === this._professor) {
			chara = MPlayPage._professor;
		}

		if (chara != null) {
			if (chara.getCharPosition() === "left") {
				console.log("left");
				x = -60;
				params.bgPath = "/static/gnovel/res/textures/ui/Left Bubble.png";
			} else if (chara.getCharPosition() === "center") {
				console.log("center");
				x = 0;
				params.bgPath = "/static/gnovel/res/textures/ui/Middle Bubble.png";
			} else if (chara.getCharPosition() === "right") {
				console.log("right");
				x = 60;
				params.bgPath = "/static/gnovel/res/textures/ui/Right Bubble.png";
			}
		}
		var dialog = GNOVEL.Page.prototype._showTempDialog.call(this, message, x, y, params);
		return dialog;
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._showDialog = function(message, x, y, params) {
		params = params || {};
		var flowElement = params.flowElement;

		var speaker = flowElement.speaker;
		var relationshipScore = this._relationshipManager.getRelationship(speaker);
		var relationshipThreshold = flowElement.relationshipThreshold;
		var expression = null;

		var textId = 0;

		// threshold values
		if (typeof relationshipThreshold !== 'undefined') {
			if (relationshipScore >= relationshipThreshold) {
				message = flowElement.text;
			} else {
				message = flowElement.text2;
				textId = 1;
			}
		}

		params.bgPath = "/static/gnovel/res/textures/ui/Left Bubble.png";
		params.bgOffsetY = 10;
		params.bgOffsetX = 0;
		y = -100;
		params.speakerOffsetX = -30;
		params.speakerOffsetY = 10;
		params.bgWidth = 325;
		params.bgHeight = 221;
		params.showSpeaker = false;
		params.charLine = 30;
		//params.font = "25px NoteworthyLight";

		var chara = null;

		if (speaker === this._ryan) {
			chara = MPlayPage._ryan;
		} else if (speaker === this._priya) {
			chara = MPlayPage._priya;
		} else if (speaker === this._cat) {
			chara = MPlayPage._cat;
		} else if (speaker === this._professor) {
			chara = MPlayPage._professor;
		}

		if (chara != null) {
			if (chara.getCharPosition() === "left") {
				// console.log("left");
				x = -60;
				params.bgPath = "/static/gnovel/res/textures/ui/Left Bubble.png";
			} else if (chara.getCharPosition() === "center") {
				// console.log("center");
				x = 0;
				params.bgPath = "/static/gnovel/res/textures/ui/Middle Bubble.png";
			} else if (chara.getCharPosition() === "right") {
				// console.log("right");
				x = 60;
				params.bgPath = "/static/gnovel/res/textures/ui/Right Bubble.png";
			}
		}

		var dialog = GNOVEL.Page.prototype._showDialog.call(this, message, x, y, params);
		return dialog;
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._show = function(obj, params) {
		params = params || {};
		var flowElement = params.flowElement;
		var img = obj;
		var pageObj = this;
		var isChar = false;

		// position is specific to MPLAY, it is not part of GNOVEL
		var position = params.flowElement.position;

		// check if the object is character
		if (obj instanceof MPLAY.Character) {
			img = obj.getImage(flowElement.expression);
			isChar = true;
		}

		if (position === "left") {
			img.position.x = -300;
		} else if (position === "center") {
			img.position.x = 0;
		} else if (position === "right") {
			img.position.x = 450;
		}

		if (isChar) {
			if (position === "center") {
				img.position.z = this._characterLayer + 10;
			} else {
				img.position.z = this._characterLayer;
			}

			if (position === "center" || position === "right" || position === "left") {
				//console.log("set " + obj.getName() + " " + position);
				obj.setCharPosition(position);
			}
		}

		if(isChar && img.hasOwnProperty("oriScale") ) {
			if (params.flowElement.flip === true) {
				img.scale.x = -img.oriScale.x;
			} else {
				img.scale.x = img.oriScale.x;
			}
		}else{
			if (params.flowElement.flip === true) {
				img.scale.x = -Math.abs(img.scale.x);
			} else {
				img.scale.x = Math.abs(img.scale.x);
			}
		}

		// console.log("show something");

		// check if the object is character
		if (isChar && obj.getVisibleImage() !== null) {
			var characterTweenParam = {
				duration: 200
			};

			// if(obj.getVisibleImage() instanceof MPLAY.SpineAnimation) {
			// 	characterTweenParam.arr = img.meshes
			// }

			if (img instanceof MPLAY.SpineAnimation) {
				params.arr = img.meshes;
			}

			characterTweenParam.onComplete = function() {
				GNOVEL.Page.prototype._show.call(pageObj, img, params)
			};

			obj.fadeVisibleImages(this, characterTweenParam);
		} else {

			if (img instanceof MPLAY.SpineAnimation) {
				params.arr = img.meshes;
			}

			GNOVEL.Page.prototype._show.call(this, img, params);
		}
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._hide = function(obj, params) {
		params = params || {};

		var img = obj;

		// check if the object is character
		if (obj instanceof MPLAY.Character) {
			// search for texture that has opacity not zero
			img = obj.getVisibleImage();

			// if null, then we are just going to hide the default image
			if (img === null) {
				img = obj.getImage(null);
			}

			if(img instanceof MPLAY.SpineAnimation) {
				params.arr = img.meshes;
			}
		}

		GNOVEL.Page.prototype._hide.call(this, img, params);
	};

	MPlayPage.prototype._update = function() {

		if(!MPlayPage._isCharInit) {
			return;
		}

		MPlayPage._ryan.update();
		MPlayPage._cat.update();
		MPlayPage._priya.update();
		MPlayPage._professor.update();
	};

	MPlayPage.prototype.setupClassBackground = function() {
		this.setBackground("/static/gnovel/res/textures/backgrounds/classroom background.png");

		var background2 = this.createImage("/static/gnovel/res/textures/backgrounds/classroom foreground.png", new THREE.Vector3(0, 0, this._background3Layer), 1920, 1080);
		this._addToScene(background2);
	};

	MPlayPage.prototype.setupUcBackground = function() {
		this.setBackground("/static/gnovel/res/textures/backgrounds/uce background png.png");

		var background2 = this.createImage("/static/gnovel/res/textures/backgrounds/uce middleground png.png", new THREE.Vector3(0, -30, this._background2Layer), 1920, 1080);
		this._addToScene(background2);

		var background3 = this.createImage("/static/gnovel/res/textures/backgrounds/uc foreground png.png", new THREE.Vector3(0, 0, this._background3Layer), 1920, 1080);
		this._addToScene(background3);
	};

	MPlayPage.prototype.setupLibraryBackground = function() {
		this.setBackground("/static/gnovel/res/textures/backgrounds/library.png");
	};

	MPlayPage.prototype.setupBarBackground = function() {
		this.setBackground("/static/gnovel/res/textures/backgrounds/bar.png");
	};

	MPlayPage.prototype.setupCafeBackground = function() {
		this.setBackground("/static/gnovel/res/textures/backgrounds/caf full png.png");
	};

	MPlayPage.prototype.setupGymBackground = function() {
		this.setBackground("/static/gnovel/res/textures/backgrounds/gym background.png");
	};

	MPlayPage.prototype.setupHomeBackground = function() {
		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");
	};

	MPlayPage.prototype.setupOfficeBackground = function() {
		this.setBackground("/static/gnovel/res/textures/backgrounds/professor office background.png");

		var background2 = this.createImage("/static/gnovel/res/textures/backgrounds/office middle ground.png", new THREE.Vector3(0, -30, this._background2Layer), 1920, 1080);
		this._addToScene(background2);

		var background3 = this.createImage("/static/gnovel/res/textures/backgrounds/ryan office-foreground.png", new THREE.Vector3(200, 0, this._background3Layer), 1920, 1080);
		this._addToScene(background3);
	};

	MPlayPage.prototype.getIntegrityManager = function() {
		return this._integrityManager;
	};

	MPlayPage.prototype.getRelationshipManager = function() {
		return this._relationshipManager;
	};

	MPlayPage.prototype.resetRelationships = function() {
		this._relationshipManager.resetRelationship('cat');
		this._relationshipManager.resetRelationship('priya');
		this._relationshipManager.resetRelationship('ryan');

	};

	// this function is callable, so this may not be referring to MPlayPage class
	MPlayPage.prototype._handlePhoneTextBox = function(obj, flow) {
		var hasParam = GNOVEL.Util.hasParam;
		var params = {};
		params.flowElement = obj;
		params.showSpeaker = false;
		params.charLine = 22;
		params.bgWidth = 300;
		params.bgHeight = 145;
		params.bgOffsetY = -30;
		params.bgOffsetX = 0;
		params.msgOffsetZ = -25;
		params.msgOffsetY = 0;
		params.dontRemove = true;
		params.createNewBg = true;
		//params.bgPath = "/static/gnovel/res/textures/ui/phone_textBox.png";

		params.bgPath = hasParam(obj, "bgPath", null);
		message = obj.text;
		var x = 0;
		var y = 100;
		var z = flow._getPage().getDialogLayer();

		if (typeof obj.y !== 'undefined') {
			y = obj.y;
		}
		if (typeof obj.x !== 'undefined') {
			x = obj.x;
		}
		if (typeof obj.bgWidth !== 'undefined') {
			params.bgWidth = obj.bgWidth;
		}
		if (typeof obj.bgHeight !== 'undefined') {
			params.bgHeight = obj.bgHeight;
		}
		if (typeof obj.bgOffsetY !== 'undefined') {
			params.bgOffsetY = obj.bgOffsetY;
		}
		if (typeof obj.bgOffsetZ !== 'undefined') {
			params.bgOffsetZ = obj.bgOffsetZ;
		}
		if (typeof obj.charLine !== 'undefined') {
			params.charLine = obj.charLine;
		}
		if (typeof obj.msgOffsetY !== 'undefined') {
			params.msgOffsetY = obj.msgOffsetY;
		}
		if (typeof obj.msgOffsetZ !== 'undefined') {
			params.msgOffsetZ = obj.msgOffsetZ;
		}

		if (typeof obj.bgOffsetX !== 'undefined') {
			params.bgOffsetX = obj.bgOffsetX;
		}
		if (typeof obj.dontShowBg !== 'undefined') {
			params.dontShowBg = obj.dontShowBg;
		}
		if (typeof obj.messageAlign !== 'undefined') {
			params.messageAlign = obj.messageAlign;
		}
		params.waitUntilShown = hasParam(obj, "waitUntilShown", true);

		var pageObj = flow._getPage();

		if (params.waitUntilShown) {
			params.onComplete = function() {
				// go to next flow
				pageObj._flow._next();
				pageObj._flow._exec();
			}
		}

		params.center = false;
		var dialog = new GNOVEL.Dialog(flow._getPage(), message, x, y, params);
		flow._storeFlowData(dialog);

		if (!params.waitUntilShown) {
			pageObj._flow._next();
			pageObj._flow._exec();
		}

		flow._getPage().getOwner().getSoundManager().play("Text");
	};
	MPlayPage.prototype._handleAddPhoneTextBox = function(obj, flow) {
		// var hasParam = GNOVEL.Util.hasParam;
		var pageObj = flow._getPage();	
		var params = {};		
		params.text = obj.text;

		params.onComplete = function() {
			pageObj._flow._next();
			pageObj._flow._exec();
		};

		pageObj._phoneInteraction.addText(pageObj, null, params.text, params);

		flow._getPage().getOwner().getSoundManager().play("Text");
	};

	MPlayPage.prototype._handleHidePhoneTextBox = function(obj, flow) {
		var dialog = obj.dialog;
		var duration = obj.duration || 800;
		var pageObj = flow._getPage();

		dialog._closeDialog();

		flow._next();
		flow._exec();
	};

	MPlayPage.prototype._handleShowPhoneNotif = function(obj, flow) {
		var pageObj = flow._getPage();

		pageObj._showPhoneNotification({
			onClick: function() {
				flow._next();
				flow._exec();
			}
		});
	};

	MPlayPage.prototype._handleHidePhoneNotif = function(obj, flow) {
		var pageObj = flow._getPage();
		pageObj._removePhoneNotification();

		pageObj._flow._next();
		pageObj._flow._exec();
	};

	MPlayPage.prototype._handleOpenPhone = function(flowElement, flow) {
		var pageObj = flow._getPage();						
		var params = {};
		params.subject = flowElement.subject;
		params.from = flowElement.from;
		params.email = flowElement.email;
		params.text = flowElement.text;

		params.onComplete = function() {
			pageObj._flow._next();
			pageObj._flow._exec();
		};

		pageObj._phoneInteraction.show(pageObj, flowElement.layout, params);
	};

	MPlayPage.prototype._handleClosePhone = function(flowElement, flow) {
		var pageObj = flow._getPage();				

		var params = {};
		params.onComplete = function() {
			pageObj._flow._next();
			pageObj._flow._exec();
		};

		pageObj._phoneInteraction.hide(pageObj, params);
	};

	MPlayPage.prototype._handleShowContext = function(obj, flow) {
		var pageObj = flow._getPage();
		var hasParam = GNOVEL.Util.hasParam;
		var params = {};
		//params.type = "context";
		params.flowElement = obj;
		params.showSpeaker = false;
		params.charLine = 30;
		params.messageAlign = "left";
		params.msgOffsetY = 25;
		//params.dontRemove = true;
		//	params.createNewBg = true;
		//params.speaker = "Context";
		params.width = 100;
		params.font = "20px Bevan";
		// params.center = true;
		params.type = "context";

		message = obj.text;
		var x = -500;
		var y = 230;

		var toX;
		var toY;

		params.bgPath = "/static/gnovel/res/textures/ui/context_box.png";
		params.bgWidth = 520;
		params.bgHeight = 90;
		params.bgOffsetY = 40;
		params.bgOffsetX = 100;
		params.waitUntilShown = hasParam(obj, "waitUntilShown", true);

		//var dialog = new GNOVEL.Dialog(flow._getPage(), message, x, y, params);
		var dialog = GNOVEL.Page.prototype._showDialog.call(flow._getPage(), message, x, y, params);
	};

	MPlayPage.prototype.showBgFilter = function() {		
 		//can also use this._background3Layer for the z-position		
 		this._filter = this.createImage("/static/gnovel/res/textures/ui/bg_filter_4.png",new THREE.Vector3(0, 0, this._choicesLayer-20), 1430, 830);		
 		this._filter.material.opacity = 0;		
 		this._addToScene(this._filter);		
 		
 		//play animation effect for filter		
 		this.tweenFlash(this._filter,{		
 			opacityTo: 0.5,		
 			opacityFrom:0.2,		
 			duration: 2000,		
 			easing: TWEEN.Easing.Linear.Out,		
 			easingFrom:TWEEN.Easing.Linear.In		
 		});		
 	};		
 		
 	MPlayPage.prototype.hideBgFilter = function() {		
 		this._removeFromScene(this._filter);		
 	};


	MPLAY.MPlayPage = MPlayPage;
}());