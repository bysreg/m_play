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
		this._storedData = [];		
	};

	Flow.DIALOG = "dialog";
	Flow.CHOICES = "choices";
	Flow.SHOW = "show";
	Flow.HIDE = "hide";
	Flow.GOTO = "goto";
	Flow.COMPARE = "compare";
	Flow.JUMP = "jump";
	Flow.CUSTOM = "custom";

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

	Flow.prototype._peekNext = function() {
		if(this._elements === null)
			return null;

		return this._elements[this._flowCounter + 1];
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
			case Flow.COMPARE:
				this._handleCompare(obj);
				break;
			case Flow.JUMP:
				this._handleJump(obj);
				break;
			case Flow.CUSTOM:
				this._handleCustom(obj);
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
						// search for that label in labels dictionary
						
						var label = obj[prop].substring(1);						
						var value = this._labels[label];

						if(typeof value === 'undefined' || value === null)
							console.log("cannot find " + label);

						obj[prop] = value;
					} else if(c == '%') {
						// search for that label in objs dictionary

						var label = obj[prop].substring(1);						
						var value = this._objs[label];

						if(typeof value === 'undefined' || value === null)
							console.log("cannot find " + label);

						obj[prop] = value;
					} else if(c == '$') {
						// search for that label in storedData dictionary
						
						var label = obj[prop].substring(1);
						var value = this._storedData[label];

						if(typeof value === 'undefined' || value === null)
							console.log("no such data stored in" + label);

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
		var y = obj.y || -250; // optional
		var params = {};
		params.speaker = obj.speaker;

		// pass the original flow element to params
		params.flowElement = obj;

		this._page._showDialog(obj.text, x, y, params);
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

		// pass the original flow element to params
		var params = {};
		params.flowElement = obj;

		this._page._showChoices(choicesTextArr, params, jumpArr);
	};

	Flow.prototype._handleShow = function(obj) {	
		var img = obj.img;
		var params = {};

		if(obj.waitUntilShown != null) {
			params.waitUntilShown = obj.waitUntilShown;
		}

		// pass the original flow element to params
		params.flowElement = obj;

		this._page._show(img, params);
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
			default:
				transitionType = GNOVEL.TransitionType.FADE;
				break;
		};

		this._page.goToPage(pageIndex, transitionType, null);
	};

	Flow.prototype._handleCompare = function(obj) {
		var diff = obj.leftop - obj.rightop;
		var result;
		switch(obj.operator) {
			case "equal" :
				result = (diff === 0);
				break;
			case "less" :
				result = (diff < 0);
				break;
			case "greater" :
				result = (diff > 0);
				break;
			case "less equal" :
				result = (diff <= 0);
				break;
			case "greater equal" :
				result = (diff >= 0);
				break;
		}
		if(result) {
			this._jump(obj.goTrue);
		}
		else {
			this._jump(obj.goFalse);
		}
		this._exec();
	}

	Flow.prototype._handleJump = function(obj) {
		if (obj.condition) {
			this._jump(obj.goTrue);
		}
		else {
			this._jump(obj.goFalse);
		}
		this._exec();
	}

	Flow.prototype._setObjectTag = function(tag, obj) {
		this._objs[tag] = obj;
	};

	Flow.prototype._handleCustom = function(obj) {
		var label = obj.label;
		var func = obj.func;

		var data = func(this._page);

		// if there is data to be stored
		if(typeof data !== 'undefined') {
			// and if there is label to identify where the data will be stored
			if(typeof label !== 'undefined') {
				// we will store the data into that label
				console.log("data stored : " + data + " in label : " + label);
				this._storedData[label] = data;		
			}
		}	

		this._next();
		this._exec();	
	};

	GNOVEL.Flow = Flow;
}());
