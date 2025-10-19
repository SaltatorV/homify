import {Component, ElementRef, HostListener, OnInit, ViewChild,} from '@angular/core';
import {Particles} from '../particle/particles';
import {ParticleConfigService} from '../particle-config-service';
import {ParticlePointConfiguration} from '../particle/particle-point-configuration';
import {ParticleConfigurationName} from '../../config/particle.config';
import {ParticleLineConfiguration} from '../particle/particle-line-configuration';
import {ParticlePoint} from '../particle/particle-point';
import {ScreenDimensions} from '../particle/screen-dimensions';

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
  mousePoint!: ParticlePoint
  screenDimensions!: ScreenDimensions;

  particlePointConfiguration: ParticlePointConfiguration
  particleLineConfiguration: ParticleLineConfiguration

  constructor(particleConfigService: ParticleConfigService) {
    this.particlePointConfiguration = particleConfigService.getParticlePointConfiguration(ParticleConfigurationName.BackgroundCanvas)
    this.particleLineConfiguration = particleConfigService.getParticleLineConfiguration(ParticleConfigurationName.BackgroundCanvas)
  }

  ngOnInit() {
    this.updateWindowDimensions();
    this.ctx = this.getUpdatedCanvas2DContext();
    this.particles = new Particles(this.screenDimensions, this.calculatePointCount());
    this.animate();
  }


  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mousePoint = new ParticlePoint(e.clientX, e.clientY, 0, 0);
  }

  @HostListener('window:resize')
  onResize() {
    clearTimeout((this as any)._resizeTimeout);
    (this as any)._resizeTimeout = setTimeout(() => {
      this.updateWindowDimensions();
      this.getUpdatedCanvas2DContext();
      this.particles = new Particles(this.screenDimensions, this.calculatePointCount());
    }, 200);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.screenDimensions.getWidth, this.screenDimensions.getHeight);
    this.particles.getParticlePoints.forEach((point) => {
      point.moveTo(this.screenDimensions.getWidth, this.screenDimensions.getHeight);
      point.draw(this.ctx, this.particlePointConfiguration)

      this.particles.getParticlePoints.forEach((other) => {
        const dist = point.calculateDistance(other);
        if (dist < this.particleLineConfiguration.maxLineLength) {
          let alpha = 1 - dist / this.particleLineConfiguration.maxLineLength;
          point.strokeWith(other, this.ctx, this.particleLineConfiguration, alpha)
        }
      });

      if (this.mousePoint != null) {
        const dist = point.calculateDistance(this.mousePoint)
        if (dist < this.particleLineConfiguration.maxLineLength) {
          let alpha = 1 - dist / this.particleLineConfiguration.maxLineLength;
          point.strokeWith(this.mousePoint, this.ctx, this.particleLineConfiguration, alpha)
        }
      }
    });

    requestAnimationFrame(() => this.animate());
  }

  private updateWindowDimensions() {
    this.screenDimensions = new ScreenDimensions(window.innerWidth, window.innerHeight);
  }

  private getUpdatedCanvas2DContext(): CanvasRenderingContext2D {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.screenDimensions.getWidth;
    canvas.height = this.screenDimensions.getHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to retrieve 2D context');
    }

    return ctx;
  }

  private calculatePointCount(): number {
    return Math.min(
      Math.floor(this.screenDimensions.getWidth * this.screenDimensions.getHeight * BackgroundCanvas.PARTICLE_DENSITY),
      BackgroundCanvas.PARTICLES_MAX_COUNT
    );
  }
}
