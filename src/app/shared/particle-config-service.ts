import { Injectable } from '@angular/core';
import {PARTICLE_CONFIG, ParticleConfigurationName} from '../config/particle.config';
import {ParticlePointStyle} from './particle/particle-point-style';

@Injectable({
  providedIn: 'root'
})
export class ParticleConfigService {
  getStyle(state: ParticleConfigurationName = ParticleConfigurationName.Default): ParticlePointStyle {
    return PARTICLE_CONFIG[state];
  }
}
