// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	var textureList = [
		"/static/gnovel/res/textures/backgrounds/caf full png.png",
		"/static/gnovel/res/textures/backgrounds/classroom background with sweeney.png",
		"/static/gnovel/res/textures/backgrounds/classroom background_full.png",
		"/static/gnovel/res/textures/backgrounds/classroom foreground with characters.png",
		"/static/gnovel/res/textures/backgrounds/classroom.png",
		"/static/gnovel/res/textures/backgrounds/gym background.png",
		"/static/gnovel/res/textures/backgrounds/lib foreground with priya solo.png",
		"/static/gnovel/res/textures/backgrounds/lib foreground with ryan and priya.png",
		"/static/gnovel/res/textures/backgrounds/lib foreground with ryan solo.png",
		"/static/gnovel/res/textures/backgrounds/lib foreground_empty.png",
		"/static/gnovel/res/textures/backgrounds/lib with ryan and cat.png",
		"/static/gnovel/res/textures/backgrounds/library background.png",
		"/static/gnovel/res/textures/backgrounds/library foreground.png",
		"/static/gnovel/res/textures/backgrounds/library middleground.png",
		"/static/gnovel/res/textures/backgrounds/library redux_wR&C.png",
		"/static/gnovel/res/textures/backgrounds/library redux_wR&P_V2.png",
		"/static/gnovel/res/textures/backgrounds/library redux_wR.png",
		"/static/gnovel/res/textures/backgrounds/office middle ground no prof.png",
		"/static/gnovel/res/textures/backgrounds/office middle ground.png",
		"/static/gnovel/res/textures/backgrounds/professor office background.png",
		"/static/gnovel/res/textures/backgrounds/restaurant scene with ryan.png",
		"/static/gnovel/res/textures/backgrounds/restaurant.png",
		"/static/gnovel/res/textures/backgrounds/ryan office-foreground.png",
		"/static/gnovel/res/textures/backgrounds/uc final layers png.png",
		"/static/gnovel/res/textures/backgrounds/uc final layers_wChar.png",
		"/static/gnovel/res/textures/backgrounds/uc foreground png.png",
		"/static/gnovel/res/textures/backgrounds/uc foreground with characters.png",
		"/static/gnovel/res/textures/backgrounds/uce background png.png",
		"/static/gnovel/res/textures/char/sad ryan.png",
		"/static/gnovel/res/textures/char/scene char/cat-lib.png",
		"/static/gnovel/res/textures/char/scene char/priya-clickable-lib.png",
		"/static/gnovel/res/textures/inGame_Syllabus.png",
		"/static/gnovel/res/textures/panel.png",
		"/static/gnovel/res/textures/ui/BG_filter_syllabus.png",
		"/static/gnovel/res/textures/ui/Left BubbleV3.png",
		"/static/gnovel/res/textures/ui/Right BubbleV3.png",
		"/static/gnovel/res/textures/ui/Selection Box.png",
		"/static/gnovel/res/textures/ui/cat phone icon.png",
		"/static/gnovel/res/textures/ui/comic book with panels.png",
		"/static/gnovel/res/textures/ui/compass background.png",
		"/static/gnovel/res/textures/ui/compass main.png",
		"/static/gnovel/res/textures/ui/context_box_big.png",
		"/static/gnovel/res/textures/ui/ed_bubble.png",
		"/static/gnovel/res/textures/ui/phone.png",
		"/static/gnovel/res/textures/ui/phone_button.png",
		"/static/gnovel/res/textures/ui/phone_inbox.png",
		"/static/gnovel/res/textures/ui/phone_text.png",
		"/static/gnovel/res/textures/ui/phone_textbox_blue.png",
		"/static/gnovel/res/textures/ui/priya phone icon.png",
		"/static/gnovel/res/textures/ui/prof phone icon.png",
		"/static/gnovel/res/textures/ui/ryan phone icon.png",
		"/static/gnovel/res/textures/ui/speech bubble-indicator_wDots.png",
		"/static/gnovel/res/textures/wallet for bar.png",
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