
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

		var camera = this._camera;
		camera.position.z = 900;
		camera.position.y = 100;

		var scene = this._scene;

		var renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		// setup render loop
		var render = function () {
			requestAnimationFrame(render);			
			TWEEN.update();
			renderer.render(scene, camera);
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
		var helper = new THREE.GridHelper(500, 10);
		helper.color1.setHex(0x444444);
		helper.color2.setHex(0x444444);
		helper.position.y = 0.1;
		scene.add(helper);

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
		page._owner = this;
		this._pages.push(page);
	};

	Gnovel.prototype._addToScene = function(o) {
		this._scene.add(o);
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
		page._onLoad();
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
		transition.run(curPage, nextPage);
	};

	Gnovel.prototype.getCamera = function() {
		return this._camera;
	};

	GNOVEL.Gnovel = Gnovel;
}());