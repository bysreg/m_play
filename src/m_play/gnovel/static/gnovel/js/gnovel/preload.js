// namespace
var GNOVEL = GNOVEL || {};

(function() {
	"use strict";

	/**
	 *
	 * @class Preload
	 * @constructor
	 *
	 */
	var Preload = function() {

		this._queue = null;

		this._queue = new createjs.LoadQueue();
		this._queue.installPlugin(createjs.Sound);


	};

}());