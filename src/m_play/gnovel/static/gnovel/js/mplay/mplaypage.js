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
		this._uiLayer = 250;

		// for logging
		this._choiceNumber = 0;
		this._ioNumber = 0; // io stands for interactable object

		// for background postprocessing
		this._sceneBg = null;
		this._pageSceneBg = new THREE.Object3D();

		if (MPlayPage._phoneInteraction == null) {
			this._initPhoneInteraction();
		} else {
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
		this._flow._addCustomHandler("show_ed_context", this._handleShowEdContext);
	};

	MPlayPage.prototype = Object.create(GNOVEL.Page.prototype);
	MPlayPage.prototype.constructor = MPlayPage;

	// class static variable
	MPlayPage._integrityManager = null;
	MPlayPage._relationshipManager = null;
	MPlayPage._phoneInteraction = null;
	MPlayPage._sceneBg = null; // for all pages
	MPlayPage._pageSceneBg = null; // page will add bg to this object instead of directly to _sceneBg

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
	MPlayPage._isBgProcessingInit = false;
	MPlayPage._anims = {};

	MPlayPage._hblur = null;
	MPlayPage._vblur = null;
	MPlayPage._vignetteOffset = null;
	MPlayPage._vignetteDarkness = null;

	MPlayPage.prototype._initChars = function() {

		MPlayPage._ryan = new MPLAY.Character(MPlayPage._anims["ryan neutral"], "Ryan");
		// MPlayPage._ryan.setExpression("happy", this.createImage("/static/gnovel/res/textures/char/ryan-happy.png", new THREE.Vector3(0, -200, this._characterLayer), 600, 923), "Ryan");
		MPlayPage._ryan.setExpression("very happy", MPlayPage._anims["ryan happy"], "Ryan");
		MPlayPage._ryan.setExpression("happy", MPlayPage._anims["ryan happy 2"], "Ryan");
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
		//this._setMultiTracksPlayer();
	};

	MPlayPage.prototype._initAnim = function() {
		this._createAnim("ryan neutral", "/static/gnovel/res/animation/", 0.8, new THREE.Vector3(0, -260, this._characterLayer));
		this._createAnim("ryan angry", "/static/gnovel/res/animation/", 0.8, new THREE.Vector3(0, -130, this._characterLayer));
		this._createAnim("ryan happy", "/static/gnovel/res/animation/", 0.8, new THREE.Vector3(0, -130, this._characterLayer)).oriScale = {
			x: -1,
			y: 1
		};
		this._createAnim("ryan happy 2", "/static/gnovel/res/animation/", 0.8, new THREE.Vector3(0, -130, this._characterLayer));
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

	MPlayPage.prototype._initBgProcessing = function() {
		var sceneBg = new THREE.Scene();
		var page = this;
		var width = this._owner._getWidth();
		var height = this._owner._getHeight();
		var effectHBlur = new THREE.ShaderPass(THREE.HorizontalBlurShader);
		var effectVBlur = new THREE.ShaderPass(THREE.VerticalBlurShader);
		effectHBlur.uniforms['h'].value = 0; // 2 / width
		effectVBlur.uniforms['v'].value = 0; // 2 / height
		effectVBlur.renderToScreen = false;
		MPlayPage._hblur = effectHBlur.uniforms['h'];
		MPlayPage._vblur = effectVBlur.uniforms['v'];

		var shaderVignette = THREE.VignetteShader;
		var effectVignette = new THREE.ShaderPass(shaderVignette);
		effectVignette.uniforms["offset"].value = 0; // 0.95
		effectVignette.uniforms["darkness"].value = 0; // 1.6
		effectVignette.renderToScreen = true;
		MPlayPage._vignetteOffset = effectVignette.uniforms["offset"];
		MPlayPage._vignetteDarkness = effectVignette.uniforms["darkness"];

		// background processing render target parameters
		var bgRtParameters = {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBFormat,
			stencilBuffer: true,
		};

		var renderBgPass = new THREE.RenderPass(sceneBg, this._owner.getCamera());
		renderBgPass.clear = true;

		var sceneBgComposer = new THREE.EffectComposer(this._owner._getRenderer(), new THREE.WebGLRenderTarget(width, height, bgRtParameters));

		sceneBgComposer.addPass(renderBgPass);
		sceneBgComposer.addPass(effectHBlur);
		sceneBgComposer.addPass(effectVBlur);
		sceneBgComposer.addPass(effectVignette);

		// override gnovel's render function
		this._owner._render = function() {
			this._renderer.clear();
			sceneBgComposer.render(0.01);
			this._renderer.clear(false, true, false); // clear the depth buffer
			this._renderer.render(this._scene, this._camera);

			this._renderer.render(this._rttScene, this._camera);
		};

		// override gnovel's runTransition function
		this._owner._runTransition = function(curPage, nextPage, transitionType) {
			var gnovel = this;

			this._renderer.clear();
			sceneBgComposer.render(0.01);
			this._renderer.clear(false, true, false); // clear the depth buffer
			this._renderer.render(this._scene, this._camera);

			// render current page's scene bg to render target
			this._renderer.render(curPage._getPageSceneBg(), this._camera, this._rtTexture, true);
			this._renderer.render(this._scene, this._camera, this._rtTexture, false);

			// render next page's scene bg to render target
			this._renderer.render(nextPage._getPageSceneBg(), this._camera, this._nextPageRT, true);

			this._renderer.render(this._rttScene, this._camera);

			GNOVEL.Gnovel.prototype._runTransition.call(this, curPage, nextPage, transitionType);
		};

		this._sceneBg = sceneBg;
		MPlayPage._sceneBg = sceneBg;
	};

	MPlayPage.prototype._getPageSceneBg = function() {
		return this._pageSceneBg;
	};

	MPlayPage.prototype._getSceneBg = function() {
		return this._sceneBg;
	};

	MPlayPage.prototype._setEffect = function(value) {
		this._useEffect = value;
	};

	MPlayPage.prototype._setBlurBgEffect = function(params) {
		params = params || {};

		if (!this._useEffect)
			return;

		var width = this._owner._getWidth();
		var height = this._owner._getHeight();
		var duration = 2000;
		var targetBlurH = params.blurH || 2 / width;
		var targetBlurV = params.blurV || 2 / height;
		var vignetteOffset = params.vignetteOffset || 0.95;
		var vignetteDarkness = params.vignetteDarkness || 1.6;
		var pageObj = this;

		if (params.clear) {
			targetBlurH = 0;
			targetBlurV = 0;
			vignetteOffset = 0;
			vignetteDarkness = 0;
		}

		var t1 = new TWEEN.Tween(MPlayPage._hblur)
			.to({
				value: targetBlurH,
			}, duration)
			.easing(TWEEN.Easing.Cubic.Out);
		t1.start();
		var t2 = new TWEEN.Tween(MPlayPage._vblur)
			.to({
				value: targetBlurV,
			}, duration)
			.easing(TWEEN.Easing.Cubic.Out);
		t2.start();
		var t3 = new TWEEN.Tween(MPlayPage._vignetteOffset)
			.to({
				value: vignetteOffset,
			}, duration)
			.easing(TWEEN.Easing.Cubic.Out);
		t3.start();
		var t4 = new TWEEN.Tween(MPlayPage._vignetteDarkness)
			.to({
				value: vignetteDarkness,
			}, duration)
			.easing(TWEEN.Easing.Cubic.Out);
		t4.start();
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
		this._phoneNotifImg = this.createImage("/static/gnovel/res/textures/ui/phone.png", new THREE.Vector3(0, 0, 0), 90, 135);
	};

	MPlayPage.prototype._initPhoneInteraction = function() {
		// the page is only used to initialize some of the variables in phone interaction, the page itself
		// the page won't be referred inside phone interaction
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
		var name = char;
		var score = relationshipManager.getRelationship("Ryan");
		if (score >= 0)
			this._ryan = this.createImage("/static/gnovel/res/textures/char/ryan_happy_box.png", new THREE.Vector3(-300, 260, this._dialogLayer), 100, 100);
		else if (score < 0)
			this._ryan = this.createImage("/static/gnovel/res/textures/char/ryan_angry_box.png", new THREE.Vector3(-300, 260, this._dialogLayer), 100, 100);

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
			.to({
				y: .05,
				z: .05
			}, duration)
			.easing(TWEEN.Easing.Linear.None)
			.yoyo(true)
			.repeat(Infinity)
			.onComplete(function() {});

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

		// blurring parameters
		this._softBlurH = 1 / this._owner._getWidth();
		this._softBlurV = 1 / this._owner._getHeight();
		this._hardBlurH = 2 / this._owner._getWidth();
		this._hardBlurV = 2 / this._owner._getHeight();
		this._softVignetteOffset = 0.45;
		this._softVignetteDarkness = 0.8;
		this._hardVignetteOffset = 0.95;
		this._hardVignetteDarkness = 1.6;
		this._useEffect = true;

		if (!MPlayPage._isBgProcessingInit) {
			this._initBgProcessing();
			MPlayPage._isBgProcessingInit = true;
		} else {
			this._sceneBg = MPlayPage._sceneBg;
		}

		GNOVEL.Page.prototype._onLoad.call(this);
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._onUnload = function() {
		//reset camera look at direction
		var cameraMove = new GNOVEL.CameraMove(this.getOwner(), this);
		cameraMove.resetCamDirection();
		this._sceneBg.remove(this._pageSceneBg);

		// deblur
		this._setBlurBgEffect({
			clear: true
		});

		GNOVEL.Page.prototype._onUnload.call(this);
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._onStart = function() {
		GNOVEL.Page.prototype._onStart.call(this);

		// add this page's scene bg to overall scene bg
		this._sceneBg.add(this._pageSceneBg);
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._runFlow = function() {

		// dont init char, init anim first for now!
		if (!MPlayPage._isAnimInit) {
			this._initAnim();
		} else if (MPlayPage._isCharInit && MPlayPage._isAnimInit) {

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

		var onClick = function(io) {
			if (typeof obj === 'object') {
				pageObj.log("interactable", pageObj._ioNumber, "phone notification");
			} else {
				pageObj.log("interactable", pageObj._ioNumber, obj);
			}

			pageObj._ioNumber++;
		};

		if (params.onClick) {
			var oriClick = params.onClick;
			params.onClick = function(io) {
				onClick(io);
				oriClick(io);
			};
		} else {
			params.onClick = onClick;
		}

		var mouseDownListener = null;
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

			mouseDownListener = function(event) {
				event.preventDefault();
				var mouse = {};
				mouse.x = event.clientX;
				mouse.y = event.clientY;
				pageObj._owner.calcMousePositionRelativeToCanvas(mouse);

				pageObj._owner._raycaster.setFromCamera(mouse, pageObj._owner.getCamera());
				//create array of objects intersected with
				var intersects = pageObj._owner._raycaster.intersectObjects([tripledot], true);
				if (intersects.length > 0) {
					//run onClick function in the page
					if (params.onClick != null) {
						params.onClick(io);
					}
				}
			};
		}

		var onEnableChange = function(io) {
			if (!io.isEnabled()) {
				pageObj._removeFromScene(tripledot);

				if (mouseDownListener) {
					pageObj.getOwner().removeMouseDownListener(mouseDownListener);
				}
			}
			if (io.isEnabled()) {
				pageObj._addToScene(tripledot);

				if (mouseDownListener) {
					pageObj.getOwner().addMouseDownListener(mouseDownListener);
				}
			}
		};

		params.onEnableChange = onEnableChange;

		var io = GNOVEL.Page.prototype.createInteractableObject.call(this, obj, params);

		return io;
	};

	/**
	 * @override
	 */
	MPlayPage.prototype._showChoices = function(choicesArr, responsesArr, params, jumpArr) {
		params.jumpArr = jumpArr;
		var cameraMove = new GNOVEL.CameraMove(this.getOwner(), this);
		//center camera when choices are shown
		cameraMove.resetCamDirection();

		this._setBlurBgEffect({
			blurH: this._hardBlurH,
			blurV: this._hardBlurV,
			vignetteDarkness: this._hardVignetteDarkness,
			vignetteOffset: this._hardVignetteOffset,
		});
		var pageObj = this;

		var oriOnChoiceComplete = params.onChoiceComplete;
		var softBlurH = this._softBlurH;
		var softBlurV = this._softBlurV;
		var softVignetteDarkness = this._softVignetteDarkness;
		var softVignetteOffset = this._softVignetteOffset;
		var onChoiceComplete = function(resultId) {
			pageObj._setBlurBgEffect({
				//clear: true
				blurH: softBlurH,
				blurV: softBlurV,
				vignetteDarkness: softVignetteDarkness,
				vignetteOffset: softVignetteOffset,
			});
		};

		if (params.onChoiceComplete) {
			params.onChoiceComplete = function(resultId) {
				oriOnChoiceComplete(resultId);
				onChoiceComplete(resultId);
			};
		}else{
			params.onChoiceComplete = onChoiceComplete;
		}

		var choices = new MPLAY.MPlayChoices(this, choicesArr, responsesArr, this._result, params);
	};

	//function for temporary dialog that should not cause flow to progress
	MPlayPage.prototype._showTempDialog = function(message, x, y, params) {
		params = params || {};
		var flowElement = params.flowElement;

		var speaker = flowElement.speaker;
		var expression = null;

		var textId = 0;


		params.bgPath = "/static/gnovel/res/textures/ui/Left BubbleV3.png";
		params.bgOffsetY = 10;
		params.bgOffsetX = 0;
		y = y || -100;
		params.speakerOffsetX = -30;
		params.speakerOffsetY = 10;
		params.bgWidth = params.bWidth || 325;
		params.bgHeight = params.bHeight || 221;
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

		var right = -280;
		var left = 280;
		if (chara != null) {
			if (chara.getCharPosition() === "left") {
				// console.log("left");
				x = -20;
				params.bgPath = "/static/gnovel/res/textures/ui/Left BubbleV3.png";
				params.bgOffsetX = 10;
			} else if (chara.getCharPosition() === "center") {
				// make center box show left or right
				x = Math.random() <= 0.5 ? left : right;
				if (x === left) {
					params.bgPath = "/static/gnovel/res/textures/ui/Left BubbleV3.png";
					//params.msgOffsetX = -100;
					params.bubble = "left";
					params.bgOffsetX = 15;
				} else {
					params.bgPath = "/static/gnovel/res/textures/ui/Right BubbleV3.png";
					params.bubble = "right";
					params.bgOffsetX = 0;
				}
			} else if (chara.getCharPosition() === "right") {
				// console.log("right");
				x = 100;
				params.bgPath = "/static/gnovel/res/textures/ui/Right BubbleV3.png";
				//params.msgOffsetX = -120;
				params.bgOffsetX = 15;
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

		//params.bgPath = "/static/gnovel/res/textures/ui/Left BubbleV3.png";
		params.bgOffsetY = 30;
		params.bgOffsetX = 0;
		y = -80;
		params.speakerOffsetX = -30;
		params.speakerOffsetY = 10;
		params.bgWidth = 360;
		params.bgHeight = 265;
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

		var right = -280;
		var left = 280;
		if (chara != null) {
			if (chara.getCharPosition() === "left") {
				// console.log("left");
				x = -20;
				params.bgPath = "/static/gnovel/res/textures/ui/Left BubbleV3.png";
				params.bgOffsetX = 10;
			} else if (chara.getCharPosition() === "center") {
				// make center box show left or right
				x = Math.random() <= 0.5 ? left : right;
				if (x === left) {
					params.bgPath = "/static/gnovel/res/textures/ui/Left BubbleV3.png";
					//params.msgOffsetX = -100;
					params.bubble = "left";
					params.bgOffsetX = 15;
				} else {
					params.bgPath = "/static/gnovel/res/textures/ui/Right BubbleV3.png";
					params.bubble = "right";
					params.bgOffsetX = 0;
				}
			} else if (chara.getCharPosition() === "right") {
				// console.log("right");
				x = 100;
				params.bgPath = "/static/gnovel/res/textures/ui/Right BubbleV3.png";
				//params.msgOffsetX = -120;
				params.bgOffsetX = 15;
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
		var cameraMove = new GNOVEL.CameraMove(this.getOwner(), this);

		// position is specific to MPLAY, it is not part of GNOVEL
		var position = params.flowElement.position;

		// check if the object is character
		if (obj instanceof MPLAY.Character) {
			img = obj.getImage(flowElement.expression);
			isChar = true;
		}

		//specify position of object in scene based upon character
		if (position === "left") {
			img.position.x = -300;
		} else if (position === "center") {
			img.position.x = 0;
		} else if (position === "right") {
			img.position.x = 450;
		}

		if (isChar) {

			// if we show character, blur the background too
			this._setBlurBgEffect({
				blurH: this._softBlurH,
				blurV: this._softBlurV,
				vignetteDarkness: this._softVignetteDarkness,
				vignetteOffset: this._softVignetteOffset,
			});

			if (position === "center") {
				img.position.z = this._characterLayer + 10;
			} else {
				img.position.z = this._characterLayer;
			}

			//set character position on screen
			if (position === "center" || position === "right" || position === "left") {
				//console.log("set " + obj.getName() + " " + position);
				obj.setCharPosition(position);

				//move camera to face character position
				cameraMove.setCamDirection(position, img.position);
			}
		}

		if (isChar && img.hasOwnProperty("oriScale")) {
			if (params.flowElement.flip === true) {
				img.scale.x = -img.oriScale.x;
			} else {
				img.scale.x = img.oriScale.x;
			}
		} else {
			if (params.flowElement.flip === true) {
				img.scale.x = -Math.abs(img.scale.x);
			} else {
				img.scale.x = Math.abs(img.scale.x);
			}
		}

		// console.log("show something");

		//duration for fade in of next character
		params.duration = 300;
		// check if the object is character
		if (isChar && obj.getVisibleImage() !== null) {
			var characterTweenParam = {
				duration: params.duration,
				exception: img._expression
			};

			if (img instanceof MPLAY.SpineAnimation) {
				params.arr = img.meshes;
			}

			// characterTweenParam.onComplete = function() {
			//	GNOVEL.Page.prototype._show.call(pageObj, img, params);
			// };

			obj.fadeVisibleImages(this, characterTweenParam);
			GNOVEL.Page.prototype._show.call(pageObj, img, params);
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
		params.removeFilter = false;

		// check if the object is character
		if (obj instanceof MPLAY.Character) {
			// search for texture that has opacity not zero
			img = obj.getVisibleImage();

			// if null, then we are just going to hide the default image
			if (img === null) {
				img = obj.getImage(null);
			}

			if (img instanceof MPLAY.SpineAnimation) {
				params.arr = img.meshes;
			}
		}

		GNOVEL.Page.prototype._hide.call(this, img, params);
	};

	MPlayPage.prototype._update = function() {

		if (!MPlayPage._isCharInit) {
			return;
		}

		MPlayPage._ryan.update();
		MPlayPage._cat.update();
		MPlayPage._priya.update();
		MPlayPage._professor.update();
	};

	MPlayPage.prototype._addToSceneBg = function(val) {
		this._pageSceneBg.add(val);
	};

	MPlayPage.prototype._removeFromSceneBg = function(val) {
		this._pageSceneBg.remove(val);
	};

	MPlayPage.prototype.setupClassBackground = function() {
		this.setBackground("/static/gnovel/res/textures/backgrounds/classroom background with sweeney.png");

		this._background2 = this.createImage("/static/gnovel/res/textures/backgrounds/classroom foreground with characters.png", new THREE.Vector3(0, 0, this._background3Layer + 60), 1920, 1080);

		this._addToSceneBg(this._bg);
		this._addToSceneBg(this._background2);
	};

	MPlayPage.prototype.setupUcBackground = function(foreground) {
		this.setBackground("/static/gnovel/res/textures/backgrounds/uce background png.png");
		this._bg.scale.set(.95, .90, 1);

		//no longer using middle ground for this scene
		//this._background2 = this.createImage("/static/gnovel/res/textures/backgrounds/uce middleground png.png", new THREE.Vector3(0, -30, this._background2Layer), 1920, 1080);
		//if special foreground for scene, add that instead
		if (foreground != null) {
			this._background3 = this.createImage(foreground, new THREE.Vector3(0, 0, this._background3Layer), 1920, 1080);
			this._background3.scale.set(.85, .80, 1);
		} else {
			this._background3 = this.createImage("/static/gnovel/res/textures/backgrounds/uc foreground png.png", new THREE.Vector3(0, 0, this._background3Layer), 1920, 1080);
			this._background3.scale.set(.85, .80, 1);
		}

		// testing
		this._bg.name = "UCUCUCUCUC";

		this._addToSceneBg(this._bg);
		//this._addToSceneBg(this._background2);
		this._addToSceneBg(this._background3);
	};

	MPlayPage.prototype.setupLibraryBackground = function(foreground) {
		//this.setBackground("/static/gnovel/res/textures/backgrounds/library.png");
		this.setBackground("/static/gnovel/res/textures/backgrounds/library background.png");
		this._bg.position.set(0, -30, this._backgroundLayer - 50);
		//this._bg.scale.set(.85,.85,1);

		//var background2 = this.createImage("/static/gnovel/res/textures/backgrounds/library middleground.png", new THREE.Vector3(0, 0, this._background2Layer-170), 1920, 1080);
		this._background2 = this.createImage("/static/gnovel/res/textures/backgrounds/library middleground.png", new THREE.Vector3(0, -20, this._background2Layer - 50), 1920, 1080);
		this._background2.scale.set(1, 1, 1);
		//if special foreground for scene, add that instead
		//var background3;
		if (foreground != null) {
			this._background3 = this.createImage(foreground, new THREE.Vector3(0, 10, this._background3Layer - 100), 1920, 1080);
			this._background3.scale.set(.90, .85, 1);
		} else {
			this._background3 = this.createImage("/static/gnovel/res/textures/backgrounds/library foreground.png", new THREE.Vector3(-20, -40, this._background3Layer - 100), 1920, 1080);
		}
		//background3.scale.set(.8,.8,1);
		this._addToSceneBg(this._bg);
		this._addToSceneBg(this._background2);
		this._addToSceneBg(this._background3);
	};

	MPlayPage.prototype.setupBarBackground = function(background) {
		if (background != null) {
			this.setBackground(background);
		} else {
			this.setBackground("/static/gnovel/res/textures/backgrounds/bar.png");
		}

		this._addToSceneBg(this._bg);
	};

	MPlayPage.prototype.setupCafeBackground = function() {
		this.setBackground("/static/gnovel/res/textures/backgrounds/caf full png.png");

		this._addToSceneBg(this._bg);
	};

	MPlayPage.prototype.setupGymBackground = function() {
		this.setBackground("/static/gnovel/res/textures/backgrounds/gym background.png");

		this._addToSceneBg(this._bg);
	};

	MPlayPage.prototype.setupOfficeBackground = function() {
		this.setBackground("/static/gnovel/res/textures/backgrounds/professor office background.png");

		this._background2 = this.createImage("/static/gnovel/res/textures/backgrounds/office middle ground.png", new THREE.Vector3(0, -30, this._background2Layer), 1920, 1080);
		this._background3 = this.createImage("/static/gnovel/res/textures/backgrounds/ryan office-foreground.png", new THREE.Vector3(200, 0, this._background3Layer), 1920, 1080);

		this._addToSceneBg(this._bg);
		this._addToSceneBg(this._background2);
		this._addToSceneBg(this._background3);
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
		params.speaker = obj.speaker;

		params.onComplete = function() {
			pageObj._flow._next();
			pageObj._flow._exec();
		};

		pageObj._phoneInteraction.addText(pageObj, params.speaker, params.text, params);

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
		params.people = flowElement.people;

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
		var cameraMove = new GNOVEL.CameraMove(pageObj.getOwner(), this);
		cameraMove.resetCamDirection();

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
		params.font = "20px sfToontime";
		// params.center = true;
		params.type = "context";

		message = obj.text;
		var x = -520;
		var y = 230;

		var toX;
		var toY;

		params.bgPath = "/static/gnovel/res/textures/ui/context_box_big.png";
		params.bgWidth = params.flowElement.bgWidth || 1080;
		params.bgHeight = params.flowElement.bgHeight || 240;
		params.bgOffsetY = 40;
		params.bgOffsetX = 100;
		params.waitUntilShown = hasParam(obj, "waitUntilShown", true);

		//var dialog = new GNOVEL.Dialog(flow._getPage(), message, x, y, params);
		var dialog = GNOVEL.Page.prototype._showDialog.call(flow._getPage(), message, x, y, params);
	};

	MPlayPage.prototype._handleShowEdContext = function(obj, flow) {
		var pageObj = flow._getPage();
		var hasParam = GNOVEL.Util.hasParam;
		var params = {};
		params.flowElement = obj;
		params.showSpeaker = false;
		params.charLine = 80;
		params.messageAlign = "center";
		params.msgOffsetY = 25;
		// params.fillstyle = "#D4D4D4"

		message = obj.text;
		var x = 0;
		var y = -255;

		var toX;
		var toY;

		params.bgPath = "/static/gnovel/res/textures/ui/ed_bubble.png";
		params.bgWidth = 960;
		params.bgHeight = 180;
		params.bgOffsetY = 15;
		params.bgOffsetX = -20;
		params.waitUntilShown = hasParam(obj, "waitUntilShown", true);

		var dialog = GNOVEL.Page.prototype._showDialog.call(flow._getPage(), message, x, y, params);
	};

	MPlayPage.prototype._setMultiTracksPlayer = function() {
		GNOVEL.Page.prototype._setMultiTracksPlayer.call(this);
	};

	MPlayPage.prototype._saveRelationshipData = function(obj) {
		obj.relationship.ryan = this.getRelationshipManager().getRelationship(this._ryan);
		obj.relationship.priya = this.getRelationshipManager().getRelationship(this._priya);
		obj.relationship.cat = this.getRelationshipManager().getRelationship(this._cat);
	};	

	MPLAY.MPlayPage = MPlayPage;

}());
