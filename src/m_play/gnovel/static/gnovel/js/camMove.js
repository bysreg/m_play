<script>
var mouse;
var raycaster;
var camera, scene, renderer;

	camera = new THREE.PerspectiveCamera(70,window.innerWidth,window.innerHeight,1,10000);
	camera.position.z =5;
	scene = new THREE.Scene();
	var cube = new THREE.BoxGeometry(5,5,5);
	scene.add(cube);
	
	//makes raycasting easier
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	renderer = new THREE.CanvasRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	document.addEventListener('mousedown', onMouseDown, false);
	
	//onMouseMove - for move movement
	//
	function onMouseDown(event)
	{
		event.preventDefault();
		//why?
		mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
		
		//update picking ray with camera and mouse pos
		raycaster.setFromCamera(mouse, camera);
		
		//check if ray intersects any objects('children') rendered in scene
		var intersects = raycaster.intersectingObjects(scene.children);
		
		//if something has been intersected with
		if(intersects.length > 0)
		{
			console.log("mouse click!");
		}
	}
		////////////// COMMON ///////////////			
			
			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );				
			}
			window.addEventListener( 'resize', onWindowResize, false );
	
	function Update()
	{
		requestAnimationFrame(Update);
		render();
		
	}
	
	function Render()
	{
		
		
		renderer.render(scene, camera);
	}
	
</script>