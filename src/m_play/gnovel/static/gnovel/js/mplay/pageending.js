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

	PageEnding.prototype._getRelationshipText = function(who, val) {
		if(val > 0) {
			return "Your relationship with " + who + " increased";
		}else if(val == 0) {
			return "--";
		}else if(val < 0) {
			return "Your relationship with " + who + " decreased";
		}
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
		var phoneData = this._owner.getSavedData("phoneData");
		var unauthorizedAsstChoice = this._owner.getSavedData("unauthorizedAsstChoice");
		var unauthorizedAsstData = this._owner.getSavedData("unauthorizedAsstData");
		var priyaWorkChoice = this._owner.getSavedData("priyaWorkChoice");
		var plagiarismData = this._owner.getSavedData("plagiarismData");
		var usingTestStatus = this._owner.getSavedData("usingTestStatus");
		var usingTestData = this._owner.getSavedData("usingTestData");

		var situations = ["phone", "unauthorized_assistance", "plagiarism", "using_test"];

		var phoneChoiceArray = [
			{
				choice: "You chose to give it to the waiter",	
				resolution: "They found the owner- it was Cat’s!",
				question: "What would have happened if they didn’t get it back to her?",
			},
			{
				choice: "You chose to it in to campus police",	
				resolution: "They found the owner- it was Cat’s!",
				question: "What would have happened if you didn’t take initiative and just left it?",
			},
			{
				choice: "You wanted to checked for cash",	
				resolution: "Ryan gave it to the waiter instead- turns out it was Cat’s! ",
				question: "What would have happened if you really had taken the cash?",
			},
		];

		var unauthorizedAsstArray = [
			{
				choice: "You didn’t give Ryan your assignments, but you offered to help",	
				resolution: "You went into office hours and the professor helped Ryan through a lot of his confusion",
				question: "What would have happened if you didn’t help Ryan?",
			},
			{
				choice: "You didn’t give Ryan your assignments, but you didn’t help him",	
				resolution: "Ryan struggled pretty hard with his work, he didn’t end up doing so well in that class...",
				question: "Was there a way to help Ryan without violating the code?",
			},

			{
				choice: "You gave Ryan your old assignments",	
				resolution: "Turns out that’s against the academic code...",
				question: "Was there a way to help Ryan without violating the code?",
			},
		];

		var plagiarismArray = [
			{
				choice: "You got Priya to redo her work",	
				resolution: "It was Ok; B-",
				question: "Was there a way to help Priya?",
			},
			{
				choice: "You redid Priya’s work",	
				resolution: "You did Ok; B-",
				question: "Was there a way to solve the problem without doing Priya’s work for her?",
			},
			{
				choice: "You wanted to just turn it in, but your team redid it instead",	
				resolution: "Not so good; B-",
				question: "Was there a way to solve the problem without redoing Priya’s work?",
			},
		];

		var usingTestArray = [
			{
				choice: "You told Ryan not to use the test",	
				resolution: "Ryan didn’t use it either. He’s glad he didn’t use it, and he’s patching things up with Priya.",
				question: "What would have happened if you did take the test?",
			},
			{
				choice: "You told Ryan not to use the test",	
				resolution: "Ryan used it anyway. He got caught and failed the final and the class.",
				question: "Could you have convinced Ryan not to use the test?",
			},
			{
				choice: "You did use the test.",	
				resolution: "You got caught. Professor Sweeny did not pursue academic integrity violations proceedings. He gave you the chance to retake the exam with a maximum grade of 80%. You pass the final and the class, but just barely.", 
				question: "Why did you choose to use the test? Was there another way?",
			},
			{
				choice: "You did use the test.",	
				resolution: "You got caught. Professor Sweeny did not pursue academic integrity violations proceedings. He gave you the chance to retake the exam with a maximum grade of 80%. You pass the final and the class, but just barely.",
				question: "Why did you choose to use the test? Was there another way?",
			},
			{
				choice: "You didn’t use the test",	
				resolution: "Ryan used the test even though you didn’t. He got caught and failed the final and the class.",
				question: "What would have happened if Ryan revealed that you had access to the test too?",
			},
			{
				choice: "You didn’t use the test",	
				resolution: "Ryan used the test even though you didn’t. When Ryan was questioned, he revealed that you had had access to the test too and didn’t report it. Professor Sweeny could pursue academic action for you as well, but he chooses not to.",
				question: "Was there a way to stop Ryan from using the test? Should you have reported the violation?",
			},
		];

		var choiceSituationArr = [phoneChoiceArray, unauthorizedAsstArray, plagiarismArray, usingTestArray];
		var choiceChosenArr = [catsPhoneStatus, unauthorizedAsstChoice, priyaWorkChoice, usingTestStatus];
		var situationDataArr = [phoneData, unauthorizedAsstData, plagiarismData, usingTestData];

		var postData = {
			'phone_title': 'Ryan found a lost wallet',

			'unauthorized_assistance_title': 'Ryan asked for your help',

			'plagiarism_title': 'Priya copied work from codehub',

			'using_test_title': 'Ryan wanted to use last year’s blank exam.',
		};

		for(var i =0; i<situations.length; i++) {
			var situation = situations[i];
			var choiceChosen = choiceChosenArr[i] || 0; // for test
			var choiceInfo = choiceSituationArr[i][choiceChosen];
			var data = situationDataArr[i] || {};
			data.relationship = data.relationship || {};
			data.relationship.ryan = data.relationship.ryan || 0;
			data.relationship.priya = data.relationship.priya || 0;
			data.relationship.cat = data.relationship.cat || 0;

			postData[situation + "_choice"] = choiceInfo.choice;
			postData[situation + "_resolution"] = choiceInfo.resolution;
			postData[situation + "_question"] = choiceInfo.question;		
			postData[situation + "_rel_ryan_val"] = data.relationship.ryan;
			postData[situation + "_rel_ryan"] = this._getRelationshipText("Ryan", data.relationship.ryan);
			postData[situation + "_rel_priya_val"] = data.relationship.priya;
			postData[situation + "_rel_priya"] = this._getRelationshipText("Priya", data.relationship.priya);
			postData[situation + "_rel_cat_val"] = data.relationship.cat;
			postData[situation + "_rel_cat"] = this._getRelationshipText("Cat", data.relationship.cat);
		}

		// this._post("/gnovel/result/", 
		// 	{
		// 		'phone_title': 'Ryan found a lost wallet',
		// 		'phone_choice': 'You chose to give it to the waiter',
		// 		'phone_resolution': 'They found the owner- it was Cat’s!',
		// 		'phone_question': 'What would have happened if they didn’t get it back to her?',
		// 		'phone_rel_ryan_val' : 1,
		// 		'phone_rel_ryan': 'Your relationship with Ryan increased',
		// 		'phone_rel_priya_val' : 1,
		// 		'phone_rel_priya': 'Your relationship with Priya increased',
		// 		'phone_rel_cat_val' : 1,
		// 		'phone_rel_cat': 'Your relationship with Cat increased',

		// 		'unauthorized_assistance_title': 'Ryan asked for your help',
		// 		'unauthorized_assistance_choice': 'You gave Ryan your old assignments',
		// 		'unauthorized_assistance_resolution': 'Turns out that’s against the academic code...',
		// 		'unauthorized_assistance_question': 'Was there a way to help Ryan without violating the code?',
		// 		'unauthorized_assistance_rel_ryan_val' : 1,
		// 		'unauthorized_assistance_rel_ryan': 'Your relationship with Ryan increased',
		// 		'unauthorized_assistance_rel_priya_val' : 1,
		// 		'unauthorized_assistance_rel_priya': 'Your relationship with Priya increased',			
		// 		'unauthorized_assistance_rel_cat_val' : 1,
		// 		'unauthorized_assistance_rel_cat': 'Your relationship with Cat increased',

		// 		'plagiarism_title': 'Priya copied work from codehub',
		// 		'plagiarism_choice': 'You got Priya to redo her work',
		// 		'plagiarism_resolution': 'It was Ok; B-',
		// 		'plagiarism_question': 'Was there a way to help Priya?',
		// 		'plagiarism_rel_ryan_val' : 1,
		// 		'plagiarism_rel_ryan': 'Your relationship with Ryan increased',			
		// 		'plagiarism_rel_priya_val' : 1,
		// 		'plagiarism_rel_priya': 'Your relationship with Priya increased',				
		// 		'plagiarism_rel_cat_val' : 1,
		// 		'plagiarism_rel_cat': 'Your relationship with Cat increased',

		// 		'using_test_title': 'Ryan wanted to use last year’s blank exam.',
		// 		'using_test_choice': 'You told Ryan not to use the test',
		// 		'using_test_resolution': 'Ryan didn’t use it either. He’s glad he didn’t use it, and he’s patching things up with Priya. ',
		// 		'using_test_question': 'What would have happened if you did take the test? ',
		// 		'using_test_rel_ryan_val' : 1,
		// 		'using_test_rel_ryan': 'Your relationship with Ryan increased',								
		// 		'using_test_rel_priya_val' : 1,
		// 		'using_test_rel_priya': 'Your relationship with Priya increased',
		// 		'using_test_rel_cat_val' : 1,
		// 		'using_test_rel_cat': 'Your relationship with Cat increased',
		// 	}
		// );

		this._post("/gnovel/result/", postData);

		return o;
	};

	MPLAY.PageEnding = PageEnding;
}());