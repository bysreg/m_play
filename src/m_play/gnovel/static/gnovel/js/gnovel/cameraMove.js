var GNOVEL = GNOVEL || {};

(function() {
	"use_strict";

  	/**
  	 * @class cameraMove
     *If enabled, will move camera in direction of a specified object
  	 */

     var CameraMove = function(gnovel,page){
       this._gnovel = gnovel;
			 this._camera = gnovel.getCamera();
       this._origin = new THREE.Vector3(0,0,this._camera.position.z);
			 this._page = page;
     };

     /**
     *@param destPos = destination position from image to point to
     */
     	CameraMove.prototype.setCamDirection = function(position, destPos){

        var camera = this._gnovel.getCamera();
        var duration = 700;
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

				if(!this._page._useEffect){
					return;
				}
	        //tween camera direction and look at that direction
	        //increment curPos to newPos and set lookat position to curPos
	        var tweenPos = new TWEEN.Tween(curPos)
	        .to(newPos, duration)
	        .easing(TWEEN.Easing.Cubic.Out)
					.delay(300)
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
				var curPos = camera.position;
				var duration = 700;

				//reset camera to look at origin
				var tweenPos = new TWEEN.Tween(curPos)
        .to(this._origin, duration)
        .easing(TWEEN.Easing.Cubic.Out)
				.delay(300)
        .onUpdate(function(){
          camera.lookAt(curPos);
        })
        .onComplete(function(){
          console.log("camera move complete");
        });

        tweenPos.start();

        //camera.lookAt(this._origin);
      };

  GNOVEL.CameraMove = CameraMove;
}());
