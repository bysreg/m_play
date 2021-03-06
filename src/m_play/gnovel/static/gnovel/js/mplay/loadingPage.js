// namespace
var MPLAY = MPLAY || {};

(function() {
	"use_strict";

	/**
	 *
	 * @class PageEnding
	 * @augments MPlay.MPlayPage
	 */
	var PageLoading = function() {
		MPLAY.MPlayPage.call(this);

		this._tweenComplete = true;
		this._curText = null;
		this._curTextBar = null;
		this._loadingComplete = false;
		this._loadTween = null;
		this._notifText = null;
		this._animPlaying = false;
		this._tutFinished = false;
		this._loadingNum = 0;
		this._loadText = null;

		var page = this;
		var tutCounter = 1;
		//var mouseDownListener = null;
		this.mouseDownListener = function(event) {
			event.preventDefault();
			var mouse = {};
			mouse.x = event.clientX;
			mouse.y = event.clientY;
		page._owner.calcMousePositionRelativeToCanvas(mouse);

		//update picking ray with camera and mouse pos
		page._owner._raycaster.setFromCamera(mouse, page._owner.getCamera());
		var intersectBut = page._owner._raycaster.intersectObjects([page._continueBut], true);

    if(page._tweenComplete)
    {
				page._tweenComplete = false;
				tutCounter = page._TutorialNext(tutCounter);
				//stop animation playing
				page._animPlaying = false;
			}

		if(page._loadingComplete && intersectBut.length>0)
		{
			var nextPage = 1;
		 	page.goToPage(nextPage, GNOVEL.TransitionType.FADE);
		}
		};

		this._tutorialText = ["Click on characters or other objects like your phone to interact with them.",
			"Decisions affect your relationship with other characters.",
			"Look out for situations that involve moral choices and may affect the story."
		];



	};

	PageLoading.prototype = Object.create(MPLAY.MPlayPage.prototype);
	PageLoading.prototype.constructor = PageLoading;


	/**
	 * @override
	 */

	PageLoading.prototype._onLoad = function() {
		MPLAY.MPlayPage.prototype._onLoad.call(this);

		var background = this.createImage("/static/gnovel/res/loadingPage/loading screen_noBox.png", new THREE.Vector3(0, 0, 0), 1920, 1080);
		//background.position.z = this.getBackgroundLayer();
		this.setBackground("/static/gnovel/res/loadingPage/loading screen_noBox.png");

		this.getOwner().addMouseDownListener(this.mouseDownListener);

		this._TutorialNext(0);
		this._notifText = this.createImage("/static/gnovel/res/loadingPage/loading_tut_text.png", new THREE.Vector3(0, -100, 5), 560, 50);
		/*var message = "(Click or press [Space] to advance messages and dialogue.)"
	 var notifText = this.createTextBox(message,{
		 charLine: 60,
		 font: "28px Noteworthy",
		 center: true,
		 fillstyle: '#ffffff',});*/

		//set text on bottom right
		this._notifText.material.opacity = 0;
		this._addToScene(this._notifText);
		//fade in text after X delay
		this.tweenMat(this._notifText, {
			opacity: 1,
			delay: 2000,
			duration: 400,
			easing: TWEEN.Easing.Cubic.Out,
		});

	//continue button after loading
	this._continueBut = this.createImage("/static/gnovel/res/loadingPage/loading_continue.png",new THREE.Vector3(0, -300, this.getBackgroundLayer() + 5), 375, 120);
	};

	PageLoading.prototype._onStart = function() {

 		MPLAY.MPlayPage.prototype._onStart.call(this);
		var textureList = MPLAY._getTextureList();
		var resList = MPLAY._getResourceList();

		var assetLoader = this.getOwner()._getAssetLoader();
		var self = this;

		// textures
		assetLoader._setTextureLoadList(textureList);
		console.log("start loading texture");
		assetLoader._startLoadingTextures(
			// oncomplete
			function() {
				//self.LoadingComplete();
			}
		);

		//show loading percentage
		var loadProgress = assetLoader._getLoadingProgress();
		var Text2D = THREE_Text.Text2D;
		this._loadText = new Text2D(loadProgress, {
			font: "60px Noteworthy",
			fillStyle: '#FFFFFF',
			charLine: 30,
			center: true,
		});
		this._loadText.position.set(550, 300,this.getBackgroundLayer() + 10);
		this._addToScene(this._loadText);

		//show loading symbol
		var loadSymbol = this.createImage("/static/gnovel/res/loadingPage/loading_symbol.png", new THREE.Vector3(550, 320, 0), 300, 150);
		loadSymbol.name = "loadSymbol";
		loadSymbol.material.opacity = 0;
		this._addToScene(loadSymbol);

		this._loadTween = this.tweenFlash(loadSymbol, {
			opacity2: 0,
			easing: TWEEN.Easing.Cubic.Out,
			duration: 1500,
		});

		// resources
		assetLoader._setResourceList(resList);
	};

	PageLoading.prototype._TutorialNext = function(count) {
		var page = this;

		//show compass animation for 3rd tutorial text
		if (count == 2) {
			this._compassAnim();
			// this.LoadingComplete();
		};
		//last tutorial for now
		if(count==3)
		{
			//fade compass
			this._fadeCompass(this._owner._scene.getObjectByName("compassFront"), this._owner._scene.getObjectByName("compassBack"),0);

			this.tweenMat(this._notifText, {
				opacity: 0,
				duration: 400,
				easing: TWEEN.Easing.Cubic.Out,
				onComplete: function() {
					page._removeFromScene(page._notifText);
				}
			});

			 if(this._loadingComplete){
				 var nextPage = 1;
	 		 	 this.goToPage(nextPage, GNOVEL.TransitionType.FADE);
			 }
			// this._continueBut.material.opacity = 0;
			// this._addToScene(this._continueBut);
		}
		//display textbox on top of background

		if (this._tutorialText[count] != null) {
			var textbar = this.createImage("/static/gnovel/res/loadingPage/loading_textBox.png", new THREE.Vector3(0, 0, this.getBackgroundLayer() + 10), 1000, 150);

			var message = this._tutorialText[count];
			var tutText = this.createTextBox(message, {
				charLine: 55,
				font: "35px Noteworthy",
				center: true,
				fillstyle: '#ffffff',
			});

			tutText.position.set(20, 40, textbar.position.z + 5);

			//remove previous text and fade out
			if (this._curText) {
				this.tweenMat(this._curTextBar, {
					duration: 400,
					easing: TWEEN.Easing.Cubic.Out,
					opacity: 0,
					onComplete: function() {
						page._removeFromScene(this._curTextBar);
					}
				});

				this.tweenMat(this._curText, {
					duration: 400,
					easing: TWEEN.Easing.Cubic.Out,
					opacity: 0,
					onComplete: function() {
						page._removeFromScene(this._curText);
					}
				});

			}

			//fade in textbar
			this._addToScene(textbar);
			textbar.material.opacity = 0;
			this.tweenMat(textbar, {
				duration: 600,
				easing: TWEEN.Easing.Cubic.Out,
				opacity: 1,
			});


			//fade in text
			this._addToScene(tutText);
			tutText.material.opacity = 0;
			this.tweenMat(tutText, {
				duration: 600,
				easing: TWEEN.Easing.Cubic.Out,
				opacity: 1,
			});

			//set global variable to current text and image
			this._curText = tutText;
			this._curTextBar = textbar;
			//increment count for which text should display
			count++;

			//after tweening in text, set tweenComplete
			this._tweenComplete = true;
		} else {
			if (this._curText) {
				//fade out and remoev
				this.tweenMat(this._curTextBar, {
					duration: 400,
					easing: TWEEN.Easing.Cubic.Out,
					opacity: 0,
					onComplete: function() {
						page._removeFromScene(this._curTextBar);
					}
				});

				this.tweenMat(this._curText, {
					duration: 400,
					easing: TWEEN.Easing.Cubic.Out,
					opacity: 0,
					onComplete: function() {
						page._removeFromScene(this._curText);
					}
				});
			}
		}
		return count;
	};

	PageLoading.prototype._compassAnim = function() {

		var page = this;
		page._animPlaying = true;

		var compassBack = this.createImage("/static/gnovel/res/textures/ui/compass background.png", new THREE.Vector3(-400, 0, this._backgroundLayer + 35), 150, 150);
		compassBack.name = "compassBack";
		var compassFront = this.createImage("/static/gnovel/res/textures/ui/compass main.png", new THREE.Vector3(-400, 0, this._backgroundLayer + 35), 150, 150);
		compassFront.name = "compassFront";
		compassBack.material.opacity = 0;
		compassFront.material.opacity = 0;

		this._addToScene(compassBack);
		this._addToScene(compassFront);
		var delayFX = 500;

		//full COMPASS ANIMATION
		//fade compass in
		this.tweenMat(compassFront, {
			easing: TWEEN.Easing.Cubic.Out,
			duration: 1000,
			opacity: 1,
		});
		this.tweenMat(compassBack, {
			easing: TWEEN.Easing.Cubic.Out,
			duration: 1000,
			opacity: 1,
			onComplete: function() {

				//ANIMATE spin compass
				var duration = 200;
				var rotDest = .3;
				var rotTween = new TWEEN.Tween(compassFront.rotation)
					.to({
						z: 90 * Math.PI / 180, //rotates 90 degrees
					}, duration)
					.easing(TWEEN.Easing.Linear.None)
					.repeat(10)
					.onComplete(function() {
						//only call if animation is still playing
						if(page._animPlaying == true)
							page._fadeCompass(compassFront, compassBack,delayFX);
						})

				rotTween.start();
			},
		});
	};

PageLoading.prototype._fadeCompass = function(compassFront, compassBack, delayFX){
	var page = this;
	//fade compass out
	page.tweenMat(compassFront, {
		easing: TWEEN.Easing.Cubic.Out,
		duration: 400,
		opacity: 0,
		opacity2: 0,
		delay: delayFX,
	});
	page.tweenMat(compassBack, {
		easing: TWEEN.Easing.Cubic.Out,
		duration: 400,
		opacity: 0,
		opacity2: 0,
		delay: delayFX,
		onComplete: function() {
			page._removeFromScene(compassBack);
			page._removeFromScene(compassFront);
		}
	});
};

	/**
	 *@function call when loading of assets is complete
	 */
	PageLoading.prototype.LoadingComplete = function() {

		var page = this;
		this._loadingComplete = true;
		//stop loading symbol flashing
		var loadSymbol = this._getRootObject().getObjectByName("loadSymbol");
		this.tweenMat(loadSymbol,{
			easing: TWEEN.Easing.Linear.None,
			duration: 300,
			opacity: 0,
			delay:300,
			onComplete: function() {
				page._removeFromScene(loadSymbol);
			}
		});

		//if text is still showing
			this.tweenMat(this._loadText,{
				easing: TWEEN.Easing.Linear.None,
				duration: 300,
				opacity: 0,
				delay:300,
				onComplete: function() {
					page._removeFromScene(this._loadText);
				}
			});
		//this._removeFromScene(this._getRootObject().getObjectByName("loadSymbol"));

		//only show button if tutorial is finished
		if(this._tutFinished){
			//show continue button & go to next page
			var nextPage = 1;
		 	this.goToPage(nextPage, GNOVEL.TransitionType.FADE);
		//  var continueBut = this._continueBut;
		// 	this.tweenMat(continueBut, {
		// 		opacity: 1,
		// 		duration: 1000,
		// 		easing: TWEEN.Easing.Cubic.Out,
		// 	});
		};
	};

	// will be called each frame, after onLoad and onStart complete
	PageLoading.prototype._update = function() {
		var page = this;

		//update loading progress on sreen
		if(this._loadText.text != 100){
			var assetLoader = this.getOwner()._getAssetLoader();
			var loadNum = this._loadingNum;
			//loading number progress
			var loadProgress = assetLoader._getLoadingProgress();
			if(loadNum != loadProgress)	{
				loadNum = loadProgress;
				this._loadText.text = loadNum;
			}
		}
		else {
			if(!this._loadingComplete){
				this.LoadingComplete();
			}
		}

	};


	PageLoading.prototype._onUnload = function() {
	 MPLAY.MPlayPage.prototype._onUnload.call(this);
		this.getOwner().removeMouseDownListener(this.mouseDownListener);
	};

	window.addEventListener('resize', function(event) {
		var container = document.getElementById("container");

		var aspect_ratio = window.innerWidth / window.innerHeight;

		if (aspect_ratio > 16 / 9) {
			// fill height
			container.height = window.innerHeight;
			container.width = (16 / 9) * container.height;
		} else {
			// fill width
			container.width = window.innerWidth;
			container.height = (9 / 16) * container.width;
		}
	});

	MPLAY.PageLoading = PageLoading;
}());
