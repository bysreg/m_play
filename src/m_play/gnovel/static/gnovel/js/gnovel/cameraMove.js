var GNOVEL = GNOVEL || {};

(function() {
	"use_strict";

  	/**
  	 * @class cameraMove
     *If enabled, will move camera in direction of a specified object
  	 */

     var CameraMove = function(gnovel){
       this._gnovel = gnovel;
       var origin = new THREE.Vector3(0,0,0);
     };

     /**
     *@param destPos = destination position from image to point to
     */
     	CameraMove.prototype.setCamDirection = function(position, destPos){

        var camera = this._gnovel.getCamera();
        var duration = 500;
        var curPos = camera.position;
        var newPos = new THREE.Vector3(curPos.x,curPos.y,curPos.z);
        //get vector of camera direction
        var curDir = camera.getWorldDirection();

        //add offset to camera pos
        if (position === "left") {
          newPos.x = destPos.x + 250;
        } else if (position === "center") {
          newPos.x = 0;
        } else if (position === "right") {
          newPos.x = destPos.x - 350;
        }

        //tween camera direction
        //increment curPos to newPos and set lookat position to curPos
        var tweenPos = new TWEEN.Tween(curPos)
        .to(newPos, duration)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function(){
          camera.lookAt(curPos);
        })
        .onComplete(function(){
          console.log("camera move complete");
        });

        tweenPos.start();
      };

      CameraMove.prototype.resetCamDirection = function(){
        var camera = this._gnovel.getCamera();
        camera.lookAt(origin);
      };

  GNOVEL.CameraMove = CameraMove;
}());
