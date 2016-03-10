// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class PageName
	 * @augments MPlay.MPlayPage
	 */
	var PageName = function() {
		MPLAY.MPlayPage.call(this);
	};

	PageName.prototype = Object.create(MPLAY.MPlayPage.prototype);
	PageName.prototype.constructor = PageName;

	/**
	 * @override
	 */
	PageName.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		
	};


	MPLAY.PageName = PageName;
}());
