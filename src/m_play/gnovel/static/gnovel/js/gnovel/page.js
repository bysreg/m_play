

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
	};

	Page.prototype.setBackground = function(path) {
		var texture = THREE.ImageUtils.loadTexture(path);
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.NearestFilter;

		var material = new THREE.MeshBasicMaterial({color: 0xffffff, map: texture});
		var plane = new THREE.PlaneBufferGeometry(512, 768);
		var quad = new THREE.Mesh(plane, material);
		quad.position.z = 100;

		// add this to the scene
		this._owner._addToScene(quad);

		this._bg = quad;
	};

	/**
	 * This function will be called right before page is displayed on screen	 
	 */
	Page.prototype._onLoad = function() {}

	Page.prototype._onMouseDown = function(event) {	
	};

	Page.prototype._onMouseMove = function(event) {		
	};

	GNOVEL.Page = Page;
}());








