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
	};

	/**
	 * Do Transition
	 * @method run
	 * @param {currentPage} currentPage, the current page to be tansitioned from
	 * @param {nextPage} the new page to show
	 **/
	Transition.prototype.run = function(currentPage, nextPage, params) {
		var duration = this.time;		
		var toObjIn = {opacity: 1};
		var toObjOut = {opacity: 0};		

		var curPageRootObj = currentPage._getRootObject();
		var nextPageRootObj = nextPage._getRootObject();
		this._runOnHierarchy(curPageRootObj, toObjOut, params);
		this._runOnHierarchy(nextPageRootObj, toObjIn, params);

	};
	
	Transition.prototype._runOnHierarchy = function(h, toObj, params) {
		var duration = this.time;		

		var isOnCompleteAdded = false;

		h.traverseVisible(function(obj3d) {

			if(obj3d.material == null)
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
	}

	// transition type
	GNOVEL.TransitionType = {};
	GNOVEL.TransitionType.FADE = 0;

	GNOVEL.Transition = Transition;

}());