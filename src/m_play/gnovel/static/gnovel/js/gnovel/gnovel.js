
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
		this._curPageIdx = 0;
		this._camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
		this._stats = null;
		this._container = document.createElement('div'); // html div container
		this._prevPage = null;
		this._pageRootObject = {curPage : null, prevPage : null};

		var gnovel = this;

		var container = this._container;
		document.body.appendChild( container );

		var camera = this._camera;
		camera.position.z = 900;		

		var scene = this._scene;

		var renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		// setup render loop
		var render = function () {
			requestAnimationFrame(render);			
			TWEEN.update();
			renderer.render(scene, camera);

			if(gnovel._stats !== null) {
				gnovel._stats.update();
			}				
		};
		render();

		var onWindowResize = function() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);
		};
		window.addEventListener('resize', onWindowResize, false);

		var listener = new THREE.AudioListener();
		camera.add(listener);

		// ground's grid
		/*
		var helper = new THREE.GridHelper(500, 10);
		helper.color1.setHex(0x444444);
		helper.color2.setHex(0x444444);
		helper.position.y = 0.1;
		scene.add(helper);
		*/

		var temp = this;
		document.addEventListener('mousedown', function(event) { _onMouseDown(event, temp); }, false);
		document.addEventListener('mousemove', function(event) { _onMouseMove(event, temp); }, false);
	};

	function _onMouseDown(event, gnovelObj) {		
		gnovelObj._onMouseDown(event);
	};
	
	function _onMouseMove(event, gnovelObj) {
		gnovelObj._onMouseMove(event);
	};

	Gnovel.prototype.addPage = function(pageType) {
		var page = new pageType();
		page._setPageId(this._pages.length);
		page._owner = this;
		this._pages.push(page);
	};

	Gnovel.prototype._addToScene = function(page, o) {		
		this._pageRootObject[page.getPageId()].add(o);		
		//this._scene.add(o);
	};

	Gnovel.prototype._onMouseDown = function(event) {	
		//console.log("on mouse down");	
		var page = this.getCurrentPage();
		if(page != null) {				
			page._onMouseDown(event);
		}
	};

	Gnovel.prototype._onMouseMove = function(event) {
		//console.log("on mouse move");	
		var page = this.getCurrentPage();
		if(page != null) {
			page._onMouseMove(event);
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
		this._pageRootObject[page.getPageId()] = pageRoot;
		this._scene.add(pageRoot);
		page._onLoad();
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

		var transition = new GNOVEL.Transition(1000);
		var gnovel = this;
		transition.run(curPage, nextPage, {onComplete : function() {gnovel._onPageTransitionComplete(gnovel);}});

		this._prevPage = curPage;
		this._curPageIdx = pageIndex;
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

	GNOVEL.Gnovel = Gnovel;
}());