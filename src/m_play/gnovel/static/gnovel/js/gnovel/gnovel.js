
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

		this._scene = new THREE.Scene();
		this._pages = [];
		this._pageDict = {};
		this._curPageIdx = 0;
		this._stats = null;
		this._container = document.getElementById("container");
		this._cameraCanvas = document.getElementById("application-canvas");
		this._prevPage = null;
		this._pageRootObject = {curPage : null, prevPage : null};
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
		this._preloadPage = false;

		this._audioPath = "/static/gnovel/res/sounds/";
		this._sounds = [
					// SFX UI
					{id:"Clicking", src:"sfx-ui-clicking.ogg"},
					{id:"Timer", src:"sfx-ui-timer.ogg"},
					{id:"Message", src:"sfx-ui-message.ogg"},
					{id:"Text", src:"sfx-ui-text.ogg"},

					// SFX Waiting dialog
					{id:"Hello?-Ryan", src: "sfx-waiting-hello-ryan.ogg"},

					// SFX Greeting dialog
					  // Ryan
					{id:"Heyfriend-Ryan", src: "sfx-greeting-heyfriend-ryan-p.ogg"},
					{id:"Hey-Ryan-n", src: "sfx-greeting-hey-ryan-n.ogg"},
					{id:"Hey-Ryan-p", src: "sfx-greeting-hey-ryan-p.ogg"},
					{id:"Hey-Ryan-e", src: "sfx-greeting-hey-ryan-e.ogg"},
					{id:"Ohhi-Ryan", src: "sfx-greeting-ohhi-ryan-n.ogg"},
					{id:"Sup-Ryan", src: "sfx-greeting-sup-ryan-n.ogg"},
					{id:"Yo-Ryan", src: "sfx-greeting-yo-ryan-p.ogg"},

					  // Cat
					{id:"Hey-Cat", src: "sfx-greeting-hey-cat-n.ogg"},
					{id:"Heyfriend-Cat", src: "sfx-greeting-heyfriend-cat-p.ogg"},
					{id:"Ohhi-Cat", src: "sfx-greeting-ohhi-cat-n.ogg"},
					{id:"Wtsnew-Cat", src: "sfx-greeting-whatsnew-cat-n.ogg"},
					{id:"Sup-Cat", src:"sfx-greeting-sup-cat-p.ogg"},

					  // Priya
					{id:"Hello-Priya", src: "sfx-greeting-hello-priya-p.ogg"},
					{id:"Heyfriend-Priya", src: "sfx-greeting-heyfriend-priya-p.ogg"},
					{id:"Hey-Priya", src: "sfx-greeting-hey-priya-n.ogg"},
					{id:"Ohhi-Priya", src: "sfx-greeting-ohhi-priya-p.ogg"},
					{id:"Wtsnew-Priya", src: "sfx-greeting-whatsnew-priya-n.ogg"},



					// ambient
					{id:"Cafe-bg", src:"ambient-cafe.ogg"},
					{id:"Office-bg", src:"ambient-office.ogg"},
					{id:"Gym-bg", src:"ambient-gym.ogg"},
					{id:"Bar-bg", src:"ambient-bar.ogg"},
					{id:"Classroom-bg", src:"ambient-classroom.ogg"},
					{id:"UC-bg", src:"ambient-uc.ogg"},
					{id:"Library-bg", src:"ambient-lib.ogg"}
					];
		this._soundManager = createjs.Sound;

		this._soundManager.alternateExtensions = ["mp3"];
		this._soundManager.registerSounds(this._sounds, this._audioPath);
		this._ambient = null;

		var canvas = document.getElementById("application-canvas");
		this._renderer = new THREE.WebGLRenderer({canvas: canvas, logarithmicDepthBuffer: true});

		var gnovel = this;

		var camera = this._camera;
		camera.position.z = 900;

		var scene = this._scene;

		scene.add(camera);

		var texture = THREE.ImageUtils.loadTexture("/static/gnovel/res/textures/transitionPanel_plainSM.jpg");
		var material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			transparent: true,
			map: texture
		});
		var plane = new THREE.PlaneBufferGeometry(6154, 3546);
		//var plane = new THREE.PlaneBufferGeometry(1920, 1080);
		this.transitionPanel = new THREE.Mesh(plane, material);
		//z is background layer position
		this.transitionPanel.position.set(0,0,-100);

		this._renderer.setPixelRatio(window.devicePixelRatio);
		this._renderer.autoClear = false;

		// setup render loop
		var render = function () {
			requestAnimationFrame(render);
			TWEEN.update();

			gnovel._render();			
			gnovel._update();

			if(gnovel._stats !== null) {
				gnovel._stats.update();
			}
		};
		render();

		var listener = new THREE.AudioListener();
		camera.add(listener);

		this._onWindowResize();
		var gnovel = this;
		document.addEventListener('mousedown', function(event) { gnovel._onMouseDown(event); }, false);
		document.addEventListener('mousemove', function(event) { gnovel._onMouseMove(event); }, false);
		window.addEventListener( 'resize', function(event) {gnovel._onWindowResize(event); }, false );
	};

	Gnovel.prototype._update = function() {
		var page = this.getCurrentPage();
		if(this._onStart) {
			page._update();
		}
	};

	Gnovel.prototype._render = function() {
		this._renderer.render(this._scene, this._camera);
	};

	Gnovel.prototype._onWindowResize = function(event) {
		var aspect_ratio = window.innerWidth / window.innerHeight;

		if(aspect_ratio > 16/9) {
			// fill height
			this._cameraCanvas.height = window.innerHeight;
			this._cameraCanvas.width = (16/9) * this._cameraCanvas.height;
		}else{
			// fill width
			this._cameraCanvas.width = window.innerWidth;
			this._cameraCanvas.height = (9/16) * this._cameraCanvas.width;
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

		if(!this._pageDict[label]) {
			this._pageDict[label] = page;
		}else{
			// there is already a page called with that label
			console.warn("there is already page called with that label");
		}
	};

	Gnovel.prototype._addToScene = function(page, o) {
		this._pageRootObject[page.getPageId()].add(o);
	};

	Gnovel.prototype._removeFromScene = function(page, o) {
		this._pageRootObject[page.getPageId()].remove(o);
	};

	Gnovel.prototype._onMouseDown = function(event) {

		this._soundManager.play("Clicking");

		if(!this._onStart) return;

		// if we are still processing a onMouseDown event, then don't process
		if(this._onMouseDownProcessing) {
			return;
		}

		this._onMouseDownProcessing = true;

		//console.log("on mouse down");
		var page = this.getCurrentPage();
		if(page != null) {
			page._onMouseDown(event);
		}

		// copy the current listeners
		var listenersCopy = this._mouseDownListeners.slice();

		// notify all the listeners
		for(var i=0;i<listenersCopy.length;i++) {
			listenersCopy[i](event);
		}

		this._onMouseDownProcessing = false;
	};

	Gnovel.prototype._onMouseMove = function(event) {
		if(!this._onStart) return;

		//console.log("on mouse move");
		var page = this.getCurrentPage();
		if(page != null) {
			page._onMouseMove(event);
		}

		// notify all the listeners
		for(var i=0;i<this._mouseMoveListeners.length;i++) {
			this._mouseMoveListeners[i](event);
		}
	};

	Gnovel.prototype.start = function() {
		this._curPageIdx = 0;

		// get the first page
		var page = this.getCurrentPage();

		this._load(page);
	};

	Gnovel.prototype._preLoad = function(page){
		var pageRoot = new THREE.Object3D();
	//	var pageOverlay1 = new THREE.Object3D();
	//	var pageOverlay2 = new THREE.Object3D();
		var gnovel = this;
		pageRoot.name = "Page Root " + page.getPageLabel();
		this._pageRootObject[page.getPageId()] = pageRoot;
		this._preloadPage = true;
		page._onLoad();
	}

	Gnovel.prototype._load = function(page) {
			var pageRoot = new THREE.Object3D();
		//	var pageOverlay1 = new THREE.Object3D();
		//	var pageOverlay2 = new THREE.Object3D();
			var gnovel = this;
			pageRoot.name = "Page Root " + page.getPageLabel();
			this._pageRootObject[page.getPageId()] = pageRoot;
			page._onLoad();

		if(this._preloadPage!=true){
			this._scene.add(this._pageRootObject[page.getPageId()]);
			// FIXME
			// wait for several seconds
			var o = {val:0};
			var loadDuration = 3;
			var tween = new TWEEN.Tween(o)
				.to({
					val: 1,
				}, loadDuration * 1000)
				.onComplete(function() {
					//if 1st page, load without panel transition btw. scenes
					if(page._id==0){
					_onStart(page);
					gnovel._onStart = true;
					console.log("gnovel started");
				}
				});
			tween.start();
		}
	};

	function _onStart(pageObj) {
		pageObj._onStart();
		pageObj._runFlow();
	};

	Gnovel.prototype._unload = function(page) {
		page._onUnload();

		// remove all objects added to scene
		var rootObj = this._pageRootObject[page.getPageId()];
		this._scene.remove(rootObj);

		this._pageRootObject[page.getPageId()] = null;
	};

	Gnovel.prototype.getCurrentPage = function() {
		if(this._curPageIdx < 0 || this._curPageIdx >= this._pages.length)
			return null;
		return this.getPageAt(this._curPageIdx);
	};

	Gnovel.prototype.getPageAt = function(pageIndex) {
		return this._pages[pageIndex];
	};

	Gnovel.prototype.goToPage = function(pageIndex, transitionType, transitionParam) {
		// FIXME : for now regardless of transitionType and transitionParam,
		// the transition is going to be FADE
		// load the next page during transition
		var curPage = this.getCurrentPage();
		var nextPage = this.getPageAt(pageIndex);

		//load next scene into root before showing on screen and transition
		if(pageIndex == 0)
			this._load(nextPage);
		else {
			this._preLoad(nextPage);
		}
		//var nextPageImg = nextPage.

		var curPageObj = this._pageRootObject[this.getPageAt(this._curPageIdx).getPageId()];
		var nextPageObj = this._pageRootObject[pageIndex];
		var transition = new GNOVEL.Transition(1000);
		var gnovel = this;
		var nextPageBG = new THREE.Mesh(nextPage.getBackground().geometry, nextPage.getBackground().material);
		nextPageBG.position.set(nextPage.getBackground().position.x, 
								nextPage.getBackground().position.y, 
								nextPage.getBackground().position.z);

		gnovel._scene.add(this.transitionPanel);
		gnovel._scene.add(nextPageBG);

		transition.run(curPage, nextPageBG,this.transitionPanel, {
			onComplete : function() {
				//gnovel._load(nextPage);
				gnovel._onPageTransitionComplete(gnovel, nextPage, nextPageBG);
				},
			onUpdate : function() {
			}, gnovel
		});
		this._onStart = false;



		this._prevPage = curPage;
		this._curPageIdx = pageIndex;
	};

	Gnovel.prototype.goToPageByLabel = function(pageLabel, transitionType, transitionParam) {
		var nextPage = this._pageDict[pageLabel];
		var nextPageIndex = nextPage.getPageId();

		this.goToPage(nextPageIndex, transitionType, transitionParam);
	};

	Gnovel.prototype._onPageTransitionComplete = function(gnovelObj, page, nextPageBG) {
		//remove transitionPanel
		gnovelObj._scene.remove(this.transitionPanel);
		//resert panel position
		this.transitionPanel.position.set(0,0,-100);
		gnovelObj._scene.remove(nextPageBG);
		gnovelObj._scene.add(gnovelObj._pageRootObject[page.getPageId()]);
		//start flow of next page
		_onStart(page);
		gnovelObj._onStart = true;
		console.log("gnovel started");
		// unload the previous page
		gnovelObj._unload(gnovelObj._prevPage);
	};

	Gnovel.prototype.getCamera = function() {
		return this._camera;
	};

	Gnovel.prototype.seeStats = function() {
		var stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		this._container.appendChild( stats.domElement );
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
		if(index != -1) this._mouseDownListeners.splice(index, 1);
	};

	Gnovel.prototype.addMouseMoveListener = function(obj) {
		this._mouseMoveListeners.push(obj);
	};

	Gnovel.prototype.removeMouseMoveListener = function(obj) {
		var index = GNOVEL.Util.findElement(this._mouseMoveListeners, obj);
		if(index != -1) this._mouseMoveListeners.splice(index, 1);
	};

	Gnovel.prototype.saveData = function(label, data) {
		this._savedData[label] = data;
	};

	Gnovel.prototype.getSavedData = function (label) {
		return this._savedData[label];
	};

	Gnovel.prototype.getSoundManager = function () {
		return this._soundManager;
	};

	Gnovel.prototype.calcMousePositionRelativeToCanvas = function(mouse) {
		var rect = this._renderer.domElement.getBoundingClientRect();
		//console.log();
		mouse.x = ((mouse.x - rect.left)/ this._renderer.domElement.clientWidth) * 2 - 1;
		mouse.y = -((mouse.y - rect.top)/ this._renderer.domElement.clientHeight) * 2 + 1;
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

	GNOVEL.Gnovel = Gnovel;
}());
