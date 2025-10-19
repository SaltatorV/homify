import {Injectable} from '@angular/core';
import {PARTICLE_LINE_CONFIG, PARTICLE_POINT_CONFIG, ParticleConfigurationName} from '../config/particle.config';
import {ParticlePointConfiguration} from './particle/particle-point-configuration';
import {ParticleLineConfiguration} from './particle/particle-line-configuration';

@Injectable({
  providedIn: 'root'
})
export class ParticleConfigService {
  getParticlePointConfiguration(state: ParticleConfigurationName = ParticleConfigurationName.Default): ParticlePointConfiguration {
    return PARTICLE_POINT_CONFIG[state];
  }

  getParticleLineConfiguration(state: ParticleConfigurationName = ParticleConfigurationName.Default): ParticleLineConfiguration {
    return PARTICLE_LINE_CONFIG[state];
  }
}
