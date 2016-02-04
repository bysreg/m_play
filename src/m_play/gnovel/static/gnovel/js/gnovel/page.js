

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
	};

	Page.prototype.setBackground = function(path) {
		var texture = THREE.ImageUtils.loadTexture(path);
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.NearestFilter;

		var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent:true, map: texture});
		var plane = new THREE.PlaneBufferGeometry(512, 768);
		var quad = new THREE.Mesh(plane, material);
		quad.position.z = 100;

		// add this to the scene
		this._owner._addToScene(quad);

		this._bg = quad;
	};

	Page.prototype.getBackground = function() {
		return this._bg;
	};

	Page.prototype.createImage = function(path,position){
		var texture = THREE.ImageUtils.loadTexture(path);
		var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent:true, map: texture});
		var plane = new THREE.PlaneBufferGeometry(512, 768);
		var quad = new THREE.Mesh(plane, material);
		//quad.position.set(position);
		quad.position.set(position.x,position.y,position.z);
		this._owner._addToScene(quad);

		return quad;
	};

	Page.prototype.addCharacter = function(name,obj){
		//add character to scene
		obj.scale.set(.5,.5,1);
		obj.name = name;
		//add character to list of objects in scene
		this._iObjects.push(obj);
	};

	Page.prototype.showHUD = function(){
		var hud = this.createImage("/static/gnovel/res/textures/blue_box.png",new THREE.Vector3(0,-300,10));
		var uiHeight = .2;
		var uiWidth = 1.5;
		hud.scale.set(uiWidth,uiHeight,1);
		hud.material.opacity = 0.7;
		//hud.position.set(-window.innerWidth/window.innerHeight,-window.innerHeight/window.innerWidth,10);
		this._owner._addToScene(hud);
	}

	Page.prototype.showChoice = function(){

	}

	Page.prototype.playAnimation = function(){
	}

	/**
	 * This function will be called right before page is displayed on screen
	 */
	Page.prototype._onLoad = function() {};

	Page.prototype._onMouseDown = function(event) {
	};

	Page.prototype._onMouseMove = function(event) {
	};

	Page.prototype.move = function(obj, params) {
		var duration = params.duration || 1000;

		var tween = new TWEEN.Tween(obj.position)
		.to({
			x : (params.x != null ? params.x : obj.x),
			y : (params.y != null ? params.y : obj.y),
			z : (params.z != null ? params.z : obj.z),
		}, duration)
		.easing(params.easing || TWEEN.Easing.Linear.None)
		.start();
	};

	Page.prototype.onPause = function(evt) {}
	Page.prototype.onResume = function(evt) {}
	Page.prototype.onEnter = function(evt) {}
	Page.prototype.onExit = function(evt) {}

	GNOVEL.Page = Page;
}());
