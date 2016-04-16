// namespace :
var GNOVEL = GNOVEL || {};

(function() {
	"use strict";

	/**
	 * Transition to next scene over certain time
	 * @class Transition
	 * @constructor
	 * @param {time} time for transition to play, in milliseconds
	 **/
	var Transition = function(time, scene, curPageRT, nextPageRT) {
		this.time = time || 400;

		this._width = 1920;
		this._height = 1080;
		this._scene = scene;

		var texture = THREE.ImageUtils.loadTexture("/static/gnovel/res/textures/ui/transitionPanel_plain.jpg");
		var material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			transparent: true,
			map: texture
		});

		var plane = new THREE.PlaneBufferGeometry(this._width, this._height);
		this.transitionPanel = new THREE.Mesh(plane, material);
		this.transitionPanel.name = "transitionPanel";
		var transitionPanel = this.transitionPanel;

		var redMaterial = new THREE.MeshBasicMaterial({
			transparent: true,
			map: curPageRT,
		});
		var blueMaterial = new THREE.MeshBasicMaterial({
			// color: 0x0000ff,
			transparent: true,
			map: nextPageRT,
		});
		var plane1 = new THREE.PlaneBufferGeometry(this._width, this._height);
		var plane2 = new THREE.PlaneBufferGeometry(this._width, this._height);				

		var curPageBg = new THREE.Mesh(plane1, redMaterial);
		curPageBg.position.setX(-10);
		curPageBg.position.setZ(3);
		curPageBg.scale.set(0.33, 0.33, 1);
		curPageBg.name = "curPageBg";
		transitionPanel.add(curPageBg);
		this._curPageBg = curPageBg;

		var nextPageBg = new THREE.Mesh(plane2, blueMaterial);
		nextPageBg.position.setX(545 + 90);
		nextPageBg.position.setZ(3);
		nextPageBg.scale.set(0.33, 0.33, 1);
		nextPageBg.name = "nextPageBg";
		transitionPanel.add(nextPageBg);
		this._nextPageBg = nextPageBg;
	};

	/**
	 * Do Transition
	 * @param {currentPage} currentPage, the current page to be tansitioned from
	 * @param {nextPage} the new page to show
	 **/
	Transition.prototype.run = function(currentPage, nextPage, params) {
		var duration = this.time;
		var transition = this;
		var transitionPanel = this.transitionPanel;
		var gnovelObj = currentPage.getOwner();
		var scene = this._scene;

		var farZ = -300;
		var leftX = -900;
		var initialScale = 2.2;
		var toScale = 1.5;
		var initialZ = 270;

		console.log("transition is running");

		transitionPanel.position.set(0, 0, initialZ);
		transitionPanel.scale.set(initialScale, initialScale, 1);
		currentPage.getOwner()._scene.add(transitionPanel);
		this._scene.add(transitionPanel);

		this._runOnHierarchy(transitionPanel, {
			opacity: 1
		}, {
			duration: duration,
			onComplete: function() {
				//zoom out the transition panel
				transition._scale(transitionPanel, {
					duration: duration,
					easing: TWEEN.Easing.Cubic.Out,
					// z: farZ,
					x: toScale,
					y: toScale,
					onComplete: function() {

						// wait for several second
						transition._wait({
							duration: .5,
							onComplete: function() {

								// move transition panel to the left
								transition._move(transitionPanel, {
									x: leftX,
									duration: duration,
									easing: TWEEN.Easing.Cubic.Out,
									onComplete: function() {

										// zoom in transition panel 
										transition._scale(transitionPanel, {
											duration: duration,
											// z: initialZ,
											x: initialScale,
											y: initialScale,
											easing: TWEEN.Easing.Cubic.Out,
											onComplete: function() {
												//remove transitionPanel
												// gnovelObj._scene.remove(transitionPanel);
												scene.remove(transitionPanel);
												params.onComplete();
											}
										}); //params passes onComplete from gnovel

									}
								});
							}
						});
					}
				});
			}
		});
	};

	//pause tween
	Transition.prototype._wait = function(params) {
		var o = {
			val: 0
		};
		var waitDuration = params.duration || .5;
		var wait = new TWEEN.Tween(o)
			.to({
				val: 1,
			}, waitDuration * 1000);

		if (params.onComplete != null) {
			wait.onComplete(params.onComplete);
		};

		wait.start();
	};

	Transition.prototype._move = function(obj, params) {
		var duration = params.duration || 1000;

		var tween = new TWEEN.Tween(obj.position)
			.to({
				x: (params.x !== null ? params.x : obj.position.x),
				y: (params.y !== null ? params.y : obj.positions.y),
				z: (params.z !== null ? params.z : obj.position.z),
			}, duration)
			.easing(params.easing || TWEEN.Easing.Linear.None);
		if (params.onComplete != null) {
			tween.onComplete(params.onComplete);
		}
		tween.start();
	};

	Transition.prototype._scale = function(obj, params) {
		var duration = params.duration || 1000;

		var tween = new TWEEN.Tween(obj.scale)
			.to({
				x: (params.x !== null ? params.x : obj.scale.x),
				y: (params.y !== null ? params.y : obj.scale.y),
				z: (params.z !== null ? params.z : obj.scale.z),
			}, duration)
			.easing(params.easing || TWEEN.Easing.Linear.None);
		if (params.onComplete != null) {
			tween.onComplete(params.onComplete);
		}
		tween.start();
	};

	Transition.prototype._runOnHierarchy = function(h, toObj, params) {
		var duration = params.duration;
		var isOnCompleteAdded = false;

		h.traverseVisible(function(obj3d) {
			// if (obj3d.material == null || obj3d.material.opacity == 0)
			// 	return;

			if (toObj.opacity == 1)
				obj3d.material.opacity = 0;
			else
				obj3d.material.opacity = 1;

			//tween opacity for fade over duration time
			var tween = new TWEEN.Tween(obj3d.material)
				.to(toObj, duration).easing(TWEEN.Easing.Cubic.Out);

			if (params != null) {
				if (params.onComplete != null && !isOnCompleteAdded) {
					tween.onComplete(params.onComplete);
					isOnCompleteAdded = true;
				}
			}
			tween.start();
		});

	};

	Transition.prototype._setCurPageBgMaterial = function(mat) {
		this._curPageBg.material = mat;
	};

	Transition.prototype._setNextPageBgMaterial = function(mat) {
		this._nextPageBg.material = mat;
	};

	// transition type
	GNOVEL.TransitionType = {};
	GNOVEL.TransitionType.FADE = 0;

	GNOVEL.Transition = Transition;

}());