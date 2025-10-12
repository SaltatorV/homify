import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-background-canvas',
  template: `<canvas #canvas></canvas>`,
})
export class BackgroundCanvas implements OnInit {
  private static readonly PARTICLE_DENSITY: number = 0.00009;
  private static readonly PARTICLES_MAX_COUNT: number = 300;

  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  width: number = 0;
  height: number = 0;

  points: { x: number; y: number; vx: number; vy: number }[] = [];
  mouse = { x: null as number | null, y: null as number | null };

  ngOnInit() {
    this.updateWindowDimensions();
    this.ctx = this.getUpdatedCanvas2DContext();
    this.initPoints(this.calculatePointCount());
    this.animate();
  }

  initPoints(count: number) {
    for (let i = 0; i < count; i++) {
      this.points.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }
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

      const count = Math.min(
        Math.floor(
          this.width * this.height * BackgroundCanvas.PARTICLE_DENSITY
        ),
        BackgroundCanvas.PARTICLES_MAX_COUNT
      );

      this.points = [];
      this.initPoints(count);
    }, 200);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.points.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      this.ctx.fillStyle = '#0466c8';
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 2, 0, Math.PI * 5);
      this.ctx.fill();

      this.points.forEach((other) => {
        const dx = p.x - other.x;
        const dy = p.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          let alpha = 1 - dist / 100;
          this.ctx.lineWidth = 1.5;
          this.ctx.strokeStyle = `rgba(4,102,200,${alpha})`;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(other.x, other.y);
          this.ctx.stroke();
        }
      });

      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          let alpha = 1 - dist / 150;
          this.ctx.lineWidth = 1.5;
          this.ctx.strokeStyle = `rgba(92, 103, 125,${alpha})`;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
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
    return Math.floor(
      this.width * this.height * BackgroundCanvas.PARTICLE_DENSITY
    );
  }
}
