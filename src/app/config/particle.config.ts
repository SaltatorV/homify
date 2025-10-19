import {ParticlePointStyle} from '../shared/particle/particle-point-style';

export enum ParticleConfigurationName {
  Default = 'Default',
  BackgroundCanvas = 'background-canvas'
}

export const PARTICLE_CONFIG: Record<ParticleConfigurationName, ParticlePointStyle> = {
  [ParticleConfigurationName.Default]: {fillColor: '#0466c8', radius: 1},
  [ParticleConfigurationName.BackgroundCanvas]: {fillColor: '#0466c8', radius: 2}
}
