this.gnovel = this.gnovel || {};


(function(){

	"use strict";
	//Namespace

/**
*
**/

var iObject = function(name, obj, type, geometry, material){

	this.name = name;
	this.obj = obj;
	this.type = type;
	this.active = false;
	this.geometry = geometry;
	this.material = material;
	THREE.Mesh.call(this,this.geometry, this.material);
};

iObject.prototype = Object.create(THREE.Mesh.prototype);
iObject.prototype.constructor = THREE.Mesh;

gnovel.iObject = iObject;

}());
