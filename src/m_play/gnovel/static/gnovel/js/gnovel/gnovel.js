
/**
 * @module gnovel
 */

// namespace:
this.gnovel = this.gnovel || {};

(function() {
	"use strict";

	/**
	 *
	 *@class Gnovel
	 *@constructor
	 * 
	 */
	var Gnovel = function() {
		var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
		camera.position.z = 900;
		camera.position.y = 100;

		var scene = new THREE.Scene();

		var renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		var render = function () {
			requestAnimationFrame(render);			
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

		this._scene = scene;		
	};	

	gnovel.Gnovel = Gnovel;
}());