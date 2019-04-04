import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'node_modules/mapbox-gl';
import {MapService} from '../map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit() {
    const map = new mapboxgl.Map({
      container: 'transit_map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 10,
      center: [-97.7431, 30.2672] // Austin, TX
    });
    this.mapService.map = map;
  }

}
