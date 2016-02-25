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

	Page.prototype.createInteractableObject = function(path, params) {
		var ret = new GNOVEL.InteractableObject(path, this, params);
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

		var tween = new TWEEN.Tween(obj.material)
			.to({
				opacity: (params.opacity !== null ? params.opacity : obj.material.opacity),
			}, duration)
			.easing(params.easing || TWEEN.Easing.Linear.None);
		if (params.onComplete != null) {
			tween.onComplete(params.onComplete);
		}
		tween.start();
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
		var msgAligh = parameters.align || "center";
		switch(msgAligh){
			case "left":
				var sprite = new Text2D(message, {
					align: textAlign.left,
					font: '20px Arial',
					fillStyle: '#FFFF00',
					antialias: false
				});
				break;
			case "right":
				var sprite = new Text2D(message, {
					align: textAlign.right,
					font: '20px Arial',
					fillStyle: '#FFFF00',
					antialias: false
				});
				break;
			case "center":
				var sprite = new Text2D(message, {
					align: textAlign.center,
					font: '20px Arial',
					fillStyle: '#FFFF00',
					antialias: false
				});
				break;
		}
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

	// will be called after onStart called
	Page.prototype._runFlow = function() {
		this._flow._set(this._createFlowElements());
		this._flow._exec();
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
	};

	Page.prototype._show = function(obj, params) {
		params = params || {};
		var pageObj = this;
		var waitUntilShown = true;
		// if(params.waitUntilShown != null) {
		// 	waitUntilShown = params.waitUntilShown;
		// }

		if (obj.parent === null || obj.parent.name !== this._getRootObject().name) {
			this._addToScene(obj);
		}

		this.tweenMat(obj, {
			opacity: 1,
			easing: TWEEN.Easing.Cubic.Out,
			onComplete: function() {
				// if(waitUntilShown) {
					// go to next flow					
					pageObj._flow._next();
					pageObj._flow._exec();
				// }
			},
			duration: 500
		});

		// if(!waitUntilShown) {
		// 	// go to next flow
		// 	pageObj._flow._next();
		// 	pageObj._flow._exec();
		// }
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
			onComplete: function() {
				if (waitUntilHidden) {
					// go to next flow
					pageObj._flow._next();
					pageObj._flow._exec();
					this._removeFromScene(obj);
				}
			},
			duration: 500
		});

		if (!waitUntilHidden) {
			// go to next flow
			pageObj._flow._next();
			pageObj._flow._exec();
			this._removeFromScene(obj);
		}
	};

	Page.prototype._showChoices = function(choicesArr, params, jumpArr) {
		params = params || {};
		var pageObj = this;
		var choicesBg = this.createImage("/static/gnovel/res/textures/choice_box.png",
			new THREE.Vector3(params.x + 200, -250, 190), 900, 145.5);
		choicesBg.material.opacity = 0.7;

		// if params.onChoiceComplete is not null then we add another onChoiceComplete
		var onChoiceComplete = function(resultId) {
			pageObj._removeFromScene(choicesBg);
			var jumpIndex = jumpArr[resultId];

			if(typeof jumpIndex === 'undefined') {
				// go to next flow
				pageObj._flow._next();
			}else{
				pageObj._flow._jump(jumpIndex);
			}

			pageObj._flow._exec();
		};

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

		var choices = new GNOVEL.Choices(this, choicesArr, this._result, params);
		this._addToScene(choicesBg);
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

	GNOVEL.Page = Page;
}());
