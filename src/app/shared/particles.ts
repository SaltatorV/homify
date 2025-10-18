import { Point } from "./point";

export class Particles {
    points: Point[] = [];

    constructor(width: number, height: number, particlesCount: number) {
        this.points = this.generateParticlePoints(width, height, particlesCount);
    }

    get getParticlePoints(): Point[]{
        return this.points;
    }

    private generateParticlePoints(width: number, height: number, particlesCount: number): Point[] {
        const points: Point[] = []
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
