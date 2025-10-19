import {Component, ElementRef, HostListener, OnInit, ViewChild,} from '@angular/core';
import {Particles} from '../particle/particles';
import {ParticleConfigService} from '../particle-config-service';
import {ParticlePointConfiguration} from '../particle/particle-point-configuration';
import {ParticleConfigurationName} from '../../config/particle.config';

@Component({
  selector: 'app-background-canvas',
  template: `
    <canvas #canvas></canvas>`,
})
export class BackgroundCanvas implements OnInit {
  private static readonly PARTICLE_DENSITY: number = 0.00009;
  private static readonly PARTICLES_MAX_COUNT: number = 300;

  @ViewChild('canvas', {static: true})
  canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;
  particles!: Particles

  width: number = 0;
  height: number = 0;

  mouse = {x: null as number | null, y: null as number | null};
  particlePointConfiguration: ParticlePointConfiguration

  constructor(particleConfigService: ParticleConfigService) {
    this.particlePointConfiguration = particleConfigService.getStyle(ParticleConfigurationName.BackgroundCanvas)
  }

  ngOnInit() {
    this.updateWindowDimensions();
    this.ctx = this.getUpdatedCanvas2DContext();
    this.particles = new Particles(this.width, this.height, this.calculatePointCount());
    this.animate();
  }


  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  @HostListener('window:resize')
  onResize() {
    clearTimeout((this as any)._resizeTimeout);
    (this as any)._resizeTimeout = setTimeout(() => {
      this.updateWindowDimensions();
      this.getUpdatedCanvas2DContext();

      this.particles = new Particles(this.width, this.height, this.calculatePointCount());
    }, 200);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.particles.getParticlePoints.forEach((point) => {
      point.moveTo(this.width, this.height);
      point.draw(this.ctx, this.particlePointConfiguration)

      this.particles.getParticlePoints.forEach((other) => {
        const dist = point.calculateDistance(other);
        if (dist < 100) {
          let alpha = 1 - dist / 100;
          this.ctx.lineWidth = 1.5;
          this.ctx.strokeStyle = `rgba(4,102,200,${alpha})`;
          this.ctx.beginPath();
          this.ctx.moveTo(point.positionX, point.positionY);
          this.ctx.lineTo(other.positionX, other.positionY);
          this.ctx.stroke();
        }
      });

      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = point.positionX - this.mouse.x;
        const dy = point.positionY - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          let alpha = 1 - dist / 150;
          this.ctx.lineWidth = 1.5;
          this.ctx.strokeStyle = `rgba(92, 103, 125,${alpha})`;
          this.ctx.beginPath();
          this.ctx.moveTo(point.positionX, point.positionY);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.stroke();
        }
      }
    });

    requestAnimationFrame(() => this.animate());
  }

  private updateWindowDimensions() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  private getUpdatedCanvas2DContext(): CanvasRenderingContext2D {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to retrieve 2D context');
    }

    return ctx;
  }

  private calculatePointCount(): number {
    return Math.min(
      Math.floor(this.width * this.height * BackgroundCanvas.PARTICLE_DENSITY),
      BackgroundCanvas.PARTICLES_MAX_COUNT
    );
  }
}
