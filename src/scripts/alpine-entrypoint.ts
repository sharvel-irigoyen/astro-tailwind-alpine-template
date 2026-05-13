import type { Alpine } from 'alpinejs';
import counter from './counter';

export default function (Alpine: Alpine) {
  // Registrar todos los componentes y stores extraídos aquí
  counter(Alpine);
}
