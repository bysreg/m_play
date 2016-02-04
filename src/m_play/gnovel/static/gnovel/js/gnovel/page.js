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

		//add event listeners and bind them
		window.addEventListener("sceneResume",this.onResume.bind(this));
		window.addEventListener("scenePause",this.onPause.bind(this));
		window.addEventListener("sceneEnter",this.onEnter.bind(this));
		window.addEventListener("sceneExit",this.onExit.bind(this));

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
		var plane = new THREE.PlaneBufferGeometry(512, 768);
		var quad = new THREE.Mesh(plane, material);
		quad.position.z = 100;
		quad.name = "Background";

		// add this to the scene
		this._addToScene(quad);

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
		this._addToScene(hud);
	}

	Page.prototype.showChoice = function(){

	}

	Page.prototype.playAnimation = function(){
	}

	/**
	 * This function will be called right before page is displayed on screen
	 */
	Page.prototype._onLoad = function() {};

	/**
	 * This function will be called right before page is removed from screen
	 *
	 */
	Page.prototype._onUnload = function() {};

	Page.prototype._onMouseDown = function(event) {
		onPause()
	};

	Page.prototype._onMouseMove = function(event) {};

	Page.prototype.move = function(obj, params) {
		var duration = params.duration || 1000;

		var tween = new TWEEN.Tween(obj.position)
			.to({
				x: (params.x !== null ? params.x : obj.x),
				y: (params.y !== null ? params.y : obj.y),
				z: (params.z !== null ? params.z : obj.z),
			}, duration)
			.easing(params.easing || TWEEN.Easing.Linear.None)
			.start();
	};

	Page.prototype.onPause = function(evt) {}
	Page.prototype.onResume = function(evt) {}
	Page.prototype.onEnter = function(evt) {}
	Page.prototype.onExit = function(evt) {}


	// function for drawing rounded rectangles
	function roundRect(ctx, x, y, w, h, r)
	{
		ctx.beginPath();
		ctx.moveTo(x+r, y);
		ctx.lineTo(x+w-r, y);
		ctx.quadraticCurveTo(x+w, y, x+w, y+r);
		ctx.lineTo(x+w, y+h-r);
		ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
		ctx.lineTo(x+r, y+h);
		ctx.quadraticCurveTo(x, y+h, x, y+h-r);
		ctx.lineTo(x, y+r);
		ctx.quadraticCurveTo(x, y, x+r, y);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}

	/**
	 * Page identifier. Will be set by Gnovel object
	 * @param {int} id
	 */
	Page.prototype._setPageId = function(id) {
		this._id = id;
	};

	/**
	 * Returns page identifier in Gnovel object. Returns -1 if it hasnt been added to any Gnovel object
	 * @return {int}
	 */
	Page.prototype.getPageId = function() {
		return this._id;
	};

	/**
	 * adapted from https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/Sprite-Text-Labels.html
	 */
	Page.prototype.addTextBox = function(message, parameters) {
		var fontface = parameters.hasOwnProperty("fontface") ?
			parameters["fontface"] : "Arial";

		var fontsize = parameters.hasOwnProperty("fontsize") ?
			parameters["fontsize"] : 18;

		var borderThickness = parameters.hasOwnProperty("borderThickness") ?
			parameters["borderThickness"] : 4;

		var borderColor = parameters.hasOwnProperty("borderColor") ?
			parameters["borderColor"] : {
				r: 0,
				g: 0,
				b: 0,
				a: 1.0
			};

		var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
			parameters["backgroundColor"] : {
				r: 255,
				g: 255,
				b: 255,
				a: 1.0
			};

		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		context.font = "Bold " + fontsize + "px " + fontface;

		// get size data (height depends only on font size)
		var metrics = context.measureText(message);
		var textWidth = metrics.width;

		// background color
		context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
		// border color
		context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
		context.lineWidth = borderThickness;
		roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
		// 1.4 is extra height factor for text below baseline: g,j,p,q.

		// text color
		context.fillStyle = "rgba(0, 0, 0, 1.0)";
		context.fillText(message, borderThickness, fontsize + borderThickness);

		// canvas contents will be used for a texture
		var texture = new THREE.Texture(canvas)
		texture.needsUpdate = true;
		var spriteMaterial = new THREE.SpriteMaterial({
			map: texture,
		});
		var sprite = new THREE.Sprite(spriteMaterial);
		sprite.name = "Text Box";
		sprite.scale.set(100, 50, 1.0);
		return sprite;
	};

	Page.prototype._addToScene = function(o) {
		this._owner._addToScene(this, o);
	};

	Page.prototype._getRootObject = function() {
		return this._owner._getPageRootObject(this);
	};

	GNOVEL.Page = Page;
}());
