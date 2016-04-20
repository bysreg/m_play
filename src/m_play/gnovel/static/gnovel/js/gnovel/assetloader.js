//namespace
var GNOVEL= GNOVEL || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class AssetLoader
	 * @constructor
	 *
	 */
	var AssetLoader = function() {

		// this will be used to load sounds
		this._preload = new createjs.LoadQueue();
		this._preload.installPlugin(createjs.Sound);

		this._preload.on("complete", this._handleComplete, this);
		this._preload.on("fileload", this._handleFileLoad, this);

		// this will be used to load textures for three.js
		this._textureLoader = new THREE.TextureLoader();
		this._textureLoadList = null;
	};

	AssetLoader.prototype._handleComplete = function() {

	};

	AssetLoader.prototype._handleFileLoad = function(event) {
		var item = event;
		var type = item.type;

		//if(type == )
	};

	AssetLoader.prototype._setTextureLoadList = function(list) {
		this._textureLoadList = list;
	};

	AssetLoader.prototype._startLoadingTextures = function() {
		var al = this;
		var onLoad = function(texture) {
			al._onTextureLoaded(texture);
		};

		for(var i=0; i<this._textureLoadList.length;i++) {
			var t = this._textureLoadList[i];
			this._textureLoader.load(
				// resource URL
				t.path,
				// function when texture is loaded
				onLoad, 
				/// function called when download progresses
				function(xhr) {
					console.log(t.path + " : " + (xhr.loaded / xhr.total * 100) + '% loaded' );
				},
			);
		}
	};

	AssetLoader.prototype._onTextureLoaded = function(texture) {
	};

	GNOVEL.AssetLoader = AssetLoader;

}());