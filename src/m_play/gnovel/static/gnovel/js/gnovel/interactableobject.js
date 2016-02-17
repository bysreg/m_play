// namespace
var GNOVEL = GNOVEL || {};

(function() {
	"use strict";

	/**
	 *
	 * @class InteractableObject
	 * @constructor
	 *
	 */
	var InteractableObject = function(path, page, params) {
		params = params || {};
		this._page = page;
		this._mouseDownListener = null;
		this._mouseMoveListener = null;
		this._img = null;
		this._params = params;

		// create the image
		// for now we require width and height in params
		var x = params.x || 0;
		var y = params.y || 0;
		var pos = new THREE.Vector3(x, y, 100);
		var mouse = new THREE.Vector2(), hoveredObj;

		this._mouse = mouse;
		this._hoveredObj = hoveredObj;

		this._img = this._page.createImage(path, pos, this._params.width, this._params.height);

		this._page._addToScene(this._img);

		var io = this;
		this._mouseDownListener = function(event) {
			io._onMouseDown(event);
		};

		this._page.getOwner().addMouseDownListener(this._mouseDownListener);

		this._mouseMoveListener = function(event) {
			io._onMouseMove(event);
		};

		this._page.getOwner().addMouseMoveListener(this._mouseMoveListener);		
	};

	InteractableObject.prototype._onMouseDown = function(event) {		
		event.preventDefault();

		this._mouse.x = (event.clientX / this._page._owner._renderer.domElement.clientWidth) * 2 - 1;
		this._mouse.y = -(event.clientY / this._page._owner._renderer.domElement.clientHeight) * 2 + 1;

		this._page._owner._raycaster.setFromCamera(this._mouse, this._page._owner.getCamera());
		//create array of objects intersected with
		var intersects = this._page._owner._raycaster.intersectObjects([this._img], true);
		if (intersects.length > 0) {
			var clickedObj = intersects[0].object;			

			console.log("interactable object is clicked");

			//run onClick function in the page
			if(this._params.onClick != null) {
				this._params.onClick(this);
			}
		}
	};

	InteractableObject.prototype.remove = function() {
		this._page.removeFromScene(this._img);
		this._page.getOwner().removeMouseDownListener(this._mouseDownListener);
		this._page.getOwner().removeMouseMoveListener(this._mouseMoveListener);
	};

	InteractableObject.prototype._onMouseMove = function(event){
		event.preventDefault();

		this._mouse.x = (event.clientX / this._page._owner._renderer.domElement.clientWidth) * 2 - 1;
		this._mouse.y = -(event.clientY / this._page._owner._renderer.domElement.clientHeight) * 2 + 1;

		this._page._owner._raycaster.setFromCamera(this._mouse, this._page._owner.getCamera());
		//create array of objects intersected with
		var intersects = this._page._owner._raycaster.intersectObjects([this._img], true);
		if (intersects.length > 0) {

			if(this._hoveredObj != intersects[0].object){

				this._hoveredObj = intersects[0].object;
				//do hover effect on intersected object
				this._hoveredObj.currentHex = this._hoveredObj.material.color.getHex();
				this._hoveredObj.material.color.setHex(0xff0000);

			}

			//on hover change mouse cursor to pointer
			this._page._owner.getContainer().style.cursor = 'pointer';
		}
		else{
			//reset hover effect, and set back to normal
			if(this._hoveredObj)
			{
				this._hoveredObj.material.color.setHex(this._hoveredObj.currentHex);
					this._page._owner.getContainer().style.cursor = 'auto';
			}
			this._hoveredObj = null;

		}

		console.log("interactable object is hovered");
	};

	GNOVEL.InteractableObject = InteractableObject;
}());
