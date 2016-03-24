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
		}

		// we will also have only one instance of RelationshipManager
		if (MPlayPage._relationshipManager == null) {
			this._relationshipManager = new MPLAY.RelationshipManager();
		}

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

		// instantiate characters, if it is not instantiated yet
		if (!MPlayPage._isCharInit) {
			this._initChars();
		}

		// set object tags for the characters, so that we can refer it in the flow
		this._setObjectTag(MPlayPage._ryan.getName(), MPlayPage._ryan);
		this._setObjectTag(MPlayPage._cat.getName(), MPlayPage._cat);
		this._setObjectTag(MPlayPage._professor.getName(), MPlayPage._professor);
		this._setObjectTag(MPlayPage._priya.getName(), MPlayPage._priya);

		this._professor = MPlayPage._professor.getName();
		this._ryan = MPlayPage._ryan.getName();
		this._cat = MPlayPage._cat.getName();
		this._priya = MPlayPage._priya.getName();

		this._player = document.getElementById("username").innerHTML;

		// hide all characters
		MPlayPage._professor.hideAllImages();
		MPlayPage._ryan.hideAllImages();
		MPlayPage._cat.hideAllImages();
		MPlayPage._priya.hideAllImages();

		// add custom flow handler
		this._flow._addCustomHandler("phone_textbox", this._handlePhoneTextBox);
		this._flow._addCustomHandler("hide_phone_textbox", this._handleHidePhoneTextBox);
		this._flow._addCustomHandler("show_phone_notif", this._handleShowPhoneNotif);
		this._flow._addCustomHandler("hide_phone_notif", this._handleHidePhoneNotif);
		this._flow._addCustomHandler("show_context", this._handleShowContext);
	};

	MPlayPage.prototype = Object.create(GNOVEL.Page.prototype);
	MPlayPage.prototype.constructor = MPlayPage;

	// class static variable
	MPlayPage._integrityManager = null;
	MPlayPage._relationshipManager = null;

	// characters stored as class static variable
	// so that we can reuse it throughout the pages
	MPlayPage._ryan = null;
	MPlayPage._cat = null;
	MPlayPage._professor = null;
	MPlayPage._priya = null;
	MPlayPage._isCharInit = false;

	MPlayPage.prototype._initChars = function() {
		MPlayPage._ryan = new MPLAY.Character(this.createImage("/static/gnovel/res/textures/char/ryan-neutral.png", new THREE.Vector3(0, -200, this._characterLayer), 414, 923), "Ryan");
		MPlayPage._ryan.setExpression("happy", this.createImage("/static/gnovel/res/textures/char/ryan-happy.png", new THREE.Vector3(0, -200, this._characterLayer), 600, 923), "Ryan");
		MPlayPage._ryan.setExpression("sad", this.createImage("/static/gnovel/res/textures/char/sad ryan.png", new THREE.Vector3(0, -210, this._characterLayer), 467, 923), "Ryan");
		MPlayPage._ryan.setExpression("thoughtful", this.createImage("/static/gnovel/res/textures/char/thoughtful ryan png.png", new THREE.Vector3(0, -200, this._characterLayer), 404, 923), "Ryan");
		MPlayPage._ryan.setExpression("angry", this.createImage("/static/gnovel/res/textures/char/ryan-angry.png", new THREE.Vector3(0, -200, this._characterLayer), 845, 920), "Ryan");

		MPlayPage._cat = new MPLAY.Character(this.createImage("/static/gnovel/res/textures/char/cat-neutral.png", new THREE.Vector3(0, -160, this._characterLayer), 247, 785), "Cat");
		MPlayPage._cat.setExpression("happy", this.createImage("/static/gnovel/res/textures/char/happy cat.png", new THREE.Vector3(0, -160, this._characterLayer), 400, 785), "Cat");
		MPlayPage._cat.setExpression("angry", this.createImage("/static/gnovel/res/textures/char/cat-annoyed.png", new THREE.Vector3(0, -160, this._characterLayer), 324, 785), "Cat");

		MPlayPage._priya = new MPLAY.Character(this.createImage("/static/gnovel/res/textures/char/priya-neutral-colored.png", new THREE.Vector3(0, -180, this._characterLayer), 400, 802), "Priya");
		MPlayPage._priya.setExpression("happy", this.createImage("/static/gnovel/res/textures/char/priya-happy-colored trim.png", new THREE.Vector3(0, -180, this._characterLayer), 360, 868), "Priya");
		MPlayPage._priya.setExpression("thoughtful", this.createImage("/static/gnovel/res/textures/char/thoughtful-priya.png", new THREE.Vector3(0, -180, this._characterLayer), 500, 745), "Priya");
		MPlayPage._priya.setExpression("sad", this.createImage("/static/gnovel/res/textures/char/sad priya.png", new THREE.Vector3(0, -180, this._characterLayer), 400, 816), "Priya");

		MPlayPage._professor = new MPLAY.Character(this.createImage("/static/gnovel/res/textures/char/sweeney-neutral.png", new THREE.Vector3(0, -230, this._characterLayer), 600, 1030), "Prof. Sweeney");
		MPlayPage._professor.setExpression("happy", this.createImage("/static/gnovel/res/textures/char/Sweeney-Happy.png", new THREE.Vector3(0, -270, this._characterLayer), 469, 1030), "Prof. Sweeney");
		MPlayPage._professor.setExpression("sad", this.createImage("/static/gnovel/res/textures/char/sweeney-dissapointed.png", new THREE.Vector3(0, -270, this._characterLayer), 426, 1030), "Prof. Sweeney");

		MPlayPage._isCharInit = true;
	};

	MPlayPage.prototype._initPhoneNotification = function() {
		this._phoneNotifImg = this.createImage("/static/gnovel/res/textures/ui/phone_notify.png", new THREE.Vector3(0, 0, 0), 150, 155);

		this._closephoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 160), 519, 950);
		this._closephoneImg.material.opacity = 0;
		this._closephone = "closephone";
		this._setObjectTag(this._closephone, this._closephoneImg);
	};

	MPlayPage.prototype._showPhoneNotification = function(params) {
		var pageObj = this;

		this._notifIo = this.createInteractableObject(
			this._phoneNotifImg,
			//"/static/gnovel/res/textures/ui/phone_notification.png",
			{x: -440, y: -220, z: -this.getOwner().getCamera().position.z + this._uiLayer, width : 150, height : 155,
				onClick: function(io) {
					if(params.onClick) {
						params.onClick();
						pageObj._removePhoneNotification();
					}
				}
			});

		this._notifIo.getImage().material.opacity = 0;

		this._owner.getCamera().add(this._notifIo.getImage());

		//Flashes image
		this.tweenFlash(this._notifIo.getImage(), {
			//opacity: 1,
			easing: TWEEN.Easing.Cubic.Out,
			duration: 800,
		});

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
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._onStart = function() {
	};

	MPlayPage.prototype.log = function(type, action_number, action_value) {
		$.post("/gnovel/log/",
		{ 	name: this._player,
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

		var tripledot = this.createImage("/static/gnovel/res/textures/ui/speech bubble-indicator_wDots.png", new THREE.Vector3(params.x, 20 + params.y + params.height / 2, params.z + 10), 81.25, 54);
		this._addToScene(tripledot)

		var onClick = function(io) {
			if(typeof obj === 'object') {
				pageObj.log("interactable", pageObj._ioNumber, "phone notification");
			}else{
				pageObj.log("interactable", pageObj._ioNumber, obj);
			}

			pageObj._ioNumber++;
		};

		var onEnableChange = function(io) {
			if(!io.isEnabled()) {
				pageObj._removeFromScene(tripledot);
			}
		};
		params.onEnableChange = onEnableChange;

		if(params.onClick) {
			var oriClick = params.onClick;
			params.onClick = function(io) {
				onClick(io);
				oriClick(io);
			};
		}else{
			params.onClick = onClick;
		}

		return GNOVEL.Page.prototype.createInteractableObject.call(this, obj, params);
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._showChoices = function(choicesArr, params, jumpArr) {
		params = params || {};
		var flowElement = params.flowElement;
		var integrityManager = this._integrityManager;
		var relationshipManager = this._relationshipManager;
		var pageObj = this;

		var choicesTextBg = [];

		params.x = -350;
		params.y = -100;
		params.gapX = 350;
		params.gapY = 0;
		params.charLine = 30;
		params.posArr = {};

		var oneLineY = -220;
		var twoLineY = -200;
		var threeLineY = -180;

		var oneLineSize = {width: 209.875, height: 29.6875};

		if(choicesArr.length == 2) {
			params.x = -180;
			params.gapX = 400;
		}

		for(var i=0;i<choicesArr.length;i++) {
			var choiceText = choicesArr[i];
			params.posArr[i] = new THREE.Vector3();
			params.posArr[i].x = params.x;

			var textBg = null;

			// if(choiceText.length < 30) {
			// 	params.posArr[i].y = oneLineY;

			// 	textBg = this.createImage("/static/gnovel/res/textures/ui/text1line_wOutline.png", new THREE.Vector3(params.x + params.gapX * i, params.posArr[i].y - 20, this._uiLayer - 40), 320.7, 44.53125);
			// }else if(choiceText.length>=30 && choiceText.length<60){
				params.posArr[i].y = twoLineY;

				textBg = this.createImage("/static/gnovel/res/textures/ui/textmultiline_wOutline.png", new THREE.Vector3(params.x + params.gapX * i - 15, params.posArr[i].y - 30, this._uiLayer - 40), 320.7, 127.2);
			// }else if(choiceText.length>=60) {
				// params.posArr[i].y = threeLineY;

				// textBg = this.createImage("/static/gnovel/res/textures/ui/textmultiline_wOutline.png", new THREE.Vector3(params.x + params.gapX * i - 5, params.posArr[i].y - 50, this._uiLayer - 40), 320.7, 160);
			// }

			textBg.material.opacity = 0;

			this.tweenMat(textBg, {
				duration: 800,
				opacity: 1,
				easing: TWEEN.Easing.Cubic.Out
			});

			this._addToScene(textBg);
			choicesTextBg.push(textBg);
		}

		var onChoiceComplete = function(resultId) {

			for(var i=0;i<choicesTextBg.length;i++) {
				pageObj._removeFromScene(choicesTextBg[i]);
			}

			// if flowElement is not defined and not null (not falsy)
			if (flowElement != null) {
				if (typeof flowElement.choices[resultId].integrityScore !== 'undefined' &&
					flowElement.choices[resultId].integrityScore != null) {

					integrityManager.addIntegrity(flowElement.choices[resultId].integrityScore);
				}

				if (typeof flowElement.choices[resultId].relationship !== 'undefined' &&
					flowElement.choices[resultId].relationship != null) {

					var name = flowElement.choices[resultId].relationship.name;
					var score = flowElement.choices[resultId].relationship.score;
					relationshipManager.addRelationship(name, score);
				}

				var choiceValue = flowElement.choices[resultId].text;
				pageObj.log("choice", pageObj._choiceNumber, choiceValue);
				pageObj._choiceNumber++;
			}
		};

		// if there is arelady params.onChoiceComlete defined
		if (!params.onChoiceComplete) {
			params.onChoiceComplete = onChoiceComplete;
		} else {
			var oriChoiceComplete = params.onChoiceComplete;
			params.onChoiceComplete = function(resultId) {
				oriChoiceComplete(resultId);
				onChoiceComplete(resultId);
			};
		}

		GNOVEL.Page.prototype._showChoices.call(this, choicesArr, params, jumpArr);
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

		params.bgPath = "/static/gnovel/res/textures/ui/textmultiline_wOutline.png";
		params.bgOffsetY = 10;
		params.bgOffsetX = 20;
		y = -200;
		params.speakerOffsetX = -30;
		params.speakerOffsetY = 10;

		GNOVEL.Page.prototype._showDialog.call(this, message, x, y, params);
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._show = function(obj, params) {
		params = params || {};
		var flowElement = params.flowElement;
		var img = obj;
		var pageObj = this;

		// position is specific to MPLAY, it is not part of GNOVEL
		var position = params.flowElement.position;

		// check if the object is character
		if (obj instanceof MPLAY.Character) {
			img = obj.getImage(flowElement.expression);
		}

		if (position === "left") {
			img.position.x = -300;
		} else if (position === "center") {
			img.position.x = 0;
		} else if (position === "right") {
			img.position.x = 450;
		}

		if (params.flowElement.flip === true) {
			img.scale.x = -1;
		} else {
			img.scale.x = 1;
		}

		// check if the object is character
		if (obj instanceof MPLAY.Character && obj.getVisibleImage() !== null) {
			var characterTweenParam = {
				duration: 200
			};
			characterTweenParam.onComplete = function() {
				GNOVEL.Page.prototype._show.call(pageObj, img, params)
			};

			obj.fadeVisibleImages(this, characterTweenParam);
		} else {
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
		}

		GNOVEL.Page.prototype._hide.call(this, img, params);
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
		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");
	};

	MPlayPage.prototype.setupHomeBackground = function() {
		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");
	};

	MPlayPage.prototype.getIntegrityManager = function() {
		return this._integrityManager;
	};

	MPlayPage.prototype.getRelationshipManager = function() {
		return this._relationshipManager;
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
		if(typeof obj.bgWidth !== 'undefined') {
			params.bgWidth = obj.bgWidth;
		}
		if(typeof obj.bgHeight !== 'undefined') {
			params.bgHeight = obj.bgHeight;
		}
		if(typeof obj.bgOffsetY !== 'undefined') {
			params.bgOffsetY = obj.bgOffsetY;
		}
		if(typeof obj.bgOffsetZ !== 'undefined') {
			params.bgOffsetZ = obj.bgOffsetZ;
		}
		if(typeof obj.charLine !== 'undefined') {
			params.charLine = obj.charLine;
		}
		if(typeof obj.msgOffsetY !== 'undefined') {
			params.msgOffsetY = obj.msgOffsetY;
		}
		if(typeof obj.msgOffsetZ !== 'undefined') {
			params.msgOffsetZ = obj.msgOffsetZ;
		}
		params.bgPath = hasParam(obj, "bgPath", null);
		if(typeof obj.bgOffsetX !== 'undefined') {
			params.bgOffsetX = obj.bgOffsetX;
		}
		if(typeof obj.dontShowBg !== 'undefined') {
			params.dontShowBg = obj.dontShowBg;
		}
		if(typeof obj.messageAlign !== 'undefined') {
			params.messageAlign = obj.messageAlign;
		}
		params.waitUntilShown = hasParam(obj, "waitUntilShown", true);

		var pageObj = flow._getPage();

		if(params.waitUntilShown) {
			params.onComplete = function() {
				// go to next flow
				pageObj._flow._next();
				pageObj._flow._exec();
			}
		}

		var dialog = new GNOVEL.Dialog(flow._getPage(), message, x, y, params);
		flow._storeFlowData(dialog);

		if(!params.waitUntilShown) {
			pageObj._flow._next();
			pageObj._flow._exec();
		}

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

		pageObj._showPhoneNotification({onClick:function() {
			flow._next();
			flow._exec();
		}});
	};

	MPlayPage.prototype._handleHidePhoneNotif = function(obj, flow) {
		var pageObj = flow._getPage();
		pageObj._removePhoneNotification();

		pageObj._flow._next();
		pageObj._flow._exec();
	};

	MPlayPage.prototype._handleShowContext = function(obj, flow) {
		var pageObj = flow._getPage();
		var params = {};
		params.flowElement = obj;
		params.showSpeaker = false;
		params.charLine = 60;
		//params.speaker = "Context";
		params.width = 200;
		params.font = "30px SF_Toontime Bold Italic";


		message = obj.text;
		var x = -400;
		var y = 230;

		params.bgPath = "/static/gnovel/res/textures/ui/context_box.png";
		params.bgWidth = 400;
		params.bgHeight = 75;
		params.bgOffsetY = 40;
		params.bgOffsetX = -40;

		var dialog = GNOVEL.Page.prototype._showDialog.call(flow._getPage(), message, x, y, params);
		flow._storeFlowData(dialog);
	};

	MPLAY.MPlayPage = MPlayPage;
}());
