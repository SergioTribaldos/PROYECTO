import * as L from 'leaflet';

export const icon = {
  icon: L.icon({
    iconAnchor: [13, 0],
    // specify the path here
    iconUrl: 'assets/map-img/marker-icon.png',
    shadowUrl: 'assets/map-img/marker-shadow.png',
  }),
};

export const DEFAULT_COORDS = {
  lat: 36.72902722757515,
  lng: -4.417298510670663,
};
