import { ParticlePoint } from "./particle-point";

export class Particles {
    points: ParticlePoint[] = [];

    constructor(width: number, height: number, particlesCount: number) {
        this.points = this.generateParticlePoints(width, height, particlesCount);
    }

    get getParticlePoints(): ParticlePoint[]{
        return this.points;
    }

    private generateParticlePoints(width: number, height: number, particlesCount: number): ParticlePoint[] {
        const points: ParticlePoint[] = []
        for (let i = 0; i < particlesCount; i++) {

        points.push(new ParticlePoint(
            Math.random() * width, 
            Math.random() * height, 
            (Math.random() - 0.5) * 0.5, 
            (Math.random() - 0.5) * 0.5));
        }

        return points;
    }
}
