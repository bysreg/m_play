

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
		var mouse = {x: 0, y: 0};

		document.addEventListener('mousemove', function(event) {onDocumentMouseMove(event, gnovel, mouse);}, false);
	};

	function onDocumentMouseMove( event, gnovelObj, mouse) {
		// var mouseX = -( event.clientX - window.innerWidth / 2 ) / 4;
		// var mouseY = ( event.clientY - window.innerHeight / 2 ) / 4;
		// var camera = gnovelObj.getCamera();

		// camera.position.x += ( mouseX - camera.position.x ) * .002;
		// camera.position.y += ( mouseY - camera.position.y ) * .002;

		// camera.position.x = THREE.Math.clamp(camera.position.x, 0, 10);
		// camera.position.y = THREE.Math.clamp(camera.position.y, -10, 10);

		// console.log(mouseY + " " + camera.position.y);
		//camera.lookAt(new THREE.Vector3(0, 0, 400));

		mouse.x = event.clientX;
		mouse.y = event.clientY;
		gnovelObj.calcMousePositionRelativeToCanvas(mouse);

		//mouse.x -= gnovelObj._getRenderer().domElement.clientWidth / 2;
		//mouse.y -= gnovelObj._getRenderer().domElement.clientHeight / 2;

		//console.log("test " + mouse.x + " " + mouse.y);

		//gnovelObj._scene.position.x = mouse.x * 10;
		//gnovelObj._scene.position.y = mouse.y * 10;
		gnovelObj.getCurrentPage()._getRootObject().position.x = -mouse.x * 10;
		gnovelObj.getCurrentPage()._getRootObject().position.y = -mouse.y;
		gnovelObj.getCurrentPage()._getPageSceneBg().position.x = -mouse.x * 10;
		gnovelObj.getCurrentPage()._getPageSceneBg().position.y = -mouse.y;
	};

	GNOVEL.MouseMovedCamera = MouseMovedCamera;
}());
