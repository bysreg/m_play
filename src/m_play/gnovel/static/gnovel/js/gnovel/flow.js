// namespace
var GNOVEL = GNOVEL || {};

(function() {
	"use strict";

	/**
	 * @class  Flow
	 * @constructor
	 */
	var Flow = function(page) {
		this._flowCounter = 0;
		this._page = page;
		this._elements = null;
	};

	Flow.DIALOG = "dialog";
	Flow.CHOICES = "choices";

	Flow.prototype._set = function(flowElements) {
		this._elements = flowElements;
	};

	Flow.prototype._exec = function() {
		var obj = this._elements[this._flowCounter];

		// hack 
		if(obj == null)
			return;

		var type = obj.type;

		switch(type) {
			case Flow.DIALOG:
				this._handleDialog(obj);
				break;
			case Flow.CHOICES:
				this._handleChoices(obj);				
				break;
		}
	};

	Flow.prototype._next = function() {
		this._flowCounter++;
	};	

	Flow.prototype._handleDialog = function(obj) {
		var x = obj.x || 0; // optional
		var y = obj.y || 0; // optional

		this._page._showDialog(obj.text, x, y);
	};

	Flow.prototype._handleChoices = function(obj) {
		
		// collect choices' text to its own array
		var choicesTextArr = [];
		for(var i = 0; i < obj.choices.length; i++) {
			choicesTextArr.push(obj.choices[i].text);
		}

		// collect choices' jump to its own array
		var jumpArr = [];
		for(var i=0; i < obj.choices.length;i++) {
			jumpArr.push(obj.choices[i].go);
		}

		this._page._showChoices(choicesTextArr, null, jumpArr);
	};

	GNOVEL.Flow = Flow;
}());
