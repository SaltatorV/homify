import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-background-canvas',
  template: `<canvas #canvas></canvas>`,
  styles: [`
    canvas { display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
  `],
  standalone: true
})
export class BackgroundCanvas implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;
  width = window.innerWidth;
  height = window.innerHeight;
  points: { x: number; y: number; vx: number; vy: number; }[] = [];
  mouse = { x: null as number | null, y: null as number | null };

  ngOnInit() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d')!;
    this.initPoints(130);
    this.animate();
  }

  initPoints(count: number) {
    for (let i = 0; i < count; i++) {
      this.points.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
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
  const oldWidth = this.width;
  const oldHeight = this.height;

  this.width = window.innerWidth;
  this.height = window.innerHeight;
  const canvas = this.canvasRef.nativeElement;
  canvas.width = this.width;
  canvas.height = this.height;


  this.points.forEach(p => {
    if (p.x > this.width) p.x = Math.random() * this.width;
    if (p.y > this.height) p.y = Math.random() * this.height;
  });

  const extraCount = Math.floor(this.points.length * ((this.width * this.height) / (oldWidth * oldHeight)) - this.points.length);

  for (let i = 0; i < extraCount; i++) {
    this.points.push({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
  }
}


  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.points.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      this.ctx.fillStyle = '#0466c8';
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      this.ctx.fill();

      this.points.forEach(other => {
        const dx = p.x - other.x;
        const dy = p.y - other.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          let alpha = 1 - dist / 100;
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
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 150) {
          let alpha = 1 - dist / 150;
          this.ctx.strokeStyle = `rgba(0,86,196,${alpha})`;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.stroke();
        }
      }
    });

    requestAnimationFrame(() => this.animate());
  }
}
