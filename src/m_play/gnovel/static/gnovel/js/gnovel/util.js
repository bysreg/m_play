//namespace 
var GNOVEL = GNOVEL || {};

(function() {
	"use strict";

	GNOVEL.Util = {};

	GNOVEL.Util.findElement = function(arr, obj) {
		var index = -1;

		for(var i=0;i<arr.length;i++) {
			if(arr[i] === obj) {
				index = i;
				break;
			}
		}

		return index;
	};

}());