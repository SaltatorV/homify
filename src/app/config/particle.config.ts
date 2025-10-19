import {ParticlePointStyle} from '../shared/particle/particle-point-style';

export enum ParticleConfigurationName {
  default = 'default',
  backgroundCanvas = 'background-canvas'
}

export const ParticleConfig: Record<ParticleConfigurationName, ParticlePointStyle> = {
  'default': {fillColor: '#0466c8', radius: 1},
  'background-canvas': {fillColor: '#0466c8', radius: 2}
}
