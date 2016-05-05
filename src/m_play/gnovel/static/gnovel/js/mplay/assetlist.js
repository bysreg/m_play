// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	var textureList = [
		"/static/gnovel/res/textures/ui/BG_filter_syllabus.png",
		"/static/gnovel/res/textures/ui/phone.png",
		"/static/gnovel/res/textures/backgrounds/restaurant.png",
		"/static/gnovel/res/textures/ui/phone_inbox.png",
		"/static/gnovel/res/textures/backgrounds/restaurant scene with ryan.png",
		"/static/gnovel/res/textures/backgrounds/restaurant.png",
		"/static/gnovel/res/textures/wallet for bar.png",
		"/static/gnovel/res/textures/ui/speech bubble-indicator_wDots.png",
		"/static/gnovel/res/textures/char/sad ryan.png",		
	];

	var resList = [
		"/static/gnovel/res/font/SFToontime.ttf",
		"/static/gnovel/res/font/SFToontimeBold.ttf",
		"/static/gnovel/res/font/SFToontimeBoldItalic.ttf",
	];

	MPLAY._getTextureList = function() {
		return textureList;
	};

	MPLAY._getResourceList = function() {
		return resList;
	};	

}());