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
			this._noreplay = new Array();
			this._playLevels = new Array();
			this._playLevels[0] = playlist[0].playrate;
			this._noreplay[0] = playlist[0].noreplay || false;
			for (var i = 1; i < this._playlist.length; i++) {
				this._playLevels[i] = this._playLevels[i-1] + this._playlist[i].playrate;
				this._noreplay[i] = this._playlist[i].noreplay || false;
			}
		};
		
	};

	MultiTracksPlayer.prototype.shuffle = function() {
		if (this._shufflePeriod != null) {
			if ( this._delta >= this._shufflePeriod) {
			    this._delta = 0;

			    var hit = false;
				
				for (var j = 0; j <= this._playLevels.length; j++) {
					if (this._playLevels[j] >= this._shuffleRates && this._noreplay[j] === false) {
						if (!hit) {
							this._play(this._playlist[j].audio);
							// console.log("playing " + this._playlist[j].audio);
							// console.log("Rate: " + this._shuffleRates);
							hit = true;
							break;
						};							
					}
				}
				this._shuffleRates = Math.random();
				if (hit) {
					this._shufflePeriod = 10 * Math.random();
				}
				
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