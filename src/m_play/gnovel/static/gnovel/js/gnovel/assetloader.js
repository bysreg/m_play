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

		this._preload.on("complete", this._handleComplete, this); // all files in the queue has been loaded
		this._preload.on("fileload", this._handleFileLoad, this); // single file has completed loading

		this._resList = null;
		this._resLoadComplete = null;

		// this will be used to load textures for three.js
		this._textureLoader = new THREE.TextureLoader();
		this._textureLoadList = null;
		this._textureLoadIdx = 0;
		this._onTextureLoadComplete = null;
	};

	AssetLoader.prototype._handleComplete = function() {
		if(this._resLoadComplete) {
			this._resLoadComplete();
		}
	};

	AssetLoader.prototype._handleFileLoad = function(event) {
		var item = event.item;
		var type = item.type;	

		console.log(item.src + " is loaded");
	};

	AssetLoader.prototype._setResourceList = function(list) {
		this._resList = list;
	};

	AssetLoader.prototype._startLoadingResources = function(onComplete) {
		this._preload.loadManifest(this._resList);
		this._resLoadComplete = onComplete;
	};

	AssetLoader.prototype._setTextureLoadList = function(list) {
		this._textureLoadList = list;
	};

	AssetLoader.prototype._startLoadingTextures = function(onComplete) {
		this._textureLoadIdx = 0;
		this._onTextureLoadComplete = onComplete;

		this._loadTexture();
	};

	AssetLoader.prototype._loadTexture = function() {
		if(this._textureLoadIdx >= this._textureLoadList.length) {
			console.log("finished loading all textures");

			if(this._onTextureLoadComplete)
				this._onTextureLoadComplete();
			return;
		}			

		var al = this;
		var url = this._textureLoadList[this._textureLoadIdx];

		var onLoad = function(texture) {
			al._onTextureLoaded(texture);
			// go to the next texture load
			al._textureLoadIdx++;
			console.log("progress : " + al._getLoadingProgress());
			al._loadTexture();
		};

		this._textureLoader.load(url, 
			onLoad, 
			function(xhr) {
				console.log(t + " : " + (xhr.loaded / xhr.total * 100) + '% loaded');
			}
		);
	};

	AssetLoader.prototype._onTextureLoaded = function(texture) {
		console.log("texture loaded : " + this._textureLoadIdx + " | "+ this._textureLoadList[this._textureLoadIdx]);
	};

	AssetLoader.prototype._getLoadingProgress = function() {
		var ret = Math.floor((this._textureLoadIdx / this._textureLoadList.length) * 100);
		return ret;
	};

	GNOVEL.AssetLoader = AssetLoader;

}());