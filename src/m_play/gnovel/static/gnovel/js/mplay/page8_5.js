// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page8_5
	 * @augments MPlay.MPlayPage
	 */
	var Page8_5 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page8_5.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page8_5.prototype.constructor = Page8_5;

	/**
	 * @override
	 */
	Page8_5.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		this.setupClassBackground();
	};

	Page8_5.prototype._createFlowElements = function() {

		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var professor = "%" + this._professor;	
		var player = this._player;		
		var closephone = "%" + this._closephone;

		var o = null;

		o = [			
			{type: "show", img: ryan, expression: "sad"},
			{type: "dialog", speaker: this._ryan, text: "Hey, do you have a sec?"},
			{type: "dialog", speaker: this._ryan, text: "You know that test I showed you?  Priya was right – we couldn’t use it.  He asked me if anyone else had access to it.  Sweeney called me in, asked me point blank, and I panicked…"},
			{type: "dialog", speaker: this._ryan, text: "I told him I had shown it to you.  I’m so sorry… I didn’t know what else to say.  He wants to see you and have a conversation."},		
			{type: "hide", img: ryan},
			
			{type: "show_phone_notif"},	

			// phone email exchange begins
			{type: "show", img: closephone},
			{type: "phone_textbox", 
				label: "email_box", 				
				bgOffsetY: -30,
				bgHeight: 200,
				bgWidth: 400,
				y: 250,
				charLine: 37,
				text: "Hey, how did it go?  Sweeney is giving me a 0 on the final.  I’m waiting to hear if he will report it to the dean… This was not worth it. - Ryan"},
			{type: "hide_phone_textbox", dialog: "$email_box"},
			{type: "hide", img: closephone},

			{type: "dialog", speaker: "", text: "You receive an email. It reads ..."},					
			{type: "dialog", speaker: "Email - Prof. Sweeney", text: "After our conversation, I’ve decided not to pursue any action from your violation."},
			{type: "dialog", speaker: "Email - Prof. Sweeney", text: "As we discussed in our meeting, I am disappointed that you did not take an active stand in reporting the violation prior to my administration of the final exam.  In the future, these should be reported.  That being said, since I believe you did not consciously act in bad faith, I will not be moving forward with proceedings for this violation (indeed, it is a violation).  Please take this as a learning experience to reflect on your actions. Prof. Sweeney"},			
			// phone email exchange ends

			{type: "show_phone_notif"},	

			// phone text exchange begins
			{type: "show", img: closephone},
			{type: "phone_textbox", 
				label: "text_box", 				
				bgOffsetY: -30,
				bgHeight: 200,
				bgWidth: 400,
				y: 250,
				charLine: 37,
				text: "Hey, how did it go?  Sweeney is giving me a 0 on the final.  I’m waiting to hear if he will report it to the dean… This was not worth it. - Ryan"},
			{type: "hide_phone_textbox", dialog: "$text_box"},
			{type: "hide", img: closephone},
			// phone text exchange ends
			
			{type: "goto", page: "scene ending"},
		]; 

		return o;
	};

	MPLAY.Page8_5 = Page8_5;
}());
