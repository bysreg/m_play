// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page8_2
	 * @augments MPlay.MPlayPage
	 */
	var Page8_2 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page8_2.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page8_2.prototype.constructor = Page8_2;

	/**
	 * @override
	 */
	Page8_2.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);
		var pageObj = this;

		this.setupOfficeBackground();
		//new middle ground
		this._middleground_empty = this.createImage("/static/gnovel/res/textures/backgrounds/office middle ground no prof.png", new THREE.Vector3(0, -30, this._background2Layer), 1920, 1080);
		this._middleground_empty.material.opacity = 0;
		this._addToSceneBg(this._middleground_empty);

	};

	Page8_2.prototype._createFlowElements = function() {

		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var professor = "%" + this._professor;
		var player = this._player;
		var middleground = this._middleground_empty;

		var o = null;

		o = [
			{type: "show_context", text: "A few days after the test, Professor Sweeny calls you and Ryan to his office"},
			{type: "custom", func: function(pageObj){
				pageObj.tweenMat(middleground,{
					opacity: 1,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 200,
				});
				pageObj.tweenMat(pageObj._background2,{
					opacity: 0,
					easing: TWEEN.Easing.Cubic.Out,
					duration: 800,
					onComplete: function() {
						pageObj._removeFromSceneBg(pageObj._background2);
					},
				});
			}},
			{type: "show", img: professor, expression: "sad", position: "center"},
			{type: "dialog", speaker: this._professor, text: "I noticed a very strange mistake that only you two made on the take home exam.  You see, last year there was an error on one of the prompts."},

			{type: "choices",
			choices : [
				{text: "I'm not sure what this is about."},
				{text: "Yeah, so?"}],
			},

			{type: "dialog", speaker: this._professor, text: "Now, I know that wasn't the case on this year's exam.  Can you both explain how you made last year's mistake on this year's exam?"},

			{type: "choices", choices : [
				{text: "Are you accusing us of cheating?", go:"#cheating?"},
				{text: "I'm not sure professor.", go:"#policy"},
				{text: "Ryan received study material from last semester.", go:"#material"}],
				seconds: 8,
				responses: [{text:this._player + "?"}, {text:"Please explain " + this._player + "."}],
				speaker: this._professor},

			{type: "dialog", speaker: this._professor, label:"cheating?", text:"I'm not accusing you two of anything.  I just want your thoughts but you should know..."},
			{type: "jump", condition: true, goTrue: "#policy", goFalse: "#policy"},

			{type: "dialog", speaker: this._professor, label:"material", text:"From last semester you say.  That is concerning."},
			{type: "jump", condition: true, goTrue: "#policy", goFalse: "#policy"},

			{type: "nothing", label:"policy"},
			{type: "dialog", speaker: this._professor, text: "Potential consequences of an academic violation are failing the exam, the course and possible expulsion from your programs."},
			{type: "dialog", speaker: this._professor, text: "There is an appeals process as well, but before we go down that road, I'd like to hear from you."},
			{type: "show", img: professor, position: "center"},
			{type: "dialog", speaker: this._professor, text: "Ryan, " + this._player + ", please explain what happened."},

			{type: "choices", choices : [
				{text: "Ryan suggested we use last year's test to study.", go:"#lastyear"},
				{text: "We used some materials from last semester to study.", go:"#lastyear"},
				{text: "Nothing happened.  We studied the same way as everyone else.", go:"#lie"}],
				seconds: 8,
				responses: [{text:"Please be honest with me " + this._player + "."}, {text:this._player + "?"}],
				speaker: this._professor
			},

			{type: "nothing", label:"lie"},
			{type: "show", img: professor, expression: "sad", position: "center"},
			{type: "dialog", speaker: this._professor, text: "Okay.  Are you sure there is nothing you want to tell me?"},
			{type: "choices", choices : [
				{text: "No, there's nothing.", go:"#lie2"},
				{text: "Well, we did use some materials from last semester to study.", go:"#lastyear"}],
			},

			{type: "nothing", label:"lastyear"},
			{type: "show", img: professor, expression: "sad", position: "center"},
			{type: "dialog", speaker: this._professor, text: "Are you aware that it's against my policy to use previous semester work?"},
			{type: "dialog", speaker: this._professor, text: "I explicitly wrote it in the course syllabus."},

			{type: "choices", choices : [
				{text: "I wasn't aware it was against course policy.", go:"#unaware"},
				{text: "We were feeling pressure from our low project grade.", go:"#pressure"},
				{text: "It was Ryan's suggestion, I just looked briefly.", go:"#unaware"}],
				seconds: 10,
				responses: [{text:"Did you read the syllabus?"}, {text:this._player + "?"}],
				speaker: this._professor
			},

			{type: "nothing", label:"unaware"},
			{type: "show", img: professor, expression: "sad", position: "center"},
			{type: "dialog", speaker: this._professor, text: "If you were unsure about what was allowed or not, you should have asked."},
			{type: "dialog", speaker: this._professor, text: "But it's too late for that now.  I'll have to take action about this violation."},
			{type: "jump", condition: true, goTrue: "#leave", goFalse: "#leave"},

			{type: "nothing", label:"pressure"},
			{type: "show", img: professor, position: "center"},
			{type: "dialog", speaker: this._professor, text: "I understand the importance of doing well this semester."},
			{type: "show", img: professor, expression: "sad", position: "center"},
			{type: "dialog", speaker: this._professor, text: "Nevertheless, doing something against policy will hurt you more than a bad grade."},
			{type: "jump", condition: true, goTrue: "#leave", goFalse: "#leave"},

			{type:"nothing", label:"lie2"},
			{type: "dialog", speaker: this._professor, text: "Okay, well thank you."},
			{type: "jump", condition: true, goTrue: "#leave", goFalse: "#leave"},

			{type:"nothing", label:"leave"},
			{type: "dialog", speaker: this._professor, text: "I've heard all that I've needed from you two."},
			{type: "dialog", speaker: this._professor, text: this._player + ", Ryan, I will be notifying you on what will happen next."},

			{type: "hide", img: this._professor},

			{type: "nothing", label: "email"},
			{type: "goto", page: "scene 9.c.a"},


			];

		return o;
	};

	Page8_2.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page8_2.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		this._owner._ambient = this._owner.getSoundManager().play("Office-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});
		this._tweenVolumeIn();
	};

	MPLAY.Page8_2 = Page8_2;
}());
