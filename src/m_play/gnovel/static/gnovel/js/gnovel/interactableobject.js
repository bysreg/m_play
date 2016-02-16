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
		this._img = null;
		this._params = params;

		// create the image
		// for now we require width and height in params
		var x = params.x || 0;
		var y = params.y || 0;
		var pos = new THREE.Vector3(x, y, 100);
		this._img = this._page.createImage(path, pos, this._params.width, this._params.height);

		this._page._addToScene(this._img);

		var io = this;
		this._mouseDownListener = function(event) {			
			io._onMouseDown(event);
		};

		this._page.getOwner().addMouseDownListener(this._mouseDownListener);		
	};

	InteractableObject.prototype._onMouseDown = function(event) {		
		var mouse = new THREE.Vector2();

		event.preventDefault();

		mouse.x = (event.clientX / this._page._owner._renderer.domElement.clientWidth) * 2 - 1;
		mouse.y = -(event.clientY / this._page._owner._renderer.domElement.clientHeight) * 2 + 1;

		this._page._owner._raycaster.setFromCamera(mouse, this._page._owner.getCamera());
		//create array of objects intersected with
		var intersects = this._page._owner._raycaster.intersectObjects([this._img], true);
		if (intersects.length > 0) {
			var clickedObj = intersects[0].object;

			console.log("interactable object is clicked");

			if(this._params.onClick != null) {
				this._params.onClick(this);
			}
		}
	};

	InteractableObject.prototype.remove = function() {
		this._page.removeFromScene(this._img);
		this._page.getOwner().removeMouseDownListener(this._mouseDownListener);
	};

	GNOVEL.InteractableObject = InteractableObject;
}());

