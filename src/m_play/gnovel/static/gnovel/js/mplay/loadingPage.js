// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class PageEnding
	 * @augments MPlay.MPlayPage
	 */
var PageLoading = function(){
  MPLAY.MPlayPage.call(this);

  this._tweenComplete = true;
	this._curText = null;
	this._curTextBar = null;

  var page = this;
  var tutCounter = 0;
  //var mouseDownListener = null;
    this.mouseDownListener = function(event) {
    event.preventDefault();
    var mouse = {};
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    if(page._tweenComplete)
    {
			page._tweenComplete = false;
    	tutCounter = page._TutorialNext(tutCounter);
    }
  };

  this._tutorialText = ["Click on characters or other objects like your phone to interact with them.",
  "Decisions affect your relationship with other characters.",
  "Look out for situations that involve moral choices and may affect the story."];



};

PageLoading.prototype = Object.create(MPLAY.MPlayPage.prototype);
PageLoading.prototype.constructor = PageLoading;


/**
 * @override
 */

 PageLoading.prototype._onLoad = function(){
   MPLAY.MPlayPage.prototype._onLoad.call(this);

   var background = this.createImage("/static/gnovel/res/loadingPage/loading screen_noBox.png",new THREE.Vector3(0,0,0),1920,1080);
   //background.position.z = this.getBackgroundLayer();
   this.setBackground("/static/gnovel/res/loadingPage/loading screen_noBox.png");

	 var loadSymbol = this.createImage("/static/gnovel/res/loadingPage/loading_symbol.png",new THREE.Vector3(550,320,0),300,150);
	 loadSymbol.material.opacity = 0;
	 this._addToScene(loadSymbol);

	 this.tweenFlash(loadSymbol,{
		 opacity2: 0,
		 easing:TWEEN.Easing.Cubic.Out,
	 	duration:1500,});
	 this.getOwner().addMouseDownListener(this.mouseDownListener);

 };

 PageLoading.prototype._TutorialNext = function(count){
	 var page = this;

   if(count == 2)
   {
     this._compassAnim();
   };
	 //display textbox on top of background

	 if(this._tutorialText[count]!=null)
	 {
		 var textbar = this.createImage("/static/gnovel/res/loadingPage/loading_textBox.png", new THREE.Vector3(0,0,this.getBackgroundLayer() + 10),1000,150);

		 var message = this._tutorialText[count];
		 var tutText = this.createTextBox(message,{
			 charLine: 55,
			 font: "35px Noteworthy",
			 center: true,
			 fillstyle: '#ffffff',});

		 //remove previous text and fade out
		 if(this._curText)
		 {
			 this.tweenMat(this._curTextBar,{
				 duration:400,
				 easing:TWEEN.Easing.Cubic.Out,
				 opacity: 0,
				 onComplete: function(){
					 page._removeFromScene(this._curTextBar);
				 }
			 });

			 this.tweenMat(this._curText,{
				 duration:400,
				 easing:TWEEN.Easing.Cubic.Out,
				 opacity: 0,
				 onComplete: function(){
					 page._removeFromScene(this._curText);
				 }
			 });

		 }

		 //fade in textbar
		 this._addToScene(textbar);
		 textbar.material.opacity = 0;
		 this.tweenMat(textbar,{
			 duration:600,
			 easing:TWEEN.Easing.Cubic.Out,
			 opacity: 1,
		 });




	     tutText.position.set(20,30,textbar.position.z+5);

	     this._addToScene(tutText);
			 tutText.material.opacity = 0;
			 this.tweenMat(tutText,{
				 duration:600,
				 easing:TWEEN.Easing.Cubic.Out,
				 opacity: 1,
			 });
			 this._curText = tutText;
			 this._curTextBar = textbar;
			 //increment count for which text should display
			 count++;
			 //after tweening in text
			 this._tweenComplete = true;
		 }
		 else {
		 		if(this._curText)
				{
					//fade out and remoev
					this.tweenMat(this._curTextBar,{
	 				 duration:400,
	 				 easing:TWEEN.Easing.Cubic.Out,
	 				 opacity: 0,
	 				 onComplete: function(){
	 					 page._removeFromScene(this._curTextBar);
	 				 }
	 			 });

	 			 this.tweenMat(this._curText,{
	 				 duration:400,
	 				 easing:TWEEN.Easing.Cubic.Out,
	 				 opacity: 0,
	 				 onComplete: function(){
	 					 page._removeFromScene(this._curText);
	 				 }
	 			 });
				}
		 }
		 return count;
 };

 PageLoading.prototype._compassAnim = function(){

	 var page = this;
   var compassBack = this.createImage("/static/gnovel/res/textures/ui/compass background.png", new THREE.Vector3(-400, 0, this._backgroundLayer + 35), 150, 150);
   var compassFront = this.createImage("/static/gnovel/res/textures/ui/compass main.png", new THREE.Vector3(-400, 0, this._backgroundLayer + 35), 150, 150);
   compassBack.material.opacity = 0;
   compassFront.material.opacity = 0;

   this._addToScene(compassBack);
   this._addToScene(compassFront);
   var delayFX = 500;

   //full COMPASS ANIMATION
   //fade compass in
   this.tweenMat(compassFront, {
     easing: TWEEN.Easing.Cubic.Out,
     duration:1000,
     opacity: 1,
   });
   this.tweenMat(compassBack, {
     easing: TWEEN.Easing.Cubic.Out,
     duration:1000,
     opacity: 1,
     onComplete: function() {

     //ANIMATE spin compass
         var duration = 200;
         var rotDest = .3;
         var rotTween = new TWEEN.Tween(compassFront.rotation)
           .to({
             z: 90*Math.PI/180, //rotates 90 degrees
           }, duration)
           .easing(TWEEN.Easing.Linear.None)
           .repeat(10)
           .onComplete(function() {

             //fade compass out
             page.tweenMat(compassFront, {
               easing: TWEEN.Easing.Cubic.Out,
               duration: 800,
               opacity: 0,
               opacity2: 0,
               delay: delayFX,
             });
             page.tweenMat(compassBack, {
               easing: TWEEN.Easing.Cubic.Out,
               duration: 800,
               opacity: 0,
               opacity2: 0,
               delay: delayFX,
               onComplete: function() {
                 page._removeFromScene(compassBack);
                 page._removeFromScene(compassFront);
               },
             });

           });

         rotTween.start();
 		 },
 	});
 };

 PageLoading.prototype._onUnload = function(){

 };


 $(document).ready(function () {

    });

    window.addEventListener('resize', function(event) {
       var container = document.getElementById("container");

      var aspect_ratio = window.innerWidth / window.innerHeight;

      if (aspect_ratio > 16 / 9) {
        // fill height
        container.height = window.innerHeight;
        container.width = (16 / 9) * container.height;
      } else {
        // fill width
        container.width = window.innerWidth;
        container.height = (9 / 16) * container.width;
      }
    });

MPLAY.PageLoading = PageLoading;
}());
