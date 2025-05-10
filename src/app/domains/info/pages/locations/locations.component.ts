import { afterNextRender, Component, input, model } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Location, LocationParams } from '@shared/models/location.model';
import { LocationService } from '@shared/services/location.service';

@Component({
  selector: 'app-locations',
  imports: [],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
})
export class LocationsPage {
  readonly lat = model<number>();
  readonly lng = model<number>();
  readonly size = model<number>();

  
  locations = rxResource<Location[], LocationParams>({
    request: () =>
      ({ lat: this.lat(), lng: this.lng(), size: this.size() ?? 0 }) as LocationParams,
    loader: ({ request }) => this._services.getAll(request),
    defaultValue: [],
  });

  constructor(private _services: LocationService) {
    afterNextRender(() => {
      if (!this.lat() && !this.lng()) {
        navigator.geolocation.getCurrentPosition((p) => {
          const {
            coords: { latitude, longitude },
          } = p;
          this.lat.set(latitude);
          this.lng.set(longitude);
          this.size.set(10);
        });
      }
    });
  }
}
