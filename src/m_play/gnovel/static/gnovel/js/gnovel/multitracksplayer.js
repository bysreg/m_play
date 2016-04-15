// namespace
var GNOVEL = GNOVEL || {};

(function() {
	"use strict";

	/**
	 * @class  multitracksplayer
	 * @constructor
	 */
	var MultiTracksPlayer = function(page) {

		this._page = page;
		this._player = null;
		this._playlist = null
		this._playLevels = null;
		this._shufflePeriod = null;
		this._shuffleRates = null;
		this._delta = 0;
	};

	MultiTracksPlayer.prototype.setPlaylist = function(playlist) {
		if (playlist.length > 0) {
			this._playlist = playlist;
			this._shufflePeriod = 10 * Math.random();
			this._shuffleRates = Math.random();
			this._playLevels = new Array();
			this._playLevels[0] = playlist[0].playrate;
			for (var i = 1; i < this._playlist.length; i++) {
				this._playLevels[i] = this._playLevels[i-1] + this._playlist[i].playrate;
			}
		};
		
	};

	MultiTracksPlayer.prototype.shuffle = function() {
		if (this._shufflePeriod != null) {
			if ( this._delta >= this._shufflePeriod) {
				console.log(this._delta);
			    this._delta = 0;

			    var played = new Array();
			    for (var i = 0; i < this._playlist.length; i++) {
			    	played[i] = false;
			    };

				// new period
				this._shufflePeriod = 10 * Math.random();
				for (var j = 0; j <= this._playLevels.length; j++) {
					if (this._playLevels[j] >= this._shuffleRates) {
						if (!played[j]) {
							this._play(this._playlist[j].audio);
							console.log("playing " + this._playlist[j].audio);
							console.log("Rate: " + this._shuffleRates);
							played[j] = true;
							break;
						};							
					}
				}
				this._shuffleRates = Math.random();
			}else {
				this._delta += this._page.getOwner().getClock().getDelta();
			}
		}
	};

	MultiTracksPlayer.prototype._play = function(audio) {
		this._player = this._page.getOwner().getSoundManager().play(audio);	
	};

	GNOVEL.MultiTracksPlayer = MultiTracksPlayer;
}());