// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class PageTest
	 * @augments MPlay.MPlayPage
	 */
	var PageTest = function() {
		MPLAY.MPlayPage.call(this);
	};

	PageTest.prototype = Object.create(MPLAY.MPlayPage.prototype);
	PageTest.prototype.constructor = PageTest;

	/**
	 * @override
	 */
	PageTest.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setBackground("/static/gnovel/res/textures/backgrounds/enviroment concept.jpg");

		this._yourphoneImg = this.createImage("/static/gnovel/res/textures/phone.png", new THREE.Vector3(0, 60, 140), 250, 458);
		this._yourphone = "yourphone";
		this._setObjectTag(this._yourphone, this._yourphoneImg);		
	};

	PageTest.prototype._createFlowElements = function() {

		var ryan = "%" + this._ryan;
		var catsphone = "%" + this._catsphone;
		var closephone = "%" + this._closephone;
		var yourphone = "%" + this._yourphone;		
		var player = this._player;

		var o = null;

		o = [
			{type: "choices", choices : [
				{text: "Go to the gymklgask", 
					}, 
				{text : "Go to the gymklgasakwgawjga wjlbgawjlbgawjlgbaljb", 
					}, 
				// {text: "Go to the gymklgaskalgnaglna aklgnaklgnaklgnakgnek agbajgbajlgba agawlbgwjalb ajog aogna ", 
				// 	}
					],},
		];

		return o;
	};

	MPLAY.PageTest = PageTest;
}());
