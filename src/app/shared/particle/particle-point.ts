import {ParticlePointConfiguration} from './particle-point-configuration';
import {ParticleLineConfiguration} from './particle-line-configuration';

export class ParticlePoint {

  private x: number;
  private y: number;
  private vx: number;
  private vy: number;

  constructor(x: number, y: number, vx: number, vy: number) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  moveTo(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  calculateDistance(other: ParticlePoint) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  get positionX() {
    return this.x;
  }

  get positionY() {
    return this.y;
  }

  draw(ctx: CanvasRenderingContext2D, particlePointConfiguration: ParticlePointConfiguration) {
    ctx.fillStyle = particlePointConfiguration.fillColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, particlePointConfiguration.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  strokeWith(other: ParticlePoint, ctx: CanvasRenderingContext2D, particleLineConfiguration: ParticleLineConfiguration) {
    ctx.lineWidth = particleLineConfiguration.lineWidth;
    ctx.strokeStyle = particleLineConfiguration.strokeStyle;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(other.positionX, other.positionY);
    ctx.stroke();
  }
}
