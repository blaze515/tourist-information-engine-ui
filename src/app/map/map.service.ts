import { Injectable } from '@angular/core';
import * as mapboxgl from 'node_modules/mapbox-gl/dist/mapbox-gl.js';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: mapboxgl.Map;

  constructor() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiamR1bm43NCIsImEiOiJjanUyMG9qamgwN2dyNDBvYm4xZHZma2cwIn0.jQddO0ZnykL7MUWxL_HBSw';
  }
}
