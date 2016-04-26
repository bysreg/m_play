// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class PageEnding
	 * @augments MPlay.MPlayPage
	 */
	var PageEnding = function() {
		MPLAY.MPlayPage.call(this);
	};

	PageEnding.prototype = Object.create(MPLAY.MPlayPage.prototype);
	PageEnding.prototype.constructor = PageEnding;

	/**
	 * @override
	 */
	PageEnding.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		var material = new THREE.MeshBasicMaterial({
			color: 0x000000,
			transparent: true,
		});
		var plane = new THREE.PlaneBufferGeometry(1920, 1080);
		var quad = new THREE.Mesh(plane, material);
		quad.position.z = this.getBackgroundLayer();

		// add this to the scene
		this._addToScene(quad);
	};

	PageEnding.prototype._post = function(path, parameters) {
		var form = $("#post_result_form");

		form.attr("method", "post");
		form.attr("action", path);

		$.each(parameters, function(key, value) {
			var field = $('<input></input>');

			field.attr("type", "hidden");
			field.attr("name", key);
			field.attr("value", value);

			form.append(field);
		});

		// The form needs to be a part of the document in
		// order for us to be able to submit it.
		$(document.body).append(form);
		form.submit();
	};

	/**
	 * @override
	 */
	PageEnding.prototype._createFlowElements = function() {
		var o = null;

		o = [{
				type: "dialog",
				speaker: "",
				text: "This is our current prototype's ending. Thank you for playing!"
			},

		];

		var catsPhoneStatus = this._owner.getSavedData("catsPhoneStatus");
		var unauthorizedAsstChoice = this._owner.getSavedData("unauthorizedAsstChoice");
		var priyaWorkChoice = this._owner.getSavedData("priyaWorkChoice");
		var usingTestStatus = this._owner.getSavedData("usingTestStatus");

		this._post("/gnovel/result/", 
			{
				'phone_title': 'Ryan found a lost wallet',
				'phone_choice': 'You chose to give it to the waiter',
				'phone_resolution': 'They found the owner- it was Cat’s!',
				'phone_question': 'What would have happened if they didn’t get it back to her?',
				'phone_rel_ryan_val' : 1,
				'phone_rel_ryan': 'Your relationship with Ryan increased',
				'phone_rel_priya_val' : 1,
				'phone_rel_priya': 'Your relationship with Priya increased',
				'phone_rel_cat_val' : 1,
				'phone_rel_cat': 'Your relationship with Cat increased',

				'unauthorized_assistance_title': 'Ryan asked for your help',
				'unauthorized_assistance_choice': 'You gave Ryan your old assignments',
				'unauthorized_assistance_resolution': 'Turns out that’s against the academic code...',
				'unauthorized_assistance_question': 'Was there a way to help Ryan without violating the code?',
				'unauthorized_assistance_rel_ryan_val' : 1,
				'unauthorized_assistance_rel_ryan': 'Your relationship with Ryan increased',
				'unauthorized_assistance_rel_priya_val' : 1,
				'unauthorized_assistance_rel_priya': 'Your relationship with Priya increased',			
				'unauthorized_assistance_rel_cat_val' : 1,
				'unauthorized_assistance_rel_cat': 'Your relationship with Cat increased',

				'plagiarism_title': 'Priya copied work from codehub',
				'plagiarism_choice': 'You got Priya to redo her work',
				'plagiarism_resolution': 'It was Ok; B-',
				'plagiarism_question': 'Was there a way to help Priya?',
				'plagiarism_rel_ryan_val' : 1,
				'plagiarism_rel_ryan': 'Your relationship with Ryan increased',			
				'plagiarism_rel_priya_val' : 1,
				'plagiarism_rel_priya': 'Your relationship with Priya increased',				
				'plagiarism_rel_cat_val' : 1,
				'plagiarism_rel_cat': 'Your relationship with Cat increased',

				'using_test_title': 'Ryan wanted to use last year’s blank exam.',
				'using_test_choice': 'You told Ryan not to use the test',
				'using_test_resolution': 'Ryan didn’t use it either. He’s glad he didn’t use it, and he’s patching things up with Priya. ',
				'using_test_question': 'What would have happened if you did take the test? ',
				'using_test_rel_ryan_val' : 1,
				'using_test_rel_ryan': 'Your relationship with Ryan increased',								
				'using_test_rel_priya_val' : 1,
				'using_test_rel_priya': 'Your relationship with Priya increased',
				'using_test_rel_cat_val' : 1,
				'using_test_rel_cat': 'Your relationship with Cat increased',
			}
		);

		return o;
	};

	MPLAY.PageEnding = PageEnding;
}());