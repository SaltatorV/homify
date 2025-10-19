import { Injectable } from '@angular/core';
import {PARTICLE_CONFIG, ParticleConfigurationName} from '../config/particle.config';
import {ParticlePointConfiguration} from './particle/particle-point-configuration';

@Injectable({
  providedIn: 'root'
})
export class ParticleConfigService {
  getStyle(state: ParticleConfigurationName = ParticleConfigurationName.Default): ParticlePointConfiguration {
    return PARTICLE_CONFIG[state];
  }
}
