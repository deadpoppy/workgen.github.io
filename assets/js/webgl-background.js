class WebGLBackground {
  constructor() {
    this.initThreeJS();
    this.createGeometry();
    this.animate();
  }

  initThreeJS() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.prepend(this.renderer.domElement);
  }

  createGeometry() {
    this.geometry = new THREE.IcosahedronGeometry(2, 2);
    this.material = new THREE.MeshPhongMaterial({
      color: 0x667eea,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
    this.camera.position.z = 5;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.mesh.rotation.x += 0.001;
    this.mesh.rotation.y += 0.002;
    this.renderer.render(this.scene, this.camera);
  }
}

new WebGLBackground(); 