import {
  Component,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import * as L from 'leaflet';
import { icon, DEFAULT_COORDS } from './config';

export interface Coordinates {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-map',

  template: ` <div id="map"></div> `,
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  private map;

  currentLocationMarker: any;

  @Input()
  currentCoords: Coordinates;

  @Input()
  editMode;

  @Output('isMapLoaded')
  isLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output('coordinatesSelected')
  coordinatedSelected: EventEmitter<object> = new EventEmitter<object>();

  constructor() {}

  ngAfterViewInit(): void {
    this.editMode ? this.initEditMode() : this.initShowMode();
  }

  ngOnInit(): void {}

  private initMap(): void {
    this.map = L.map('map', {
      center: this.currentCoords,
      zoom: 15,
      maxZoom: 18,
      minZoom: 12,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);

    this.currentLocationMarker = L.marker(this.currentCoords, icon).addTo(
      this.map
    );

    this.map.whenReady(() => {
      this.isLoaded.emit(true);
      this.coordinatedSelected.emit({ coordinates: this.currentCoords });
    });
  }

  private initEditMode() {
    this.currentCoords = DEFAULT_COORDS;

    this.initMap();
    this.map.on('click', (e) => {
      this.currentCoords = { lat: e.latlng.lat, lng: e.latlng.lng };

      this.coordinatedSelected.emit({ coordinates: this.currentCoords });
      this.map.removeLayer(this.currentLocationMarker);
      this.currentLocationMarker = L.marker(this.currentCoords, icon).addTo(
        this.map
      );
    });
  }

  private initShowMode() {
    this.initMap();
  }
}
