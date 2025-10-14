export class Particles {
    points: { x: number; y: number; vx: number; vy: number }[] = [];

    constructor(width: number, height: number, particlesCount: number) {
        this.points = this.generateParticlePoints(width, height, particlesCount);
    }

    get getParticlePoints(): { x: number; y: number; vx: number; vy: number }[]{
        return this.points;
    }

    private generateParticlePoints(width: number, height: number, particlesCount: number): { x: number; y: number; vx: number; vy: number }[] {
        const points: { x: number; y: number; vx: number; vy: number }[] = []
        for (let i = 0; i < particlesCount; i++) {

        points.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
        });
        }

        return points;
    }
}
