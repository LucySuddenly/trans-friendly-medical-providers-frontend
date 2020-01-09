import Service, { inject as service } from '@ember/service';
import { get } from '@ember/object';

const NULL_LOCATION = {
  lat() {
    return null;
  },
  lng() {
    return null;
  }
};

export default Service.extend({
  googleMapsApi: service(),

  async decode(address) {
    const google = await this.googleMapsApi.google;
    let geocoder = new google.maps.Geocoder();
    let [results, status] = await new Promise(resolve => {
      geocoder.geocode({ address }, (results, status) => resolve([results, status]));
    });
    if (status !== 'OK') {
      let error = new Error(`Geocode resonse had status '${status}'`);
      error.code = 'EGEOCODENOTOK';
      throw error;
    }
    let location = get(results, 'firstObject.geometry.location') || NULL_LOCATION;
    return [location.lat(), location.lng()];
  }
});