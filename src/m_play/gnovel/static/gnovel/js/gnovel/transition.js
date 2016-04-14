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
	var Transition = function(time) {
		this.time = time || 400;

		var texture = THREE.ImageUtils.loadTexture("/static/gnovel/res/textures/transitionPanel_plainSM.jpg");
		var material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			transparent: true,
			map: texture
		});

		var plane = new THREE.PlaneBufferGeometry(6154, 3546);
		this.transitionPanel = new THREE.Mesh(plane, material);
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
		var gnovelWidth = 1920; //params.gnovel._width;
		var gnovelHeight = 1080; //params.gnovel._height;

		var newBgPos = {
			x: -gnovelWidth - 200,
			y: 0,
			z: -630
		};

		var bgInPos = {};
		bgInPos.x = -gnovelWidth - 100;
		bgInPos.y = 0;
		bgInPos.z = -200;

		currentPage.getOwner()._scene.add(transitionPanel);

		var redMaterial = new THREE.MeshBasicMaterial({
			color: 0xff0000,
		});
		var blueMaterial = new THREE.MeshBasicMaterial({
			color: 0x0000ff,
		});
		var plane = new THREE.PlaneBufferGeometry(192, 108);

		// var curPageBg = new THREE.Mesh(plane, redMaterial);
		// curPageBg.position.setX(10);
		// curPageBg.position.setZ(1);
		// curPageBg.scale.set(0.3, 0.3, 1);
		// this.transitionPanel.add(curPageBg);

		// var nextPageBg = new THREE.Mesh(plane, blueMaterial);
		// nextPageBg.position.setX(100 + 1090/2);
		// nextPageBg.position.setZ(1);
		// nextPageBg.scale.set(0.3, 0.3, 1);
		// this.transitionPanel.add(nextPageBg);

		transitionPanel.position.set(0, 0, -100);

		//zoom out the transition panel
		transition.tweenZoom(transitionPanel, newBgPos, {
			duration: duration,
			onComplete: function() {

				// wait for several second
				transition.wait({
					onComplete: function() {

						// move transition panel to the left
						var bgTweenIn = new TWEEN.Tween(transitionPanel.position)
							.to({
								x: bgInPos.x,
								y: bgInPos.y
							}, duration)
							.easing(TWEEN.Easing.Linear.None)
							.onComplete(function() {

								// zoom in transition panel 
								transition.tweenZoom(transitionPanel, bgInPos, {
									duration: duration,
									onComplete: function() {
										//remove transitionPanel
										gnovelObj._scene.remove(transitionPanel);
										params.onComplete();
									}
								}); //params passes onComplete from gnovel
							});

						bgTweenIn.start();
					}
				});
			}
		});
	}

	//zoomm in-out tween
	Transition.prototype.tweenZoom = function(obj, zoomPos, params) {
		var transition = this;
		var duration = params.duration;
		var tween = new TWEEN.Tween(obj.position)
			.to({
				z: zoomPos.z
			}, duration)
			.easing(TWEEN.Easing.Linear.None);

		tween.onComplete(params.onComplete);
		tween.start();
	}

	//pause tween
	Transition.prototype.wait = function(params) {
		var o = {
			val: 0
		};
		var waitDuration = .5;
		var wait = new TWEEN.Tween(o)
			.to({
				val: 1,
			}, waitDuration * 1000);

		if (params.onComplete != null) {
			wait.onComplete(params.onComplete);
		};

		wait.start();
	}

	Transition.prototype._runOnHierarchy = function(h, toObj, params) {
		var duration = this.time;
		var isOnCompleteAdded = false;

		/*		
			h.traverseVisible(function(obj3d) {
				if(obj3d.material == null || obj3d.material.opacity == 0)
					return;

				if(toObj.opacity == 1)
					obj3d.material.opacity = 0;
				else
					obj3d.material.opacity = 1;

				//tween opacity for fade over duration time
				var tween = new TWEEN.Tween(obj3d.material)
				.to(toObj, duration);

				if(params != null)
				{
					if(params.onComplete != null && !isOnCompleteAdded) {
						tween.onComplete(params.onComplete);
						isOnCompleteAdded = true;
					}
				}
				tween.start();
			});
		*/
	}

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

	// transition type
	GNOVEL.TransitionType = {};
	GNOVEL.TransitionType.FADE = 0;

	GNOVEL.Transition = Transition;

}());