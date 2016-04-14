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
		this.isOnCompleteAdded = true;

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

		var curPageRootObj = currentPage._getRootObject();
		var nextPageRootObj = nextPage._getRootObject();

		//Right to Left transition!!
		transition.isOnCompleteAdded = false;
		nextPageRootObj.position.x = gnovelWidth + 50;
		nextPageRootObj.position.y = 0;

		var newBgPos = {
			x: -gnovelWidth - 200,
			y: 0,
			z: -630
		};

		var inPos = {};
		inPos.x = 0;
		inPos.y = 0;
		inPos.z = 0;

		var outPos = {};
		outPos.x = -gnovelWidth - 50;
		outPos.y = 0;
		outPos.z = -500;

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

		//move transition
		transition.tweenZoom(transitionPanel, newBgPos, {
			duration: duration,
			onComplete: function() {

				// wait for several second
				transition.wait({
					onComplete: function() {

						var bgTweenIn = new TWEEN.Tween(transitionPanel.position)
							.to({
								x: bgInPos.x,
								y: bgInPos.y
							}, duration)
							.easing(TWEEN.Easing.Linear.None)
							.onComplete(function() {
								transition.tweenZoom(transitionPanel, bgInPos, {
									duration: duration,
									onComplete: function() {
										//remove transitionPanel
										gnovelObj._scene.remove(transitionPanel);
									}
								}); //params passes onComplete from gnovel
							});

						bgTweenIn.start();
					}
				});
			}
		});

		// test
		// move transition panel
		// transition._move(transitionPanel, {
		// 	duration: duration,
		// 	easing: TWEEN.Easing.Cubic.Out,
		// 	z: -100, 
		// });

		//zoom pages out
		transition.tweenZoom(nextPageRootObj, outPos, {
			duration: duration
		});

		transition.tweenZoom(curPageRootObj, outPos, {
			duration: duration,
			onComplete: function() {

				//make previous page no longer visible
				//curPageRootObj.visible = false;
				//tweenIn.onComplete(function(){});
				//Do slide and zoom in transition
				transition.wait({
					onComplete: function() {
						//tween previous page and new page at same time
						var outTarget = {
							x: curPageRootObj.position.x + outPos.x,
							y: curPageRootObj.position.y + outPos.y
						};
						var tweenOut = new TWEEN.Tween(curPageRootObj.position)
							.to(outTarget, duration)
							.easing(TWEEN.Easing.Linear.None);

						tweenOut.start();
						tweenIn.start();
					}
				});
			}
		});

		//tween new page in
		var tweenIn = new TWEEN.Tween(nextPageRootObj.position)
			.to({
				x: inPos.x,
				y: inPos.y
			}, duration)
			.easing(TWEEN.Easing.Linear.None)
			.onComplete(function() {
				transition.tweenZoom(nextPageRootObj, inPos, params);
				transition.tweenZoom(curPageRootObj, inPos, {});
			});

		if (params != null) {
			if (params.onComplete != null && !this.isOnCompleteAdded) {
				tweenIn.onComplete(params.onComplete);
				this.isOnCompleteAdded = true;
			}
		}
	}

	//zoomm in-out tween
	Transition.prototype.tweenZoom = function(obj, zoomPos, params) {
		var transition = this;
		var duration = params.duration;
		var tweenZoom = new TWEEN.Tween(obj.position)
			.to({
				z: zoomPos.z
			}, duration)
			.easing(TWEEN.Easing.Linear.None);

		if (params.onComplete != null && !transition.isOnCompleteAdded) {
			tweenZoom.onComplete(params.onComplete);
			transition.isOnCompleteAdded = true;
		} else if (params.onComplete != null) {
			tweenZoom.onComplete(params.onComplete);
		};

		tweenZoom.start();
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

	Transition.prototype._tweenPos = function(obj, inPos, params) {
		var duration = params.duration || 1000;
		var target = inPos;
		var tween = new TWEEN.Tween(obj.position)
			.to(target, duration)
			.easing(TWEEN.Easing.Linear.None);

		if (params != null) {
			if (params.onComplete != null && !isOnCompleteAdded) {
				tween.onComplete(params.onComplete);
				isOnCompleteAdded = true;
			}
		}
		tween.start();
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

	// transition type
	GNOVEL.TransitionType = {};
	GNOVEL.TransitionType.FADE = 0;

	GNOVEL.Transition = Transition;

}());