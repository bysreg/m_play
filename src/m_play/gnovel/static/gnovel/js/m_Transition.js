this.gnovel = this.gnovel || {};


(function(){

	"use strict";
/**
*transition to next scene over certain time
* @class Transitions
* @constructor
* @param {time} time for transition to play, in milliseconds
**/
  var Transitions = function(time){

    this.time = time || 400;
  };

  var tTrans = Transitions.prototype;

  /**
  * Do Transition. only called by the Manager
  * @method run
  * @param {manager} the page manager
  * @param {currentPage} currenPage, the current page to be tansitioned from
  * @param {nextPage} the new page to show
  **/
  Transitions.prototype.run = function(manager, currentPage, nextPage){
    var oldScene = [];
    for(var i = 0;i < manager.pageStack.length;i++)
    {
      oldScene[i] = manager.pageStack;
    }
    var duration = this.time;

//make function for fade transition effect
/**
* @method transition_fade
*
**/
    //tween opacity for fade over duration time.
    var tween_out = new TWEEN.Tween( currentPage.material)
    .to({opacity:0},duration)
    .start();
    nextPage.material.opacity = 0;
    var tween_in = new TWEEN.Tween(nextPage.material)
    .to({opacity:1},duration)
    .start();
  };
  gnovel.Transitions = Transitions;

}());
