

var GNOVEL = GNOVEL || {};

(function() {
	"use strict";

	/**
	 * @class  MouseMovedCamera
	 * If created, will enable effect of mouse moved camera (small shift in the camera's direction vector according to mouse movement)
	 * @param {[GNOVEL.Gnovel]} gnovel
	 * @constructor
	 */
	var MouseMovedCamera = function(gnovel) {
		this._gnovel = gnovel;

		document.addEventListener('mousemove', function(event) {onDocumentMouseMove(event, gnovel);}, false);
	};

	function onDocumentMouseMove( event, gnovelObj ) {
		var mouseX = -( event.clientX - window.innerWidth / 2 ) / 4;
		var mouseY = ( event.clientY - window.innerHeight / 2 ) / 4;
		var camera = gnovelObj.getCamera();

		camera.position.x += ( mouseX - camera.position.x ) * .008;
		camera.position.y += ( mouseY - camera.position.y ) * .008;
		camera.lookAt(new THREE.Vector3(0, 0, 0));
	};

	GNOVEL.MouseMovedCamera = MouseMovedCamera;
}());