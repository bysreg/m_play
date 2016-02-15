// namespace
var GNOVEL = GNOVEL || {};

(function() {
	"use strict";

	/**
	 * @class  Flow
	 * @constructor
	 */
	var Flow = function(page) {
		this._page = page;
		this._objs = [];
		this._reset();
	};

	Flow.prototype._reset = function() {
		this._flowCounter = 0;		
		this._elements = null;
		this._labels = [];		
	};

	Flow.DIALOG = "dialog";
	Flow.CHOICES = "choices";
	Flow.SHOW = "show";
	Flow.HIDE = "hide";
	Flow.GOTO = "goto";

	Flow.prototype._set = function(flowElements) {
		this._reset();

		if(flowElements == null)
			flowElements = [];

		this._elements = flowElements;
		this._processLabels();		
	};

	Flow.prototype._jump = function(index) {
		this._flowCounter = index - 1;
		this._next();
	};

	Flow.prototype._exec = function() {
		var obj = this._elements[this._flowCounter];

		// hack 
		if(obj == null)
			return;

		this._processParameters(obj);

		var type = obj.type;

		switch(type) {
			case Flow.DIALOG:
				this._handleDialog(obj);
				break;
			case Flow.CHOICES:
				this._handleChoices(obj);				
				break;
			case Flow.SHOW:
				this._handleShow(obj);
				break;
			case Flow.HIDE:
				this._handleHide(obj);
				break;
			case Flow.GOTO:
				this._handleGoto(obj);
				break;
		}
	};

	Flow.prototype._next = function() {
		this._flowCounter++;
	};	

	Flow.prototype._processLabels = function() {
		for(var i = 0; i < this._elements.length;i++) {
			var e = this._elements[i];
			if(e.label != null) {
				var label = e.label;
				this._labels[label] = i;
			}
		};
	};

	Flow.prototype._processParameters = function(obj) {
		// iterate over all properties in the obj
		for (var prop in obj) {
			if(obj.hasOwnProperty(prop)) {
				// check if this property's value start with '#'
				// which would mark this value as a label of other 
				// flow element
				
				if(typeof (obj[prop]) === "string") {
					// check if it starts with '#'
					var c = obj[prop].charAt(0);
					if(c == '#') {
						var label = obj[prop].substring(1);
						// search for that label in labels dictionary
						var value = this._labels[label];

						if(value === null)
							console.log("cannot find " + label);

						obj[prop] = value;
					} else if(c == '%') {
						var label = obj[prop].substring(1);
						// search for that label in objs dictionary
						var value = this._objs[label];

						if(value === null)
							console.log("cannot find " + label);

						obj[prop] = value;
					}
				} else if(typeof(obj[prop]) === "object") {
					// recurse to this object
					this._processParameters(obj[prop]);
				}				
			}
		}
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

	Flow.prototype._handleShow = function(obj) {	
		var img = obj.img;

		this._page._show(img);
	};

	Flow.prototype._handleHide = function(obj) {
		var img = obj.img;
		var params = {};

		if(obj.waitUntilHidden != null) {
			params.waitUntilHidden = obj.waitUntilHidden;
		}

		this._page._hide(img, params);
	};

	Flow.prototype._handleGoto = function(obj) {
		var pageIndex = obj.page;
		var transitionType = obj.transition;

		switch(transitionType) {
			case "fade" :
				transitionType = GNOVEL.TransitionType.FADE;
				break;
		};

		this._page.goToPage(pageIndex, transitionType, null);
	};

	Flow.prototype._setObjectTag = function(tag, obj) {
		this._objs[tag] = obj;
	};

	GNOVEL.Flow = Flow;
}());