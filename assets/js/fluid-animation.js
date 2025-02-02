class FluidAnimation {
  constructor() {
    this.initSimulation();
    this.createParticles();
  }

  initSimulation() {
    this.simulation = new FLUID.Simulation({
      TRIGGER: 'click',
      IMMEDIATE: true,
      COMPOSITE_OPERATION: 'lighter'
    });
  }

  createParticles() {
    this.particles = new FLUID.Particles({
      COUNT: 50,
      COLOR: ['#667eea', '#764ba2'],
      SIZE: 3,
      BOUND: 0.8,
      DRAG: 0.02,
      GRAVITY: 0.1
    });
  }
} 