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
	};

	/**
	 * Do Transition
	 * @method run
	 * @param {currentPage} currentPage, the current page to be tansitioned from
	 * @param {nextPage} the new page to show
	 **/
	Transition.prototype.run = function(currentPage, nextPage, transitionPanel, params) {
		var duration = this.time;
		//var duration = params.duration || 1000;
		var transition = this;
		var toObjIn = {opacity: 1};
		var toObjOut = {opacity: 0};
		var gnovelWidth = 1920;//params.gnovel._width;
		var gnovelHeight = 1080;//params.gnovel._height;

		var curPageRootObj = currentPage._getRootObject();
		var nextPageRootObj = nextPage._getRootObject();

		//params.duration = this.time;
		var outPos = {};
		var inPos = {};
		var bgInPos = {};
		var newBgPos = {x:-gnovelWidth-200, y:0, z:-630};
		var container = new THREE.Object3D();

		//container.position.set(0,0,0);
		/*container.add(curPageRootObj);
		container.add(nextPageRootObj);
		container.add(transitionPanel);
		params.gnovel._scene.add(container);*/

		transition.isOnCompleteAdded = false;
		nextPageRootObj.position.x = gnovelWidth+50;
		nextPageRootObj.position.y = 0;
		nextPageRootObj.position.z = -500;
		inPos.x = -150;
		inPos.y = 0;
		inPos.z = -100;
		outPos.x = -gnovelWidth-100;
		outPos.y = 0;
		outPos.z = -500;
		bgInPos.x = -gnovelWidth-200;
		bgInPos.y = 0;
		bgInPos.z = -300;
		//1st, pause current page

		/*transition.tweenZoom(container, outPos,{onComplete : function(){
			transition.wait({onComplete : function(){
				//tween previous page and new page at same time
				var outTarget = {x:container.position.x + outPos.x, y: container.position.y + outPos.y};
				var tweenOut= new TWEEN.Tween(container.position)
				.to(outTarget,duration+10)
				.easing(TWEEN.Easing.Linear.None);

				tweenOut.start();
				tweenIn.start();
			}});
		}});*/
/*
		transition.tweenZoom(container, newBgPos,{onComplete : function(){
			transition.wait({onComplete : function(){
				//tween previous page and new page at same time
				var outTarget = {x:container.position.x + newBgPos.x, y: container.position.y + newBgPos.y};
				var tweenOut= new TWEEN.Tween(container.position)
				.to(outTarget,duration+10)
				.easing(TWEEN.Easing.Linear.None);

				var bgTweenIn = new TWEEN.Tween(container.position)
				.to({x:outPos.x, y:outPos.y},duration+10)
				.easing(TWEEN.Easing.Linear.None)
				.onComplete(function(){
						inPos.z = 300;
						transition.tweenZoom(container, inPos, params);//params passes onComplete from gnovel
				});

				tweenOut.start();
				//bgTweenIn.start();
			}});
		}});*/


		//move BG
		transition.tweenZoom(transitionPanel, newBgPos,{onComplete : function(){
			transition.wait({onComplete : function(){
				//tween previous page and new page at same time
				var outTarget = {x:transitionPanel.position.x + newBgPos.x, y: transitionPanel.position.y + newBgPos.y};
				var tweenOut= new TWEEN.Tween(transitionPanel.position)
				.to(outTarget,duration)
				.easing(TWEEN.Easing.Linear.None);

				var bgTweenIn = new TWEEN.Tween(transitionPanel.position)
				.to({x:bgInPos.x, y:bgInPos.y},duration)
				.easing(TWEEN.Easing.Linear.None)
				.onComplete(function(){
						transition.tweenZoom(transitionPanel, bgInPos, params);//params passes onComplete from gnovel
				});

				tweenOut.start();
				bgTweenIn.start();
			}});
		}});

		//zoom page out
		transition.tweenZoom(curPageRootObj, outPos,{duration: duration-10, onComplete : function(){
			//make previous page no longer visible
			//curPageRootObj.visible = false;
			//tweenIn.onComplete(function(){});
			//Do slide and zoom in transition
			transition.wait({onComplete : function(){
				//tween previous page and new page at same time
				var outTarget = {x:curPageRootObj.position.x + outPos.x, y: curPageRootObj.position.y + outPos.y};
				var tweenOut= new TWEEN.Tween(curPageRootObj.position)
				.to(outTarget,duration)
				.easing(TWEEN.Easing.Linear.None);

				tweenOut.start();
				tweenIn.start();
			}});
		}});

		//tweenZoom.start();

		/*var tweenIn = new TWEEN.Tween(container.position)
		.to({x:inPos.x, y:inPos.y},duration)
		.easing(TWEEN.Easing.Linear.None)
		.onComplete(function(){
				inPos.z = 0;
				transition.tweenZoom(container, inPos, params);
		});
		if(params != null)
		{
			if(params.onComplete != null && !this.isOnCompleteAdded) {
				tweenIn.onComplete(params.onComplete);
				this.isOnCompleteAdded = true;
			}
		}*/

		//tween new page in
		var tweenIn = new TWEEN.Tween(nextPageRootObj.position)
		.to({x:inPos.x+100, y:inPos.y},duration)
		.easing(TWEEN.Easing.Linear.None)
		.onComplete(function(){
				transition.tweenZoom(nextPageRootObj, inPos, params);
				transition.tweenZoom(curPageRootObj, inPos,{});
		});
		if(params != null)
		{
			if(params.onComplete != null && !this.isOnCompleteAdded) {
				tweenIn.onComplete(params.onComplete);
				this.isOnCompleteAdded = true;
			}
		}

		//zoom page in

		//send notifaication to gnovel that part 1 of transition is complete
		//3rd, move background image to the left
		//this._runOnHierarchy(curPageRootObj, nextPageRootObj);

		// only apply params to object in
		//this._runOnHierarchy(nextPageRootObj, toObjIn, params);
	}

	//zoomm in-out tween
	Transition.prototype.tweenZoom = function(obj, zoomPos, params){
		var transition = this;
		var duration = params.duration;
		var tweenZoom = new TWEEN.Tween(obj.position)
			.to({
				z: zoomPos.z
			}, duration)
			.easing(TWEEN.Easing.Linear.None);

			if (params.onComplete != null && !transition.isOnCompleteAdded){
				tweenZoom.onComplete(params.onComplete);
				transition.isOnCompleteAdded = true;
			}
			else if (params.onComplete != null ) {
				tweenZoom.onComplete(params.onComplete);
			};

			tweenZoom.start();

			/*.onComplete(function(){
				//pause tween for brief moment
				transition.wait({onComplete : function(){
					//tween previous page and new page at same time
					tweenOut.start();
					tweenIn.start();
				}});
			});*/
	}

//pause tween
	Transition.prototype.wait = function(params){
		var o = {val:0};
		var waitDuration = .3;
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


/*		h.traverseVisible(function(obj3d) {

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
		});*/
	}

	Transition.prototype._tweenPos = function(obj, inPos, params){

		var duration = params.duration || 1000;
		var target = inPos;
		var tween = new TWEEN.Tween(obj.position)
		.to(target,duration)
		.easing(TWEEN.Easing.Linear.None);

		if(params != null)
		{
			if(params.onComplete != null && !isOnCompleteAdded) {
				tween.onComplete(params.onComplete);
				isOnCompleteAdded = true;
			}
		}
		tween.start();
	};

	// transition type
	GNOVEL.TransitionType = {};
	GNOVEL.TransitionType.FADE = 0;

	GNOVEL.Transition = Transition;

}());
