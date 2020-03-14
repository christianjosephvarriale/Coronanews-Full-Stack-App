import * as THREE from 'three'

var container;

var camera, scene, renderer;

var mesh;

init();
animate();

function init() {

    container = document.getElementById('animation');

    //

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xFFFFFF );
    scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

    //

    scene.add( new THREE.AmbientLight( 0x444444 ) );

    var light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    light1.position.set( 1, 1, 1 );
    scene.add( light1 );

    var light2 = new THREE.DirectionalLight( 0xffffff, 1.5 );
    light2.position.set( 0, - 1, 0 );
    scene.add( light2 );

    //

    var triangles = 160000;

    var geometry = new THREE.BufferGeometry();

    var positions = [];
    var normals = [];
    var colors = [];

    var color = new THREE.Color();

    var n = 800, n2 = n / 2;	// triangles spread in the cube
    var d = 12, d2 = d / 2;	// individual triangle size

    var pA = new THREE.Vector3();
    var pB = new THREE.Vector3();
    var pC = new THREE.Vector3();

    var cb = new THREE.Vector3();
    var ab = new THREE.Vector3();

    for ( var i = 0; i < triangles; i ++ ) {

        // positions

        var x = Math.random() * n - n2;
        var y = Math.random() * n - n2;
        var z = Math.random() * n - n2;

        var ax = x + Math.random() * d - d2;
        var ay = y + Math.random() * d - d2;
        var az = z + Math.random() * d - d2;

        var bx = x + Math.random() * d - d2;
        var by = y + Math.random() * d - d2;
        var bz = z + Math.random() * d - d2;

        var cx = x + Math.random() * d - d2;
        var cy = y + Math.random() * d - d2;
        var cz = z + Math.random() * d - d2;

        positions.push( ax, ay, az );
        positions.push( bx, by, bz );
        positions.push( cx, cy, cz );

        // flat face normals

        pA.set( ax, ay, az );
        pB.set( bx, by, bz );
        pC.set( cx, cy, cz );

        cb.subVectors( pC, pB );
        ab.subVectors( pA, pB );
        cb.cross( ab );

        cb.normalize();

        var nx = cb.x;
        var ny = cb.y;
        var nz = cb.z;

        normals.push( nx, ny, nz );
        normals.push( nx, ny, nz );
        normals.push( nx, ny, nz );

        // colors

        var vx = ( x / n ) + 0.5;
        var vy = ( y / n ) + 0.5;
        var vz = ( z / n ) + 0.5;

        color.setRGB( vx, vy, vz );

        colors.push( color.r, color.g, color.b );
        colors.push( color.r, color.g, color.b );
        colors.push( color.r, color.g, color.b );

    }

    function disposeArray() {

        this.array = null;

    }

    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ).onUpload( disposeArray ) );
    geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ).onUpload( disposeArray ) );
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ).onUpload( disposeArray ) );

    geometry.computeBoundingSphere();

    var material = new THREE.MeshPhongMaterial( {
        color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
        side: THREE.DoubleSide, vertexColors: true
    } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );

    if ( window.innerWidth > 901 ) { /* Destop View */

        renderer.setSize( window.innerWidth / 2, window.innerHeight / 1.3 );
        camera = new THREE.PerspectiveCamera( 27, (window.innerWidth / window.innerHeight) / 1.5, 1, 3500 );
        camera.position.z = 2750;

    } else {
        
        renderer.setSize( window.innerWidth, window.innerHeight / 2);
        camera = new THREE.PerspectiveCamera( 27, (window.innerWidth / window.innerHeight) * 2, 1, 3500 );
        camera.position.z = 2750;
        
    }

    renderer.outputEncoding = THREE.sRGBEncoding;


    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    if ( window.innerWidth > 901 ) { /* Destop View */

        camera.aspect = (window.innerWidth / window.innerHeight) / 1.5;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth / 2, window.innerHeight / 1.3 );
    
    } else {

        camera.aspect = (window.innerWidth / window.innerHeight) * 2;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight / 2);
    }


}

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    var time = Date.now() * 0.001;

    mesh.rotation.x = time * 0.25;
    mesh.rotation.y = time * 0.5;

    renderer.render( scene, camera );

}