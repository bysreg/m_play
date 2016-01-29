/*Page Manager
*
*
*
*
*/

this.gnovel = this.gnovel || {};


(function(){

	"use strict";
	//Namespace

/**
*
* @class PageManager
* @constructor
* @extends Object3D
* @param {}
**/
	var PageManager = function(){

	//this.Container_constructor();
	THREE.Object3D.call(this);

	//THREE.Mesh.apply(this,arguments);
	this.page = null;
	this.nextPage = null;
	this.inTransition = false;
	this.nextInactivePage = null;
	this.pageStack = [];
};
	PageManager.prototype = new THREE.Object3D();
	PageManager.prototype.constructor = THREE.Object3D;

//var tPage = new PageManager();
/**
	*-
	*pause current Page, new Page will replace current one
	*if transition provided, transition effect will be applied before replacing Pages
	* @method push
	* @param {page} the new page instance
	* @param {transition} the transition to use
**/
PageManager.prototype.push = function(page,transition){
//if a Page already exists, add the new Page behind the current Page
	if(this.page){
		this.pageStack.push(this.page);
		//this.Page.dispatchEvent('Pagepause');
		//not functionally possible without create.js container
		/*var index = this.getChildIndex();
		this.addChildAt(Page, index+1);*/
		this.add(page);
	}
	else{
		this.add(page);
	}
	this.nextPage = page;
	// temp copy of Page to set up default values & set current page to display
	var _this = this;
	var setPage = function(){
		_this.page = _this.nextPage;
		_this.nextPage = null;
		//this.Page.dispatchEvent('Pageenter');
	}

	if(transition){
		//run transition
		this.inTransition = true;
		transition.run(this,this.page||{},this.nextPage)
	}
	else{
		setPage();
	}

};

/**Removes the current Page and reactive the Page at the top of the
* stack.
* @method pop
* @param {transition} the transition to use
**/
PageManager.prototype.pop = function(transition)
{
	var page = null;
	if(this.PageStack.length > 0){
		page = this.PageStack.pop();
	}

	this.nextPage = page;
};

/*
*Rendering multiple Pages
renderer.autoClear = false;
Then create two Pages

var Page = new THREE.Page();
var Page2 = new THREE.Page();
Add your objects to the first Page as usual, and add the objects your want to have on top to the second Page.

Then, in your render() function, do this:

renderer.clear();
renderer.render( Page, camera );
renderer.clearDepth();
renderer.render( Page2, camera );

*/

gnovel.PageManager = PageManager;
}());
