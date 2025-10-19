import {ParticlePointConfiguration} from '../shared/particle/particle-point-configuration';
import {ParticleLineConfiguration} from '../shared/particle/particle-line-configuration';

export enum ParticleConfigurationName {
  Default = 'Default',
  BackgroundCanvas = 'background-canvas'
}

export const PARTICLE_POINT_CONFIG: Record<ParticleConfigurationName, ParticlePointConfiguration> = {
  [ParticleConfigurationName.Default]: {fillColor: '#0466c8', radius: 1},
  [ParticleConfigurationName.BackgroundCanvas]: {fillColor: '#0466c8', radius: 2}
}

export const PARTICLE_LINE_CONFIG: Record<ParticleConfigurationName, ParticleLineConfiguration> = {
  [ParticleConfigurationName.Default]: {lineWidth: 1, strokeStyle: `rgba(4, 102, 200, 0.2)`},
  [ParticleConfigurationName.BackgroundCanvas]: {lineWidth: 2, strokeStyle: `rgba(4, 102, 200, 0.3)`}
}
