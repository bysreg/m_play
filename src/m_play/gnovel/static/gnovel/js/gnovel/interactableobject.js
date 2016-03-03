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
		this._enabled = true;

		// create the image
		// for now we require width and height in params
		var x = params.x || 0;
		var y = params.y || 0;
		var z = params.z || 100;
		var pos = new THREE.Vector3(x, y, z);
		var mouse = new THREE.Vector2(), hoveredObj;
		var offset = new THREE.Vector3(.2, .2, .2);

		this._mouse = mouse;
		this._hoveredObj = hoveredObj;

		this._img = this._page.createImage(path, pos, this._params.width, this._params.height);

		//this._img.hightlightShape = highlightShape;
		//this._img.highlightShape2 = highlightShape2;

		//basic outline image that has textuer of image but with larger scale and diff color
		var highlightShape = new THREE.Mesh(this._img.geometry,new THREE.MeshPhongMaterial({
			color:0xffff00,
			emissive:0xffff00,//required for overriding textures basic color
			shading: THREE.FlatShading,
			transparent: this._img.material.transparent,
			map: this._img.material.map,

			depthWrite: false
		}));

		//copy of image that will render on tope of outline image
		var highlightShape2 = new THREE.Mesh(this._img.geometry,new THREE.MeshBasicMaterial({
			transparent: this._img.material.transparent,
			map: this._img.material.map
		}));

		//offset for size of outline
		this._offset = offset;
		this._highlightShape = highlightShape;
		this._highlightShape.visible = false;
		this._highlightShape2 = highlightShape2;
		this._highlightShape2.visible = false;

		//need to add the highlight shapes to the img object
		this._page._addToScene(this._img);
		//this._page._addToScene(this._highlightShape);
		//this._page._addToScene(this._highlightShape2);

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

		if(!this._enabled) return;

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
		this._page.getOwner().removeMouseDownListener(this._mouseDownListener);
		this._page.getOwner().removeMouseMoveListener(this._mouseMoveListener);
	};

	InteractableObject.prototype._onMouseMove = function(event){
		event.preventDefault();

		if(!this._enabled) return;

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
				//this._hoveredObj.material.color.setHex(0xff0000);

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
			//add outline effect on hover
			this._pick();
			// console.log("interactable object is hovered");
	};

/**
*@function check to add outline effect on mouse hover
*
*/
	InteractableObject.prototype._pick = function(){
		var data = this._hoveredObj;
		if(data){
			if(data.position && data.rotation && data.scale){
					this._highlightShape.position.copy(data.position);
					//this._highlightShape.position.multiplyScalar(0);
					this._highlightShape.position.setZ(data.position.z+1);
					this._highlightShape.rotation.copy(data.rotation);
					this._highlightShape.scale.copy(data.scale).add(this._offset.clone().multiplyScalar(0.001 *
						(this._page._owner.getCamera().position.distanceTo(data.position)))); // hack to make size about the same regardless of disance from camera
					//set object to render
					this._highlightShape.visible = true;

					this._highlightShape2.position.copy(data.position);
					//this._highlightShape2.position.add(0);
					this._highlightShape2.position.setZ(data.position.z+2);
					this._highlightShape2.rotation.copy(data.rotation);
					this._highlightShape2.scale.copy(data.scale);
					this._highlightShape2.visible = true;
					this._highlightShape2.material.color.copy(data.material.color);
			}
		} else{
				this._highlightShape.visible = false;
				this._highlightShape2.visible = false;
		}


	};

	InteractableObject.prototype.getImage = function() {
		return this._img;
	};

	InteractableObject.prototype.setEnable = function(value) {
		this._enabled = value;
	};

	GNOVEL.InteractableObject = InteractableObject;
}());
