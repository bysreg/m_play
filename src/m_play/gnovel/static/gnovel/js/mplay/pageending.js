// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class PageEnding
	 * @augments MPlay.MPlayPage
	 */
	var PageEnding = function() {
		MPLAY.MPlayPage.call(this);
	};

	PageEnding.prototype = Object.create(MPLAY.MPlayPage.prototype);
	PageEnding.prototype.constructor = PageEnding;

	/**
	 * @override
	 */
	PageEnding.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		var material = new THREE.MeshBasicMaterial({
			color: 0x000000,
			transparent: true,			
		});
		var plane = new THREE.PlaneBufferGeometry(1920, 1080);
		var quad = new THREE.Mesh(plane, material);		
		quad.position.z = this.getBackgroundLayer();

		// add this to the scene
		this._addToScene(quad);
	};

	MPLAY.PageEnding = PageEnding;
}());
