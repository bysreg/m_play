
// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page1
	 * @augments GNOVEL.Page
	 */
	var Page1 = function() {
		GNOVEL.Page.call(this);
	};

	Page1.prototype = Object.create(GNOVEL.Page.prototype);
	Page1.prototype.constructor = Page1;

	Page1.prototype._onLoad = function() {
		GNOVEL.Page.prototype._onLoad.call(this);

		this.setBackground("/static/gnovel/res/textures/test1.jpg");
	};

	MPLAY.Page1 = Page1;
}());