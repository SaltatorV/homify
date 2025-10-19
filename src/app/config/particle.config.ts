import {ParticlePointStyle} from '../shared/particle/particle-point-style';

type ParticleConfigurationName = 'default' | 'background-canvas'

export const ParticleConfig: Record<ParticleConfigurationName, ParticlePointStyle> = {
  'default': {fillColor: '#0466c8', radius: 1},
  'background-canvas': {fillColor: '#0466c8', radius: 2}
}
