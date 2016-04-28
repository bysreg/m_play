/**
 * @module gnovel
 */

// namespace:
var GNOVEL = GNOVEL || {};

(function() {
	"use strict";

	/**
	 *
	 *@class Gnovel
	 *@constructor
	 *
	 */
	var Gnovel = function() {
		THREE.Cache.enabled = true;

		this._scene = new THREE.Scene();
		this._pages = [];
		this._pageDict = {};
		this._curPageIdx = 0;
		this._stats = null;
		this._container = document.getElementById("container");
		this._cameraCanvas = document.getElementById("application-canvas");
		this._prevPage = null;
		this._pageRootObject = {
			curPage: null,
			prevPage: null
		};
		this._raycaster = new THREE.Raycaster();
		this._mouseDownListeners = [];
		this._mouseMoveListeners = [];
		this._started = false; // will be true if onStart is finished
		this._savedData = {};
		this._onMouseDownProcessing = false;
		this._width = null;
		this._height = null;

		this._camera = new THREE.PerspectiveCamera(50, 16 / 9, 100, 1200);
		this._renderer = null;		

		this._clock = new THREE.Clock();

		this._assetLoader = new GNOVEL.AssetLoader();

		this._audioPath = "/static/gnovel/res/sounds/";
		this._sounds = [
			// SFX UI
			{
				id: "Clicking",
				src: "sfx-ui-clicking.ogg"
			}, {
				id: "Timer",
				src: "sfx-ui-timer.ogg"
			}, {
				id: "Message",
				src: "sfx-ui-message.ogg"
			}, {
				id: "Text",
				src: "sfx-ui-text.ogg"
			},

			// SFX Waiting dialog
			{
				id: "Hello?-Ryan",
				src: "sfx-waiting-hello-ryan.ogg"
			},

			// SFX Greeting dialog
			// Ryan
			// {
			// 	id: "Heyfriend-Ryan",
			// 	src: "sfx-greeting-heyfriend-ryan-p.ogg"
			// }, {
			// 	id: "Hey-Ryan-n",
			// 	src: "sfx-greeting-hey-ryan-n.ogg"
			// }, {
			// 	id: "Hey-Ryan-p",
			// 	src: "sfx-greeting-hey-ryan-p.ogg"
			// }, {
			// 	id: "Hey-Ryan-e",
			// 	src: "sfx-greeting-hey-ryan-e.ogg"
			// }, {
			// 	id: "Ohhi-Ryan",
			// 	src: "sfx-greeting-ohhi-ryan-n.ogg"
			// }, {
			// 	id: "Sup-Ryan",
			// 	src: "sfx-greeting-sup-ryan-n.ogg"
			// }, {
			// 	id: "Yo-Ryan",
			// 	src: "sfx-greeting-yo-ryan-p.ogg"
			// },

			// // Cat
			// {
			// 	id: "Hey-Cat",
			// 	src: "sfx-greeting-hey-cat-n.ogg"
			// }, {
			// 	id: "Heyfriend-Cat",
			// 	src: "sfx-greeting-heyfriend-cat-p.ogg"
			// }, {
			// 	id: "Ohhi-Cat",
			// 	src: "sfx-greeting-ohhi-cat-n.ogg"
			// }, {
			// 	id: "Wtsnew-Cat",
			// 	src: "sfx-greeting-whatsnew-cat-n.ogg"
			// }, {
			// 	id: "Sup-Cat",
			// 	src: "sfx-greeting-sup-cat-p.ogg"
			// },

			// // Priya
			// {
			// 	id: "Hello-Priya",
			// 	src: "sfx-greeting-hello-priya-p.ogg"
			// }, {
			// 	id: "Heyfriend-Priya",
			// 	src: "sfx-greeting-heyfriend-priya-p.ogg"
			// }, {
			// 	id: "Hey-Priya",
			// 	src: "sfx-greeting-hey-priya-n.ogg"
			// }, {
			// 	id: "Ohhi-Priya",
			// 	src: "sfx-greeting-ohhi-priya-p.ogg"
			// }, {
			// 	id: "Wtsnew-Priya",
			// 	src: "sfx-greeting-whatsnew-priya-n.ogg"
			// },



			// ambient
					{id: "Cafe-bg", src: "ambient-cafe.ogg"},
					{id: "Office-bg", src: "ambient-office.ogg"},
					{id: "Gym-bg", src: "ambient-gym.ogg"},
					{id: "Bar-bg", src: "ambient-bar-new.ogg"},
					{id: "Classroom-bg", src: "ambient-classroom.ogg"},
					{id: "UC-bg", src: "ambient-uc.ogg"},
					{id: "Library-bg", src: "ambient-lib.ogg"},

					// bacakground noises layer
					{id: "Bar-glasses1", src: "bgnoises-bar-glasses1.ogg"},
					{id: "Bar-glasses2", src: "bgnoises-bar-glasses2.ogg"},
					{id: "Bar-glasses3", src: "bgnoises-bar-glasses3.ogg"},
					{id: "Bar-distantglasses", src: "bgnoises-bar-distantglasses.ogg"},
					{id: "Bar-girltalking", src: "bgnoises-bar-girltalking.ogg"},
					{id: "Bar-liquid", src: "bgnoises-bar-liquid.ogg"},
					{id: "Bar-mantalking", src: "bgnoises-bar-mantalking.ogg"},
					{id: "Bar-pia", src: "bgnoises-bar-pia.ogg"},

					{id: "Lib-beeping", src: "bgnoises-lib-beeping.ogg"},
					{id: "Lib-chairs1", src: "bgnoises-lib-chairs1.ogg"},
					{id: "Lib-chairs2", src: "bgnoises-lib-chairs2.ogg"},
					{id: "Lib-chairs3", src: "bgnoises-lib-chairs3.ogg"},
					{id: "Lib-distantchairs", src: "bgnoises-lib-distantchairs.ogg"},
					{id: "Lib-pia", src: "bgnoises-lib-pia.ogg"},

					{id: "Uc-girllaughing", src: "bgnoises-uc-girllaughing.ogg"},
					{id: "Uc-mantalking", src: "bgnoises-uc-mantalking.ogg"},
					{id: "Uc-steps", src: "bgnoises-uc-steps.ogg"},
					{id: "Uc-womantalking", src: "bgnoises-uc-womantalking.ogg"},

					// ed
					{id: "Ed-music-happy", src: "ed-music-happy.ogg"},
					{id: "Ed-music-bad", src: "ed-music-bad.ogg"},

		];
		this._soundManager = createjs.Sound;

		this._soundManager.alternateExtensions = ["mp3"];
		this._soundManager.registerSounds(this._sounds, this._audioPath);
		this._ambient = null;

		var canvas = document.getElementById("application-canvas");
		this._renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			logarithmicDepthBuffer: true
		});

		var gnovel = this;

		var camera = this._camera;
		camera.position.z = 900;

		var scene = this._scene;

		scene.add(camera);

		this._renderer.setPixelRatio(window.devicePixelRatio);
		this._renderer.autoClear = false;

		var rtTexture = new THREE.WebGLRenderTarget(1920, 1080, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat } );
		this._rtTexture = rtTexture;

		var nextPageRT = new THREE.WebGLRenderTarget(1920, 1080, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat } );
		this._nextPageRT = nextPageRT;

		// var materialScreen = new THREE.ShaderMaterial( {
		// 	uniforms: { tDiffuse: { type: "t", value: rtTexture } },
		// 	vertexShader: document.getElementById( 'vertexShader' ).textContent,
		// 	fragmentShader: document.getElementById('fragment_shader_screen').textContent,
		// 	depthWrite: false
		// });

		// var plane = new THREE.PlaneBufferGeometry(1920 / 2, 1080 / 2);
		// var quad = new THREE.Mesh(plane, materialScreen);
		this._rttScene = new THREE.Scene();
		// quad.position.setZ(200);
		// this._rttScene.add(quad);

		// setup transition
		this._transition = new GNOVEL.Transition(1000, this._rttScene, rtTexture, nextPageRT);

		// setup render loop
		var render = function() {
			requestAnimationFrame(render);
			TWEEN.update();

			gnovel._render();
			gnovel._update();

			if (gnovel._stats !== null) {
				gnovel._stats.update();
			}
		};
		render();

		var listener = new THREE.AudioListener();
		camera.add(listener);

		this._onWindowResize();
		var gnovel = this;
		document.addEventListener('keyup',function(event) {
			gnovel._onMouseDown(event);
		}, false);
		document.addEventListener('mousedown', function(event) {
			gnovel._onMouseDown(event);
		}, false);
		document.addEventListener('mousemove', function(event) {
			gnovel._onMouseMove(event);
		}, false);
		document.addEventListener('touchend', function(event) {
			gnovel._onMouseDown(event);
		}, false);
		window.addEventListener('resize', function(event) {
			gnovel._onWindowResize(event);
		}, false);
	};

	Gnovel.prototype._update = function() {
		var page = this.getCurrentPage();
		if (this._onStart) {
			page._update();
		}
	};

	Gnovel.prototype._render = function() {		
		this._renderer.render(this._scene, this._camera);				
	};

	Gnovel.prototype._onWindowResize = function(event) {
		var aspect_ratio = window.innerWidth / window.innerHeight;

		if (aspect_ratio > 16 / 9) {
			// fill height
			this._cameraCanvas.height = window.innerHeight;
			this._cameraCanvas.width = (16 / 9) * this._cameraCanvas.height;
		} else {
			// fill width
			this._cameraCanvas.width = window.innerWidth;
			this._cameraCanvas.height = (9 / 16) * this._cameraCanvas.width;
		}

		this._width = this._cameraCanvas.width;
		this._height = this._cameraCanvas.height;

		this._renderer.setSize(this._cameraCanvas.width, this._cameraCanvas.height);
	}

	Gnovel.prototype.getContainer = function() {
		return this._container;
	};

	Gnovel.prototype.addPage = function(label, pageType) {
		var page = new pageType();
		page._setPageId(this._pages.length);
		page._setPageLabel(label);
		page._owner = this;
		this._pages.push(page);

		if (!this._pageDict[label]) {
			this._pageDict[label] = page;
		} else {
			// there is already a page called with that label
			console.warn("there is already page called with that label");
		}
	};

	Gnovel.prototype._addToScene = function(page, o) {
		this._pageRootObject[page.getPageId()].add(o);
	};

	Gnovel.prototype._removeFromScene = function(page, o) {
		if(this._pageRootObject[page.getPageId()]) {
			this._pageRootObject[page.getPageId()].remove(o);
		}		
	};

	Gnovel.prototype._findInScene = function(page, name) {
		if (this._pageRootObject[page.getPageId()].getObjectByName(name) != "undefined")
			return true;
		else {
			return false;
		}
	};

	Gnovel.prototype._onMouseDown = function(event) {
		if (event.type === "keyup" && event.keyCode !== 32) {
			return;
		}

		this._soundManager.play("Clicking");

		if (!this._onStart) return;

		// if we are  still processing a onMouseDown event, then don't process
		if (this._onMouseDownProcessing) {
			return;
		}

		this._onMouseDownProcessing = true;

		//console.log("on mouse down");
		var page = this.getCurrentPage();
		if (page != null) {
			page._onMouseDown(event);
		}

		// copy the current listeners
		var listenersCopy = this._mouseDownListeners.slice();

		// notify all the listeners
		for (var i = 0; i < listenersCopy.length; i++) {
			listenersCopy[i](event);
		}

		this._onMouseDownProcessing = false;
	};

	Gnovel.prototype._onMouseMove = function(event) {
		if (!this._onStart) return;

		//console.log("on mouse move");
		var page = this.getCurrentPage();
		if (page != null) {
			page._onMouseMove(event);
		}

		// notify all the listeners
		for (var i = 0; i < this._mouseMoveListeners.length; i++) {
			this._mouseMoveListeners[i](event);
		}
	};

	Gnovel.prototype.start = function() {
		this._curPageIdx = 0;

		// get the first page
		var page = this.getCurrentPage();

		this._load(page);
	};

	//main load function that sets page properties and starts next scene
	Gnovel.prototype._load = function(page) {
		console.log("load page " + page.getPageId() + " " + page.getPageLabel());

		var pageRoot = new THREE.Object3D();
		var gnovel = this;
		pageRoot.name = "Page Root " + page.getPageLabel();
		this._pageRootObject[page.getPageId()] = pageRoot;
		page._onLoad();

		// if it's the first page, then we add the current page right away
		// if not, then we will add the page to the scene after the transition completed
		if(page.getPageId() == 0) {
			this._scene.add(this._pageRootObject[page.getPageId()]);

			// FIXME
			// wait for several seconds
			var o = {
				val: 0
			};
			var loadDuration = 3;
			var tween = new TWEEN.Tween(o)
				.to({
					val: 1,
				}, loadDuration * 1000)
				.onComplete(function() {
					_onStart(page);
					gnovel._onStart = true;
					console.log("gnovel started");
				});
			tween.start();
		}		
	};

	function _onStart(pageObj) {
		console.log("call onStart on page " + pageObj.getPageId() + " " + pageObj.getPageLabel());

		pageObj._onStart();
		pageObj._runFlow();
		pageObj._setMultiTracksPlayer();
	};

	Gnovel.prototype._unload = function(page) {
		console.log("unload page " + page.getPageId());

		page._onUnload();

		// remove all objects added to scene
		var rootObj = this._pageRootObject[page.getPageId()];
		this._scene.remove(rootObj);

		this._pageRootObject[page.getPageId()] = null;
	};

	Gnovel.prototype.getCurrentPage = function() {
		if (this._curPageIdx < 0 || this._curPageIdx >= this._pages.length)
			return null;
		return this.getPageAt(this._curPageIdx);
	};

	Gnovel.prototype.getPageAt = function(pageIndex) {
		return this._pages[pageIndex];
	};

	Gnovel.prototype.goToPage = function(pageIndex, transitionType, transitionParam) {
		console.log("go to page " + pageIndex);

		// FIXME : for now regardless of transitionType and transitionParam,
		// the transition is going to be FADE
		
		// load the next page during transition
		var curPage = this.getCurrentPage();
		var nextPage = this.getPageAt(pageIndex);

		// unload the previous page
		//this._unload(curPage);

		//load next scene into root before showing on screen and transition
		this._load(nextPage);	

		this._onStart = false;

		this._prevPage = curPage;
		this._curPageIdx = pageIndex;

		this._runTransition(curPage, nextPage, transitionType);
	};

	Gnovel.prototype._runTransition = function(curPage, nextPage, transitionType) {
		var gnovel = this;	
		
		this._transition.run(curPage, nextPage, {
			onComplete: function() {
				gnovel._onPageTransitionComplete(nextPage);
			},
			onSafeToUnload: function() {
				gnovel._unload(curPage);
			},
			transitionType: transitionType
		});
	};

	Gnovel.prototype.goToPageByLabel = function(pageLabel, transitionType, transitionParam) {
		var nextPage = this._pageDict[pageLabel];
		var nextPageIndex = nextPage.getPageId();

		this.goToPage(nextPageIndex, transitionType, transitionParam);
	};

	Gnovel.prototype._onPageTransitionComplete = function(page) {
		// add the current page to the scene
		this._scene.add(this._pageRootObject[page.getPageId()]);

		// unload the previous page
		// this._unload(this._prevPage);

		//start flow of next page
		_onStart(page);
		this._onStart = true;
		console.log("gnovel started");		
	};

	Gnovel.prototype.getCamera = function() {
		return this._camera;
	};

	Gnovel.prototype.seeStats = function() {
		var stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		this._container.appendChild(stats.domElement);
		this._stats = stats;
	};

	Gnovel.prototype._getPageRootObject = function(page) {
		return this._pageRootObject[page.getPageId()];
	};

	Gnovel.prototype.addMouseDownListener = function(obj) {
		this._mouseDownListeners.push(obj);
	};

	Gnovel.prototype.removeMouseDownListener = function(obj) {
		var index = GNOVEL.Util.findElement(this._mouseDownListeners, obj);
		if (index != -1) this._mouseDownListeners.splice(index, 1);
	};

	Gnovel.prototype.addMouseMoveListener = function(obj) {
		this._mouseMoveListeners.push(obj);
	};

	Gnovel.prototype.removeMouseMoveListener = function(obj) {
		var index = GNOVEL.Util.findElement(this._mouseMoveListeners, obj);
		if (index != -1) this._mouseMoveListeners.splice(index, 1);
	};

	Gnovel.prototype.saveData = function(label, data) {
		this._savedData[label] = data;
	};

	Gnovel.prototype.getSavedData = function(label) {
		return this._savedData[label];
	};

	Gnovel.prototype.getSoundManager = function() {
		return this._soundManager;
	};

	Gnovel.prototype.calcMousePositionRelativeToCanvas = function(mouse) {
		var rect = this._renderer.domElement.getBoundingClientRect();
		//console.log();
		mouse.x = ((mouse.x - rect.left) / this._renderer.domElement.clientWidth) * 2 - 1;
		mouse.y = -((mouse.y - rect.top) / this._renderer.domElement.clientHeight) * 2 + 1;
	};

	Gnovel.prototype.getClock = function() {
		return this._clock;
	};

	Gnovel.prototype._getRenderer = function() {
		return this._renderer;
	};

	Gnovel.prototype._getWidth = function() {
		return this._width;
	};

	Gnovel.prototype._getHeight = function() {
		return this._height;
	};

	Gnovel.prototype._getAssetLoader = function() {
		return this._assetLoader;
	};	

	GNOVEL.Gnovel = Gnovel;
}());