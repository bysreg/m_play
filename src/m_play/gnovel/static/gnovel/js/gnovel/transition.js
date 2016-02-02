// namespace :
var GNOVEL = GNOVEL || {};

(function() {
	"use strict";

	/**
	 *transition to next scene over certain time
	 * @class Transition
	 * @constructor
	 * @param {time} time for transition to play, in milliseconds
	 **/
	var Transition = function(time) {
		this.time = time || 400;
	};

	/**
	 * Do Transition. only called by the Manager
	 * @method run
	 * @param {currentPage} currentPage, the current page to be tansitioned from
	 * @param {nextPage} the new page to show
	 **/
	Transition.prototype.run = function(currentPage, nextPage) {
		var duration = this.time;		
		
		nextPage.getBackground().material.opacity = 0;	

		//tween opacity for fade over duration time.
		var tween_out = new TWEEN.Tween(currentPage.getBackground().material)
			.to({
				opacity: 0
			}, duration)
			.start();

		var tween_in = new TWEEN.Tween(nextPage.getBackground().material)
			.to({
				opacity: 1
			}, duration)
			.start();		
	};
	
	// transition type
	GNOVEL.TransitionType = {};
	GNOVEL.TransitionType.FADE = 0;

	GNOVEL.Transition = Transition;

}());