// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class Page4_1
	 * @augments MPLAY.MPlayPage
	 */
	var Page4_1 = function() {
		MPLAY.MPlayPage.call(this);
	};

	Page4_1.prototype = Object.create(MPLAY.MPlayPage.prototype);
	Page4_1.prototype.constructor = Page4_1;

	/**
	 * @override
	 */
	Page4_1.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		var background = "/static/gnovel/res/textures/backgrounds/restaurant.png"
		this.setupBarBackground(background);

	};

	Page4_1.prototype._createFlowElements = function() {
		var cat = "%" + this._cat;
		var player = this._player;
		var c_posRel = 3;
		var c_neuRel = 1;

		var o = null;

		o = [
			{type: "show_context", "text": "At Scottie's..."},
			{type: "custom", func: function(page){
				return page.getRelationshipManager().getRelationship("Cat");
			}, label: "catRelationshipScore1"},
			{type: "compare", leftop: "$catRelationshipScore1", operator: "greater equal", rightop: c_neuRel, goTrue: "#pos1", goFalse: "#neg1"},

			{type: "nothing", label: "pos1"},
			{type: "show", img: cat, expression: "happy", position: "center", waitUntilShown: false},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Heyfriend-Cat");
			// }},
			// {type: "play", audio: "Heyfriend-Cat"},
			{type: "dialog", speaker: "Cat", text: player+"!  How are you doing?"},
			{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

			{type: "nothing", label: "neg1"},
			{type: "show", img: cat, position: "center", waitUntilShown: false},
			// {type: "custom", func: function(page) {
			// 	page.getOwner().getSoundManager().play("Wtsnew-Cat");
			// }},
			// {type: "play", audio: "Wtsnew-Cat"},
			{type: "dialog", speaker: "Cat", text: "What's new with you?"},
			{type: "jump", condition: true, goTrue: "#choices1", goFalse: "#choices1"},

			{type: "nothing", label: "choices1"},
			{type: "choices", choices :
								[{text: "How are you?",
									go: "#wtsup"},
								 {text: "Nothing much.",
								 	go: "#nothingmuch"}]},

			{type: "nothing", label: "wtsup"},
			{type: "show", img: cat, expression: "sad", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "I’m trying to wind down a little. The job hunt is stressful, and I’m worried about my QPA."},

			{type: "choices", choices : [{text: "You’ll be fine.", go: "#beok"}, {text : "I understand how you’re feeling.", go : "#beok"}]},

			{type: "show", img: cat, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Yeah, I think it will be ok. But you know what? Ask me again in May.", label: "beok"},
			{type: "dialog", speaker: "Cat", text: "So… Priya told me about what happened with you guys the other day."},
			{type: "show", img: cat, expression: "sad", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "She told me about her roommate. That was a tough situation, because she was an international student. If they get dropped, they have problems with their visas."},
			{type: "show", img: cat, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Yeah, so anyway. what are you going to order?"},
			{type: "jump", condition: true, goTrue: "#gonextscene", goFalse: "#gonextscene"},

			{type: "nothing", label: "nothingmuch"},
			{type: "show", img: cat, expression: "thoughtful", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Nothing... sounds serious. Can I help?"},
			{type: "choices", choices : [{text: "Just this thing with Ryan.  It's ok.", go: "#itsok"}, {text : "Thanks, but it’s fine.", go : "#itsok"}]},
			{type: "show", img: cat, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "I know I’m usually running around like a crazy person, but if you need to talk, I’m happy to listen.", label: "itsok"},
			{type: "dialog", speaker: "Cat", text: "You know, Priya told me about what happened with you guys the other day."},
			{type: "show", img: cat, expression: "sad", position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "She told me about her roommate. That was a tough situation, because she was an international student. If they get dropped, they have problems with their visas."},
			{type: "show", img: cat, position: "center", waitUntilShown: false},
			{type: "dialog", speaker: "Cat", text: "Yeah, so anyway. What are you going to order?"},

			{type: "goto", page: "scene 6.a", label: "gonextscene"},

		];

		return o;
	};


	Page4_1.prototype._createRandomPlaylist = function() {
		var playlist = null;
		playlist = [
				    {audio:"Bar-glasses1", playrate: 0.1},
					{audio:"Bar-glasses2", playrate: 0.1},
					{audio:"Bar-glasses3", playrate: 0.1},
					{audio:"Bar-distantglasses", playrate: 0.4},
					{audio:"Bar-girltalking", playrate: 0.05, noreplay: true},
					{audio:"Bar-liquid", playrate: 0.05},
					{audio:"Bar-mantalking", playrate: 0.05, noreplay: true},
					{audio:"Bar-pia", playrate: 0.05, noreplay: true},
					];
		return playlist;
	};


	Page4_1.prototype._onUnload = function() {
		MPLAY.MPlayPage.prototype._onUnload.call(this);

		if (this._owner._ambient != null) {
			this._tweenVolumeOut();
		}
	};

	Page4_1.prototype._onStart = function() {
		MPLAY.MPlayPage.prototype._onStart.call(this);

		this._owner._ambient = this._owner.getSoundManager().play("Bar-bg", {interrupt: this._owner.getSoundManager().INTERRUPT_ANY, loop: -1, volume: 0.0});
		this._tweenVolumeIn();
	};

	/**
	 * @override
	 */
	Page4_1.prototype._update = function() {
		MPLAY.MPlayPage.prototype._update.call(this);

		this._multiTracksPlayer.shuffle();
	};

	MPLAY.Page4_1 = Page4_1;
}());
