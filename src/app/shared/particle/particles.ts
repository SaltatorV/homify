import { ParticlePoint } from "./particle-point";
import {ScreenDimensions} from './screen-dimensions';

export class Particles {
    points: ParticlePoint[] = [];

    constructor(screenDimensions: ScreenDimensions, particlesCount: number) {
        this.points = this.generateParticlePoints(screenDimensions, particlesCount);
    }

    get getParticlePoints(): ParticlePoint[]{
        return this.points;
    }

    private generateParticlePoints(screenDimensions: ScreenDimensions, particlesCount: number): ParticlePoint[] {
        const points: ParticlePoint[] = []
        for (let i = 0; i < particlesCount; i++) {

        points.push(new ParticlePoint(
            Math.random() * screenDimensions.getWidth,
            Math.random() * screenDimensions.getHeight,
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5));
        }

        return points;
    }
}
