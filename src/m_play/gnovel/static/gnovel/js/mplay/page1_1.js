// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page1_1
	 * @augments MPLAY.MPlayPage
	 */
	var Page1_1 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page1_1.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page1_1.prototype.constructor = Page1_1;

	/**
	 * @override
	 */
	Page1_1.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		var foregroundImg = "/static/gnovel/res/textures/backgrounds/uc foreground with characters.png";
		this.setupUcBackground(foregroundImg);

		this._background_empty = this.createImage("/static/gnovel/res/textures/backgrounds/uc foreground png.png", new THREE.Vector3(0, 0, this._background3Layer-1), 1920, 1080);
		//this._background_empty.scale.set(.90,.85,1);
		this._background_empty.material.opacity = 0;
		this._background_empty.scale.set(.85, .80, 1);
		this._addToSceneBg(this._background_empty);

		var geometry = new THREE.PlaneBufferGeometry(1920, 1080);
		var material = new THREE.MeshBasicMaterial( {color: 0x000000, transparent:true } );
		this._transitionBgImg = new THREE.Mesh(geometry,material);
		this._transitionBgImg.position.z = 150;

		this._transitionBg = "transitionbg";

		this._setObjectTag(this._transitionBg,this._transitionBgImg);
	};

	Page1_1.prototype._createFlowElements = function() {
		var priya = "%" + this._priya;
		var ryan = "%" + this._ryan;
		var cat = "%" + this._cat;
		var transitionBg = "%" + this._transitionBg;
		var background = this._background_empty;

		var o = null;

		var catsPhoneStatus = this._owner.getSavedData("catsPhoneStatus");

		// variables from scene 1
		var isWalletWithWaiter = (catsPhoneStatus == 0 || catsPhoneStatus == 2);
		var player = this._player;

			o = [								
				{type: "show_context", text: "Right after class, you meet up with your study group in the CUC.", waitUntilShown: true},
				//switch foreground with empty foreground
					{type: "custom", func: function(page){
						page.tweenMat(background,{
							opacity: 1,
							easing: TWEEN.Easing.Cubic.Out,
							duration: 200,
						});
						page.tweenMat(page._background3,{
							opacity: 0,
							easing: TWEEN.Easing.Cubic.Out,
							duration: 800,
							onComplete: function() {
								page._removeFromSceneBg(page._background3);
							},
						});
					}},
				{type: "show", img: ryan, expression: "happy", position: "center", waitUntilShown: false},
				/*{type: "custom", func: function(page) {
					page.getOwner().getSoundManager().play("Hey-Ryan-e");
				}},*/
				// {type: "play", audio: "Hey-Ryan-e"},
				{type: "dialog", speaker: "Ryan", text: "Awesome!  Both you and Priya are in my group.  This is Priya.  I told you about her earlier."},
				// transition of this flow doesn't work
				// {type: "hide", img: ryan, waitUntilHidden: false},
				// transition of this flow doesn't work
				{type: "show", img: priya, expression: "happy", position: "left", waitUntilShown: false},
				// {type: "custom", func: function(page) {
				// 	page.getOwner().getSoundManager().play("Hello-Priya");
				// }},
				// {type: "play", audio: "Hello-Priya"},
				{type: "dialog", speaker: "Priya", text: "Ryan here helped me so much last semester.  Always goes out of his way.  Nice to meet you."},
				// transition of this flow doesn't work
				// {type: "hide", img: priya, waitUntilHidden: false},
				// transition of this flow doesn't work

				{type: "show", img: cat, expression: "sad", position: "right", waitUntilShown: false, flip: true},
				// {type: "play", audio: "Ohhi-Cat"},
				{type: "dialog", speaker: "Cat", text: "Hey, my name is Cat. Uhh… sorry I’m a little distracted. I lost my wallet yesterday."},
				{type: "show", img: ryan, expression: "thoughtful", position: "center", waitUntilShown: false},

				//
				{type: "compare", leftop: isWalletWithWaiter, operator: "equal", rightop: 1, goTrue: "#wallet_withwaiter", goFalse: "#wallet_atpolice"},
				{type: "dialog", speaker: "Ryan", text: "Were you at Scottie's yesterday?  We found a wallet there. Might be yours.", label: "wallet_withwaiter"},
				{type: "show", img: cat, expression: "happy", position: "right", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Cat", text: "That’s great! Do you guys have it with you?"},
				{type: "show", img: ryan, position: "center", waitUntilShown: false},
				{type: "dialog", speaker: "Ryan", text: "We left it with the waiter."},
				{type: "hide", img: ryan},
				{type: "show", img: priya, expression: "happy", position: "left", waitUntilShown: false},
				{type: "custom", func: function(page) {
					return page.getRelationshipManager().getRelationship("Priya");
				}, label: "priyaRelationshipScore"},
				{type: "compare", leftop: "$priyaRelationshipScore", operator: "greater", rightop: 0, goTrue: "#chances", goFalse: "#checkout"},
				{type: "dialog", speaker: "Priya", text: "What are the chances!", label: "chances"},
				{type: "jump", condition: true, goTrue: "#aside1", goFalse: "#aside1"},
				{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},

				{type: "dialog", speaker: "Priya", text: "It’s worth checking out.", label: "checkout"},
				{type: "jump", condition: true, goTrue: "#aside1", goFalse: "#aside1"},
				{type: "jump", condition: true, goTrue: 1000, goFalse: 1000},

				//if You left it with the bartender

				// if you have the phone with you
				{type: "show", img: ryan, position: "center", expression: "thoughtful", waitUntilShown: false, label: "wallet_atpolice"},
				{type: "custom", func: function(page) {
					page.getRelationshipManager().addRelationship("Cat", 1);
					page.getRelationshipManager().addRelationship("Priya", 1);
				}},
				{type: "dialog", speaker: "Ryan", text: "Cat, is your last name Davis? " + player + " and I found a wallet at Scottie’s yesterday. We turned it into campus police."},
				{type: "show", img: cat, position: "right", expression: "happy", waitUntilShown: false, flip: true},
				{type: "dialog", speaker: "Cat", text: "That's great, you're both lifesavers!"},
				// {type: "choices", choices : [{text: "No Problem.", go: "#lifesaver"}, {text : "Happy to help!", go : "#lifesaver"}]},
				{type: "custom", func: function(page) {
					return page.getRelationshipManager().getRelationship("Ryan");
				}, label: "ryanRelationshipScore"},
				{type: "compare", leftop: "$ryanRelationshipScore", operator: "greater", rightop: 0, goTrue: "#happyryan", goFalse: "#neutralryan"},

				{type: "show", img: ryan, expression: "happy", position: "center", waitUntilShown: false, label: "happyryan"},
				{type: "dialog", speaker: "Ryan", text: player + " here is the lifesaver, I'm just the messenger."},
				{type: "jump", condition: true, goTrue: "#aside1", goFalse: "#aside1"},

				{type: "show", img: ryan, position: "center", waitUntilShown: false, label: "neutralryan"},
				{type: "dialog", speaker: "Ryan", text: "Yeah, lucky break."},
				{type: "jump", condition: true, goTrue: "#aside1", goFalse: "#aside1"},

				// if you left the phone at the bar
				/*{type: "show", img: ryan, label: "phone_notpicked"},
				{type: "dialog", speaker: "Ryan", text: "I think there was a phone at Scottie's yesterday? We found a phone there."},
				{type: "hide", img: ryan, waitUntilHidden: false},
				{type: "show", img: cat, flip: true},
				{type: "dialog", speaker: "Cat", text: "Hopefully it’s still there.  I’ll call them."},
				{type: "hide", img: cat, waitUntilHidden: false},
				*/

				{type: "nothing", label: "aside1"},
				{type: "hide", img: ryan},
				{type: "hide", img: cat},
				{type: "hide", img: priya},
				{type: "show_context", text: "The group leaves. Some time passes"},

				{type: "open_phone", layout:"text", people: [this._priya, this._ryan, this._cat]},
				{type: "add_phone_textbox",
					speaker: this._priya,
					text: "I’m going to grab a coffee – anyone want to join?"},
				{type: "add_phone_textbox",
					speaker: this._cat,
					text: "Thx!  But I’m actually at the gym right now.  U guys should come!"},
				{type: "add_phone_textbox",
					speaker: this._ryan,
					text: "Can’t – wish I could join for coffee, need to study.  My comp systems class is kicking my ass!"},

				{type: "choices",
				choices :
					[{text: "Grab a coffee at the café with Priya.", go: "#gocafe", relationship: [{name:this._priya, score:1}]},
					{text : "Workout at the gym with Cat.", go : "#gogym", relationship: [{name:this._cat, score:1}]},
					{text: "Head home for the day.", go: "#gohome"}]
				},
				{type: "close_phone", label: "gocafe"},
				{type: "goto", page: "scene 3.a"},
				{type: "close_phone", label: "gogym"},
				{type: "goto", page: "scene 3.b"},

				{type: "close_phone", label: "gohome"},
				/*{type: "custom", func: function(page) {
					page.getRelationshipManager().addRelationship("Cat", -1);
					page.getRelationshipManager().addRelationship("Priya", -1);
				}},*/
				{type: "goto", page: "scene 4"},
			];

		return o;
	};

	Page1_1.prototype._createRandomPlaylist = function() {
		var playlist = null;
		playlist = [
					{audio:"Uc-girllaughing", playrate: 0.02, noreplay: true},
					{audio:"Uc-mantalking", playrate: 0.02, noreplay: true},
					{audio:"Uc-womantalking", playrate: 0.03, noreplay: true},
					{audio:"Uc-steps", playrate: 0.1}
					];
		return playlist;
	};

	/**
	 * @override
	 */
	Page1_1.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page1_1.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		this._owner._ambient = this._owner.getSoundManager().play("UC-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});
		this._tweenVolumeIn();
	};

	/**
	 * @override
	 */
	Page1_1.prototype._update = function() {
		MPLAY.MPlayPage.prototype._update.call(this);

		this._multiTracksPlayer.shuffle();
	};

	MPLAY.Page1_1 = Page1_1;
}());
