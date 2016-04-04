// namespace
var GNOVEL = GNOVEL || {};

(function() {
	"use strict";

	/**
	 *
	 * @class Page
	 * @constructor
	 *
	 */
	var Page = function() {
		this._owner = null;
		this._bg = null;
		this._iObjects = [];
		this._id = -1; // id for gnovel
		this._label = null;
		this._flowCounter = 0;
		this._flow = new GNOVEL.Flow(this);
		this._interactableObjects = [];

		this._curTextBox = null;
		this._textBg = null;
		this._curSpeker = null;
		this._preSpeaker = null;

		this._result = {};

		// layers
		this._backgroundLayer = 0;
		this._dialogLayer = 200;
		this._choicesLayer = 220;

		// ambient plays at next page
		this._nextAmbient = null;
		this._waitForTransition = true;

		//add event listeners and bind them
		window.addEventListener("sceneResume", this.onResume.bind(this));
		window.addEventListener("scenePause", this.onPause.bind(this));
		window.addEventListener("sceneEnter", this.onEnter.bind(this));
		window.addEventListener("sceneExit", this.onExit.bind(this));

	};

	Page.prototype.setBackground = function(path) {
		var texture = THREE.ImageUtils.loadTexture(path);
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.NearestFilter;

		var material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			transparent: true,
			map: texture
		});
		var plane = new THREE.PlaneBufferGeometry(1920, 1080);
		var quad = new THREE.Mesh(plane, material);
		quad.name = "Background";
		quad.position.z = this.getBackgroundLayer();

		// add this to the scene
		this._addToScene(quad);

		this._bg = quad;
	};

	Page.prototype.getBackground = function() {
		return this._bg;
	};

	Page.prototype.getBackgroundLayer = function() {
		return this._backgroundLayer;
	};

	Page.prototype.getChoicesLayer = function() {
		return this._choicesLayer;
	};

	Page.prototype.getDialogLayer = function() {
		return this._choicesLayer;
	};

	Page.prototype.createImage = function(path, position, width, height) {
		var texture = THREE.ImageUtils.loadTexture(path);
		var material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			transparent: true,
			map: texture
		});
		var plane = new THREE.PlaneBufferGeometry(width, height);
		var quad = new THREE.Mesh(plane, material);

		if (typeof position === 'undefined' || position === null) {
			position = new THREE.Vector3(0, 0, 0);
		}

		quad.position.set(position.x, position.y, position.z);

		return quad;
	};

	Page.prototype.createInteractableObject = function(obj, params) {
		var ret = new GNOVEL.InteractableObject(obj, this, params);
		this._interactableObjects.push(ret);
		return ret;
	};

	Page.prototype.addCharacter = function(name, obj) {
		//add character to scene
		obj.scale.set(.5, .5, 1);
		obj.name = name;
		//add character to list of objects in scene
		this._iObjects.push(obj);
	};

	Page.prototype.showHUD = function() {
		var hud = this.createImage("/static/gnovel/res/textures/blue_box.png", new THREE.Vector3(0, -300, 50), 512, 768);
		var uiHeight = .2;
		var uiWidth = 1.5;
		hud.scale.set(uiWidth, uiHeight, 1);
		hud.material.opacity = 0.7;
		//hud.position.set(-window.innerWidth/window.innerHeight,-window.innerHeight/window.innerWidth,10);
		this._addToScene(hud);
	}

	/**
	 * This function will be called right before page is displayed on screen
	 */
	Page.prototype._onLoad = function() {};

	/**
	 * This function will be called right before page is removed from screen
	 *
	 */
	Page.prototype._onUnload = function() {
		// remove all interactable objects
		for(var i=0;i<this._interactableObjects.length;i++) {
			this._interactableObjects[i].remove();
		}
	};

	Page.prototype._onMouseDown = function(event) {};

	Page.prototype._onMouseMove = function(event) {};

	//tween to move object from one point to another
	Page.prototype.move = function(obj, params) {
		var duration = params.duration || 1000;

		var tween = new TWEEN.Tween(obj.position)
			.to({
				x: (params.x !== null ? params.x : obj.position.x),
				y: (params.y !== null ? params.y : obj.positions.y),
				z: (params.z !== null ? params.z : obj.position.z),
			}, duration)
			.easing(params.easing || TWEEN.Easing.Linear.None);
		if (params.onComplete != null) {
			tween.onComplete(params.onComplete);
		}
		tween.start();
	};

	Page.prototype.tweenMat = function(obj, params) {
		var pageObj = this;
		var duration = params.duration || 1000;

		var tweenMatIn = null;
		if(params.arr) {
			var arr = params.arr;
			for(var i=0;i<arr.length;i++) {
				var tween = new TWEEN.Tween(arr[i].material)
				.to({
					opacity: (params.opacity !== null ? params.opacity : arr[i].material.opacity),
				}, duration)
				.easing(params.easing || TWEEN.Easing.Linear.None);

				if(i == 0) {
					tweenMatIn = tween;
					if (params.onComplete != null && params.chain==null) {
						tween.onComplete(params.onComplete);
					}
				}
			}
		}
		else
		{
			tweenMatIn = new TWEEN.Tween(obj.material)
			.to({
				opacity: (params.opacity !== null ? params.opacity : obj.material.opacity),
			}, duration)
			.easing(params.easing || TWEEN.Easing.Linear.None);

			if (params.onComplete != null && params.chain==null) {
				tweenMatIn.onComplete(params.onComplete);
			}
		}

		// TODO: have to handle obj an array in this case too
		var tweenMatOut = new TWEEN.Tween(obj.material)
			.to({
				opacity: (params.opacity2 !== null ? params.opacity2 : obj.material.opacity),
			}, duration)
			.easing(params.easing || TWEEN.Easing.Linear.None)
			.delay(params.delay || 0);

		if (params.onComplete != null && params.chain!=null) {
			tweenMatOut.onComplete(params.onComplete);
		}

		if(params.chain == true) {
			tweenMatIn.chain(tweenMatOut);
		}

		tweenMatIn.start();
	};

	Page.prototype.tweenFlash = function(obj, params) {

		var pageObj = this;
		var duration = params.duration || 1000;

		var tweenFlashForward = new TWEEN.Tween(obj.material)
			.to({
				opacity: params.opacityTo || 1,
			}, duration)
			.easing(params.easingTo || TWEEN.Easing.Linear.None);
		if (params.onComplete != null) {
			tweenFlashForward.onComplete(params.onComplete);
		}

		var tweenFlashBack = new TWEEN.Tween(obj.material)
			.to({
				opacity: params.opacityFrom || 0.3,
			}, duration)
			.easing(params.easingFrom || TWEEN.Easing.Linear.None);

		//chaining used to call tween functions back and forth infinitely
		tweenFlashForward.chain(tweenFlashBack);
		tweenFlashBack.chain(tweenFlashForward);

		tweenFlashForward.start();
	};

	Page.prototype.tweenPos = function(obj, params){

		var pageObj = this;

		var duration = params.duration || 1000;
		var target = {x: params.toX, y: params.toY};
		var tween = new TWEEN.Tween(obj.position)
		.to(target,duration)
		.easing(TWEEN.Easing.Linear.None);

		if (params.onComplete != null) {
			tween.onComplete(params.onComplete);
		}
		tween.start();
	};

	/**tween for changing an objects scales
	*@param repeat = bool if animation should repeat and do a pulse
	*/
	Page.prototype.tweenPulse = function (obj, params) {
		var pageObj = this;
		var prevSize = {x: 1, y: 1, z: 1};
		var targetSize = {x: params.x, y: params.y, z: params.z}
		var duration = params.duration || 800;
		var repeat = params.repeat;

		var tweenForward = new TWEEN.Tween(obj.scale)
		.to({
		x: (params.x !== null ? targetSize.x : obj.scale.x),
		y: (params.y !== null ? targetSize.y : obj.scale.y),
		z: (params.z !== null ? targetSize.z : obj.scale.z),
		},duration)
		.easing(params.easing || TWEEN.Easing.Quadratic.Out);
		if (params.onComplete != null) {
			tweenForward.onComplete(params.onComplete);
		}
		/*.onComplete(function() {
			targetSize = prevSize;
			prevSize = obj.scale;
			tween.start();
		});*/

		var tweenBack = new TWEEN.Tween(obj.scale)
			.to({
			x: (prevSize.x),
			y: (prevSize.y),
			z: (prevSize.z),
			},duration)
			.easing(TWEEN.Easing.Quadratic.In);
				//if set to repeat, then tween will pulse up and back
				//if not set to repeat, it will only scale up or back
			if(repeat==true){
				tweenForward.chain(tweenBack);
				tweenBack.chain(tweenForward);
			}
			else {
				// console.log("stop");
			}

		tweenForward.start();
		return tweenForward;

		//tween.start();
	};

	Page.prototype.onPause = function(evt) {};
	Page.prototype.onResume = function(evt) {};
	Page.prototype.onEnter = function(evt) {};
	Page.prototype.onExit = function(evt) {};

	/**
	 * Page identifier. Will be set by Gnovel object
	 * @param {int} id
	 */
	Page.prototype._setPageId = function(id) {
		this._id = id;
	};

	Page.prototype._setPageLabel = function(label) {
		this._label = label;
	};

	/**
	 * Returns page identifier in Gnovel object. Returns -1 if it hasnt been added to any Gnovel object
	 * @return {int}
	 */
	Page.prototype.getPageId = function() {
		return this._id;
	};

	Page.prototype.getPageLabel = function() {
		return this._label;
	};

	Page.prototype.getOwner = function() {
		return this._owner;
	};

	Page.prototype.createTextBox = function(message, parameters) {
		var textAlign = THREE_Text.textAlign;
		var Text2D = THREE_Text.Text2D;
		var msgAlign = parameters.align || "center";
		var msgCenter = parameters.center || false;
		switch(msgAlign){
			case "left":
				msgAlign = textAlign.left;
				break;
			case "right":
				msgAlign = textAlign.right;
				break;
			case "center":
				msgAlign = textAlign.center;
				break;
		}


		var sprite = new Text2D(message, {
			align: msgAlign,
			font: parameters.font || "20px Noteworthy",
			fillStyle: parameters.fillstyle || '#000000',
			antialias: false,
			charLine: parameters.charLine,
			ctxCenter: msgCenter,
		});

		return sprite;
	};

	Page.prototype._addToScene = function(o) {
		this._owner._addToScene(this, o);
	};

	Page.prototype._getRootObject = function() {
		return this._owner._getPageRootObject(this);
	};

	Page.prototype._removeFromScene = function(o) {
		this._owner._removeFromScene(this, o);
	};

	// will be called after load complete
	Page.prototype._onStart = function() {
		//console.log("on start");
	};

	// will be called each frame, after onLoad and onStart complete
	Page.prototype._update = function() {
	};

	// will be called after onStart called
	Page.prototype._runFlow = function() {
		this._flow._set(this._createFlowElements());
		this._flow._exec();
	};

	Page.prototype._showTempDialog = function(message, x, y, params) {
		params = params || {};
		var pageObj = this;
		params.temp = true;
		params.onComplete = function() {
			// go to next dialog
		};
		var dialog = new GNOVEL.Dialog(this, message, x, y, params);
		return dialog;
	};

	Page.prototype._showDialog = function(message, x, y, params) {
		params = params || {};
		var pageObj = this;

		params.onComplete = function() {
			// go to next flow
			pageObj._flow._next();
			pageObj._flow._exec();
		};

		var dialog = new GNOVEL.Dialog(this, message, x, y, params);
		return dialog;
	};

	Page.prototype._show = function(obj, params) {
		params = params || {};
		var pageObj = this;
		var waitUntilShown = true;
		if(params.waitUntilShown != null) {
			waitUntilShown = params.waitUntilShown;
		}

		if (obj.parent === null || obj.parent.name !== this._getRootObject().name) {
			this._addToScene(obj);
		}

		this.tweenMat(obj, {
			opacity: 1,
			easing: TWEEN.Easing.Cubic.Out,
			arr: params.arr,
			onComplete: function() {
				if(waitUntilShown) {
					// go to next flow
					pageObj._flow._next();
					pageObj._flow._exec();
				}
			},
			duration: params.duration || 800,
		});

		if(!waitUntilShown) {
			// go to next flow
			pageObj._flow._next();
			pageObj._flow._exec();
		}
	};

	Page.prototype._hide = function(obj, params) {
		params = params || {};
		var pageObj = this;
		var waitUntilHidden = true;
		if (params.waitUntilHidden != null) {
			waitUntilHidden = params.waitUntilHidden;
		}
		this.tweenMat(obj, {
			opacity: 0,
			easing: TWEEN.Easing.Cubic.Out,
			arr: params.arr,
			onComplete: function() {
				if (waitUntilHidden) {
					// go to next flow
					pageObj._flow._next();
					pageObj._flow._exec();
					pageObj._removeFromScene(obj);
				}
			},
			duration: params.duration || 800,
		});

		if (!waitUntilHidden) {
			// go to next flow
			pageObj._flow._next();
			pageObj._flow._exec();
			pageObj._removeFromScene(obj);
		}
	};

	Page.prototype._setWaitForTransition = function(value){
		var pageObj = this;
		pageObj._waitForTransition = value;
	}

	Page.prototype._showChoices = function(choicesArr, responsesArr, params, jumpArr) {
		params = params || {};
		var pageObj = this;

		// if params.onChoiceComplete is not null then we add another onChoiceComplete
		if(!params.dontGoToNextFlowAuto) {
			var onChoiceComplete = function(resultId) {
				var jumpIndex = jumpArr[resultId];

				if(typeof jumpIndex === 'undefined') {
					// go to next flow
					pageObj._flow._next();
				}else{
					pageObj._flow._jump(jumpIndex);
				}

				pageObj._flow._exec();
			}

			// if params.onChoiceComplete is undefined or null (or falsy)
			if(!params.onChoiceComplete) {
				params.onChoiceComplete = onChoiceComplete;
			}else{
				// there is already function specified in that
				var oriChoiceComplete = params.onChoiceComplete;
				params.onChoiceComplete = function(resultId) {
					oriChoiceComplete(resultId);
					onChoiceComplete(resultId);
				};
			}
		}

		var choices = new GNOVEL.Choices(this, choicesArr, responsesArr, this._result, params);
	};


	Page.prototype._setFlowElements = function(flowelements) {
		this._flow._setFlowElements(flowelements);
	};

	Page.prototype._createFlowElements = function() {
		// derive this function on child classes to specify the flow elements
		return {};
	};

	Page.prototype._setObjectTag = function(tag, obj) {
		this._flow._setObjectTag(tag, obj);
	};

	Page.prototype.goToPage = function(pageIndex, transitionType, transitionParam) {
		this._owner.goToPage(pageIndex, transitionType, transitionParam);
	};

	Page.prototype.goToPageByLabel = function(pageLabel, transitionType, transitionParam) {
		this._owner.goToPageByLabel(pageLabel, transitionType, transitionParam);
	};

	Page.prototype._getFlow = function() {
		return this._flow;
	};

	Page.prototype._tweenVolumeIn = function() {
		var duration = 3000;
		var tween = new createjs.Tween.get(this._owner._ambient)
						.to({
							volume: 1.0
						}, duration);
	};

	Page.prototype._tweenVolumeOut = function() {
		var duration = 1000;
		var pageObj = this;
		var tween = new createjs.Tween.get(this._owner._ambient)
						.to({
							volume: 0.0
						}, duration)
						.call(handleComplete);
		function handleComplete() {
			pageObj._owner._ambient.stop();
			pageObj._owner._ambient = null;
		};
	};


	GNOVEL.Page = Page;
}());
