
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
		this._prevPage = null;
		this._pageRootObject = {curPage : null, prevPage : null};		
		this._raycaster = new THREE.Raycaster();
		this._mouseDownListeners = [];
		this._mouseMoveListeners = [];
		this._started = false; // will be true if onStart is finished
		this._savedData = {};
		this._onMouseDownProcessing = false;

		this._width = window.innerWidth;
		this._height = window.innerHeight;
		this._camera = new THREE.PerspectiveCamera(50, this._width / this._height, 100, 1200);
		this._renderer = null;

		var canvas = document.getElementById("application-canvas");
		this._renderer = new THREE.WebGLRenderer({canvas: canvas, logarithmicDepthBuffer: true});

		var gnovel = this;		

		var camera = this._camera;
		camera.position.z = 900;

		var scene = this._scene;

		scene.add(camera);		
		
		this._renderer.setPixelRatio(window.devicePixelRatio);
		this._renderer.autoClear = false;		

		// setup render loop
		var render = function () {
			requestAnimationFrame(render);
			TWEEN.update();
			gnovel._renderer.render(scene, camera);

			if(gnovel._stats !== null) {
				gnovel._stats.update();
			}
		};
		render();

		var listener = new THREE.AudioListener();
		camera.add(listener);

		var gnovel = this;
		document.addEventListener('mousedown', function(event) { gnovel._onMouseDown(event); }, false);
		document.addEventListener('mousemove', function(event) { gnovel._onMouseMove(event); }, false);
	};

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

	Gnovel.prototype._load = function(page) {
		var pageRoot = new THREE.Object3D();
	//	var pageOverlay1 = new THREE.Object3D();
	//	var pageOverlay2 = new THREE.Object3D();
		var gnovel = this;
		pageRoot.name = "Page Root " + page.getPageLabel();
		this._pageRootObject[page.getPageId()] = pageRoot;
		this._scene.add(pageRoot);
		page._onLoad();

		// FIXME
		// wait for several seconds
		var o = {val:0};
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
		var curPage = this.getCurrentPage();
		var nextPage = this.getPageAt(pageIndex);

		// load the next page first
		this._load(nextPage);

		this._onStart = false;
		var transition = new GNOVEL.Transition(1000);
		var gnovel = this;
		transition.run(curPage, nextPage, {onComplete : function() {gnovel._onPageTransitionComplete(gnovel);}});

		this._prevPage = curPage;
		this._curPageIdx = pageIndex;
	};

	Gnovel.prototype.goToPageByLabel = function(pageLabel, transitionType, transitionParam) {
		var nextPage = this._pageDict[pageLabel];
		var nextPageIndex = nextPage.getPageId();

		this.goToPage(nextPageIndex, transitionType, transitionParam);
	};

	Gnovel.prototype._onPageTransitionComplete = function(gnovelObj) {
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

	GNOVEL.Gnovel = Gnovel;
}());
